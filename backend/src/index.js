const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const {
  store,
  createUser,
  findUserByIdentifier,
  logStatus,
  createReviewTask,
  nowIso,
} = require('./store');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

const issueToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/auth/request-otp', (req, res) => {
  const { email, phone } = req.body || {};
  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone required' });
  }
  return res.json({ otp_sent: true, message: 'OTP sent (stubbed).' });
});

app.post('/auth/verify-otp', (req, res) => {
  const { email, phone, otp, role } = req.body || {};
  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone required' });
  }
  if (otp !== '123456') {
    return res.status(401).json({ error: 'Invalid OTP' });
  }
  let user = findUserByIdentifier({ email, phone });
  let userRole = null;
  if (!user) {
    const created = createUser({ email, phone, role: role || 'patient' });
    user = created.user;
    userRole = created.role;
  } else {
    userRole = store.roles.find((r) => r.user_id === user.id) || { role: 'patient' };
  }
  const token = issueToken({ userId: user.id, role: userRole.role });
  return res.json({ token, user, role: userRole.role });
});

app.get('/family', requireAuth, (req, res) => {
  const members = store.familyMembers.filter((member) => member.patient_user_id === req.user.userId);
  res.json({ family: members });
});

app.post('/family', requireAuth, (req, res) => {
  const { name, relationship, date_of_birth } = req.body || {};
  if (!name || !relationship) {
    return res.status(400).json({ error: 'Name and relationship required' });
  }
  const member = {
    id: uuid(),
    patient_user_id: req.user.userId,
    name,
    relationship,
    date_of_birth: date_of_birth || null,
    status: 'active',
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.familyMembers.push(member);
  return res.status(201).json({ family_member: member });
});

app.post('/prescriptions/upload', requireAuth, upload.single('file'), (req, res) => {
  const { family_member_id } = req.body || {};
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'File required' });
  }
  const familyMember = family_member_id
    ? store.familyMembers.find(
        (member) => member.id === family_member_id && member.patient_user_id === req.user.userId,
      )
    : null;
  if (family_member_id && !familyMember) {
    return res.status(404).json({ error: 'Family member not found' });
  }

  const prescription = {
    id: uuid(),
    uploader_id: req.user.userId,
    patient_id: familyMember ? familyMember.id : req.user.userId,
    family_member_id: familyMember ? familyMember.id : null,
    uploader_type: 'patient',
    asset_name: file.originalname,
    asset_type: file.mimetype,
    status: 'uploaded',
    status_detail: 'Received',
    status_updated_at: nowIso(),
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.prescriptions.push(prescription);
  logStatus({ prescriptionId: prescription.id, status: 'uploaded', changedBy: req.user.userId });
  createReviewTask({ prescriptionId: prescription.id });
  return res.status(201).json({ prescription });
});

app.post('/provider/prescriptions/upload', upload.single('file'), (req, res) => {
  const { patient_identifier, consent } = req.body || {};
  if (consent !== 'true' && consent !== true) {
    return res.status(400).json({ error: 'Consent required' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'File required' });
  }
  const prescription = {
    id: uuid(),
    uploader_id: null,
    patient_id: null,
    family_member_id: null,
    uploader_type: 'provider',
    asset_name: req.file.originalname,
    asset_type: req.file.mimetype,
    status: 'uploaded',
    status_detail: patient_identifier ? `Identifier: ${patient_identifier}` : null,
    status_updated_at: nowIso(),
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.prescriptions.push(prescription);
  logStatus({ prescriptionId: prescription.id, status: 'uploaded', detail: 'Provider upload' });
  createReviewTask({ prescriptionId: prescription.id });
  return res.status(201).json({ prescription });
});

app.get('/review/queue', (req, res) => {
  const queue = store.reviewTasks
    .filter((task) => task.status === 'pending')
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  res.json({ queue });
});

app.post('/review/assign', (req, res) => {
  const { reviewer_id } = req.body || {};
  if (!reviewer_id) {
    return res.status(400).json({ error: 'Reviewer id required' });
  }
  const task = store.reviewTasks
    .filter((item) => item.status === 'pending')
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0];
  if (!task) {
    return res.status(404).json({ error: 'No pending tasks' });
  }
  task.status = 'in_progress';
  task.reviewer_id = reviewer_id;
  task.locked_at = nowIso();
  task.status_updated_at = nowIso();
  task.updated_at = nowIso();
  logStatus({ prescriptionId: task.prescription_id, status: 'processing', changedBy: reviewer_id });
  store.reviewAudit.push({
    id: uuid(),
    review_task_id: task.id,
    action: 'assigned',
    actor_id: reviewer_id,
    status: 'active',
    created_at: nowIso(),
    updated_at: nowIso(),
  });
  return res.json({ task });
});

app.post('/review/complete', (req, res) => {
  const { task_id, reviewer_id, fields } = req.body || {};
  const task = store.reviewTasks.find((item) => item.id === task_id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (task.reviewer_id !== reviewer_id) {
    return res.status(403).json({ error: 'Reviewer mismatch' });
  }
  task.status = 'complete';
  task.status_updated_at = nowIso();
  task.updated_at = nowIso();
  if (Array.isArray(fields)) {
    fields.forEach((field) => {
      store.reviewFields.push({
        id: uuid(),
        review_task_id: task.id,
        field_name: field.name,
        field_value: field.value,
        status: 'active',
        created_at: nowIso(),
        updated_at: nowIso(),
      });
    });
  }
  store.reviewAudit.push({
    id: uuid(),
    review_task_id: task.id,
    action: 'completed',
    actor_id: reviewer_id,
    status: 'active',
    created_at: nowIso(),
    updated_at: nowIso(),
  });

  const prescription = store.prescriptions.find((item) => item.id === task.prescription_id);
  if (prescription) {
    prescription.status = 'ready';
    prescription.status_updated_at = nowIso();
    prescription.updated_at = nowIso();
    logStatus({ prescriptionId: prescription.id, status: 'ready', changedBy: reviewer_id });
  }

  return res.json({ task });
});

app.get('/prescriptions/:id/pharmacy-ready', (req, res) => {
  const { id } = req.params;
  const structured = store.structuredPrescriptions.filter((item) => item.prescription_id === id);
  if (!structured.length) {
    return res.json({
      prescription_id: id,
      structured: [],
      billing_flags: { insurance_ready: false },
      inventory: { substitutions_allowed: false },
    });
  }
  return res.json({
    prescription_id: id,
    structured,
    billing_flags: { insurance_ready: true },
    inventory: { substitutions_allowed: structured.some((item) => item.substitution_allowed) },
  });
});

app.get('/prescriptions/:id/timeline', (req, res) => {
  const { id } = req.params;
  const timeline = store.statusLogs
    .filter((item) => item.prescription_id === id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  res.json({ prescription_id: id, timeline });
});

app.listen(PORT, () => {
  console.log(`Medfile backend running on port ${PORT}`);
});

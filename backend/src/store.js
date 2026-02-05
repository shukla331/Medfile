const { v4: uuid } = require('uuid');

const store = {
  users: [],
  roles: [],
  familyMembers: [],
  prescriptions: [],
  reviewTasks: [],
  reviewFields: [],
  reviewAudit: [],
  structuredPrescriptions: [],
  statusLogs: [],
};

const nowIso = () => new Date().toISOString();

const createUser = ({ email, phone, role }) => {
  const user = {
    id: uuid(),
    email: email || null,
    phone: phone || null,
    status: 'active',
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.users.push(user);

  const userRole = {
    id: uuid(),
    user_id: user.id,
    role: role || 'patient',
    status: 'active',
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.roles.push(userRole);

  return { user, role: userRole };
};

const findUserByIdentifier = ({ email, phone }) =>
  store.users.find((u) => (email && u.email === email) || (phone && u.phone === phone));

const logStatus = ({ prescriptionId, status, detail, changedBy }) => {
  store.statusLogs.push({
    id: uuid(),
    prescription_id: prescriptionId,
    status,
    status_detail: detail || null,
    changed_by: changedBy || null,
    created_at: nowIso(),
  });
};

const createReviewTask = ({ prescriptionId }) => {
  const task = {
    id: uuid(),
    prescription_id: prescriptionId,
    reviewer_id: null,
    status: 'pending',
    locked_at: null,
    status_updated_at: nowIso(),
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.reviewTasks.push(task);
  store.reviewAudit.push({
    id: uuid(),
    review_task_id: task.id,
    action: 'created',
    actor_id: null,
    status: 'active',
    created_at: nowIso(),
    updated_at: nowIso(),
  });
  return task;
};

module.exports = {
  store,
  createUser,
  findUserByIdentifier,
  logStatus,
  createReviewTask,
  nowIso,
};

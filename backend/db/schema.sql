-- EPIC 1.1 — User + Role schema
CREATE TABLE IF NOT EXISTS app_user (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_role (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES app_user(id),
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS family_member (
  id UUID PRIMARY KEY,
  patient_user_id UUID NOT NULL REFERENCES app_user(id),
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  date_of_birth DATE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consent_record (
  id UUID PRIMARY KEY,
  uploader_user_id UUID NOT NULL REFERENCES app_user(id),
  patient_user_id UUID NOT NULL REFERENCES app_user(id),
  consent_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EPIC 2.3 — Prescription upload
CREATE TABLE IF NOT EXISTS prescription (
  id UUID PRIMARY KEY,
  uploader_id UUID NOT NULL REFERENCES app_user(id),
  patient_id UUID NOT NULL REFERENCES app_user(id),
  family_member_id UUID REFERENCES family_member(id),
  uploader_type TEXT NOT NULL DEFAULT 'patient',
  asset_name TEXT,
  asset_type TEXT,
  status TEXT NOT NULL DEFAULT 'uploaded',
  status_detail TEXT,
  status_updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EPIC 4.1 — Review task schema
CREATE TABLE IF NOT EXISTS review_task (
  id UUID PRIMARY KEY,
  prescription_id UUID NOT NULL REFERENCES prescription(id),
  reviewer_id UUID,
  status TEXT NOT NULL DEFAULT 'pending',
  locked_at TIMESTAMP,
  status_updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review_field (
  id UUID PRIMARY KEY,
  review_task_id UUID NOT NULL REFERENCES review_task(id),
  field_name TEXT NOT NULL,
  field_value TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review_audit_log (
  id UUID PRIMARY KEY,
  review_task_id UUID NOT NULL REFERENCES review_task(id),
  action TEXT NOT NULL,
  actor_id UUID,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EPIC 5.1 — Structured prescription schema
CREATE TABLE IF NOT EXISTS prescription_structured (
  id UUID PRIMARY KEY,
  prescription_id UUID NOT NULL REFERENCES prescription(id),
  drug_name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  duration TEXT,
  quantity TEXT,
  substitution_allowed BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EPIC 6.1 — Status timeline
CREATE TABLE IF NOT EXISTS prescription_status_log (
  id UUID PRIMARY KEY,
  prescription_id UUID NOT NULL REFERENCES prescription(id),
  status TEXT NOT NULL,
  status_detail TEXT,
  changed_by UUID,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

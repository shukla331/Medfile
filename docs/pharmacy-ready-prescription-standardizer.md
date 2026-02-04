# Pharmacy-Ready Prescription Standardizer

## Exhaustive Product & Technical Specification (Phase 0 → Phase 3)

This document defines what exactly is being built for the first real wedge:

> Convert messy doctor prescriptions into pharmacy-ready, billable, inventory-linked data.

This is not a research system. This is ops-grade infrastructure.

---

# Phase 0 — Scope Lock (Foundation)

## 0.1 Problem Statement (Unambiguous)

Indian pharmacies receive prescriptions that are:

- Handwritten / semi-typed
- Inconsistent in format
- Ambiguous in drug naming
- Error-prone for billing and stock deduction

### Current pharmacy workflow

- Manual reading
- Guessing drug names
- Manual substitution (brand ↔ generic)
- Manual billing entry
- Manual inventory deduction

This causes:

- Billing errors
- Wrong substitutions
- Stock mismatch
- Time waste

---

## 0.2 What This System Will Do

Given a prescription image or PDF, the system will:

1. Extract all medicines.
2. Normalize them into structured, canonical medicine records.
3. Make them directly usable for:

   - Pharmacy billing software
   - Inventory deduction systems

**Key outcome:**

A pharmacist should be able to bill without re-typing medicine details.

---

## 0.3 What This System Will Not Do (Explicitly)

- ❌ Diagnose patients
- ❌ Suggest new medicines
- ❌ Replace pharmacist judgment
- ❌ Guarantee 100% automation

Human override is always allowed.

---

## 0.4 Primary User (Only One)

**Retail pharmacist / pharmacy billing operator**

Secondary users (future):

- Chain pharmacy ops
- Janaushadhi Kendras

---

## 0.5 Success Definition (Phase 0–3)

The system is considered successful if:

- ≥70% of prescriptions produce billable medicine lines without retyping.
- Each medicine has a confidence score.
- Pharmacist can correct errors in <30 seconds.

Accuracy is secondary to operational usefulness.

---

# Phase 1 — End-to-End Pipeline Spec

## 1.1 Input Specification

### Supported Inputs

- JPG / PNG (mobile photos)
- PDF (scanned)

### Input Metadata

```json
{
  "source": "mobile | scanner | whatsapp",
  "uploaded_by": "pharmacy_id",
  "timestamp": "ISO-8601"
}
```

---

## 1.2 Core Pipeline Stages

### Stage 1: Ingestion

- Assign `document_id`.
- Store raw file immutably.
- Store metadata.

**Non-negotiable:** raw input is never altered or deleted.

---

### Stage 2: Image & Layout Preprocessing

Outputs:

- Enhanced image
- Detected regions

Region types:

- Header
- Medicine block
- Instructions
- Signature/stamp

Bounding boxes are stored for traceability.

---

### Stage 3: OCR (Multi-Engine)

OCR output must include:

```json
{
  "token": "Metformin",
  "bbox": [],
  "confidence": 0.72
}
```

OCR is token-level, not plain text.

---

### Stage 4: Medicine Line Detection

Each OCR line classified as:

- Medicine line
- Non-medicine line

Output:

```json
{
  "line_id": 12,
  "is_medicine": true,
  "confidence": 0.88
}
```

---

### Stage 5: Entity Extraction (Per Medicine Line)

Extract the following raw entities:

| Entity       | Example    |
| ------------ | ---------- |
| Drug name    | Met XL     |
| Strength     | 500 mg     |
| Dosage form  | Tablet     |
| Frequency    | BD         |
| Duration     | 10 days    |
| Instructions | After food |

Each entity includes:

- raw value
- bounding box
- confidence

---

## 1.3 Phase-1 Output (Unnormalized)

```json
{
  "document_id": "abc123",
  "medicines_raw": [
    {
      "raw_drug": "Met XL",
      "strength": "500mg",
      "frequency": "BD",
      "confidence": 0.63
    }
  ]
}
```

This is not yet pharmacy-ready.

---

# Phase 2 — Canonical Prescription Schema

## 2.1 Design Principles

- Raw ≠ normalized (never overwrite)
- Versioned schema
- Machine-first, UI-second

---

## 2.2 Canonical Medicine Object (Core)

```json
{
  "medicine_id": "uuid",
  "raw": {
    "text": "Met XL 500mg BD",
    "confidence": 0.63
  },
  "normalized": {
    "drug_name": "Metformin",
    "salt": "Metformin Hydrochloride",
    "dosage_form": "Tablet",
    "strength_mg": 500,
    "frequency_per_day": 2,
    "duration_days": 10
  },
  "billing": {
    "billable": true,
    "unit_quantity": 20
  },
  "inventory": {
    "sku_code": null,
    "deduction_units": 20
  },
  "confidence": 0.82
}
```

---

## 2.3 Prescription-Level Object

```json
{
  "document_id": "abc123",
  "medicines": [],
  "overall_confidence": 0.78,
  "requires_review": true
}
```

---

## 2.4 Confidence Rules

- If any medicine confidence < threshold → review.
- Overall confidence is not average.
- Weighted by:

  - OCR quality
  - Drug match certainty
  - Dosage sanity

---

# Phase 3 — Drug Intelligence & Normalization

## 3.1 Drug Knowledge Base (DKB)

### Core Tables

#### Drug Master

- Canonical drug name
- Salt(s)
- Dosage forms
- Strength options

#### Brand ↔ Salt Mapping

- Brand name
- Manufacturer
- Salt

#### Common Abbreviations

- Met XL → Metformin ER
- PCM → Paracetamol

---

## 3.2 Normalization Workflow

1. Raw drug name extracted.
2. Candidate drugs fetched (dictionary + fuzzy).
3. Ranking model selects best match.
4. Dosage compatibility check.

Output:

```json
{
  "canonical_drug_id": 10234,
  "confidence": 0.84
}
```

---

## 3.3 Billing Quantity Logic

Rules:

- quantity = frequency × duration
- fallback to pharmacist input if missing

Example:

```
BD × 10 days → 2 × 10 = 20 tablets
```

---

## 3.4 Inventory Readiness Rules

A medicine is inventory-ready only if:

- Drug normalized
- Strength valid
- Dosage form known

Else → flagged for review.

---

## 3.5 Phase-3 Output (Pharmacy-Ready)

```json
{
  "document_id": "abc123",
  "status": "READY_FOR_BILLING",
  "medicines": [
    {
      "drug": "Metformin 500mg Tablet",
      "quantity": 20,
      "confidence": 0.84
    }
  ]
}
```

This output can directly feed billing software.

---

# Final Note (Important)

At the end of Phase 3, you are not an OCR startup.
You are a pharmacy operations infrastructure company.

Accuracy will improve. Trust comes from:

- Transparency
- Confidence gating
- Human override

---

**Next natural extensions (not in scope yet):**

- Janaushadhi SKU mapping
- Generic substitution engine
- E-prescription generation

End of spec.

---

# Database Specification Roadmap — Prescription Standardization System

This document defines a step-by-step database specification roadmap for building a pharmacy-ready prescription standardization system. It is written as an execution spec, not theory.

## Step 0 — Principles (Freeze These First)

Before tables, lock these rules:

- Nothing is overwritten — everything is versioned.
- Every output is explainable — source + confidence stored.
- DB is the source of truth — models are stateless workers.
- Prescription output is pharmacy-contextual, not global.

If you violate these later, the system becomes un-debuggable.

## Step 1 — Core Identity & Ingestion Tables (Day 1)

### 1.1 `prescription`

Represents a single prescription entity.

**Fields:**

- `id` (UUID)
- `patient_id` (nullable)
- `doctor_id` (nullable)
- `source` (`upload` | `whatsapp` | `scan` | `hospital`)
- `created_at`
- `status` (`received` | `processing` | `review` | `ready` | `failed`)

**Purpose:**

- One logical prescription across multiple attempts.

### 1.2 `prescription_asset`

Stores raw files (image / PDF).

**Fields:**

- `id`
- `prescription_id`
- `asset_type` (`image` | `pdf`)
- `storage_url`
- `uploaded_at`

**Purpose:**

- Immutable raw input.
- Reprocessing without re-upload.

## Step 2 — Processing & Versioning Layer (Critical)

### 2.1 `prescription_parse_attempt`

One full pipeline run.

**Fields:**

- `id`
- `prescription_id`
- `model_version`
- `started_at`
- `completed_at`
- `status` (`success` | `partial` | `failed`)

**Purpose:**

- Compare model versions.
- Replay history.

### 2.2 `processing_step`

Tracks each stage explicitly.

**Fields:**

- `id`
- `parse_attempt_id`
- `step_name` (`ocr` | `layout` | `ner` | `normalization`)
- `input_ref`
- `output_ref`
- `status`
- `latency_ms`

**Purpose:**

- Bottleneck detection.
- Retry logic.

## Step 3 — Field-Level Extraction Store (Non-negotiable)

### 3.1 `prescription_field_value`

Stores every extracted field.

**Fields:**

- `id`
- `parse_attempt_id`
- `field_name` (`drug_name`, `dosage`, `frequency`, `duration`)
- `extracted_value`
- `normalized_value`
- `confidence_score`
- `source` (`ocr` | `model` | `rule` | `human`)

**Purpose:**

- Fine-grained confidence control.
- Human-in-the-loop workflows.

---

# Human-in-the-Loop (HITL) UX Specification — Prescription Review

This document specifies the Human-in-the-Loop (HITL) UX for reviewing prescriptions in a pharmacy-ready prescription standardization system. This is an execution-grade UX spec meant for product, design, and engineering alignment.

## 1. Purpose of Human Review (Non-Negotiable Framing)

Human review exists to:

- Resolve low-confidence extractions.
- Resolve conflicts that affect billing or legality.
- Provide accountability and auditability.

Human review does not exist to:

- Re-enter entire prescriptions.
- Override clinical intent casually.
- Act as a fallback for bad models.

If humans are doing bulk typing, the system has failed.

---

## 2. Who Is the Human?

### Reviewer Personas

1. **Pharmacy Operator** (Primary)

   - Wants speed
   - Knows inventory + billing
   - Low tolerance for ambiguity

2. **Clinical Reviewer** (Optional / Later)

   - Used only for edge cases
   - Not involved in routine flow

This spec assumes Persona #1.

---

## 3. When Is Review Triggered?

Review tasks are auto-created when any of the following occur:

- Field confidence < configurable threshold (default 0.85)
- Drug mapped to multiple SKUs
- Substitution requires consent
- Dosage/frequency conflict detected
- Schedule H / X drug detected

No manual review creation allowed.

---

## 4. Review Queue Screen (Entry Point)

### Purpose

Let reviewer decide what to open first in under 5 seconds.

### Layout

- Table view
- One row = one prescription

### Columns

- Prescription ID
- Pharmacy Name
- # Issues
- Issue Type (drug | dosage | substitution | compliance)
- SLA Timer (time since upload)
- Status (new | in-review | blocked)

### UX Rules

- Sort by SLA breach risk
- Color coding only for urgency
- No thumbnails here

---

## 5. Review Workspace (Core Screen)

### Layout (3-Panel Design)

#### Left Panel — Raw Input

- Prescription image / PDF
- Zoom + rotate
- Highlight bounding boxes for extracted fields

#### Center Panel — Extracted Structure

- Structured list of drugs
- Each field shows:

  - Extracted value
  - Normalized value
  - Confidence score

Fields below threshold are auto-expanded.

#### Right Panel — Actions

- Approve field
- Edit field
- Choose substitution
- Mark as unreadable

---

## 6. Field-Level Review Interaction

### Default State

- High-confidence fields are collapsed and locked
- Low-confidence fields are expanded

### Editing Rules

- Reviewer edits normalized value only
- Extracted value remains immutable
- Every edit requires a reason dropdown:

  - OCR error
  - Doctor handwriting
  - Drug ambiguity
  - Inventory constraint

No free-text reasons.

---

## 7. Drug Resolution Flow (Critical)

If drug maps to multiple SKUs:

1. Show generic name at top
2. Show SKU options with:

   - Brand
   - Strength
   - Pack size
   - Price
   - Inventory status

3. Highlight Janaushadhi SKU if applicable
4. Reviewer selects one

Selection is logged permanently.

---

## 8. Substitution UX

### When Triggered

- Original drug OOS
- Govt policy preference
- Cheaper equivalent available

### UI

- Side-by-side comparison:

  - Original vs Substitute

- Explicit labels:

  - Same generic
  - Strength match/mismatch

### Required Actions

- Checkbox: "Allowed as per prescription"
- Optional pharmacist override

System blocks forward movement if unchecked.

---

## 9. Compliance & Safety Flags

### High-Risk Drugs

- Schedule H/X drugs show warning banner
- Requires explicit confirmation

### Missing Information

- Dosage/frequency missing triggers hard block
- Reviewer must either:

  - Add value
  - Mark prescription incomplete

---

## 10. Completion & Locking

### Final Actions

- "Approve & Generate Pharmacy Output"

On approval:

- Prescription version is locked
- Billing JSON generated
- Inventory deduction preview shown

No edits allowed post-lock without creating a new review task.

---

## 11. Audit Trail (Invisible but Mandatory)

For every reviewed field, log:

- Reviewer ID
- Timestamp
- Old value
- New value
- Reason

This is not visible in UX but is legally critical.

---

## 12. Performance Constraints (Hard Requirements)

- Review time per prescription: < 90 seconds
- Clicks per issue: ≤ 3
- Zero scrolling required for common cases

If this is violated, redesign.

---

## 13. Metrics to Track (Product Health)

- % prescriptions requiring review
- Avg review time
- Fields most edited by humans
- Auto-accept rate

These feed model improvement.

---

## 14. Explicit Non-Goals

- No chat-based review
- No free-form annotations
- No clinical decision support

This is an operational tool, not an EMR.

---

## Final Principle

The human reviewer should feel:
"I am confirming, not fixing."

If they feel like a data-entry operator, the system has failed.

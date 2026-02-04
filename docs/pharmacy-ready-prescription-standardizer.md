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

export type AssetType = 'image' | 'pdf'
export type PipelineStatus = 'success' | 'partial' | 'failed'
export type SourceType = 'upload' | 'whatsapp' | 'scan' | 'hospital'

export interface PipelineInput {
  documentId: string
  source: SourceType
  assetType: AssetType
  assetUrl: string
  receivedAt: string
}

export interface OcrToken {
  token: string
  bbox: number[]
  confidence: number
  engine: string
}

export interface OcrResult {
  tokens: OcrToken[]
  confidence: number
  engine: string
}

export interface OcrAggregate {
  tokens: OcrToken[]
  engines: string[]
  confidence: number
}

export interface MedicineLineClassification {
  lineId: number
  isMedicine: boolean
  confidence: number
}

export interface ExtractedEntity {
  name: 'drug_name' | 'strength' | 'dosage_form' | 'frequency' | 'duration' | 'instructions'
  rawValue: string | null
  bbox: number[]
  confidence: number
}

export interface RawMedicine {
  lineId: number
  rawText: string
  entities: ExtractedEntity[]
  confidence: number
}

export interface NormalizedMedicine {
  raw: RawMedicine
  normalized: {
    drugName: string | null
    salt: string | null
    dosageForm: string | null
    strengthMg: number | null
    frequencyPerDay: number | null
    durationDays: number | null
  }
  billing: {
    billable: boolean
    unitQuantity: number | null
  }
  inventory: {
    skuCode: string | null
    deductionUnits: number | null
  }
  confidence: number
}

export interface PipelineOutput {
  documentId: string
  status: PipelineStatus
  ocr: OcrAggregate
  medicineLines: MedicineLineClassification[]
  medicinesRaw: RawMedicine[]
  medicinesNormalized: NormalizedMedicine[]
  requiresReview: boolean
  overallConfidence: number
  steps: PipelineStepSummary[]
}

export interface PipelineStepSummary {
  name: 'ingestion' | 'preprocess' | 'ocr' | 'line_detection' | 'entity_extraction' | 'normalization'
  status: PipelineStatus
  startedAt: string
  completedAt: string
  latencyMs: number
}

export interface NormalizationContext {
  prescriptionId: string
  confidenceThreshold: number
}

import type {
  MedicineLineClassification,
  NormalizedMedicine,
  OcrAggregate,
  PipelineInput,
  PipelineOutput,
  PipelineStepSummary,
  RawMedicine,
} from './types'
import type { OcrEngine } from './ocr'
import { runMultiEngineOcr } from './ocr'
import { normalizeMedicine } from './normalization'

const nowIso = () => new Date().toISOString()

const step = (name: PipelineStepSummary['name'], start: string, end: string): PipelineStepSummary => ({
  name,
  status: 'success',
  startedAt: start,
  completedAt: end,
  latencyMs: new Date(end).getTime() - new Date(start).getTime(),
})

const deriveLineClassifications = (ocr: OcrAggregate): MedicineLineClassification[] => {
  if (ocr.tokens.length === 0) {
    return []
  }
  return [
    {
      lineId: 1,
      isMedicine: true,
      confidence: Math.min(1, ocr.confidence + 0.1),
    },
  ]
}

const extractRawMedicines = (
  lineClassifications: MedicineLineClassification[]
): RawMedicine[] =>
  lineClassifications
    .filter((line) => line.isMedicine)
    .map((line) => ({
      lineId: line.lineId,
      rawText: '',
      entities: [],
      confidence: line.confidence,
    }))

const calculateOverallConfidence = (medicines: NormalizedMedicine[]) => {
  if (medicines.length === 0) {
    return 0
  }
  const weights = medicines.map((medicine) => medicine.confidence)
  const totalWeight = weights.reduce((sum, value) => sum + value, 0)
  if (totalWeight === 0) {
    return 0
  }
  const weightedConfidence = medicines.reduce(
    (sum, medicine) => sum + medicine.confidence * medicine.confidence,
    0
  )
  return weightedConfidence / totalWeight
}

export const processPrescription = async (
  input: PipelineInput,
  engines: OcrEngine[],
  confidenceThreshold = 0.85
): Promise<PipelineOutput> => {
  const stepSummaries: PipelineStepSummary[] = []

  const ingestionStart = nowIso()
  const ingestionEnd = nowIso()
  stepSummaries.push(step('ingestion', ingestionStart, ingestionEnd))

  const preprocessStart = nowIso()
  const preprocessEnd = nowIso()
  stepSummaries.push(step('preprocess', preprocessStart, preprocessEnd))

  const ocrStart = nowIso()
  const ocr = await runMultiEngineOcr(input, engines)
  const ocrEnd = nowIso()
  stepSummaries.push(step('ocr', ocrStart, ocrEnd))

  const lineDetectStart = nowIso()
  const medicineLines = deriveLineClassifications(ocr)
  const lineDetectEnd = nowIso()
  stepSummaries.push(step('line_detection', lineDetectStart, lineDetectEnd))

  const entityStart = nowIso()
  const medicinesRaw = extractRawMedicines(medicineLines)
  const entityEnd = nowIso()
  stepSummaries.push(step('entity_extraction', entityStart, entityEnd))

  const normalizationStart = nowIso()
  const medicinesNormalized = medicinesRaw.map((raw) =>
    normalizeMedicine(raw, {
      prescriptionId: input.documentId,
      confidenceThreshold,
    })
  )
  const normalizationEnd = nowIso()
  stepSummaries.push(step('normalization', normalizationStart, normalizationEnd))

  const overallConfidence = calculateOverallConfidence(medicinesNormalized)
  const hasMedicines = medicinesNormalized.length > 0
  const requiresReview =
    !hasMedicines ||
    medicinesNormalized.some((medicine) => medicine.confidence < confidenceThreshold)
  const status = hasMedicines ? 'success' : ocr.tokens.length === 0 ? 'failed' : 'partial'

  return {
    documentId: input.documentId,
    status,
    ocr,
    medicineLines,
    medicinesRaw,
    medicinesNormalized,
    requiresReview,
    overallConfidence,
    steps: stepSummaries,
  }
}

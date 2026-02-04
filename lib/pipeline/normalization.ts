import type { NormalizationContext, NormalizedMedicine, RawMedicine } from './types'

const computeBillingQuantity = (frequencyPerDay: number | null, durationDays: number | null) => {
  if (!frequencyPerDay || !durationDays) {
    return null
  }
  return frequencyPerDay * durationDays
}

export const normalizeMedicine = (
  raw: RawMedicine,
  context: NormalizationContext
): NormalizedMedicine => {
  const normalized = {
    drugName: null,
    salt: null,
    dosageForm: null,
    strengthMg: null,
    frequencyPerDay: null,
    durationDays: null,
  }

  const unitQuantity = computeBillingQuantity(
    normalized.frequencyPerDay,
    normalized.durationDays
  )
  const confidence = raw.confidence * 0.5
  const billable = confidence >= context.confidenceThreshold && unitQuantity !== null

  return {
    raw,
    normalized,
    billing: {
      billable,
      unitQuantity,
    },
    inventory: {
      skuCode: null,
      deductionUnits: unitQuantity,
    },
    confidence,
  }
}

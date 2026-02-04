import type { OcrAggregate, OcrResult, OcrToken, PipelineInput } from './types'

export interface OcrEngine {
  name: string
  run: (input: PipelineInput) => Promise<OcrResult>
}

export const createStubOcrEngine = (name: string): OcrEngine => ({
  name,
  run: async () => ({
    tokens: [],
    confidence: 0,
    engine: name,
  }),
})

const average = (values: number[]): number => {
  if (values.length === 0) {
    return 0
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

const withEngine = (token: OcrToken, engine: string): OcrToken => ({
  ...token,
  engine,
})

export const aggregateOcrResults = (results: OcrResult[]): OcrAggregate => {
  const tokens = results.flatMap((result) =>
    result.tokens.map((token) => withEngine(token, result.engine))
  )
  const confidence = average(results.map((result) => result.confidence))
  return {
    tokens,
    engines: results.map((result) => result.engine),
    confidence,
  }
}

export const runMultiEngineOcr = async (
  input: PipelineInput,
  engines: OcrEngine[]
): Promise<OcrAggregate> => {
  if (engines.length === 0) {
    return {
      tokens: [],
      engines: [],
      confidence: 0,
    }
  }

  const results = await Promise.all(engines.map((engine) => engine.run(input)))
  return aggregateOcrResults(results)
}

import { describe, it, expect } from 'vitest'
import {
  defaultRatesLabData,
  calculateGasVolume,
  calculateReactionRate
} from './ratesLabData'

describe('Rates of Reaction Practical Workbench Kernel', () => {
  it('covers all 4 syllabus comparison runs with complete kinetic parameters', () => {
    const runs = defaultRatesLabData.presetRuns
    expect(runs).toBeDefined()
    expect(runs).toHaveLength(4)
    const runIds = runs!.map((r) => r.id)
    expect(runIds).toContain('baseline')
    expect(runIds).toContain('higher-temp')
    expect(runIds).toContain('powder-surface-area')
    expect(runIds).toContain('double-concentration')
  })

  it('demonstrates that initial rate is maximum at t = 0 and decreases towards 0', () => {
    const k = 0.02
    const maxV = 48.0
    const initialRate = calculateReactionRate(0, k, maxV)
    const midRate = calculateReactionRate(30, k, maxV)
    const lateRate = calculateReactionRate(120, k, maxV)

    expect(initialRate).toBeCloseTo(k * maxV, 2)
    expect(initialRate).toBeGreaterThan(midRate)
    expect(midRate).toBeGreaterThan(lateRate)
    expect(lateRate).toBeGreaterThan(0)
  })

  it('proves fine powder reaches plateau much faster than medium chips for same final volume', () => {
    const baseline = defaultRatesLabData.presetRuns!.find((r) => r.id === 'baseline')!
    const powder = defaultRatesLabData.presetRuns!.find((r) => r.id === 'powder-surface-area')!

    expect(baseline.maxVolumeCm3).toBe(powder.maxVolumeCm3)
    expect(powder.kRate).toBeGreaterThan(baseline.kRate)

    const vBaseAt30 = calculateGasVolume(30, baseline.kRate, baseline.maxVolumeCm3)
    const vPowderAt30 = calculateGasVolume(30, powder.kRate, powder.maxVolumeCm3)

    expect(vPowderAt30).toBeGreaterThan(vBaseAt30)
    // At 180s, both reach near full 48 cm³
    const vBaseFinal = calculateGasVolume(240, baseline.kRate, baseline.maxVolumeCm3)
    const vPowderFinal = calculateGasVolume(240, powder.kRate, powder.maxVolumeCm3)
    expect(vBaseFinal).toBeCloseTo(48.0, 0)
    expect(vPowderFinal).toBeCloseTo(48.0, 0)
  })

  it('demonstrates doubling reactant mass doubles total gas volume yield', () => {
    const baseline = defaultRatesLabData.presetRuns!.find((r) => r.id === 'baseline')!
    const doubled = defaultRatesLabData.presetRuns!.find((r) => r.id === 'double-concentration')!

    expect(doubled.maxVolumeCm3).toBe(baseline.maxVolumeCm3 * 2)
    const vFinal = calculateGasVolume(300, doubled.kRate, doubled.maxVolumeCm3)
    expect(vFinal).toBeCloseTo(96.0, 0)
  })
})

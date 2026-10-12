import { describe, expect, it } from 'vitest'
import {
  calculateSpringState,
  calculateSpringConstant,
  HOOKES_LAW_LAB_DEFAULT,
} from './hookesLawLabData'

describe('hookesLawLabData calculations', () => {
  it('correctly calculates extension and length within proportional limit', () => {
    // k = 25 N/m = 0.25 N/cm, unloaded length = 15 cm
    // load = 2 N -> extension = 2 / 0.25 = 8 cm, length = 15 + 8 = 23 cm
    const pt1 = calculateSpringState(2.0, 25, 15.0, 5.0)
    expect(pt1.extensionCm).toBe(8.0)
    expect(pt1.lengthCm).toBe(23.0)
    expect(pt1.isBeyondLimit).toBe(false)

    // load = 4 N -> extension = 4 / 0.25 = 16 cm, length = 31 cm
    const pt2 = calculateSpringState(4.0, 25, 15.0, 5.0)
    expect(pt2.extensionCm).toBe(16.0)
    expect(pt2.lengthCm).toBe(31.0)
    expect(pt2.isBeyondLimit).toBe(false)
  })

  it('identifies when load exceeds limit of proportionality and stretches nonlinearly', () => {
    // Limit is 5.0 N (ext = 20 cm).
    // At 6.0 N, extension should exceed linear 24.0 cm
    const ptOver = calculateSpringState(6.0, 25, 15.0, 5.0)
    expect(ptOver.isBeyondLimit).toBe(true)
    expect(ptOver.extensionCm).toBeGreaterThan(24.0)
  })

  it('accurately calculates spring constant from linear gradient', () => {
    // 2 N at 8 cm and 4 N at 16 cm -> ΔF = 2 N, Δx = 0.08 m -> k = 2 / 0.08 = 25 N/m
    const k = calculateSpringConstant(2.0, 8.0, 4.0, 16.0)
    expect(k).toBe(25.0)
  })

  it('matches HookesLawLabExtra schema in default dataset', () => {
    expect(HOOKES_LAW_LAB_DEFAULT.type).toBe('hookes-law-lab')
    expect(HOOKES_LAW_LAB_DEFAULT.springConstantNPerM).toBe(25)
    expect(HOOKES_LAW_LAB_DEFAULT.massPoints.length).toBeGreaterThanOrEqual(5)
  })
})

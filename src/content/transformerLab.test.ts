import { describe, expect, it } from 'vitest'
import {
  calculateTransformer,
  TRANSFORMER_LAB_DEFAULT,
} from './transformerLabData'

describe('transformerLabData calculations', () => {
  it('correctly calculates step-up voltage and current ratios', () => {
    // Np = 100, Ns = 1000, Vp = 25V -> Vs = 250V (10x step up)
    const res = calculateTransformer(100, 1000, 25, 500, 4)
    expect(res.secondaryVoltageV).toBe(250)
    expect(res.turnsRatio).toBe(10)
    expect(res.isStepUp).toBe(true)

    // Current: Ip = 500/25 = 20A, Is = 500/250 = 2A
    expect(res.primaryCurrentA).toBe(20)
    expect(res.secondaryCurrentA).toBe(2)
  })

  it('correctly calculates step-down voltage', () => {
    // Np = 400, Ns = 40, Vp = 240V -> Vs = 24V
    const res = calculateTransformer(400, 40, 240, 480, 2)
    expect(res.secondaryVoltageV).toBe(24)
    expect(res.isStepUp).toBe(false)
    expect(res.primaryCurrentA).toBe(2)
    expect(res.secondaryCurrentA).toBe(20)
  })

  it('proves that 10x step-up voltage cuts cable power loss by 100x (P = I^2 * R)', () => {
    const res = calculateTransformer(100, 1000, 25, 500, 4)
    // Loss at Vp: (20A)^2 * 4 = 1600 W
    // Loss at Vs: (2A)^2 * 4 = 16 W
    expect(res.lossAtVpW).toBe(1600)
    expect(res.lossAtVsW).toBe(16)
    expect(res.lossReductionRatio).toBe(100)
  })

  it('matches TransformerLabExtra schema in default dataset', () => {
    expect(TRANSFORMER_LAB_DEFAULT.type).toBe('transformer-lab')
    expect(TRANSFORMER_LAB_DEFAULT.presets.length).toBe(3)
    expect(TRANSFORMER_LAB_DEFAULT.presets[0]?.isStepUp).toBe(true)
  })
})

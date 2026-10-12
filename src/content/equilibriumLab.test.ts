import { describe, it, expect } from 'vitest'
import {
  defaultEquilibriumLabData,
  predictEquilibriumShift
} from './equilibriumLabData'

describe("Reversible Reactions & Le Chatelier's Dynamic Equilibrium Kernel", () => {
  it('covers Haber process, Contact process, and NO2-N2O4 system', () => {
    const sys = defaultEquilibriumLabData.systems
    expect(sys).toHaveLength(3)
    const ids = sys.map((s) => s.id)
    expect(ids).toContain('haber-process')
    expect(ids).toContain('contact-process')
    expect(ids).toContain('no2-n2o4-system')
  })

  it('correctly predicts that higher pressure in Haber process shifts forward (4 mol -> 2 mol)', () => {
    const res = predictEquilibriumShift('haber-process', 'constant', 'higher', false)
    expect(res.direction).toBe('forward')
    expect(res.yieldChange).toBe('increases')
  })

  it('correctly predicts that higher temperature in Haber process shifts reverse (exothermic forward)', () => {
    const res = predictEquilibriumShift('haber-process', 'higher', 'constant', false)
    expect(res.direction).toBe('reverse')
    expect(res.yieldChange).toBe('decreases')
  })

  it('demonstrates that a catalyst alone does NOT shift equilibrium position or yield', () => {
    const res = predictEquilibriumShift('haber-process', 'constant', 'constant', true)
    expect(res.direction).toBe('none')
    expect(res.yieldChange).toBe('unchanged')
    expect(res.explanation).toContain('catalyst increases the rates of forward and reverse')
  })

  it('verifies NO2-N2O4 system color metadata for reddish-brown to colorless shift', () => {
    const no2 = defaultEquilibriumLabData.systems.find((s) => s.id === 'no2-n2o4-system')!
    expect(no2.colorLeft).toBeDefined()
    expect(no2.colorRight).toBeDefined()
    expect(no2.colorDescriptionLeft?.en).toContain('Red-Brown')
    expect(no2.colorDescriptionRight?.en).toContain('Colorless')
  })
})

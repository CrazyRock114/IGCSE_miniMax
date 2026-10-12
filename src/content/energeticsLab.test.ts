import { describe, it, expect } from 'vitest'
import {
  defaultEnergeticsLabData,
  calculateEnthalpyChange
} from './energeticsLabData'

describe('Chemical Energetics & Bond Energy Profile Kernel', () => {
  it('covers methane, hydrogen and nitrogen monoxide reactions', () => {
    const rxns = defaultEnergeticsLabData.reactions
    expect(rxns).toHaveLength(3)
    const ids = rxns.map((r) => r.id)
    expect(ids).toContain('methane-combustion')
    expect(ids).toContain('hydrogen-combustion')
    expect(ids).toContain('nitrogen-monoxide-synthesis')
  })

  it('correctly calculates methane combustion as exothermic using bond energies', () => {
    const methane = defaultEnergeticsLabData.reactions.find(
      (r) => r.id === 'methane-combustion'
    )!
    const res = calculateEnthalpyChange(methane.bondsBroken, methane.bondsFormed)
    expect(res.totalBroken).toBe(4 * 412 + 2 * 498) // 1648 + 996 = 2644
    expect(res.totalFormed).toBe(2 * 805 + 4 * 464) // 1610 + 1856 = 3466
    expect(res.deltaH).toBe(-822)
    expect(res.isExothermic).toBe(true)
  })

  it('correctly calculates nitrogen monoxide synthesis as endothermic (ΔH > 0)', () => {
    const no = defaultEnergeticsLabData.reactions.find(
      (r) => r.id === 'nitrogen-monoxide-synthesis'
    )!
    const res = calculateEnthalpyChange(no.bondsBroken, no.bondsFormed)
    expect(res.totalBroken).toBe(945 + 498) // 1443
    expect(res.totalFormed).toBe(2 * 631) // 1262
    expect(res.deltaH).toBe(181)
    expect(res.isExothermic).toBe(false)
  })

  it('verifies that every reaction specifies positive activation energy', () => {
    for (const rxn of defaultEnergeticsLabData.reactions) {
      expect(rxn.activationEnergy).toBeGreaterThan(0)
      expect(rxn.equation).toContain('→')
    }
  })
})

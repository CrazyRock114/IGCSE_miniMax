import { describe, it, expect } from 'vitest'
import {
  defaultGroupTrendsLabData,
  checkDisplacement
} from './groupTrendsLabData'

describe('Periodic Trends & Halogen Displacement Workbench Kernel', () => {
  it('covers Group I alkali metals in increasing vigor order with descending melting points', () => {
    const metals = defaultGroupTrendsLabData.group1Metals
    expect(metals).toHaveLength(5)
    expect(metals.map((m) => m.symbol)).toEqual(['Li', 'Na', 'K', 'Rb', 'Cs'])

    // Vigor ranks 1 to 5
    for (let i = 0; i < metals.length; i++) {
      expect(metals[i]!.vigorRank).toBe(i + 1)
    }

    // Melting points decrease down group
    for (let i = 0; i < metals.length - 1; i++) {
      expect(metals[i]!.meltingPointC!).toBeGreaterThan(metals[i + 1]!.meltingPointC!)
    }
  })

  it('validates 3x3 halogen displacement reactivity matrix', () => {
    // Cl2 displaces Br- and I-
    expect(checkDisplacement('Cl₂', 'KBr').occurs).toBe(true)
    expect(checkDisplacement('Cl₂', 'KI').occurs).toBe(true)

    // Br2 displaces I-, but NOT Cl-
    expect(checkDisplacement('Br₂', 'KI').occurs).toBe(true)
    expect(checkDisplacement('Br₂', 'KCl').occurs).toBe(false)

    // I2 cannot displace Cl- or Br-
    expect(checkDisplacement('I₂', 'KCl').occurs).toBe(false)
    expect(checkDisplacement('I₂', 'KBr').occurs).toBe(false)
  })

  it('verifies displacement observation colors', () => {
    const clBr = checkDisplacement('Cl₂', 'KBr')
    expect(clBr.colorChange.en.toLowerCase()).toContain('orange')

    const clI = checkDisplacement('Cl₂', 'KI')
    expect(clI.colorChange.en.toLowerCase()).toContain('brown')
  })

  it('covers all physical halogens with syllabus states', () => {
    const halogens = defaultGroupTrendsLabData.halogensList!
    expect(halogens).toHaveLength(3)
    expect(halogens.map((h) => h.formula)).toEqual(['Cl₂', 'Br₂', 'I₂'])
    expect(halogens[0]!.stateAtRtp.en.toLowerCase()).toContain('gas')
    expect(halogens[1]!.stateAtRtp.en.toLowerCase()).toContain('liquid')
    expect(halogens[2]!.stateAtRtp.en.toLowerCase()).toContain('solid')
  })
})

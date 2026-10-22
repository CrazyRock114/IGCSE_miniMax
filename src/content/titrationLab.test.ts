import { describe, expect, it } from 'vitest'
import {
  TITRATION_INDICATORS,
  getTitrationVisualState,
  areTitresConcordant,
  titrationLabData,
} from './titrationLabData'

describe('Acid-Base Titration & Volumetric Analysis Kernel', () => {
  it('defines methyl orange, thymolphthalein and phenolphthalein with proper IGCSE syllabus colors', () => {
    const mo = TITRATION_INDICATORS.find((i) => i.id === 'methyl-orange')!
    expect(mo.colorInAlkali.en).toBe('Yellow')
    expect(mo.colorAtEndPoint.en).toContain('Orange')
    expect(mo.colorInAcid.en).toBe('Red')

    const thy = TITRATION_INDICATORS.find((i) => i.id === 'thymolphthalein')!
    expect(thy.colorInAlkali.en).toBe('Blue')
    expect(thy.colorInAcid.en).toBe('Colourless')

    const ph = TITRATION_INDICATORS.find((i) => i.id === 'phenolphthalein')!
    expect(ph.colorInAlkali.en).toBe('Pink')
    expect(ph.colorInAcid.en).toBe('Colourless')
  })

  it('determines neutralization point precisely within +-0.2 cm3', () => {
    const eqPoint = 20.00
    // Before equivalence point
    const stateBefore = getTitrationVisualState(15.0, eqPoint, 'methyl-orange')
    expect(stateBefore.isNeutralised).toBe(false)
    expect(stateBefore.hexColor).toBe('#EAB308') // Yellow

    // Right at equivalence point
    const stateAt = getTitrationVisualState(20.0, eqPoint, 'methyl-orange')
    expect(stateAt.isNeutralised).toBe(true)
    expect(stateAt.hexColor).toBe('#F97316') // Orange end point

    // After equivalence point
    const stateAfter = getTitrationVisualState(22.0, eqPoint, 'methyl-orange')
    expect(stateAfter.isNeutralised).toBe(false)
    expect(stateAfter.hexColor).toBe('#EF4444') // Red in acid
  })

  it('enforces concordant titre criterion of <= 0.10 cm3 difference', () => {
    expect(areTitresConcordant(20.05, 20.10)).toBe(true) // diff 0.05
    expect(areTitresConcordant(20.00, 20.10)).toBe(true) // diff 0.10
    expect(areTitresConcordant(20.00, 20.15)).toBe(false) // diff 0.15
  })

  it('validates titrationLabData metadata integrity and volumetric formula parameters', () => {
    expect(titrationLabData.type).toBe('titration-lab')
    expect(titrationLabData.analyte.volumeCm3).toBe(25.0)
    expect(titrationLabData.examinerNotes.en).toContain('Rinse burette with the acid')
  })
})

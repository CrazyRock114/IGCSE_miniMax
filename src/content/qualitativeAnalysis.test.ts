import { describe, it, expect } from 'vitest'
import { defaultQualitativeAnalysisLabData } from './qualitativeAnalysisData'

describe('Paper 6 Qualitative Analysis Practical Workbench Kernel', () => {
  it('covers all 8 official Cambridge 0620 cations', () => {
    const cations = defaultQualitativeAnalysisLabData.cations
    expect(cations).toBeDefined()
    expect(cations).toHaveLength(8)
    const formulas = cations!.map((c) => c.formula)
    expect(formulas).toEqual(
      expect.arrayContaining(['Al³⁺', 'NH₄⁺', 'Ca²⁺', 'Cr³⁺', 'Cu²⁺', 'Fe²⁺', 'Fe³⁺', 'Zn²⁺'])
    )
  })

  it('correctly distinguishes Al3+, Zn2+, and Ca2+ white precipitates', () => {
    const al = defaultQualitativeAnalysisLabData.cations!.find((c) => c.formula === 'Al³⁺')!
    const zn = defaultQualitativeAnalysisLabData.cations!.find((c) => c.formula === 'Zn²⁺')!
    const ca = defaultQualitativeAnalysisLabData.cations!.find((c) => c.formula === 'Ca²⁺')!

    // In NaOH: Al and Zn dissolve in excess, Ca does not
    expect(al.isSolubleExcessNaOH).toBe(true)
    expect(zn.isSolubleExcessNaOH).toBe(true)
    expect(ca.isSolubleExcessNaOH).toBe(false)

    // In NH3: Zn dissolves in excess, Al does not
    expect(zn.isSolubleExcessNH3).toBe(true)
    expect(al.isSolubleExcessNH3).toBe(false)
    expect(ca.isSolubleExcessNH3).toBe(false)
  })

  it('verifies silver halide precipitate color hierarchy (white, cream, yellow)', () => {
    const anions = defaultQualitativeAnalysisLabData.anions!
    const cl = anions.find((a) => a.id === 'chloride')!
    const br = anions.find((a) => a.id === 'bromide')!
    const i = anions.find((a) => a.id === 'iodide')!

    expect(cl.observation.en.toLowerCase()).toContain('white')
    expect(br.observation.en.toLowerCase()).toContain('cream')
    expect(i.observation.en.toLowerCase()).toContain('yellow')
  })

  it('includes all 6 required flame tests with distinct emission colors', () => {
    const flames = defaultQualitativeAnalysisLabData.flameTests!
    expect(flames).toHaveLength(6)
    const ions = flames.map((f) => f.ion)
    expect(ions).toEqual(
      expect.arrayContaining(['Li⁺', 'Na⁺', 'K⁺', 'Ca²⁺', 'Ba²⁺', 'Cu²⁺'])
    )
  })

  it('includes all 6 syllabus gases with positive test reagents', () => {
    const gases = defaultQualitativeAnalysisLabData.gases!
    expect(gases).toHaveLength(6)
    const nh3 = gases.find((g) => g.id === 'ammonia')!
    expect(nh3.result.en.toLowerCase()).toContain('blue')

    const co2 = gases.find((g) => g.id === 'carbon-dioxide')!
    expect(co2.result.en.toLowerCase()).toContain('limewater')
  })
})

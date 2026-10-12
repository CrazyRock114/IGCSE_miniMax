import { describe, expect, it } from 'vitest'
import { POTATO_TUBES, osmosisLabData } from '../osmosisLabData'

describe('Potato Cylinder Osmosis Practical Dataset', () => {
  it('contains 6 standard boiling tubes across the concentration range', () => {
    expect(POTATO_TUBES).toHaveLength(6)
    expect(POTATO_TUBES[0]!.concMol).toBe(0.0)
    expect(POTATO_TUBES[POTATO_TUBES.length - 1]!.concMol).toBe(1.0)
  })

  it('correctly exhibits turgid gain in dilute solutions and plasmolysed loss in concentrated', () => {
    // 0.0 mol/dm³ should gain mass
    expect(POTATO_TUBES[0]!.percentChange).toBeGreaterThan(0)
    expect(POTATO_TUBES[0]!.cellState).toBe('turgid')

    // 1.0 mol/dm³ should lose mass
    expect(POTATO_TUBES[5]!.percentChange).toBeLessThan(0)
    expect(POTATO_TUBES[5]!.cellState).toBe('plasmolysed')
  })

  it('identifies the exact isotonic point at 0.35 mol/dm³ where mass change is zero', () => {
    const isotonicTube = POTATO_TUBES.find((t) => t.concMol === osmosisLabData.cellSapConc)
    expect(isotonicTube).toBeDefined()
    expect(isotonicTube!.percentChange).toBe(0.0)
    expect(isotonicTube!.cellState).toBe('equilibrium')
    expect(isotonicTube!.finalMassG).toBe(isotonicTube!.initialMassG)
  })

  it('enforces Paper 6 controlled variables completeness', () => {
    expect(osmosisLabData.controlVariables.length).toBeGreaterThanOrEqual(5)
    for (const ctrl of osmosisLabData.controlVariables) {
      expect(ctrl.en).toBeTruthy()
      expect(ctrl.zh).toBeTruthy()
    }
  })

  it('calculates % mass change formula accurately', () => {
    for (const tube of POTATO_TUBES) {
      const calculatedPct = ((tube.finalMassG - tube.initialMassG) / tube.initialMassG) * 100
      expect(Math.abs(calculatedPct - tube.percentChange)).toBeLessThan(0.1)
    }
  })
})

import { describe, it, expect } from 'vitest'
import { defaultElectrolysisLabData, calculateGasYield } from './electrolysisLabData'

describe('Electrolysis & Half-Equation Practical Workbench Kernel', () => {
  it('covers all 4 mandatory Cambridge IGCSE 0620 syllabus scenarios', () => {
    const scenarioIds = defaultElectrolysisLabData.scenarios.map(s => s.id)
    expect(scenarioIds).toContain('molten-lead-bromide')
    expect(scenarioIds).toContain('concentrated-nacl')
    expect(scenarioIds).toContain('dilute-sulfuric-acid')
    expect(scenarioIds).toContain('copper-refining')
    expect(defaultElectrolysisLabData.scenarios).toHaveLength(4)
  })

  it('verifies 2:1 gas volume ratio for dilute sulfuric acid (Hofmann voltameter)', () => {
    const current = 2.0 // A
    const time = 600 // 10 minutes
    const yieldResult = calculateGasYield('dilute-sulfuric-acid', current, time)

    expect(yieldResult.chargeCoulombs).toBe(1200)
    expect(yieldResult.ratioCathodeToAnode).toBe('2 : 1')
    expect(yieldResult.cathodeVolumeCm3).toBeGreaterThan(0)
    expect(yieldResult.anodeVolumeCm3).toBeGreaterThan(0)
    expect(yieldResult.cathodeVolumeCm3).toBeCloseTo(yieldResult.anodeVolumeCm3 * 2, 1)
  })

  it('verifies 1:1 gas volume ratio for brine (conc. NaCl aq)', () => {
    const yieldResult = calculateGasYield('concentrated-nacl', 1.5, 300)
    expect(yieldResult.ratioCathodeToAnode).toBe('1 : 1')
    expect(yieldResult.cathodeVolumeCm3).toBeCloseTo(yieldResult.anodeVolumeCm3, 2)
  })

  it('validates copper refining does not generate gas and retains constant solution color', () => {
    const yieldResult = calculateGasYield('copper-refining', 3.0, 1000)
    expect(yieldResult.cathodeVolumeCm3).toBe(0)
    expect(yieldResult.anodeVolumeCm3).toBe(0)

    const cuScenario = defaultElectrolysisLabData.scenarios.find(s => s.id === 'copper-refining')
    expect(cuScenario).toBeDefined()
    expect(cuScenario?.cathodeHalfEquation).toContain('Cu²⁺ + 2e⁻ → Cu')
    expect(cuScenario?.anodeHalfEquation).toContain('Cu(s) → Cu²⁺ + 2e⁻')
    expect(cuScenario?.solutionObservation?.en).toContain('Intensity of blue solution remains completely unchanged')
  })

  it('ensures each scenario provides complete half-equations and ion listings', () => {
    for (const sc of defaultElectrolysisLabData.scenarios) {
      expect(sc.ionsPresent).toBeDefined()
      expect(sc.ionsPresent!.length).toBeGreaterThanOrEqual(2)
      expect(sc.cathodeHalfEquation).toContain('→')
      expect(sc.anodeHalfEquation).toContain('→')
      expect(sc.observationCathode.en.length).toBeGreaterThan(5)
      expect(sc.observationAnode.en.length).toBeGreaterThan(5)
    }
  })
})

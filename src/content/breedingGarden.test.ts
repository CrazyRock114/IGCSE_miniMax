import { describe, expect, it } from 'vitest'
import {
  PEA_TRAITS,
  simulateHarvest,
  breedingGardenData,
} from './breedingGardenData'

describe('Mendelian Pea Breeding Garden Kernel', () => {
  it('contains all 4 classical pea traits studied in IGCSE', () => {
    const ids = PEA_TRAITS.map((t) => t.id)
    expect(ids).toContain('seed-shape')
    expect(ids).toContain('seed-color')
    expect(ids).toContain('flower-color')
    expect(ids).toContain('stem-height')
  })

  it('calculates 3:1 expected counts correctly for 100 seeds', () => {
    const res = simulateHarvest(100, '3:1', 42)
    expect(res.expectedDominant).toBe(75.0)
    expect(res.expectedRecessive).toBe(25.0)
    expect(res.observedDominant + res.observedRecessive).toBe(100)
  })

  it('calculates 1:1 expected counts correctly for test cross', () => {
    const res = simulateHarvest(100, '1:1', 42)
    expect(res.expectedDominant).toBe(50.0)
    expect(res.expectedRecessive).toBe(50.0)
    expect(res.observedDominant + res.observedRecessive).toBe(100)
  })

  it('demonstrates that a large sample (500 seeds) yields a confirmed Mendelian ratio with chi-square < 3.84', () => {
    const res = simulateHarvest(500, '3:1', 12345)
    expect(res.isMendelianConfirmed).toBe(true)
    expect(res.chiSquare).toBeLessThan(res.criticalValue95)
  })

  it('validates breedingGardenData metadata integrity and syllabus notes', () => {
    expect(breedingGardenData.type).toBe('breeding-garden')
    expect(breedingGardenData.examinerNotes.en).toContain('Fertilisation is a random process')
    expect(breedingGardenData.dominantAllele).toBe('R')
  })
})

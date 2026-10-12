import { describe, expect, it } from 'vitest'
import {
  FLUID_COMPOSITION_MATRIX,
  NEPHRON_REGIONS,
  getAdhScenario,
  nephronLabData,
} from './nephronLabData'

describe('Nephron Ultrafiltration & Selective Reabsorption Kernel', () => {
  it('demonstrates glucose is 100% reabsorbed so urine concentration is exactly 0.0%', () => {
    const glucose = FLUID_COMPOSITION_MATRIX.find((s) => s.substance.en === 'Glucose')!
    expect(glucose.plasmaPercent).toBe(0.1)
    expect(glucose.filtratePercent).toBe(0.1)
    expect(glucose.urinePercent).toBe(0.0)
  })

  it('demonstrates proteins do not cross basement membrane during ultrafiltration', () => {
    const proteins = FLUID_COMPOSITION_MATRIX.find((s) => s.substance.en.includes('Proteins'))!
    expect(proteins.plasmaPercent).toBeGreaterThan(0)
    expect(proteins.filtratePercent).toBe(0.0)
    expect(proteins.urinePercent).toBe(0.0)
  })

  it('demonstrates urea is concentrated significantly from filtrate to urine', () => {
    const urea = FLUID_COMPOSITION_MATRIX.find((s) => s.substance.en.includes('Urea'))!
    expect(urea.filtratePercent).toBe(0.03)
    expect(urea.urinePercent).toBe(2.0)
    expect(urea.urinePercent / urea.filtratePercent).toBeGreaterThan(60)
  })

  it('correctly models ADH response to dehydration vs excess hydration', () => {
    const dehydrated = getAdhScenario('dehydrated')
    expect(dehydrated.adhLevel).toBe('High')
    expect(dehydrated.urineVolume).toContain('Small volume')

    const hydrated = getAdhScenario('hydrated')
    expect(hydrated.adhLevel).toBe('Low')
    expect(hydrated.urineVolume).toContain('Large volume')
  })

  it('validates all 4 nephron regions and metadata integrity', () => {
    expect(NEPHRON_REGIONS.length).toBe(4)
    expect(nephronLabData.type).toBe('nephron-lab')
    expect(nephronLabData.examinerNotes.en).toContain('100% selectively reabsorbed')
  })
})

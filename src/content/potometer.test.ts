import { describe, expect, it } from 'vitest'
import {
  POTOMETER_CONDITIONS,
  calculateBubbleDisplacement,
  potometerLabData,
} from './potometerData'

describe('Bubble Potometer Virtual Investigation Kernel', () => {
  it('contains all 5 microclimate conditions specified in IGCSE 0610.8.2.3', () => {
    const ids = POTOMETER_CONDITIONS.map((c) => c.id)
    expect(ids).toContain('baseline')
    expect(ids).toContain('wind')
    expect(ids).toContain('light')
    expect(ids).toContain('warm')
    expect(ids).toContain('humidity')
  })

  it('demonstrates wind strips boundary layer and produces highest transpiration rate', () => {
    const wind = POTOMETER_CONDITIONS.find((c) => c.id === 'wind')!
    const baseline = POTOMETER_CONDITIONS.find((c) => c.id === 'baseline')!
    expect(wind.bubbleSpeedMmMin).toBeGreaterThan(baseline.bubbleSpeedMmMin)
    expect(wind.transpirationRate).toBe('very-high')
  })

  it('demonstrates high humidity flattens concentration gradient and minimizes rate', () => {
    const humidity = POTOMETER_CONDITIONS.find((c) => c.id === 'humidity')!
    const baseline = POTOMETER_CONDITIONS.find((c) => c.id === 'baseline')!
    expect(humidity.bubbleSpeedMmMin).toBeLessThan(baseline.bubbleSpeedMmMin)
    expect(humidity.transpirationRate).toBe('low')
  })

  it('calculates linear bubble displacement accurately over time', () => {
    // 12 mm/min -> 0.2 mm/sec
    // In 30 seconds -> 6.0 mm
    const displacement30 = calculateBubbleDisplacement(12, 30)
    expect(displacement30).toBe(6.0)

    // In 60 seconds -> 12.0 mm
    const displacement60 = calculateBubbleDisplacement(12, 60)
    expect(displacement60).toBe(12.0)
  })

  it('validates potometerLabData metadata integrity and bilingual notes', () => {
    expect(potometerLabData.type).toBe('potometer-lab')
    expect(potometerLabData.examinerNotes.en).toContain('Cut shoot underwater')
    expect(potometerLabData.examinerNotes.zh).toContain('凡士林')
    expect(potometerLabData.conditions.length).toBe(5)
  })
})

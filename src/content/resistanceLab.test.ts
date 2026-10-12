import { describe, expect, it } from 'vitest'
import {
  calculateComponentIV,
  RESISTANCE_LAB_DEFAULT,
} from './resistanceLabData'

describe('resistanceLabData calculations', () => {
  it('correctly calculates fixed resistor ohmic behavior (constant 10 Ohms)', () => {
    const pt1 = calculateComponentIV('resistor', 4.0)
    expect(pt1.currentA).toBe(0.4)
    expect(pt1.resistanceOhm).toBe(10.0)
    expect(pt1.isOhmic).toBe(true)

    const pt2 = calculateComponentIV('resistor', 8.0)
    expect(pt2.currentA).toBe(0.8)
    expect(pt2.resistanceOhm).toBe(10.0)
  })

  it('demonstrates increasing resistance in filament lamp due to heating', () => {
    const lowV = calculateComponentIV('filament', 2.0)
    const highV = calculateComponentIV('filament', 10.0)

    // Resistance at 10V must be greater than at 2V
    expect(highV.resistanceOhm).toBeGreaterThan(lowV.resistanceOhm)
    expect(lowV.isOhmic).toBe(false)
  })

  it('correctly simulates diode threshold voltage at ~0.6V', () => {
    const subThreshold = calculateComponentIV('diode', 0.4)
    expect(subThreshold.currentA).toBe(0)
    expect(subThreshold.resistanceOhm).toBeGreaterThan(900)

    const aboveThreshold = calculateComponentIV('diode', 1.5)
    expect(aboveThreshold.currentA).toBeGreaterThan(0.2)
    expect(aboveThreshold.resistanceOhm).toBeLessThan(10)
  })

  it('matches ResistanceLabExtra schema in default dataset', () => {
    expect(RESISTANCE_LAB_DEFAULT.type).toBe('resistance-lab')
    expect(RESISTANCE_LAB_DEFAULT.components.length).toBe(4)
    expect(RESISTANCE_LAB_DEFAULT.components[0]?.id).toBe('resistor')
  })
})

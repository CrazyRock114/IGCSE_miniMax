import { describe, expect, it } from 'vitest'
import {
  calculateMicrometerReading,
  calculateVernierReading,
  calculatePendulumTiming,
  MEASUREMENT_LAB_DEFAULT,
} from './measurementLabData'

describe('measurementLabData calculation kernel', () => {
  it('correctly calculates micrometer readings with and without zero error', () => {
    // 5.5 mm sleeve + 32 thimble div (0.32 mm) = 5.82 mm
    const read1 = calculateMicrometerReading(5.5, 32, 0)
    expect(read1.rawReadingMm).toBe(5.82)
    expect(read1.correctedReadingMm).toBe(5.82)

    // Positive zero error of +0.02 mm -> corrected = 5.82 - 0.02 = 5.80 mm
    const read2 = calculateMicrometerReading(5.5, 32, 0.02)
    expect(read2.rawReadingMm).toBe(5.82)
    expect(read2.correctedReadingMm).toBe(5.8)

    // Negative zero error of -0.03 mm -> corrected = 5.82 - (-0.03) = 5.85 mm
    const read3 = calculateMicrometerReading(5.5, 32, -0.03)
    expect(read3.rawReadingMm).toBe(5.82)
    expect(read3.correctedReadingMm).toBe(5.85)
  })

  it('correctly calculates vernier calliper readings with coincidence divisions', () => {
    // 12 mm main scale + 4 vernier div (0.4 mm) = 12.4 mm
    const v1 = calculateVernierReading(12, 4, 0)
    expect(v1.rawReadingMm).toBe(12.4)
    expect(v1.correctedReadingMm).toBe(12.4)

    // Zero error of +0.2 mm
    const v2 = calculateVernierReading(12, 4, 0.2)
    expect(v2.rawReadingMm).toBe(12.4)
    expect(v2.correctedReadingMm).toBe(12.2)
  })

  it('calculates pendulum period and 20-oscillation timing accurately', () => {
    // Length 1.0 m, g = 9.8 m/s^2 -> T = 2 * pi * sqrt(1/9.8) ≈ 2.007s
    const pend1 = calculatePendulumTiming(1.0, 9.8)
    expect(pend1.periodSeconds).toBeCloseTo(2.01, 1)
    expect(pend1.time20Oscillations).toBeCloseTo(40.14, 1)
    expect(pend1.measuredPeriodSeconds).toBeCloseTo(2.01, 1)

    // Length 0.25 m -> T ≈ half of length 1.0m (T ∝ sqrt(L))
    const pend2 = calculatePendulumTiming(0.25, 9.8)
    expect(pend2.periodSeconds).toBeCloseTo(1.00, 1)
  })

  it('has valid default structure matching MeasurementLabExtra schema', () => {
    expect(MEASUREMENT_LAB_DEFAULT.type).toBe('measurement-lab')
    expect(MEASUREMENT_LAB_DEFAULT.instruments.length).toBe(3)
    expect(MEASUREMENT_LAB_DEFAULT.instruments[0]?.precisionMm).toBe(0.01)
    expect(MEASUREMENT_LAB_DEFAULT.instruments[1]?.precisionMm).toBe(0.1)
  })
})

import { describe, expect, it } from 'vitest'
import {
  calculateLensImage,
  LENS_LAB_DEFAULT,
} from './lensLabData'

describe('lensLabData calculations', () => {
  it('correctly calculates camera condition (u > 2f = 30cm, f = 10cm)', () => {
    // 1/v = 1/10 - 1/30 = 2/30 = 1/15 -> v = 15cm
    const res = calculateLensImage(30, 10, 4)
    expect(res.imageDistanceCm).toBe(15)
    expect(res.magnification).toBe(0.5)
    expect(res.nature).toBe('real-inverted')
    expect(res.size).toBe('diminished')
    expect(res.imageHeightCm).toBe(2)
  })

  it('correctly calculates 1:1 same-size condition (u = 2f = 20cm, f = 10cm)', () => {
    // 1/v = 1/10 - 1/20 = 1/20 -> v = 20cm
    const res = calculateLensImage(20, 10, 4)
    expect(res.imageDistanceCm).toBe(20)
    expect(res.magnification).toBe(1.0)
    expect(res.nature).toBe('real-inverted')
    expect(res.size).toBe('same-size')
    expect(res.imageHeightCm).toBe(4)
  })

  it('correctly calculates projector condition (f < u < 2f = 15cm, f = 10cm)', () => {
    // 1/v = 1/10 - 1/15 = 1/30 -> v = 30cm
    const res = calculateLensImage(15, 10, 4)
    expect(res.imageDistanceCm).toBe(30)
    expect(res.magnification).toBe(2.0)
    expect(res.nature).toBe('real-inverted')
    expect(res.size).toBe('magnified')
    expect(res.imageHeightCm).toBe(8)
  })

  it('correctly calculates magnifying glass virtual image (u < f = 6cm, f = 10cm)', () => {
    // v = 6 * 10 / (6 - 10) = -15cm
    const res = calculateLensImage(6, 10, 4)
    expect(res.imageDistanceCm).toBe(-15)
    expect(res.magnification).toBe(2.5)
    expect(res.nature).toBe('virtual-upright')
    expect(res.size).toBe('magnified')
    expect(res.imageHeightCm).toBe(10)
  })

  it('handles object placed at principal focus (u = f)', () => {
    const res = calculateLensImage(10, 10, 4)
    expect(res.nature).toBe('infinity-parallel')
    expect(res.imageDistanceCm).toBeNull()
  })

  it('matches LensLabExtra schema in default dataset', () => {
    expect(LENS_LAB_DEFAULT.type).toBe('lens-lab')
    expect(LENS_LAB_DEFAULT.focalLengthCm).toBe(10)
    expect(LENS_LAB_DEFAULT.presets.length).toBe(4)
  })
})

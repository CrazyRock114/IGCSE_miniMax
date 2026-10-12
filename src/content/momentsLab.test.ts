import { describe, expect, it } from 'vitest'
import {
  calculateMomentsEquilibrium,
  MOMENTS_LAB_DEFAULT,
  type MomentLoadItem,
} from './momentsLabData'

describe('momentsLabData calculations', () => {
  it('correctly calculates equilibrium for equal opposing moments', () => {
    // 200g at 30cm on left vs 300g at 20cm on right
    // F_left = 0.2 * 9.8 = 1.96 N, M_left = 1.96 * 30 = 58.8 N cm
    // F_right = 0.3 * 9.8 = 2.94 N, M_right = 2.94 * 20 = 58.8 N cm
    const loads: MomentLoadItem[] = [
      { id: '1', massG: 200, distanceCm: 30, side: 'left' },
      { id: '2', massG: 300, distanceCm: 20, side: 'right' },
    ]
    const result = calculateMomentsEquilibrium(loads)
    expect(result.anticlockwiseMomentNCm).toBe(58.8)
    expect(result.clockwiseMomentNCm).toBe(58.8)
    expect(result.netMomentNCm).toBe(0)
    expect(result.isBalanced).toBe(true)
    expect(result.tiltAngleDeg).toBe(0)
  })

  it('detects unbalance and calculates clockwise tilt angle', () => {
    // 100g at 20cm on left (19.6 N cm) vs 400g at 25cm on right (98.0 N cm)
    const loads: MomentLoadItem[] = [
      { id: '1', massG: 100, distanceCm: 20, side: 'left' },
      { id: '2', massG: 400, distanceCm: 25, side: 'right' },
    ]
    const result = calculateMomentsEquilibrium(loads)
    expect(result.isBalanced).toBe(false)
    expect(result.netMomentNCm).toBeGreaterThan(0)
    expect(result.tiltAngleDeg).toBeGreaterThan(0)
  })

  it('correctly sums multiple loads on the same side', () => {
    // Left: 100g at 40cm (39.2) + 100g at 20cm (19.6) = 58.8 N cm
    // Right: 200g at 29.4cm ≈ 200g at 30cm (58.8 N cm)
    const loads: MomentLoadItem[] = [
      { id: 'l1', massG: 100, distanceCm: 40, side: 'left' },
      { id: 'l2', massG: 100, distanceCm: 20, side: 'left' },
      { id: 'r1', massG: 200, distanceCm: 30, side: 'right' },
    ]
    const result = calculateMomentsEquilibrium(loads)
    expect(result.anticlockwiseMomentNCm).toBe(58.8)
    expect(result.clockwiseMomentNCm).toBe(58.8)
    expect(result.isBalanced).toBe(true)
  })

  it('matches MomentsLabExtra schema in default dataset', () => {
    expect(MOMENTS_LAB_DEFAULT.type).toBe('moments-lab')
    expect(MOMENTS_LAB_DEFAULT.rulerLengthCm).toBe(100)
    expect(MOMENTS_LAB_DEFAULT.defaultLoads.length).toBe(2)
  })
})

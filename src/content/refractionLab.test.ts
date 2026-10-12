import { describe, expect, it } from 'vitest'
import {
  calculateRefractionRay,
  REFRACTION_LAB_DEFAULT,
} from './refractionLabData'

describe('refractionLabData calculations', () => {
  it('correctly calculates critical angle for crown glass (n = 1.50)', () => {
    // c = arcsin(1/1.5) = 41.81°
    const ray = calculateRefractionRay(30, 1.5)
    expect(ray.criticalAngleDeg).toBe(41.8)
    expect(ray.behavior).toBe('refraction')
    expect(ray.refractedAngleDeg).toBeCloseTo(48.6, 1)
  })

  it('identifies critical angle boundary condition (i ≈ c)', () => {
    const rayCrit = calculateRefractionRay(41.8, 1.5)
    expect(rayCrit.behavior).toBe('critical')
    expect(rayCrit.refractedAngleDeg).toBe(90.0)
  })

  it('triggers Total Internal Reflection when i > c', () => {
    // i = 50° in glass (c = 41.8°) -> TIR
    const rayTir = calculateRefractionRay(50, 1.5)
    expect(rayTir.behavior).toBe('tir')
    expect(rayTir.refractedAngleDeg).toBeNull()
    expect(rayTir.reflectedAngleDeg).toBe(50)
  })

  it('calculates light speed in medium correctly', () => {
    // v = 300,000 / 1.5 = 200,000 km/s
    const ray = calculateRefractionRay(20, 1.5)
    expect(ray.speedInMediumKmS).toBe(200000)
  })

  it('matches RefractionLabExtra schema in default dataset', () => {
    expect(REFRACTION_LAB_DEFAULT.type).toBe('refraction-lab')
    expect(REFRACTION_LAB_DEFAULT.materials.length).toBe(4)
    expect(REFRACTION_LAB_DEFAULT.materials[0]?.refractiveIndex).toBe(1.5)
  })
})

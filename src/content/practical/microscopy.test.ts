import { describe, expect, it } from 'vitest'
import {
  OBJECTIVES,
  SPECIMEN_SLIDES,
  calibrateGraticule,
  calculateActualSizeUm,
  calculateMagnification,
  checkNumericAnswer,
} from './microscopy'

describe('Microscopy Practical Kernel', () => {
  it('has valid objectives with increasing magnification and decreasing FOV', () => {
    expect(OBJECTIVES).toHaveLength(3)
    expect(OBJECTIVES[0]!.power).toBe(4)
    expect(OBJECTIVES[1]!.power).toBe(10)
    expect(OBJECTIVES[2]!.power).toBe(40)

    // FOV should decrease as power increases
    expect(OBJECTIVES[0]!.fovUm).toBeGreaterThan(OBJECTIVES[1]!.fovUm)
    expect(OBJECTIVES[1]!.fovUm).toBeGreaterThan(OBJECTIVES[2]!.fovUm)

    // µm per graticule division should decrease as power increases
    expect(OBJECTIVES[0]!.umPerGraticuleDiv).toBeGreaterThan(OBJECTIVES[1]!.umPerGraticuleDiv)
    expect(OBJECTIVES[1]!.umPerGraticuleDiv).toBeGreaterThan(OBJECTIVES[2]!.umPerGraticuleDiv)
  })

  it('contains essential IGCSE biological specimen slides', () => {
    expect(SPECIMEN_SLIDES.length).toBeGreaterThanOrEqual(4)
    const slideIds = SPECIMEN_SLIDES.map((s) => s.id)
    expect(slideIds).toContain('onion-epidermis')
    expect(slideIds).toContain('stomata-guard-cells')
    expect(slideIds).toContain('plasmolysed-cells')
    expect(slideIds).toContain('human-blood-smear')

    for (const slide of SPECIMEN_SLIDES) {
      expect(slide.name.en).toBeTruthy()
      expect(slide.name.zh).toBeTruthy()
      expect(slide.targetActualSizeUm).toBeGreaterThan(0)
      expect(slide.examDrawingSizeMm).toBeGreaterThan(0)
      expect(slide.examinerTip.en).toBeTruthy()
      expect(slide.examinerTip.zh).toBeTruthy()
    }
  })

  describe('calibrateGraticule', () => {
    it('correctly calculates µm per graticule division', () => {
      // 10 stage divisions = 10 × 10 µm = 100 µm
      // Spanning 40 graticule divisions -> 100 / 40 = 2.5 µm/div (high power 40×)
      expect(calibrateGraticule(10, 40)).toBe(2.5)

      // 10 stage divisions = 100 µm spanning 10 graticule divisions -> 10 µm/div (low power 10×)
      expect(calibrateGraticule(10, 10)).toBe(10.0)

      // 20 stage divisions = 200 µm spanning 8 graticule divisions -> 25 µm/div (scanning 4×)
      expect(calibrateGraticule(20, 8)).toBe(25.0)
    })

    it('handles zero or negative graticule divisions gracefully', () => {
      expect(calibrateGraticule(10, 0)).toBe(0)
      expect(calibrateGraticule(10, -5)).toBe(0)
    })
  })

  describe('calculateActualSizeUm (A = I / M)', () => {
    it('correctly computes actual size in µm from drawing in mm', () => {
      // Image size = 80 mm, Magnification = ×400
      // Actual size = (80 × 1000) / 400 = 200 µm
      expect(calculateActualSizeUm(80, 400)).toBe(200)

      // Image size = 75 mm, Magnification = ×1500
      // Actual size = (75 × 1000) / 1500 = 50 µm
      expect(calculateActualSizeUm(75, 1500)).toBe(50)

      // Image size = 60 mm, Magnification = ×8000
      // Actual size = (60 × 1000) / 8000 = 7.5 µm (RBC)
      expect(calculateActualSizeUm(60, 8000)).toBe(7.5)
    })

    it('returns 0 for non-positive magnification', () => {
      expect(calculateActualSizeUm(80, 0)).toBe(0)
      expect(calculateActualSizeUm(80, -100)).toBe(0)
    })
  })

  describe('calculateMagnification (M = I / A)', () => {
    it('computes dimensionless magnification factor', () => {
      // Image = 80 mm, Actual = 200 µm -> (80 × 1000) / 200 = 400
      expect(calculateMagnification(80, 200)).toBe(400)

      // Image = 75 mm, Actual = 50 µm -> (75 × 1000) / 50 = 1500
      expect(calculateMagnification(75, 50)).toBe(1500)

      // Image = 66 mm, Actual = 110 µm -> (66 × 1000) / 110 = 600
      expect(calculateMagnification(66, 110)).toBe(600)

      // Image = 60 mm, Actual = 7.5 µm -> (60 × 1000) / 7.5 = 8000
      expect(calculateMagnification(60, 7.5)).toBe(8000)
    })

    it('returns 0 for non-positive actual size', () => {
      expect(calculateMagnification(80, 0)).toBe(0)
      expect(calculateMagnification(80, -20)).toBe(0)
    })
  })

  describe('checkNumericAnswer', () => {
    it('allows answer within percentage tolerance', () => {
      expect(checkNumericAnswer(400, 400, 5)).toBe(true)
      expect(checkNumericAnswer(410, 400, 5)).toBe(true) // +2.5%
      expect(checkNumericAnswer(390, 400, 5)).toBe(true) // -2.5%
      expect(checkNumericAnswer(425, 400, 5)).toBe(false) // +6.25% > 5%
    })

    it('rejects invalid or NaN values', () => {
      expect(checkNumericAnswer(Number.NaN, 400)).toBe(false)
      expect(checkNumericAnswer(400, 0)).toBe(false)
    })
  })
})

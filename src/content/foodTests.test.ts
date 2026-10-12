import { describe, it, expect } from 'vitest'
import { foodTestsLabData } from './foodTestsData'

describe('Food Tests Practical Workbench Kernel & Data', () => {
  it('covers all five Cambridge 0610 official biochemical reagents', () => {
    const testIds = foodTestsLabData.tests.map((t) => t.id)
    expect(testIds).toContain('starch')
    expect(testIds).toContain('reducing_sugar')
    expect(testIds).toContain('protein')
    expect(testIds).toContain('lipids')
    expect(testIds).toContain('vitamin_c')
  })

  it('correctly requires water bath heating exclusively for Benedicts test', () => {
    const benedicts = foodTestsLabData.tests.find((t) => t.id === 'reducing_sugar')
    const iodine = foodTestsLabData.tests.find((t) => t.id === 'starch')
    const biuret = foodTestsLabData.tests.find((t) => t.id === 'protein')
    const ethanol = foodTestsLabData.tests.find((t) => t.id === 'lipids')

    expect(benedicts?.heatingRequired).toBe(true)
    expect(iodine?.heatingRequired).toBe(false)
    expect(biuret?.heatingRequired).toBe(false)
    expect(ethanol?.heatingRequired).toBe(false)
  })

  it('specifies characteristic positive color results matching Cambridge mark schemes', () => {
    const benedicts = foodTestsLabData.tests.find((t) => t.id === 'reducing_sugar')
    const biuret = foodTestsLabData.tests.find((t) => t.id === 'protein')
    const iodine = foodTestsLabData.tests.find((t) => t.id === 'starch')
    const lipid = foodTestsLabData.tests.find((t) => t.id === 'lipids')
    const vitC = foodTestsLabData.tests.find((t) => t.id === 'vitamin_c')

    expect(benedicts?.positiveColor.en).toContain('Brick-red precipitate')
    expect(biuret?.positiveColor.en).toContain('Purple')
    expect(iodine?.positiveColor.en).toContain('Blue-black')
    expect(lipid?.positiveColor.en).toContain('Cloudy white emulsion')
    expect(vitC?.positiveColor.en.toLowerCase()).toContain('decolourises')
  })

  it('provides comprehensive sample test coverage with valid contains arrays', () => {
    expect(foodTestsLabData.samples.length).toBeGreaterThanOrEqual(5)
    for (const sample of foodTestsLabData.samples) {
      expect(sample.contains).toBeDefined()
      expect(sample.name.en).toBeTruthy()
      expect(sample.name.zh).toBeTruthy()
    }
  })
})

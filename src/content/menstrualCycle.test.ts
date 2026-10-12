import { describe, expect, it } from 'vitest'
import { getHormoneLevels, menstrualTimelineData } from './menstrualCycleData'

describe('28-Day Menstrual Cycle Hormone & Organ Synchronizer', () => {
  it('validates timeline metadata and length', () => {
    expect(menstrualTimelineData.cycleDays).toBe(28)
    expect(menstrualTimelineData.title.en).toBeTruthy()
    expect(menstrualTimelineData.title.zh).toBeTruthy()
    expect(menstrualTimelineData.examinerNotes.en).toContain('LH surge')
  })

  it('demonstrates that oestrogen peaks in follicular phase before ovulation', () => {
    const day10 = getHormoneLevels(10)
    const day13 = getHormoneLevels(13)
    const day20 = getHormoneLevels(20)

    // Oestrogen should peak before or right at day 13
    expect(day13.oestrogen).toBeGreaterThan(day10.oestrogen)
    expect(day13.oestrogen).toBeGreaterThan(day20.oestrogen)
  })

  it('proves that LH surge occurs sharply at Day 13-14 triggering ovulation', () => {
    const day7 = getHormoneLevels(7)
    const day13 = getHormoneLevels(13)
    const day14 = getHormoneLevels(14)
    const day20 = getHormoneLevels(20)

    expect(day13.lh).toBeGreaterThan(day7.lh)
    expect(day13.lh).toBeGreaterThan(day20.lh)
    expect(day14.ovaryPhase).toBe('ovulation')
  })

  it('demonstrates progesterone peaks in luteal phase after ovulation', () => {
    const day5 = getHormoneLevels(5)
    const day14 = getHormoneLevels(14)
    const day21 = getHormoneLevels(21)
    const day27 = getHormoneLevels(27)

    expect(day21.progesterone).toBeGreaterThan(day5.progesterone)
    expect(day21.progesterone).toBeGreaterThan(day14.progesterone)
    // Drops before period if not pregnant
    expect(day21.progesterone).toBeGreaterThan(day27.progesterone)
  })

  it('models uterine lining shedding during days 1-5 and thickening afterwards', () => {
    const day3 = getHormoneLevels(3)
    const day12 = getHormoneLevels(12)
    const day21 = getHormoneLevels(21)

    expect(day3.uterusPhase).toBe('menstruation')
    expect(day3.liningThicknessMm).toBeLessThan(day12.liningThicknessMm)
    expect(day12.liningThicknessMm).toBeLessThan(day21.liningThicknessMm)
  })

  it('maintains progesterone and endometrium when pregnancy occurs', () => {
    const normalDay27 = getHormoneLevels(27, false)
    const pregnantDay27 = getHormoneLevels(27, true)

    expect(pregnantDay27.progesterone).toBeGreaterThan(normalDay27.progesterone)
    expect(pregnantDay27.liningThicknessMm).toBeGreaterThan(normalDay27.liningThicknessMm)
  })
})

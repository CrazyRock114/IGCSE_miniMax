import { describe, expect, it } from 'vitest'
import {
  CARDIAC_PHASES,
  getCardiacStateAtTime,
  cardiacCycleData,
} from './cardiacCycleData'

describe('Cardiac Cycle & Valve State Machine Kernel', () => {
  it('defines 3 distinct physiological phases summing to 0.8s', () => {
    expect(CARDIAC_PHASES.length).toBe(3)
    const totalDuration = CARDIAC_PHASES.reduce((acc, p) => acc + p.durationSec, 0)
    expect(Number(totalDuration.toFixed(1))).toBe(0.8)
  })

  it('demonstrates that during ventricular systole AV valves are closed and SL valves are open', () => {
    const vSystole = CARDIAC_PHASES.find((p) => p.id === 'ventricular-systole')!
    expect(vSystole.avValves).toBe('closed')
    expect(vSystole.slValves).toBe('open')
    expect(vSystole.heartSound?.en).toContain('LUB')
  })

  it('demonstrates that during diastole AV valves are open and SL valves are closed', () => {
    const diastole = CARDIAC_PHASES.find((p) => p.id === 'diastole')!
    expect(diastole.avValves).toBe('open')
    expect(diastole.slValves).toBe('closed')
    expect(diastole.heartSound?.en).toContain('DUB')
  })

  it('computes accurate ventricular pressure peak of 120 mmHg at mid ventricular systole', () => {
    const midSystole = getCardiacStateAtTime(0.25)
    expect(midSystole.phase.id).toBe('ventricular-systole')
    expect(midSystole.lvPressure).toBeGreaterThan(100)
    expect(midSystole.lvPressure).toBeLessThanOrEqual(120)
  })

  it('validates cardiacCycleData metadata integrity and syllabus coverage', () => {
    expect(cardiacCycleData.type).toBe('cardiac-cycle')
    expect(cardiacCycleData.examinerNotes.en).toContain('Left ventricle wall is much thicker')
    expect(cardiacCycleData.phases.length).toBe(3)
  })
})

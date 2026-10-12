import { describe, expect, it } from 'vitest'
import {
  calculateRadioactiveDecay,
  calculateAbsorption,
  RADIOACTIVITY_LAB_DEFAULT,
} from './radioactivityLabData'

describe('radioactivityLabData calculations', () => {
  it('correctly calculates radioactive decay across multiple half-lives', () => {
    // Initial: 640 Bq, Half-life: 20 min, Background: 20 Bq
    // At t = 0 min: net = 640, raw = 660
    const t0 = calculateRadioactiveDecay(0, 20, 640, 20)
    expect(t0.correctedCountRateBq).toBe(640)
    expect(t0.rawCountRateBq).toBe(660)

    // At t = 20 min (1 half-life): net = 320, raw = 340
    const t1 = calculateRadioactiveDecay(20, 20, 640, 20)
    expect(t1.correctedCountRateBq).toBe(320)
    expect(t1.rawCountRateBq).toBe(340)

    // At t = 40 min (2 half-lives): net = 160, raw = 180
    const t2 = calculateRadioactiveDecay(40, 20, 640, 20)
    expect(t2.correctedCountRateBq).toBe(160)
    expect(t2.rawCountRateBq).toBe(180)

    // At t = 60 min (3 half-lives): net = 80, raw = 100
    const t3 = calculateRadioactiveDecay(60, 20, 640, 20)
    expect(t3.correctedCountRateBq).toBe(80)
    expect(t3.rawCountRateBq).toBe(100)
  })

  it('correctly models penetration and absorption of alpha, beta, and gamma', () => {
    // Alpha stopped by paper
    const alphaPaper = calculateAbsorption('alpha', 'paper', 500, 20)
    expect(alphaPaper.isStopped).toBe(true)
    expect(alphaPaper.detectedCountRateBq).toBe(20) // only background detected

    // Beta penetrates paper, stopped by aluminium
    const betaPaper = calculateAbsorption('beta', 'paper', 500, 20)
    expect(betaPaper.isStopped).toBe(false)
    const betaAl = calculateAbsorption('beta', 'aluminium', 500, 20)
    expect(betaAl.isStopped).toBe(true)

    // Gamma penetrates paper and aluminium, attenuated by lead
    const gammaAl = calculateAbsorption('gamma', 'aluminium', 500, 20)
    expect(gammaAl.isStopped).toBe(false)
    const gammaLead = calculateAbsorption('gamma', 'lead', 500, 20)
    expect(gammaLead.detectedCountRateBq).toBeLessThan(120)
  })

  it('matches RadioactivityLabExtra schema in default dataset', () => {
    expect(RADIOACTIVITY_LAB_DEFAULT.type).toBe('radioactivity-lab')
    expect(RADIOACTIVITY_LAB_DEFAULT.radiations.length).toBe(3)
    expect(RADIOACTIVITY_LAB_DEFAULT.halfLifeSeconds).toBe(20)
  })
})

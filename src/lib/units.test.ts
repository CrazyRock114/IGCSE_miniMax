import { describe, expect, it } from 'vitest'
import {
  countSigFigs,
  formatSigFigs,
  formatWithUnit,
  niceAxisMax,
  niceAxisMin,
  toRadians,
  toScientific,
  toSigFigs,
  toSuperscript,
} from './units'

describe('toSigFigs', () => {
  it('rounds to the requested number of significant figures', () => {
    expect(toSigFigs(40.82, 3)).toBe(40.8)
    expect(toSigFigs(40.82, 2)).toBe(41)
    expect(toSigFigs(0.0004567, 2)).toBeCloseTo(0.00046, 10)
    expect(toSigFigs(123456, 2)).toBe(120000)
  })

  it('handles zero and negatives', () => {
    expect(toSigFigs(0, 3)).toBe(0)
    expect(toSigFigs(-40.82, 3)).toBe(-40.8)
  })

  it('rejects fewer than one significant figure', () => {
    expect(() => toSigFigs(1.23, 0)).toThrow(RangeError)
  })
})

describe('formatSigFigs', () => {
  it('keeps trailing zeros, because they carry precision', () => {
    // "2.50" claims 3 s.f.; "2.5" claims 2. Students are marked on the difference.
    expect(formatSigFigs(2.5, 3)).toBe('2.50')
    expect(formatSigFigs(9.8, 3)).toBe('9.80')
    expect(formatSigFigs(10, 4)).toBe('10.00')
  })

  it('formats typical readouts', () => {
    expect(formatSigFigs(40.8163, 3)).toBe('40.8')
    expect(formatSigFigs(2.8867, 3)).toBe('2.89')
    expect(formatSigFigs(0.5, 2)).toBe('0.50')
  })

  it('switches to scientific notation at the extremes', () => {
    expect(formatSigFigs(3e8, 3)).toBe('3.00 × 10⁸')
    expect(formatSigFigs(0.0000022, 2)).toBe('2.2 × 10⁻⁶')
  })

  it('handles zero', () => {
    expect(formatSigFigs(0, 3)).toBe('0.00')
  })
})

describe('toScientific', () => {
  it('renders a mantissa and a superscript power', () => {
    expect(toScientific(3e8, 3)).toBe('3.00 × 10⁸')
    expect(toScientific(9.5e15, 2)).toBe('9.5 × 10¹⁵')
    expect(toScientific(2.2e-18, 2)).toBe('2.2 × 10⁻¹⁸')
  })
})

describe('toSuperscript', () => {
  it('converts digits and the minus sign', () => {
    expect(toSuperscript(8)).toBe('⁸')
    expect(toSuperscript(-6)).toBe('⁻⁶')
    expect(toSuperscript(15)).toBe('¹⁵')
  })
})

describe('formatWithUnit', () => {
  it('appends the unit', () => {
    expect(formatWithUnit(9.81, 3, 'm / s²')).toBe('9.81 m / s²')
  })

  it('omits the space when there is no unit', () => {
    expect(formatWithUnit(9.81, 3, '')).toBe('9.81')
  })
})

describe('countSigFigs', () => {
  it('ignores leading zeros and counts trailing ones after a decimal point', () => {
    expect(countSigFigs('0.0450')).toBe(3)
    expect(countSigFigs('2.50')).toBe(3)
    expect(countSigFigs('0.5')).toBe(1)
  })

  it('does not count trailing zeros in a bare integer', () => {
    expect(countSigFigs('1200')).toBe(2)
    expect(countSigFigs('105')).toBe(3)
  })

  it('handles signs and whitespace', () => {
    expect(countSigFigs(' -12.30 ')).toBe(4)
  })

  it('returns 0 for values that are not numbers', () => {
    expect(countSigFigs('about 5')).toBe(0)
    expect(countSigFigs('')).toBe(0)
  })
})

describe('niceAxisMax', () => {
  it('rounds up to 1, 2, 2.5 or 5 times a power of ten', () => {
    expect(niceAxisMax(87)).toBe(100)
    expect(niceAxisMax(23)).toBe(25)
    expect(niceAxisMax(12)).toBe(20)
    expect(niceAxisMax(6)).toBe(10)
    expect(niceAxisMax(0.42)).toBe(0.5)
  })

  it('leaves values already on a boundary alone', () => {
    expect(niceAxisMax(100)).toBe(100)
    expect(niceAxisMax(20)).toBe(20)
    expect(niceAxisMax(5)).toBe(5)
  })

  it('never returns something smaller than its input', () => {
    for (const v of [1, 3, 7, 13, 44, 99, 101, 999, 1234, 0.07]) {
      expect(niceAxisMax(v)).toBeGreaterThanOrEqual(v)
    }
  })

  it('falls back to 1 for zero and invalid input', () => {
    expect(niceAxisMax(0)).toBe(1)
    expect(niceAxisMax(-5)).toBe(1)
    expect(niceAxisMax(NaN)).toBe(1)
  })
})

describe('niceAxisMin', () => {
  it('is zero for non-negative data, keeping a zero baseline', () => {
    expect(niceAxisMin(0)).toBe(0)
    expect(niceAxisMin(5)).toBe(0)
  })

  it('rounds a negative minimum down to a nice value', () => {
    expect(niceAxisMin(-25)).toBe(-25)
    expect(niceAxisMin(-23)).toBe(-25)
    expect(niceAxisMin(-87)).toBe(-100)
  })

  it('never returns something larger than its input', () => {
    for (const v of [-0.07, -3, -12, -44, -101, -999]) {
      expect(niceAxisMin(v)).toBeLessThanOrEqual(v)
    }
  })

  it('handles invalid input', () => {
    expect(niceAxisMin(NaN)).toBe(0)
  })
})

describe('toRadians', () => {
  it('converts degrees to radians', () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI, 10)
    expect(toRadians(45)).toBeCloseTo(Math.PI / 4, 10)
  })
})

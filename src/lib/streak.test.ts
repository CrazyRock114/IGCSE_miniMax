// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { recordReview, readStreak, streakLabel } from './streak'
import type { StreakRecord } from './streak'

const STORAGE_KEY = 'igcse.vocab.streak.v1'

function clearStorage(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

function getStored(): StreakRecord | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  return JSON.parse(raw) as StreakRecord
}

describe('streak', () => {
  beforeEach(() => {
    clearStorage()
  })

  afterEach(() => {
    clearStorage()
  })

  it('first review ever creates a streak of 1', () => {
    const s = recordReview('know')
    expect(s.current).toBe(1)
    expect(s.longest).toBe(1)
    expect(s.xp).toBe(10)
  })

  it('multiple reviews on the same day keep the streak flat', () => {
    recordReview('know')
    recordReview('know')
    recordReview('unsure')
    const s = recordReview('dont')
    expect(s.current).toBe(1)
    expect(s.xp).toBe(10 + 10 + 5 + 2)
  })

  it('review the next day increments the streak', () => {
    const day1 = new Date('2026-08-20T10:00:00Z')
    recordReview('know', day1)
    const day2 = new Date('2026-08-21T10:00:00Z')
    const s = recordReview('know', day2)
    expect(s.current).toBe(2)
    expect(s.longest).toBe(2)
  })

  it('skipping a day resets the streak to 1', () => {
    const day1 = new Date('2026-08-20T10:00:00Z')
    recordReview('know', day1)
    const day3 = new Date('2026-08-22T10:00:00Z')
    const s = recordReview('know', day3)
    expect(s.current).toBe(1)
    expect(s.longest).toBe(1) // only one day in this test's lifetime
  })

  it('streakLabel returns a number when current > 0', () => {
    expect(streakLabel({ current: 0, longest: 0, xp: 0, lastReviewDay: '' })).toBe('—')
    expect(streakLabel({ current: 5, longest: 5, xp: 0, lastReviewDay: '' })).toBe('5')
  })

  it('readStreak returns DEFAULT when storage is empty', () => {
    expect(readStreak()).toEqual({ current: 0, longest: 0, xp: 0, lastReviewDay: '' })
  })

  it('readStreak returns DEFAULT when storage is corrupt', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')
    expect(readStreak()).toEqual({ current: 0, longest: 0, xp: 0, lastReviewDay: '' })
  })

  it('persists to localStorage', () => {
    recordReview('know')
    const stored = getStored()
    expect(stored).not.toBeNull()
    expect(stored!.current).toBe(1)
  })
})

/**
 * React binding for the vocab store.
 *
 * Subscribes to the localStorage `storage` event so two open tabs stay in
 * sync, and exposes a `mutate` helper that wraps a store call and bumps a
 * version counter so components re-render. No external state library —
 * the store is small enough that one number is enough.
 */

import { useCallback, useEffect, useState } from 'react'
import { vocabStore } from './vocabStore'
import type { StudyStatus, WordEntry } from './vocabTypes'

export function useWordBank() {
  const [version, setVersion] = useState(0)
  const [words, setWords] = useState<WordEntry[]>(() => vocabStore.list())

  const refresh = useCallback(() => {
    setWords(vocabStore.list())
    setVersion((v) => v + 1)
  }, [])

  // Cross-tab sync: another tab writes, this one re-reads.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('igcse.vocab')) refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refresh])

  const add = useCallback(
    (termId: string, subject: string, slug: string) => {
      vocabStore.add({ termId, subject, slug })
      refresh()
    },
    [refresh]
  )

  const remove = useCallback(
    (termId: string) => {
      vocabStore.remove(termId)
      refresh()
    },
    [refresh]
  )

  const setStatus = useCallback(
    (termId: string, status: StudyStatus) => {
      vocabStore.update(termId, {
        status,
        lastReviewed: Date.now(),
        reviewCount: (words.find((w) => w.termId === termId)?.reviewCount ?? 0) + 1,
      })
      refresh()
    },
    [refresh, words]
  )

  const setNote = useCallback(
    (termId: string, note: string) => {
      vocabStore.update(termId, { note })
      refresh()
    },
    [refresh]
  )

  const ensure = useCallback(
    (terms: Array<{ termId: string; subject: string; slug: string }>) => {
      vocabStore.ensureMany(terms)
      refresh()
    },
    [refresh]
  )

  return {
    words,
    version,
    add,
    remove,
    setStatus,
    setNote,
    ensure,
    refresh,
  }
}

/** Selector helpers — pure, no React, so they can be reused in tests. */
export function groupByStatus(words: WordEntry[]): Record<StudyStatus, WordEntry[]> {
  const out: Record<StudyStatus, WordEntry[]> = { new: [], learning: [], known: [] }
  for (const w of words) out[w.status].push(w)
  return out
}

export function dueForReview(words: WordEntry[], now = Date.now()): WordEntry[] {
  // Simple heuristic: anything 'new' or 'learning' is due; known words are
  // re-introduced 7 days after their last review. A real SRS would weight by
  // review count and confidence; this is enough to make the study page useful.
  const sevenDays = 7 * 24 * 60 * 60 * 1000
  return words.filter((w) => {
    if (w.status !== 'known') return true
    return now - w.lastReviewed > sevenDays
  })
}

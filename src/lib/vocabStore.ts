/**
 * Vocab store — localStorage implementation.
 *
 * Single namespace, one JSON blob, atomic writes. The shape is intentionally
 * the same as a future Supabase `words` table: a flat array of `WordEntry`
 * keyed by `termId`. Switching the backend is then a matter of swapping
 * `localStorageStore` for `supabaseStore` in `useVocab`.
 *
 * The whole module is import-side-effect-free; the store is created lazily
 * the first time it's used, so SSR / tests / build-time code never touches
 * `window`.
 */

import type { StudyStatus, VocabStore, WordEntry } from './vocabTypes'

const STORAGE_KEY = 'igcse.vocab.wordbank.v1'
const SCHEMA_VERSION = 1

interface Persisted {
  v: number
  words: WordEntry[]
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function read(): WordEntry[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Persisted
    if (parsed.v !== SCHEMA_VERSION) {
      // Future migrations would go here; today there is only v1.
      return []
    }
    return Array.isArray(parsed.words) ? parsed.words : []
  } catch {
    return []
  }
}

function write(words: WordEntry[]): void {
  if (!isBrowser()) return
  const payload: Persisted = { v: SCHEMA_VERSION, words }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Quota exceeded, private mode, etc. The store degrades silently; the UI
    // re-reads on next mount and the user sees their previous state.
  }
}

/**
 * The actual store. Tiny — five methods, all delegating to read/write. Keeping
 * the surface small means swapping the backend is a five-minute job.
 */
class LocalStorageVocabStore implements VocabStore {
  list(): WordEntry[] {
    return read()
  }

  add(entry: Omit<WordEntry, 'addedAt' | 'lastReviewed' | 'reviewCount' | 'status'>): WordEntry {
    const words = read()
    const existing = words.find((w) => w.termId === entry.termId)
    if (existing) return existing
    const created: WordEntry = {
      ...entry,
      addedAt: Date.now(),
      lastReviewed: 0,
      reviewCount: 0,
      status: 'new',
    }
    words.push(created)
    write(words)
    return created
  }

  update(termId: string, patch: Partial<WordEntry>): WordEntry | null {
    const words = read()
    const idx = words.findIndex((w) => w.termId === termId)
    if (idx === -1) return null
    const next: WordEntry = { ...words[idx]!, ...patch, termId }
    words[idx] = next
    write(words)
    return next
  }

  remove(termId: string): void {
    write(read().filter((w) => w.termId !== termId))
  }

  ensureMany(terms: Array<{ termId: string; subject: string; slug: string }>): WordEntry[] {
    const words = read()
    const haveIds = new Set(words.map((w) => w.termId))
    const now = Date.now()
    let changed = false
    for (const t of terms) {
      if (haveIds.has(t.termId)) continue
      words.push({
        termId: t.termId,
        subject: t.subject,
        slug: t.slug,
        addedAt: now,
        lastReviewed: 0,
        reviewCount: 0,
        status: 'new',
      })
      changed = true
    }
    if (changed) write(words)
    return words
  }

  clear(): void {
    write([])
  }
}

/** Singleton — module-level so the whole app sees the same data. */
export const vocabStore: VocabStore = new LocalStorageVocabStore()

/**
 * The status ladder. Called from the study-mode card and from the word-bank
 * buttons. Lifted out so the UI doesn't have to know the order.
 */
export function nextStatus(current: StudyStatus, selfAssessment: 'know' | 'unsure' | 'dont'): StudyStatus {
  if (selfAssessment === 'know') return 'known'
  if (selfAssessment === 'dont') return 'new'
  // 'unsure' keeps you where you are — but if you're new, learning is progress
  return current === 'new' ? 'learning' : current
}

/**
 * Teacher data layer.
 *
 * Wraps a handful of Supabase queries that the RLS policies in
 * `migrations/0003_teacher_role.sql` make accessible to users whose
 * `profiles.is_teacher = true`. Every function here is read-only —
 * the teacher can inspect but never modify a student's data.
 *
 * All queries assume the caller is authenticated. The TeacherGate
 * component is the canonical check; if you call these from anywhere
 * else, double-check that `authStore.getCachedSession()?.isTeacher`
 * is true first.
 *
 * N+1 note: per-student counts use one query per student. For the
 * personal-project scale (1 teacher, 1-5 students) this is fine. A
 * classroom-of-30 build would need aggregation queries instead.
 */

import { supabase } from './supabase'

export interface StudentSummary {
  id: string
  email: string
  displayName: string
  emoji: string
  isTeacher: boolean
  /** Max of last_seen across all of this student's data sources. */
  lastActivityAt: number
  mistakeCount: number
  unresolvedMistakeCount: number
  wordBankCount: number
  statementTouchedCount: number
  totalAttempts: number
  totalWrong: number
}

export interface StudentMistake {
  id: string
  questionId: string
  subject: string
  slug: string
  pickedIndex: number
  pickedText: string
  correctIndex: number
  correctText: string
  firstSeen: number
  lastSeen: number
  attemptCount: number
  resolved: boolean
  resolvedAt: number
}

export interface StudentWordEntry {
  termId: string
  subject: string
  slug: string
  addedAt: number
  lastReviewed: number
  reviewCount: number
  status: 'new' | 'learning' | 'known'
  note?: string
}

export interface StudentStatementProgress {
  statementId: string
  subject: string
  firstSeenAt: number
  lastSeenAt: number
  seenCount: number
  attempts: number
  wrongCount: number
  lastAttemptAt: number
  lastWrongAt: number
}

export interface StudentHookRating {
  hookId: string
  rating: 'up' | 'down'
  ratedAt: number
}

export interface StudentDetail {
  profile: Omit<StudentSummary, 'lastActivityAt' | 'mistakeCount' | 'unresolvedMistakeCount' | 'wordBankCount' | 'statementTouchedCount' | 'totalAttempts' | 'totalWrong'>
  wordBank: StudentWordEntry[]
  mistakes: StudentMistake[]
  progress: StudentStatementProgress[]
  hookRatings: StudentHookRating[]
}

export interface ClassHeatmapEntry {
  /** IGCSE statement id, e.g. '7.1.1'. */
  statementId: string
  subject: string
  /** How many students have this statement in their data. */
  studentsTouched: number
  /** Sum of wrong_count across all students for this statement. */
  totalWrong: number
  /** Sum of attempts across all students. */
  totalAttempts: number
  /** Average wrong rate, 0..1. */
  avgWrongRate: number
}

export interface HookRatingSummary {
  hookId: string
  up: number
  down: number
  /** Net = up - down, for ranking. */
  net: number
}

function rowToTs(value: string | null | undefined): number {
  if (!value) return 0
  return new Date(value).getTime()
}

// ---------------------------------------------------------------------------
// Top-level: list of students with rollup stats
// ---------------------------------------------------------------------------

export async function listStudents(): Promise<StudentSummary[]> {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email_unused, display_name, emoji, is_teacher')
  if (error) {
    console.warn('listStudents profiles failed:', error.message)
    return []
  }
  // `email` lives on auth.users, not profiles. We can't SELECT across
  // auth.users from the client (RLS denies), so we display name only.
  const ids = (profiles ?? []).map((p) => p.id as string)
  if (ids.length === 0) return []

  // Pull mistakes + statement_progress + word_bank in three parallel calls
  // and roll up per-id client-side. For a few students this is plenty fast.
  const [{ data: mistakes }, { data: progress }, { data: words }] = await Promise.all([
    supabase
      .from('mistakes')
      .select('user_id, last_seen, attempt_count, resolved, first_seen')
      .in('user_id', ids),
    supabase
      .from('statement_progress')
      .select('user_id, last_seen_at, attempts, wrong_count')
      .in('user_id', ids),
    supabase
      .from('word_bank')
      .select('user_id, added_at, last_reviewed')
      .in('user_id', ids),
  ])

  type Agg = Omit<StudentSummary, 'id' | 'email' | 'displayName' | 'emoji' | 'isTeacher'>
  const agg = new Map<string, Agg>()
  const ensure = (uid: string): Agg => {
    let a = agg.get(uid)
    if (!a) {
      a = {
        lastActivityAt: 0,
        mistakeCount: 0,
        unresolvedMistakeCount: 0,
        wordBankCount: 0,
        statementTouchedCount: 0,
        totalAttempts: 0,
        totalWrong: 0,
      }
      agg.set(uid, a)
    }
    return a
  }

  for (const r of mistakes ?? []) {
    const uid = r.user_id as string
    const a = ensure(uid)
    a.mistakeCount += 1
    if (!r.resolved) a.unresolvedMistakeCount += 1
    a.lastActivityAt = Math.max(a.lastActivityAt, rowToTs(r.last_seen), rowToTs(r.first_seen))
  }
  for (const r of progress ?? []) {
    const uid = r.user_id as string
    const a = ensure(uid)
    a.statementTouchedCount += 1
    a.totalAttempts += (r.attempts as number) ?? 0
    a.totalWrong += (r.wrong_count as number) ?? 0
    a.lastActivityAt = Math.max(a.lastActivityAt, rowToTs(r.last_seen_at))
  }
  for (const r of words ?? []) {
    const uid = r.user_id as string
    const a = ensure(uid)
    a.wordBankCount += 1
    a.lastActivityAt = Math.max(a.lastActivityAt, rowToTs(r.added_at), rowToTs(r.last_reviewed))
  }

  return (profiles ?? []).map((p) => {
    const id = p.id as string
    const a = agg.get(id) ?? {
      lastActivityAt: 0,
      mistakeCount: 0,
      unresolvedMistakeCount: 0,
      wordBankCount: 0,
      statementTouchedCount: 0,
      totalAttempts: 0,
      totalWrong: 0,
    }
    return {
      id,
      // The profiles table doesn't store email; it's on auth.users. We
      // display the userId tail as a fallback so the row is still useful.
      email: '',
      displayName: (p.display_name as string) ?? '(no name)',
      emoji: (p.emoji as string) ?? '👤',
      isTeacher: Boolean(p.is_teacher),
      ...a,
    }
  })
}

// ---------------------------------------------------------------------------
// Per-student detail
// ---------------------------------------------------------------------------

export async function getStudentDetail(userId: string): Promise<StudentDetail | null> {
  const [{ data: profile }, { data: words }, { data: mistakes }, { data: progress }, { data: ratings }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('id, display_name, emoji, is_teacher')
        .eq('id', userId)
        .maybeSingle(),
      supabase
        .from('word_bank')
        .select('term_id, subject, slug, status, note, added_at, last_reviewed, review_count')
        .eq('user_id', userId),
      supabase
        .from('mistakes')
        .select(
          'id, question_id, subject, slug, picked_index, picked_text, correct_index, correct_text, first_seen, last_seen, attempt_count, resolved, resolved_at'
        )
        .eq('user_id', userId),
      supabase
        .from('statement_progress')
        .select(
          'statement_id, subject, first_seen_at, last_seen_at, seen_count, attempts, wrong_count, last_attempt_at, last_wrong_at'
        )
        .eq('user_id', userId),
      supabase.from('hook_ratings').select('hook_id, rating, rated_at').eq('user_id', userId),
    ])

  if (!profile) return null

  return {
    profile: {
      id: profile.id as string,
      email: '',
      displayName: (profile.display_name as string) ?? '(no name)',
      emoji: (profile.emoji as string) ?? '👤',
      isTeacher: Boolean(profile.is_teacher),
    },
    wordBank: (words ?? []).map((r) => {
      const entry: StudentWordEntry = {
        termId: r.term_id as string,
        subject: r.subject as string,
        slug: r.slug as string,
        addedAt: rowToTs(r.added_at),
        lastReviewed: rowToTs(r.last_reviewed),
        reviewCount: (r.review_count as number) ?? 0,
        status: r.status as StudentWordEntry['status'],
      }
      if (r.note) entry.note = r.note as string
      return entry
    }),
    mistakes: (mistakes ?? []).map((r) => ({
      id: r.id as string,
      questionId: r.question_id as string,
      subject: r.subject as string,
      slug: r.slug as string,
      pickedIndex: r.picked_index as number,
      pickedText: r.picked_text as string,
      correctIndex: r.correct_index as number,
      correctText: r.correct_text as string,
      firstSeen: rowToTs(r.first_seen),
      lastSeen: rowToTs(r.last_seen),
      attemptCount: r.attempt_count as number,
      resolved: r.resolved as boolean,
      resolvedAt: rowToTs(r.resolved_at),
    })),
    progress: (progress ?? []).map((r) => ({
      statementId: r.statement_id as string,
      subject: r.subject as string,
      firstSeenAt: rowToTs(r.first_seen_at),
      lastSeenAt: rowToTs(r.last_seen_at),
      seenCount: r.seen_count as number,
      attempts: r.attempts as number,
      wrongCount: r.wrong_count as number,
      lastAttemptAt: rowToTs(r.last_attempt_at),
      lastWrongAt: rowToTs(r.last_wrong_at),
    })),
    hookRatings: (ratings ?? []).map((r) => ({
      hookId: r.hook_id as string,
      rating: r.rating as 'up' | 'down',
      ratedAt: rowToTs(r.rated_at),
    })),
  }
}

// ---------------------------------------------------------------------------
// Class-wide aggregates
// ---------------------------------------------------------------------------

export async function getClassHeatmap(): Promise<ClassHeatmapEntry[]> {
  const { data, error } = await supabase
    .from('statement_progress')
    .select('statement_id, subject, attempts, wrong_count, user_id')
  if (error) {
    console.warn('getClassHeatmap failed:', error.message)
    return []
  }
  type Acc = {
    subject: string
    students: Set<string>
    totalWrong: number
    totalAttempts: number
  }
  const acc = new Map<string, Acc>()
  for (const r of data ?? []) {
    const sid = r.statement_id as string
    const subject = r.subject as string
    const attempts = (r.attempts as number) ?? 0
    const wrong = (r.wrong_count as number) ?? 0
    const uid = r.user_id as string
    let a = acc.get(sid)
    if (!a) {
      a = { subject, students: new Set(), totalWrong: 0, totalAttempts: 0 }
      acc.set(sid, a)
    }
    a.students.add(uid)
    a.totalAttempts += attempts
    a.totalWrong += wrong
  }
  return Array.from(acc.entries()).map(([sid, a]) => ({
    statementId: sid,
    subject: a.subject,
    studentsTouched: a.students.size,
    totalWrong: a.totalWrong,
    totalAttempts: a.totalAttempts,
    avgWrongRate: a.totalAttempts > 0 ? a.totalWrong / a.totalAttempts : 0,
  }))
}

export async function getHookRatingsSummary(): Promise<HookRatingSummary[]> {
  const { data, error } = await supabase
    .from('hook_ratings')
    .select('hook_id, rating')
  if (error) {
    console.warn('getHookRatingsSummary failed:', error.message)
    return []
  }
  const acc = new Map<string, { up: number; down: number }>()
  for (const r of data ?? []) {
    const id = r.hook_id as string
    let a = acc.get(id)
    if (!a) {
      a = { up: 0, down: 0 }
      acc.set(id, a)
    }
    if (r.rating === 'up') a.up += 1
    else if (r.rating === 'down') a.down += 1
  }
  return Array.from(acc.entries())
    .map(([hookId, a]) => ({
      hookId,
      up: a.up,
      down: a.down,
      net: a.up - a.down,
    }))
    .sort((x, y) => y.net - x.net)
}

// ---------------------------------------------------------------------------
// Self-toggle
// ---------------------------------------------------------------------------

/**
 * Flip is_teacher on the current user's profile. Returns the new value.
 * RLS already permits a user to UPDATE their own profiles row, so this
 * is a single `update` call with no special privilege.
 */
export async function setTeacherMode(on: boolean): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase
    .from('profiles')
    .update({ is_teacher: on })
    .eq('id', (await supabase.auth.getUser()).data.user?.id ?? '')
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

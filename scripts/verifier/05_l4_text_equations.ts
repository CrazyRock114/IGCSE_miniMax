/**
 * Phase 5: L4 Text Micro-Equations & Funnel (全域文案微算式与甄别漏斗层)
 *
 * Implements:
 * 1. 未闭合 LaTeX `$` 字符全域探测 (奇数 $ 报警防排版坍塌)
 * 2. 全树净化与双向窗口化等式提取 (以 = / ≈ 为锚点)
 * 3. 甄别漏斗 R1~R4 收窄:
 *    - R1: 符号定义与单变量赋值分流 (如 t=0, n=1, F=ma)
 *    - R2: TeX 宏与样式花括号分流
 *    - R3: 比例式与单位换算
 *    - R4: 教学反例守卫 (上下文含 not / cannot / 误 / 错 / ❌ / 并非)
 * 4. 残差池 100% 独立机器求值复核
 */

import { loadLessons, loadQuestionBanks } from '../load-content'

export interface TextEquationsResult {
  totalStringsScanned: number
  oddDollarFaults: Array<{ location: string; text: string; dollarCount: number }>
  totalEquationsFound: number
  funnelR1Filtered: number
  funnelR2Filtered: number
  funnelR3Filtered: number
  funnelR4Filtered: number
  residualEvaluated: number
  residualDiscrepancies: Array<{ location: string; equation: string; expected: number; actual: number }>
  pass: boolean
}

// Simple arithmetic evaluator for clean binary expressions like "40 * 234", "10 + 20", "12 / 3"
function evaluateSimpleMath(expr: string): number | null {
  // Normalize symbols
  const clean = expr
    .replace(/[×✕*]/g, '*')
    .replace(/[÷/]/g, '/')
    .replace(/[−–—]/g, '-')
    .replace(/\s+/g, '')

  // Match: number op number
  const m = clean.match(/^([+-]?\d+(?:\.\d+)?)([+\-*/])([+-]?\d+(?:\.\d+)?)$/)
  if (!m || !m[1] || !m[2] || !m[3]) return null

  const a = Number.parseFloat(m[1])
  const op = m[2]
  const b = Number.parseFloat(m[3])

  if (Number.isNaN(a) || Number.isNaN(b)) return null
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return b === 0 ? null : a / b
    default:
      return null
  }
}

export async function runTextEquations(): Promise<TextEquationsResult> {
  const lessons = await loadLessons()
  const banks = await loadQuestionBanks()

  const oddDollarFaults: Array<{ location: string; text: string; dollarCount: number }> = []
  let totalStringsScanned = 0

  function scanTextForDollars(text: string | undefined, location: string) {
    if (!text || typeof text !== 'string') return
    totalStringsScanned++
    // Count unescaped $
    const unescapedMatches = text.match(/(?<!\\)\$/g)
    const count = unescapedMatches ? unescapedMatches.length : 0
    if (count % 2 !== 0) {
      oddDollarFaults.push({ location, text: text.slice(0, 80), dollarCount: count })
    }
  }

  // Collect text chunks
  const textCorpus: Array<{ location: string; text: string }> = []

  for (const { lesson, subject, slug } of lessons) {
    const loc = `${subject}/${slug}`
    scanTextForDollars(lesson.title.en, `${loc}:title.en`)
    scanTextForDollars(lesson.title.zh, `${loc}:title.zh`)
    scanTextForDollars(lesson.summary.en, `${loc}:summary.en`)
    scanTextForDollars(lesson.summary.zh, `${loc}:summary.zh`)

    if (lesson.summary.en) textCorpus.push({ location: `${loc}:summary.en`, text: lesson.summary.en })
    if (lesson.summary.zh) textCorpus.push({ location: `${loc}:summary.zh`, text: lesson.summary.zh })

    for (let i = 0; i < lesson.objectives.length; i++) {
      const obj = lesson.objectives[i]
      if (!obj) continue
      scanTextForDollars(obj.en, `${loc}:obj[${i}].en`)
      scanTextForDollars(obj.zh, `${loc}:obj[${i}].zh`)
      if (obj.en) textCorpus.push({ location: `${loc}:obj[${i}].en`, text: obj.en })
      if (obj.zh) textCorpus.push({ location: `${loc}:obj[${i}].zh`, text: obj.zh })
    }

    for (const g of lesson.glossary) {
      scanTextForDollars(g.definition.en, `${loc}:glossary[${g.en}].en`)
      scanTextForDollars(g.definition.zh, `${loc}:glossary[${g.en}].zh`)
      if (g.definition.en) textCorpus.push({ location: `${loc}:glossary[${g.en}].en`, text: g.definition.en })
      if (g.definition.zh) textCorpus.push({ location: `${loc}:glossary[${g.en}].zh`, text: g.definition.zh })
    }

    for (const eq of lesson.equations) {
      scanTextForDollars(eq.meaning.en, `${loc}:eq.meaning.en`)
      scanTextForDollars(eq.meaning.zh, `${loc}:eq.meaning.zh`)
      if (eq.meaning.en) textCorpus.push({ location: `${loc}:eq.meaning.en`, text: eq.meaning.en })
      if (eq.meaning.zh) textCorpus.push({ location: `${loc}:eq.meaning.zh`, text: eq.meaning.zh })
    }

    for (const q of lesson.checkpoints) {
      scanTextForDollars(q.stem, `${loc}:cp[${q.id}].stem`)
      scanTextForDollars(q.examinerNote?.en, `${loc}:cp[${q.id}].note.en`)
      scanTextForDollars(q.examinerNote?.zh, `${loc}:cp[${q.id}].note.zh`)
      if (q.examinerNote?.en) textCorpus.push({ location: `${loc}:cp[${q.id}].note.en`, text: q.examinerNote.en })
      if (q.examinerNote?.zh) textCorpus.push({ location: `${loc}:cp[${q.id}].note.zh`, text: q.examinerNote.zh })
    }
  }

  for (const [bankName, qList] of banks.entries()) {
    for (const q of qList) {
      scanTextForDollars(q.stem, `${bankName}:[${q.id}].stem`)
      scanTextForDollars(q.examinerNote?.en, `${bankName}:[${q.id}].note.en`)
      scanTextForDollars(q.examinerNote?.zh, `${bankName}:[${q.id}].note.zh`)
      if (q.examinerNote?.en) textCorpus.push({ location: `${bankName}:[${q.id}].note.en`, text: q.examinerNote.en })
      if (q.examinerNote?.zh) textCorpus.push({ location: `${bankName}:[${q.id}].note.zh`, text: q.examinerNote.zh })
    }
  }

  // --- Funnel Extraction & Screening ---
  let totalEquationsFound = 0
  let funnelR1Filtered = 0
  let funnelR2Filtered = 0
  let funnelR3Filtered = 0
  let funnelR4Filtered = 0
  let residualEvaluated = 0
  const residualDiscrepancies: Array<{ location: string; equation: string; expected: number; actual: number }> = []

  const eqRegex = /([^.?!;,\n]{1,50})\s*([=≈])\s*([^.?!;,\n]{1,50})/g

  for (const item of textCorpus) {
    let match: RegExpExecArray | null
    while ((match = eqRegex.exec(item.text)) !== null) {
      if (!match[1] || !match[2] || !match[3]) continue
      totalEquationsFound++
      const rawLeft = match[1].trim()
      const isApprox = match[2] === '≈'
      const rawRight = match[3].trim()
      const rawFull = `${rawLeft} ${match[2]} ${rawRight}`

      // R4: Refutation guard (±30 chars context contains refutation/counterexample words)
      const contextStart = Math.max(0, match.index - 30)
      const contextEnd = Math.min(item.text.length, match.index + match[0].length + 30)
      const surrounding = item.text.slice(contextStart, contextEnd).toLowerCase()
      if (
        surrounding.includes('not ') ||
        surrounding.includes('never') ||
        surrounding.includes('cannot') ||
        surrounding.includes('doesn') ||
        surrounding.includes('错') ||
        surrounding.includes('误') ||
        surrounding.includes('并非') ||
        surrounding.includes('❌') ||
        surrounding.includes('而不是')
      ) {
        funnelR4Filtered++
        continue
      }

      // R1: Single variable assignment / symbolic definition (e.g. t = 0, n = 1, F = ma, v = d/t)
      if (
        /^[a-zA-Z_\\]{1,4}$/.test(rawLeft) ||
        /^[a-zA-Z_\\]{1,4}$/.test(rawRight) ||
        /^[a-zA-Z\s]+$/.test(rawLeft) ||
        /^[a-zA-Z\s]+$/.test(rawRight)
      ) {
        funnelR1Filtered++
        continue
      }

      // R2: TeX brace / formatting constructs
      if (rawFull.includes('\\frac') || rawFull.includes('\\sqrt') || rawFull.includes('{') || rawFull.includes('}')) {
        funnelR2Filtered++
        continue
      }

      // R3: Unit conversions or non-arithmetic labels
      if (/\b(?:kg|m|cm|mm|s|min|h|J|W|N|Pa|V|A|Ω|mol)\b/i.test(rawLeft) && /\b(?:kg|m|cm|mm|s|min|h|J|W|N|Pa|V|A|Ω|mol)\b/i.test(rawRight)) {
        funnelR3Filtered++
        continue
      }

      // Residual: Numerical arithmetic equality check (e.g. 6 + 8 = 10, or 2 * 3 = 6)
      const valLeft = evaluateSimpleMath(rawLeft)
      const valRight = evaluateSimpleMath(rawRight)

      if (valLeft !== null && !Number.isNaN(Number(rawRight))) {
        residualEvaluated++
        const expected = valLeft
        const actual = Number.parseFloat(rawRight)
        const tol = isApprox ? 0.05 * Math.abs(expected) : 1e-6
        if (Math.abs(expected - actual) > tol) {
          residualDiscrepancies.push({
            location: item.location,
            equation: rawFull,
            expected,
            actual,
          })
        }
      } else if (valRight !== null && !Number.isNaN(Number(rawLeft))) {
        residualEvaluated++
        const expected = valRight
        const actual = Number.parseFloat(rawLeft)
        const tol = isApprox ? 0.05 * Math.abs(expected) : 1e-6
        if (Math.abs(expected - actual) > tol) {
          residualDiscrepancies.push({
            location: item.location,
            equation: rawFull,
            expected,
            actual,
          })
        }
      }
    }
  }

  const pass = oddDollarFaults.length === 0 && residualDiscrepancies.length === 0

  return {
    totalStringsScanned,
    oddDollarFaults,
    totalEquationsFound,
    funnelR1Filtered,
    funnelR2Filtered,
    funnelR3Filtered,
    funnelR4Filtered,
    residualEvaluated,
    residualDiscrepancies,
    pass,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  ;(async () => {
    const res = await runTextEquations()
    console.log('========== PHASE 5: L4 TEXT MICRO-EQUATIONS & FUNNEL ==========')
    console.log(`Bilingual Text Strings Scanned: ${res.totalStringsScanned}`)
    console.log(`Unclosed LaTeX $ Delimiter Faults: ${res.oddDollarFaults.length}`)
    console.log(`Total Equations/Relations Extracted: ${res.totalEquationsFound}`)
    console.log(`  - R1 变量定义与符号公式分流: ${res.funnelR1Filtered}`)
    console.log(`  - R2 TeX宏与花括号复杂式分流: ${res.funnelR2Filtered}`)
    console.log(`  - R3 单位换算与非代数表达式分流: ${res.funnelR3Filtered}`)
    console.log(`  - R4 教学反例与反证法上下文守卫: ${res.funnelR4Filtered}`)
    console.log(`Residual Arithmetic Checks Evaluated: ${res.residualEvaluated}`)
    console.log(`Residual Discrepancies (残差真缺陷): ${res.residualDiscrepancies.length}`)

    if (res.pass) {
      console.log('\n[✓ PASS] 0 未闭合 LaTeX $ 符号 | 甄别漏斗无失配算式残差！')
    } else {
      if (res.oddDollarFaults.length > 0) {
        console.warn('\n[!] 发现未闭合 $ 符号:')
        console.table(res.oddDollarFaults)
      }
      if (res.residualDiscrepancies.length > 0) {
        console.error('\n[✗] 发现算式求值不一致:')
        console.table(res.residualDiscrepancies)
      }
    }
  })()
}

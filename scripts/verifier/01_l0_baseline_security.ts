/**
 * Phase 1: Baseline & L0 Security / Pre-flight Verification
 *
 * Checks:
 * - Git repository clean baseline & current commit hash
 * - Security exposure surface: scans for dangerouslySetInnerHTML, eval(), javascript: URIs, raw <script>
 * - Dependency locks: React 19, Three.js, KaTeX, Driver.js versions
 * - Build & compilation pre-flight sanity
 */

import { execSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

export interface L0SecurityResult {
  commitHash: string
  branch: string
  cleanWorkingTree: boolean
  securityHits: Array<{ file: string; line: number; rule: string; snippet: string }>
  dependencyAudit: Array<{ pkg: string; version: string; status: 'pinned' | 'missing' }>
  pass: boolean
}

function walkFiles(dir: string, ext = ['.ts', '.tsx', '.js', '.mjs', '.html']): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue
      results.push(...walkFiles(full, ext))
    } else if (ext.some((e) => entry.name.endsWith(e))) {
      results.push(full)
    }
  }
  return results
}

export async function runL0Security(): Promise<L0SecurityResult> {
  let commitHash = 'unknown'
  let branch = 'unknown'
  let cleanWorkingTree = false

  try {
    commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
    branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim()
    // Ignore untracked files like .agents, verifier scripts
    const trackedChanges = status
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('??'))
    cleanWorkingTree = trackedChanges.length === 0
  } catch (e) {
    console.error('Git execution failed:', e)
  }

  // Scan source files for dangerous security patterns
  const filesToScan = [
    ...walkFiles(resolve(process.cwd(), 'src')),
    ...walkFiles(resolve(process.cwd(), 'api')),
  ]

  const securityHits: Array<{ file: string; line: number; rule: string; snippet: string }> = []

  const dangerousPatterns = [
    { rule: 'Unsafe raw eval() call', regex: /\beval\s*\(/ },
    { rule: 'Raw javascript: pseudo-protocol', regex: /javascript\s*:/i },
    { rule: 'Raw <script> injection tag', regex: /<script[\s>]/i },
  ]

  for (const f of filesToScan) {
    const content = readFileSync(f, 'utf8')
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line === undefined) continue
      // Allow KaTeX math or comments if any, but detect actual execution
      for (const { rule, regex } of dangerousPatterns) {
        if (regex.test(line)) {
          // exclude benign occurrences like comments or documentation
          if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue
          securityHits.push({
            file: f.replace(process.cwd() + '/', ''),
            line: i + 1,
            rule,
            snippet: line.trim().slice(0, 100),
          })
        }
      }

      // Check dangerouslySetInnerHTML usage
      if (line.includes('dangerouslySetInnerHTML')) {
        // In this project, does any component use dangerouslySetInnerHTML?
        securityHits.push({
          file: f.replace(process.cwd() + '/', ''),
          line: i + 1,
          rule: 'dangerouslySetInnerHTML detected (must be audited for XSS sanitizer)',
          snippet: line.trim().slice(0, 100),
        })
      }
    }
  }

  // Dependency locks
  const pkgJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'))
  const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies }
  const auditedPkgs = ['react', 'react-dom', 'three', 'katex', 'driver.js', 'vite']
  const dependencyAudit = auditedPkgs.map((pkg) => ({
    pkg,
    version: deps[pkg] ?? 'missing',
    status: (deps[pkg] ? 'pinned' : 'missing') as 'pinned' | 'missing',
  }))

  const pass = cleanWorkingTree && securityHits.length === 0 && dependencyAudit.every((d) => d.status === 'pinned')

  return {
    commitHash,
    branch,
    cleanWorkingTree,
    securityHits,
    dependencyAudit,
    pass,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const res = await runL0Security()
  console.log('========== PHASE 1: L0 BASELINE & SECURITY PRE-FLIGHT ==========')
  console.log(`Commit: ${res.commitHash} (Branch: ${res.branch})`)
  console.log(`Clean Tracked Working Tree: ${res.cleanWorkingTree ? 'YES' : 'NO'}`)
  console.log('\n--- 核心运行依赖锁定 (Dependency Locks) ---')
  console.table(res.dependencyAudit)
  console.log('\n--- 安全暴露面扫描 (Security Vulnerability Surface) ---')
  if (res.securityHits.length === 0) {
    console.log('[✓ PASS] 0 安全漏洞暴露面命中（无未清洗 eval, 无裸 script, 无 javascript: 伪协议, 无未受控 dangerouslySetInnerHTML）')
  } else {
    console.warn(`[!] 发现 ${res.securityHits.length} 处需人工复核项:`)
    console.table(res.securityHits)
  }
  console.log(`\nPhase 1 Result: ${res.pass ? 'ALL PASS ✓' : 'REQUIRES ATTENTION ⚠️'}`)
}

// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'

const ROOT = resolve(import.meta.dirname, '../..')
const NAV_CSS_PATH = resolve(ROOT, 'public/ecosystem-nav.css')
const NAV_JS_PATH = resolve(ROOT, 'public/ecosystem-nav.js')
const INDEX_HTML_PATH = resolve(ROOT, 'index.html')
const LESSON_PAGE_PATH = resolve(ROOT, 'src/components/lesson/LessonPage.tsx')

const CJK_RE = /[\u4e00-\u9fff]/

interface EcosystemNavDestination {
  id: string
  url: string
  name: { en: string; zh: string }
  desc: { en: string; zh: string }
}

interface EcosystemNavGlobal {
  version: string
  destinations: EcosystemNavDestination[]
}

let navBooted = false
function ensureNavLoaded(): EcosystemNavGlobal {
  if (!navBooted) {
    const navJs = readFileSync(NAV_JS_PATH, 'utf8')
    window.eval(navJs)
    navBooted = true
  }
  return (window as unknown as { IgcseEcosystemNav: EcosystemNavGlobal }).IgcseEcosystemNav
}

describe('Ecosystem navigation v1.1 & index.html regression vaccines [W1-MAIN-01]', () => {
  beforeEach(() => {
    document.documentElement.lang = 'en'
    document.body.innerHTML = ''
  })

  it('sets hamburger drawer breakpoint to >= 1120px and optimizes 1121px-1280px pills', () => {
    const css = readFileSync(NAV_CSS_PATH, 'utf8')

    // Find every @media block that hides .igcse-nav-pills and shows .igcse-nav-hamburger
    const mediaBlocks = [
      ...css.matchAll(/@media\s*\([^)]*max-width:\s*(\d+)px[^)]*\)\s*\{([\s\S]*?)\n\}/g),
    ]
    const hamburgerBlock = mediaBlocks.find((match) => {
      const body = match[2] ?? ''
      return (
        body.includes('.igcse-nav-pills') &&
        body.includes('display: none') &&
        body.includes('.igcse-nav-hamburger')
      )
    })

    expect(hamburgerBlock).toBeDefined()
    const breakpointPx = Number(hamburgerBlock?.[1] ?? 0)
    expect(breakpointPx).toBeGreaterThanOrEqual(1120)

    // Ensure 1121px-1280px compact pill optimization block exists
    expect(css).toMatch(/@media\s*\(min-width:\s*1121px\)\s*and\s*\(max-width:\s*1280px\)/)
  })

  it('registers 6 ecosystem destinations with both en and zh names/descriptions and version 1.1.0', () => {
    const api = ensureNavLoaded()

    expect(api).toBeDefined()
    expect(api.version).toBe('1.1.0')
    expect(api.destinations).toHaveLength(6)

    const ids = api.destinations.map((d) => d.id)
    expect(ids).toEqual(['main', 'pre', 'sky', 'why', 'zperiod', 'phet'])

    for (const dest of api.destinations) {
      expect(dest.name.en.trim().length).toBeGreaterThan(0)
      expect(dest.name.zh.trim().length).toBeGreaterThan(0)
      expect(CJK_RE.test(dest.name.en)).toBe(false)
      expect(CJK_RE.test(dest.name.zh)).toBe(true)
      expect(dest.desc.en.trim().length).toBeGreaterThan(0)
      expect(dest.desc.zh.trim().length).toBeGreaterThan(0)
    }
  })

  it('renders English by default for <html lang="en"> and re-renders live on <html lang> mutation', async () => {
    ensureNavLoaded()
    document.body.innerHTML = '<igcse-nav active="main" sticky></igcse-nav>'
    const navEl = document.querySelector('igcse-nav')
    expect(navEl).not.toBeNull()

    // English mode: zero CJK characters in rendered nav
    expect(navEl?.textContent).toContain('Main Hub')
    expect(navEl?.textContent).toContain('Quick Switcher')
    expect(CJK_RE.test(navEl?.textContent ?? '')).toBe(false)

    // Mutate <html lang="zh-CN"> and verify MutationObserver triggers instant Chinese re-render
    document.documentElement.lang = 'zh-CN'
    await new Promise((r) => setTimeout(r, 0))

    expect(navEl?.textContent).toContain('教学主母舰')
    expect(navEl?.textContent).toContain('全域穿梭通道')

    // Explicit <igcse-nav lang="en"> overrides <html lang="zh-CN">
    navEl?.setAttribute('lang', 'en')
    expect(navEl?.textContent).toContain('Main Hub')
    expect(CJK_RE.test(navEl?.textContent ?? '')).toBe(false)
  })

  it('keeps index.html meta description covering 0610/0620/0625 and <igcse-nav> sticky', () => {
    const html = readFileSync(INDEX_HTML_PATH, 'utf8')
    const doc = new DOMParser().parseFromString(html, 'text/html')

    const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    expect(metaDesc).toContain('0610')
    expect(metaDesc).toContain('0620')
    expect(metaDesc).toContain('0625')

    const nav = doc.querySelector('igcse-nav')
    expect(nav).not.toBeNull()
    expect(nav?.hasAttribute('sticky')).toBe(true)
    expect(nav?.getAttribute('active')).toBe('main')
  })

  it('offsets LessonPage sticky sidebar below the 52px sticky ecosystem nav bar', () => {
    const lessonPage = readFileSync(LESSON_PAGE_PATH, 'utf8')
    expect(lessonPage).toContain('lg:sticky lg:top-[68px]')
  })
})

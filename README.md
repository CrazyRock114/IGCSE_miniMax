# IGCSE Science — Interactive Bilingual Course

Interactive, syllabus-mapped courses for Cambridge IGCSE, 2026–2028 cycle.
English-primary with Chinese scaffolding, for students in international schools.

| Subject | Statements | Coverage |
| --- | --- | --- |
| Physics 0625 | 324 | **62%** — 17 lessons |
| Chemistry 0620 | 231 | **61%** — 16 lessons |
| Biology 0610 | 389 | 8% — 4 lessons |

## What makes this different

Every interaction is anchored to a specific syllabus statement. The home page is the
0625 statement map with coverage marked on it, not a gallery of simulations — so you
can always answer "which parts of the exam does this actually teach?"

Three strands, all required:

1. **Learn** — interactive simulations with bilingual narration, tiered Core / Extended
2. **Practise** — exam-style questions with mark schemes and command-word coaching
3. **Investigate** — Paper 5/6 practical skills, which are 20% of the grade *(planned)*

## Quick start

```bash
npm install
```

```bash
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on :5173 |
| `npm run build` | Runs the content checks, then type-checks and builds |
| `npm run test` | Vitest — simulation kernels and utilities |
| `npm run typecheck` | `tsc -b --force` — both projects, including tests |
| `npm run lint` | ESLint, including the no-Chinese-in-components rule |
| `npm run check:syllabus` | Coverage report; fails on references to statements that don't exist |
| `npm run check:content` | Integrity checks: kernel wiring, mark schemes, narration targets, prose in maths |

`npm run check:syllabus -- --min 80` additionally fails below 80% coverage — useful
once the content build-out is under way.

## Architecture

The rule everything follows from: **course copy is data, never JSX.**

A lesson is a `Lesson` object in `src/content/lessons/<slug>/lesson.ts`. One generic
renderer (`components/lesson/LessonPage.tsx`) draws every lesson in the course. Adding
a lesson means adding a directory — there is no central catalogue to update, because
`lib/registry.ts` discovers content with `import.meta.glob`.

```
src/
├─ content/                    Content as typed data
│  ├─ types.ts                 Lesson, SimSpec, Question, NarrationScript, Bilingual
│  ├─ syllabus/                index.ts registry + one file per subject
│  ├─ lessons/<subject>/<slug>/
│  │  ├─ lesson.ts             Manifest: bilingual copy, syllabus refs, sim config
│  │  ├─ kernel.ts             Pure physics — no DOM, no React
│  │  ├─ kernel.test.ts        Required. Proves the graph matches the equations.
│  │  └─ narration.ts          EN/ZH script; lines can drive the simulation
│  └─ questions/               Exam-style banks with mark schemes
├─ sim/                        Reusable simulation primitives (plot2d today)
├─ components/                 Generic renderers — i18n, lesson, narration, assessment
└─ lib/                        i18n, units and significant figures, registry
```

### Why it is built this way

The reference projects this course learned from (mathviz, ChemAIForge and the
`whaty.org` family) proved the interaction model but hit two walls we deliberately
avoid:

- **No monolithic registry.** Their `catalog.ts` reached ~100 KB and every new
  experiment had to be registered in several places. We use filesystem discovery.
- **No copy inside components.** Their lesson text was hard-coded Chinese inside each
  `.tsx`, which made the content untranslatable after the fact. Here an ESLint rule
  rejects CJK literals in `src/components/**` and `src/sim/**`.

### Bilingual model

English is required by the `Bilingual` type; Chinese is optional. Chinese never
replaces English — a student who read only the Chinese would not be prepared to sit
the paper.

Three assist levels, persisted to `localStorage`:

| Level | Behaviour |
| --- | --- |
| `off` | English only. Exam-condition mode. |
| `hover` | English, Chinese on hover. Default. |
| `inline` | English with Chinese alongside. |

**Question stems are English only, by design** — students must practise reading exam
questions in the language of the exam. Chinese support lives in the command-word
hints and examiner's notes, which explain *how to answer*, not *what is asked*.

### Simulation kernels

Kernels are pure functions: parameters in, series and readouts out. That makes the
physics unit-testable on its own, and lets tests assert that the numbers on the graph
are the numbers in the equations. `kernel.test.ts` for `1-2-motion`, for example,
integrates the speed–time curve and checks the area equals the reported distance —
the exact claim the lesson makes to the student (0625.1.2.7).

## Compliance

- Syllabus statement **numbering** and Core/Supplement **tiering** are factual
  references. All statement labels, lesson text and questions are **original to this
  course** — the awarding body's wording is not reproduced.
- The Cambridge IGCSE syllabus is © Cambridge University Press & Assessment. This
  project is **not affiliated with or endorsed by** Cambridge International.
- Past papers are copyrighted. Questions here are original and match only in *style
  and difficulty*.

See [NOTICE](NOTICE) for third-party attributions.

## Simulation primitives

A lesson picks a primitive and configures it with data; it does not ship its own
renderer. Twelve of the planned fifteen are built:

| Primitive | Interaction | Used by |
| --- | --- | --- |
| `plot2d` | Sliders drive graphs on round, exam-style axes; signed axes for I–V curves | `1-2-motion`, `4-2-4-resistance` |
| `raytrace` | **Drag the incident ray**; refraction vanishes past the critical angle | `3-2-2-refraction` |
| `beam` | Move a mass without changing it — the beam still tips | `1-5-2-moments` |
| `particles` | **Animated.** Piston compresses the gas; pressure rises | `2-1-gas-particles` |
| `waves` | **Animated.** Medium and displacement graph side by side | `3-1-waves` |
| `circuit` | **Animated.** Charge drifts round the loop; dot density is current | `4-3-2-series-parallel` |
| `field2d` | Field lines traced by integrating the real field, so spacing means strength | `4-1-magnetism` |
| `atom` | Electron shell diagrams; isotopes and ions from one control set | `0620/2-2-atomic-structure` |
| `molecule` | Displayed formulae built by valence, so the formula is counted off the drawing | `0620/11-1-homologous-series`, `11-5-alkenes`, `11-8-polymers` |
| `bonding` | Dot-and-cross diagrams; the same control runs electron transfer and electron sharing | `0620/2-4-bonding` |
| `ladder` | A list with a threshold line across it; the ordering arrow and every label are data | `0620/9-4-reactivity-series`, `9-6-extraction`, `8-2-groups`, `7-3-salts`, `10-1-water` |
| `lattice` | Rows of atoms with the upper layers pushed across the lower ones | `0620/9-3-alloys` |
| `periodictable` | Periods 1–4 as a grid, coloured by category; sliding Z walks the highlight | `0620/8-1-periodic-table` |
| `vectors`, `apparatus`, `graphpaper` | planned | — |

Animation is driven by advancing one named parameter from a clock, so kernels stay
pure functions and remain testable at any chosen instant.

## Status

**372 of 944 statements taught (39%)** across 36 lessons, with 922 tests passing.

Physics 0625 — 62%, by topic:

| Topic | Taught |
| --- | --- |
| 1 Motion, forces and energy | 33 / 74 |
| 2 Thermal physics | 42 / 45 |
| 3 Waves | 37 / 56 |
| 4 Electricity and magnetism | 39 / 88 |
| 5 Nuclear physics | 20 / 31 |
| 6 Space physics | **30 / 30** |

- ✅ Full 0625 statement map (324 statements, 6 topics)
- ✅ Bilingual layer, content registry, build-gating checks
- ✅ Seventeen lessons across all six topics, each with a tested kernel
- ✅ Twelve simulation primitives — three animated, two directly manipulable
- ✅ Shared field-line tracer (`src/lib/fieldLines.ts`) serving both magnetic and electric fields
- ✅ Topic 6 complete; topic 2 at 93%
- ⬜ Remaining topic 4: induction, a.c. generator, motors, transformers (49 statements)
- ⬜ Remaining topic 1: forces, density, pressure, momentum, measurement (41 statements)
- ⬜ Remaining topic 3: lenses, reflection, dispersion, diffraction (19 statements)
- ⬜ Paper 5/6 practical skills module
- ⬜ Question banks and progress tracking
- ⬜ AI tutor and answer marking

### Multi-subject

Lessons live under `src/content/lessons/<subject>/<slug>/` and carry a `subject` field
matching their directory; the integrity check enforces both, and rejects a lesson that
cites another subject's statement ids. Routes are `/lesson/:subject/:slug`, and the home
page has a subject switcher. Adding a subject means adding a syllabus file and one entry
in `src/content/syllabus/index.ts`.

**Chemistry 0620 — 61%**, 140 of 231 statements across 16 lessons:

| Topic | Taught |
| --- | --- |
| 2 Atoms, elements and compounds | 22 / 27 |
| 5 Chemical energetics | **8 / 8** |
| 6 Chemical reactions | 8 / 28 |
| 7 Acids, bases and salts | **20 / 20** |
| 8 The Periodic Table | **16 / 16** |
| 9 Metals | **22 / 22** |
| 10 Chemistry of the environment | **17 / 17** |
| 11 Organic chemistry | 27 / 41 |

Topics 1, 3, 4 and 12 are not started. 

## Live site

https://crazyrock114.github.io/Science_cc/ — deployed from `main` by GitHub Actions,
which runs lint, typecheck and the full test suite before publishing.

Run `npm run check:syllabus` for the live coverage breakdown.

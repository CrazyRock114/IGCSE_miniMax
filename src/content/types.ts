/**
 * Content type system.
 *
 * Design rule that everything else follows from: **course copy is data, never JSX.**
 * A lesson is a `Lesson` object; the renderer is generic. This is the single biggest
 * departure from the reference projects (mathviz et al.), where each experiment was a
 * bespoke component with its copy hard-coded inside it — which made them untranslatable.
 */

/**
 * English is required, Chinese is optional.
 *
 * The asymmetry is deliberate and enforced by the type: this course is English-primary
 * (IGCSE is examined in English), with Chinese as scaffolding. You cannot author a
 * Chinese-only string without the compiler objecting.
 */
export interface Bilingual {
  en: string
  zh?: string
}

/** Core content is examined in Papers 1/3; Supplement content only in Papers 2/4. */
export type Tier = 'core' | 'supplement'

/** A lesson may cover Core only, or Core + Supplement material. */
export type LessonTier = 'core' | 'extended'

// ---------------------------------------------------------------------------
// Syllabus
// ---------------------------------------------------------------------------

/**
 * A single assessable statement, e.g. `0625.1.2.6`.
 *
 * `label` is **our own paraphrase**, not the awarding body's wording — we reference
 * statements by their official numbering but do not reproduce the syllabus text.
 */
export interface SyllabusStatement {
  /** Fully-qualified id, e.g. '0625.1.2.6' */
  id: string
  /** Statement number within its subtopic (continuous across Core and Supplement) */
  n: number
  tier: Tier
  label: Bilingual
}

export interface SyllabusSubtopic {
  /** e.g. '1.2' or '1.5.1' */
  id: string
  title: Bilingual
  statements: SyllabusStatement[]
}

export interface SyllabusTopic {
  /** 1..6 */
  number: number
  title: Bilingual
  subtopics: SyllabusSubtopic[]
}

export interface Syllabus {
  /** Awarding body code, e.g. '0625' */
  code: string
  title: Bilingual
  board: string
  /** Exam years this cycle covers, e.g. [2026, 2028] */
  cycle: [number, number]
  guidedLearningHours: number
  topics: SyllabusTopic[]
}

// ---------------------------------------------------------------------------
// Simulation
// ---------------------------------------------------------------------------

/**
 * The ten reusable primitives that cover all of 0625. A lesson picks one and
 * configures it with data — it does not ship its own renderer.
 */
export type SimPrimitive =
  | 'plot2d'
  | 'atom'
  | 'molecule'
  | 'bonding'
  | 'ladder'
  | 'beam'
  | 'vectors'
  | 'particles'
  | 'waves'
  | 'raytrace'
  | 'circuit'
  | 'field2d'
  | 'scene3d'
  | 'apparatus'
  | 'graphpaper'

/** A named value for a discrete parameter, e.g. choosing a medium or a wave type. */
export interface ParamOption {
  value: number
  label: Bilingual
}

export interface ParamSpec {
  key: string
  label: Bilingual
  /** SI-ish unit string rendered next to the value, e.g. 'm / s' */
  unit: string
  min: number
  max: number
  step: number
  default: number
  /** Symbol rendered in KaTeX, e.g. 'v_0' */
  symbol?: string
  /**
   * When present the parameter renders as a row of buttons rather than a slider.
   * Use for genuinely discrete choices — a two-position slider is a poor control.
   */
  options?: ParamOption[]
  /**
   * Hide from the control panel. For parameters the student sets by dragging on the
   * canvas, or that the animation clock drives.
   */
  hidden?: boolean
}

export interface ReadoutSpec {
  key: string
  label: Bilingual
  unit: string
  /** Significant figures used when displaying. IGCSE cares about this. */
  sigFigs: number
  symbol?: string
  /**
   * Print the value as it is, rather than padding it to `sigFigs`.
   *
   * For quantities that are exact rather than measured: counts (electrons, protons,
   * product molecules) and sums of tabulated values (a relative molecular mass). "23.0
   * electrons" is nonsense, and so is an M_r of "30.0" — but chloromethane's really is
   * 50.5, so rounding to a whole number would be wrong too.
   */
  exact?: boolean
}

/**
 * Drives one parameter from an animation clock.
 *
 * The kernel stays a pure function of its parameters — the renderer simply advances
 * the named parameter each frame. So an animated simulation is still fully testable
 * by calling the kernel at chosen times.
 */
export interface AnimateSpec {
  /** Parameter to advance (must exist in `params`) */
  param: string
  /** Units of that parameter per real second */
  speed: number
  /** Value at which to wrap back to `min`, giving a seamless loop */
  loop: number
}

/**
 * A one-click scenario.
 *
 * Worth having because a slider does not tell a student *where to look*. "Just past
 * the critical angle" or "balanced" jumps straight to the configuration that makes
 * the point, and they can perturb it from there.
 */
export interface SimPreset {
  label: Bilingual
  params: Record<string, number>
}

export interface SimSpec {
  primitive: SimPrimitive
  /** Kernel module id, resolved through the registry (see lib/registry.ts) */
  kernel: string
  params: ParamSpec[]
  readouts: ReadoutSpec[]
  animate?: AnimateSpec
  /**
   * Parameters the student can set by dragging on the canvas. The primitive decides
   * what the gesture means; listing them here documents the intent and lets the
   * integrity check confirm they exist.
   */
  draggable?: string[]
  presets?: SimPreset[]
  /** One line telling the student what they can do with the canvas. */
  hint?: Bilingual
  /**
   * Primitive-specific mode. Lets one renderer serve related topics that share geometry
   * but not iconography — `field2d` draws magnets for 'magnetic' and charges for
   * 'electric', for instance.
   */
  variant?: string
}

/**
 * Every kernel is a pure function: params in, derived series and readouts out.
 * No side effects, no DOM, no React — so it can be unit-tested directly.
 * (Pattern borrowed from ChemAIForge's `react(Substance[], Conditions) => ReactionResult`.)
 */
export type SimKernel<P = Record<string, number>, R = SimResult> = (params: P) => R

export interface SimSeries {
  key: string
  label: Bilingual
  /** Axis units, e.g. { x: 's', y: 'm' } */
  unit: { x: string; y: string }
  points: Array<[number, number]>
  /**
   * Fixed y-axis bounds, when the quantity has a natural range the data does not reach.
   * pH runs 0–14, so letting the axis round up to 20 would be wrong even though no point
   * exceeds it.
   *
   * Also the way to stop an axis rescaling as parameters change. Where a lesson asks the
   * student to compare two settings, a self-scaling axis quietly normalises away the very
   * difference being pointed at.
   */
  yBounds?: { min: number; max: number }
  /**
   * Fixed x-axis bounds. Mainly for counted quantities — five gridlines across 0–4 land
   * on the integers, where an auto-scaled 0–5 would put ticks at 1.25 and 3.75 and no
   * point on the curve would sit on a gridline.
   */
  xBounds?: { min: number; max: number }
}

/**
 * A drawable object in the simulation's own coordinate space — a gas particle, a
 * hanging weight, a wave medium particle. Distinct from `series` (which is a line)
 * and `markers` (which carry labels).
 */
export interface SimBody {
  x: number
  y: number
  /** Radius in simulation units; the primitive picks a sensible default if absent. */
  r?: number
  /** Free-form tag the primitive uses to style the body, e.g. 'fast' | 'weight'. */
  kind?: string
  /**
   * Text drawn on the body — an element symbol, an ionic charge, a component's value.
   *
   * Deliberately a plain string, not `Bilingual`: what goes here is notation rather than
   * prose. "Na" and "2+" are the same in every language, and a translated chemical symbol
   * would be wrong rather than merely unhelpful.
   */
  label?: string
}

/**
 * A connection between two bodies, by index into `bodies` — a covalent bond, a lattice
 * edge, a linkage in a mechanism.
 *
 * Bonds are a relation, not a body, so they live here rather than being faked as bodies
 * with a position. That keeps `bodies.length` equal to the number of atoms, which is what
 * lets a molecular formula be counted straight off the drawing.
 */
export interface SimLink {
  a: number
  b: number
  /** Bond order: 1 single, 2 double, 3 triple. Defaults to 1. */
  order?: number
  /** Free-form tag, e.g. 'functional' to pick out the group that drives the chemistry. */
  kind?: string
}

export interface SimResult {
  series: SimSeries[]
  /** Keyed by ReadoutSpec.key */
  readouts: Record<string, number>
  /** Optional annotations the renderer may draw (markers, regions) */
  markers?: Array<{ x: number; y: number; label: Bilingual }>
  bodies?: SimBody[]
  links?: SimLink[]
  /**
   * Extent of the simulation's coordinate space, for primitives that draw in a
   * physical geometry rather than on graph axes.
   */
  bounds?: { xMin: number; xMax: number; yMin: number; yMax: number }
}

// ---------------------------------------------------------------------------
// Equations
// ---------------------------------------------------------------------------

export interface EquationBlock {
  /** KaTeX source, e.g. 'v = \\frac{s}{t}' */
  latex: string
  /** What the equation says, in words */
  meaning: Bilingual
  /**
   * Optional live substitution: the same equation with current values filled in.
   * Receives the current readouts so the student sees their numbers in the formula.
   */
  substitute?: (readouts: Record<string, number>) => string
}

// ---------------------------------------------------------------------------
// Glossary — the main vehicle for Chinese scaffolding
// ---------------------------------------------------------------------------

export interface Term {
  /** The English term as it appears in exams — this is what students must learn */
  en: string
  /** Chinese gloss, shown on hover/inline depending on the assist level */
  zh: string
  definition: Bilingual
  /** Statement ids where this term is assessed */
  syllabus?: string[]
}

// ---------------------------------------------------------------------------
// Assessment
// ---------------------------------------------------------------------------

/** The 15 command words defined by the 0625 syllabus. */
export type CommandWord =
  | 'Calculate'
  | 'Comment'
  | 'Compare'
  | 'Deduce'
  | 'Define'
  | 'Describe'
  | 'Determine'
  | 'Explain'
  | 'Give'
  | 'Identify'
  | 'Justify'
  | 'Predict'
  | 'Sketch'
  | 'State'
  | 'Suggest'

export interface MarkPoint {
  /** The creditworthy point, in English — this is mark-scheme language */
  text: string
  marks: number
  /** Equally acceptable alternative wordings */
  alternatives?: string[]
}

export interface Question {
  id: string
  syllabus: string[]
  tier: LessonTier
  commandWord: CommandWord
  marks: number
  /**
   * Question stem — **English only, by design**. Students must practise reading and
   * answering in the language of the exam, so we deliberately do not translate stems.
   */
  stem: string
  /** For multiple-choice items (Papers 1 and 2 are 4-option MCQ) */
  options?: string[]
  answerIndex?: number
  markScheme: MarkPoint[]
  /** Why candidates lose marks here — Chinese is welcome in this field */
  examinerNote?: Bilingual
}

// ---------------------------------------------------------------------------
// Narration
// ---------------------------------------------------------------------------

export type NarrationSectionType =
  | 'intro'
  | 'concept'
  | 'equation'
  | 'animation'
  | 'interaction'
  | 'worked-example'
  | 'application'
  | 'summary'

/**
 * A narration line may drive the simulation, so that the explanation and the canvas
 * stay in step. (Model adapted from mathviz's `narrations/types.ts`.)
 */
export interface NarrationAction {
  type: 'setParams' | 'play' | 'pause' | 'reset' | 'highlight'
  params?: Record<string, number>
  /** CSS selector of the UI element to highlight */
  target?: string
}

export interface NarrationLine {
  id: string
  text: Bilingual
  /** Related formula shown while this line plays */
  latex?: string
  action?: NarrationAction
  /** Seconds to pause after this line */
  pause?: number
}

export interface NarrationSection {
  id: string
  type: NarrationSectionType
  title: Bilingual
  lines: NarrationLine[]
}

export interface NarrationScript {
  /** Matches the lesson slug */
  id: string
  sections: NarrationSection[]
}

// ---------------------------------------------------------------------------
// Lesson
// ---------------------------------------------------------------------------

export interface Lesson {
  slug: string
  /**
   * Awarding-body code of the subject this lesson belongs to, e.g. '0625' or '0620'.
   * Must match the directory it lives in: `content/lessons/<subject>/<slug>/`.
   */
  subject: string
  /** Statement ids this lesson teaches. Required — every lesson is anchored to the syllabus. */
  syllabus: string[]
  tier: LessonTier
  title: Bilingual
  summary: Bilingual
  /** Our own learning outcomes, aligned to but not copied from the syllabus */
  objectives: Bilingual[]
  glossary: Term[]
  equations: EquationBlock[]
  sim?: SimSpec
  narration: NarrationScript
  /** Formative checks shown inline in the lesson */
  checkpoints: Question[]
  /** id of a related Paper 5/6 practical, if any */
  practical?: string
  /** Rough teaching time in minutes */
  estimatedMinutes: number
}

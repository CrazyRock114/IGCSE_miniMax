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
  | 'balance'
  | 'bonding'
  | 'chromatogram'
  | 'giant'
  | 'ladder'
  | 'lattice'
  | 'periodictable'
  | 'sort'
  | 'match'
  | 'punnett'
  | 'pyramid'
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

/**
 * A reference line across a plot — a melting point, absolute zero, the temperature an
 * industrial plant actually runs at.
 *
 * Worth having because half the graphs in this course are read against a value that is not
 * on the curve. "The yield at 450 °C" means finding 450 on the axis and following it up by
 * eye, and a student who lands on 400 draws the wrong conclusion from a correct graph. The
 * line does the finding.
 *
 * The label is a plain string rather than `Bilingual`: what goes here is a value with its
 * unit — "0 °C", "450 °C, the industrial temperature" is too long for the space. Anything
 * needing prose belongs in a marker note under the plot.
 */
export interface SimGuide {
  /** `x` draws a vertical line at this value; `y` draws a horizontal one. */
  axis: 'x' | 'y'
  value: number
  label?: string
}

export interface SimSeries {
  key: string
  label: Bilingual
  /** Axis units, e.g. { x: 's', y: 'm' } */
  unit: { x: string; y: string }
  points: Array<[number, number]>
  /**
   * Reference lines drawn across the panel this series is on. Collected across every series
   * sharing the panel, so it does not matter which one carries them.
   */
  guides?: SimGuide[]
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

/**
 * An exercise where the student assigns items to targets.
 *
 * Sorting into categories and matching pairs are the same problem wearing different
 * clothes — put each item somewhere, and be right or wrong about it — so both primitives
 * read this one structure and differ only in how they draw it. `sort` shows the targets as
 * bins with the unplaced items pooled beneath; `match` shows two columns and joins them.
 *
 * The student's answers live in the simulation's parameters like any other input, one
 * hidden parameter per item, so the kernel stays a pure function and a test can drive the
 * exercise to any state without a browser.
 */
export interface SimAssignment {
  items: Array<{
    id: string
    label: Bilingual
    /** Id of the target this item actually belongs on. */
    target: string
    /** Where the student has put it. Absent while it is still unplaced. */
    placed?: string
  }>
  targets: Array<{ id: string; label: Bilingual; hint?: Bilingual }>
}

/**
 * A Punnett square: the gametes of one parent along the top, the other down the side, and
 * every combination of them in the cells.
 *
 * Deliberately free of genetics vocabulary. The renderer is told about columns, rows, cells
 * and groups; it is not told what an allele is. That is what lets the same grid draw a
 * monohybrid cross, a codominant one, sex determination and a sex-linked cross — four
 * things the syllabus treats separately and which are the same operation underneath.
 *
 * `groups` is the set of distinct outcomes in the order they should be listed and coloured,
 * and `groupOf` says which one each cell belongs to. Keeping that mapping in the data rather
 * than in the renderer is what makes codominance possible: three genotypes and three
 * phenotypes, where a dominant cross has three genotypes and two phenotypes.
 */
export interface SimGrid {
  /** Gametes forming the columns, and a heading naming the parent they came from. */
  columns: string[]
  columnsLabel: Bilingual
  /** Gametes forming the rows, and a heading naming that parent. */
  rows: string[]
  rowsLabel: Bilingual
  /** Offspring at `cells[row][column]`. */
  cells: string[][]
  /** Distinct outcomes, in display order. */
  groups: Array<{ id: string; label: Bilingual }>
  /** Which group each cell value belongs to. */
  groupOf: Record<string, string>
}

/**
 * An ecological pyramid: trophic levels stacked from the producers upwards.
 *
 * `value` is the real quantity and is printed on the bar. The bar *widths* are drawn on a
 * logarithmic scale, which needs saying out loud: a pyramid of numbers can run from one oak
 * tree to half a million insects, six orders of magnitude, and drawn to scale every level
 * above the first would be a hairline. Textbooks solve this by drawing pyramids of numbers
 * not to scale at all; a log scale is the same concession made honestly, and it keeps the
 * ordering — and so any inversion — visible, which is the whole thing the diagram is for.
 */
export interface SimPyramid {
  /** Levels from the bottom — the producers — upwards. */
  levels: Array<{ label: Bilingual; value: number; detail?: Bilingual }>
  /** Unit of `value`. Notation, so it is not translated. */
  unit: string
}

/**
 * A chemical equation with the coefficients the student has chosen, and the atom count on
 * each side worked out element by element.
 *
 * The tally is the whole exercise: balancing is not guessing coefficients until it looks
 * right, it is making two columns of numbers agree, and a student who cannot see the columns
 * has nothing to reason with.
 */
export interface SimEquation {
  left: Array<{ coefficient: number; formula: string; state: string }>
  right: Array<{ coefficient: number; formula: string; state: string }>
  tally: Array<{ element: string; left: number; right: number }>
}

/**
 * A developed chromatogram: a strip of paper with a baseline, a solvent front and the spots
 * between them.
 *
 * Distances are in centimetres from the baseline, and every spot carries its own Rf. Keeping
 * both means the picture and the arithmetic cannot disagree — which matters here, because the
 * whole point of Rf is that the distances change when the plate is run for longer and the
 * ratio does not.
 */
export interface SimChromatogram {
  /** How far the solvent front travelled from the baseline, in cm. */
  solventDistance: number
  lanes: Array<{
    label: Bilingual
    spots: Array<{ label: string; distance: number; rf: number; highlighted?: boolean }>
  }>
}

export interface SimResult {
  series: SimSeries[]
  /** Present only for the `sort` and `match` primitives. */
  assignment?: SimAssignment
  /** Present only for the `punnett` primitive. */
  grid?: SimGrid
  /** Present only for the `pyramid` primitive. */
  pyramid?: SimPyramid
  /** Present only for the `balance` primitive. */
  equation?: SimEquation
  /** Present only for the `chromatogram` primitive. */
  chromatogram?: SimChromatogram
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
  /**
   * Visual / interactive learning modules — anatomy explorers, animations, mini-games.
   *
   * Why a separate field rather than packing everything into the sim: the `sim` is one
   * `primitive` (a renderer) wired to one kernel (pure function). These are bespoke,
   * data-driven interactive modules that do not fit the series/assignment/grid/pyramid
   * shape, so they live alongside it. The renderer dispatches on `type` and the lesson
   * author picks the order.
   */
  extras?: LessonExtra[]
}

// ---------------------------------------------------------------------------
// Lesson extras — visual / interactive learning modules
// ---------------------------------------------------------------------------

/**
 * A single visual or interactive module rendered as its own section in the lesson.
 *
 * The `type` is a discriminator the renderer uses to pick a component. Each variant
 * carries only the data that component needs; we do not try to homogenise them.
 */
export type LessonExtra =
  | DigestiveAnatomyExtra
  | TeethAnatomyExtra
  | VilliSurfaceAreaExtra
  | BileEmulsificationExtra
  | BalancedPlateExtra
  | DigestionFlowExtra
  | VillusDetailExtra
  | FoodEnergyExtra
  | DiseaseCardsExtra
  | EnergyNeedsExtra

/** What to show in the side panel when an organ is selected. */
export interface AnatomyOrgan {
  /** Stable id, used as the React key and as the click target on the SVG. */
  id: string
  /** Display name. */
  name: Bilingual
  /** What happens here, in one or two short paragraphs. */
  description: Bilingual
  /** Key secretions or events, rendered as a small chip row under the description. */
  secretions?: Bilingual[]
  /**
   * Approximate stop number on the "follow the food" timeline (1-based). Used to
   * sequence organs mouth→anus in the animated trace. Organs without a stop number
   * (liver, gall bladder, pancreas — they contribute, not the food passes through) are
   * left out of the timeline.
   */
  stop?: number
}

export interface DigestiveAnatomyExtra {
  type: 'digestive-anatomy'
  id: string
  title: Bilingual
  /** What the user is meant to notice, in one line. */
  hint: Bilingual
  /**
   * The organs shown in the body silhouette, in display order. Each becomes a clickable
   * hotspot; the matching side panel describes what happens there.
   */
  organs: AnatomyOrgan[]
  /**
   * Which organ to highlight on first render. Optional — if absent, no organ is
   * selected and the panel shows the intro hint instead.
   */
  initialOrgan?: string
}

/** A single tooth type — its count, shape and what it does. */
export interface ToothKind {
  id: string
  name: Bilingual
  /** How many of this kind an adult has. */
  count: number
  /** What it is for. */
  role: Bilingual
  /**
   * A short shape description used as a fallback in the gallery when no SVG path is
   * provided. The default is a generic "molar-like" silhouette.
   */
  shape?: Bilingual
}

export interface TeethAnatomyExtra {
  type: 'teeth-anatomy'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Layers of a tooth, drawn outside-in. */
  layers: Array<{
    id: string
    name: Bilingual
    /** What this layer is made of / what it does. */
    description: Bilingual
  }>
  kinds: ToothKind[]
}

export interface VilliSurfaceAreaExtra {
  type: 'villi-surface-area'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Inner radius of the small intestine in mm. Used as the basis for the area math. */
  radiusMm: number
  /** Length of the segment shown, in mm. */
  lengthMm: number
  /**
   * Recommended number of villi per cm² for the syllabus-friendly "×N" factor. The
   * kernel multiplies the unfolded area by this and rounds to a tidy number; the slider
   * just lets the student perturb it and see the result.
   */
  baselineVilliPerCm2: number
}

export interface BileEmulsificationExtra {
  type: 'bile-emulsification'
  id: string
  title: Bilingual
  hint: Bilingual
}

export interface BalancedPlateExtra {
  type: 'balanced-plate'
  id: string
  title: Bilingual
  hint: Bilingual
  /**
   * Foods the student can put on their plate. Categorised so the renderer can colour
   * them and the scoring can check coverage.
   */
  foods: Array<{
    id: string
    name: Bilingual
    /** Group on the plate — drives the section colour and the scoring. */
    group: 'carb' | 'protein' | 'veg' | 'fruit' | 'dairy' | 'fat'
    /** Hand-drawn emoji or glyph used as a quick visual on the food card. */
    glyph: string
  }>
  /**
   * Minimum recommended servings per group. The check lights up green when each
   * group has at least this many. Designed to be generous — half a plate of veg
   * is the lesson, not a precise calorie count.
   */
  targets: Record<'carb' | 'protein' | 'veg' | 'fruit' | 'dairy' | 'fat', number>
}

/**
 * The chain of events from a sandwich in the mouth to a faeces at the anus, plus the
 * six formal terms the syllabus uses for each step.
 *
 * Drawn as a horizontal flowchart with the terms as labelled boxes, the definitions
 * as togglable cards beneath. Same pattern as the other "data, then reveal"
 * interactive modules.
 */
export interface DigestionFlowExtra {
  type: 'digestion-flow'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Ordered pipeline of stages the food actually passes through. */
  stages: Array<{
    id: string
    label: Bilingual
    /** One-line summary shown on the flow box. */
    summary: Bilingual
  }>
  /** Definitions the lesson author wants the student to remember. */
  definitions: Array<{
    id: string
    term: Bilingual
    definition: Bilingual
  }>
}

/**
 * A labelled cross-section of a single villus. More detail than `VilliSurfaceArea`
 * (which is a numeric "how big is the multiplier" exercise): this one shows the
 * named structures — epithelium, capillary network, lacteal, microvilli — and the
 * direction each type of nutrient takes across the wall.
 */
export interface VillusDetailExtra {
  type: 'villus-detail'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Layers, outside-in. Click to highlight. */
  parts: Array<{
    id: string
    name: Bilingual
    description: Bilingual
    /** Which side of the wall this structure is on, used to position the label. */
    side: 'outside' | 'inside' | 'core' | 'surface'
  }>
  /** Nutrients crossing the wall, with where they go. */
  transport: Array<{
    id: string
    name: Bilingual
    destination: Bilingual
  }>
}

/**
 * Energy content of foods, kJ per 100 g. The point is *comparison*: the same
 * mass of fat carries more than twice the energy of the same mass of carbohydrate
 * or protein, which is the explanation for the obesity / fried-food line in
 * Chapter 1.1.
 */
export interface FoodEnergyExtra {
  type: 'food-energy'
  id: string
  title: Bilingual
  hint: Bilingual
  foods: Array<{
    id: string
    name: Bilingual
    /** kJ per 100 g. */
    energy: number
    /** Coarse grouping, drives the row colour. */
    group: 'carb' | 'protein' | 'fat' | 'fruit-veg' | 'dairy' | 'mixed'
  }>
}

/**
 * A grid of disease/condition cards: real clinical photographs, the mechanism
 * (how/why it happens), the clinical picture (symptoms), and the term in EN+ZH.
 *
 * Modeled on the G8 Science chapter-1.5 lifestyle-diseases block: rickets,
 * scurvy, kwashiorkor, marasmus, coronary heart disease, obesity. The pictures
 * are real medical/photojournalism images, not stylised illustrations — a
 * six-year-old's photo of a kwashiorkor belly tells a student more than any
 * drawn diagram.
 */
export interface DiseaseCardEntry {
  id: string
  /** Term English (matches a glossary entry). */
  term: Bilingual
  /** Why it happens — the mechanism. */
  mechanism: Bilingual
  /** What it looks like — symptoms, signs, clinical picture. */
  clinical: Bilingual
  /** Path under /public — the lesson's own images live under /figures/<source>/<lesson>/. */
  image: string
  /** Source attribution. */
  imageSource: Bilingual
  /** Optional callout colour, drives the card border. */
  severity?: 'deficiency' | 'lifestyle' | 'severe'
}

export interface DiseaseCardsExtra {
  type: 'disease-cards'
  id: string
  title: Bilingual
  hint: Bilingual
  cards: DiseaseCardEntry[]
}

/**
 * The energy-needs table (Figure B5.01 style). Three columns: demographic,
 * daily energy, the actual number. The point: energy needs depend on age, sex
 * and activity — there is no single "daily requirement" for a person.
 */
export interface EnergyNeedsRow {
  demographic: Bilingual
  activity: Bilingual
  energyKj: number
}

export interface EnergyNeedsExtra {
  type: 'energy-needs'
  id: string
  title: Bilingual
  hint: Bilingual
  rows: EnergyNeedsRow[]
  /**
   * Source for the energy figures — e.g. 'G8 Science Figure B5.01'.
   * The numbers are a re-presentation; the unit is kJ per day.
   */
  source: Bilingual
}

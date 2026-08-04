/**
 * UI chrome strings for the lesson-extras interactive modules.
 *
 * Course copy (organ descriptions, tooth kinds, food names) lives in the lesson's
 * `extras` data, so it can be edited without touching components and so the bilingual
 * invariant is enforced at the type level. This file is for the buttons, empty-state
 * messages, and other UI strings that the renderer owns and the lesson author
 * should not need to think about.
 *
 * Kept separate from the components to satisfy the `no-Chinese-in-components`
 * ESLint rule, which exists to keep course copy translatable. The glyphs in
 * `src/lib/translatorGlyphs.ts` follow the same pattern.
 */

import type { Bilingual } from '@/content/types'

export const DIGESTIVE_ANATOMY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the food', zh: '跟着食物走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A ball of food is travelling mouth → anus. The right-hand panel follows along.',
    zh: '一团食物正从口腔走向肛门。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click an organ in the picture to read what happens there.',
    zh: '点击图中任意器官，查看那里发生什么。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first organ will appear on the right in a moment.',
    zh: '旅程即将开始，第一个器官马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const TEETH_ANATOMY = {
  layerHint: {
    en: 'Click a layer of the tooth to read what it does.',
    zh: '点击牙齿任一层，了解它的作用。',
  } satisfies Bilingual,
  kindHint: {
    en: 'Click a tooth below to see what it does.',
    zh: '点击下方任一牙齿，了解它的作用。',
  } satisfies Bilingual,
  gumLabel: { en: 'gum', zh: '牙龈' } satisfies Bilingual,
  nerveLabel: { en: 'nerve & blood vessels', zh: '神经与血管' } satisfies Bilingual,
} as const

export const VILLI_SURFACE_AREA = {
  hint: {
    en: 'Every finger is a villus, every patch of fuzz on a villus is microvilli. Absorption happens across all of it.',
    zh: '每一根指状突起是绒毛，绒毛上的每一片小绒毛是微绒毛。吸收就在这全部的表面上进行。',
  } satisfies Bilingual,
  sliderLabel: { en: 'Villi per cm²', zh: '每平方厘米的绒毛数' } satisfies Bilingual,
  bare: { en: 'Bare tube', zh: '光管' } satisfies Bilingual,
  withVilli: { en: 'With villi', zh: '有绒毛' } satisfies Bilingual,
  bareNote: { en: 'Just length × circumference', zh: '仅长 × 周长' } satisfies Bilingual,
  withVilliNote: { en: 'fold factor', zh: '皱褶系数' } satisfies Bilingual,
  withMicrovilli: { en: 'With microvilli', zh: '有微绒毛' } satisfies Bilingual,
  withMicrovilliNote: { en: '≈ a tennis court', zh: '≈ 一个网球场' } satisfies Bilingual,
  bareCaption: { en: 'Surface area = circumference × length', zh: '表面积 = 周长 × 长度' } satisfies Bilingual,
} as const

export const BILE_EMULSIFICATION = {
  hint: {
    en: 'Click "Add bile" to see what emulsification looks like.',
    zh: '点"+ 加入胆汁"看看乳化的样子。',
  } satisfies Bilingual,
  before: { en: 'Before bile', zh: '加入胆汁前' } satisfies Bilingual,
  after: { en: 'After bile', zh: '加入胆汁后' } satisfies Bilingual,
  add: { en: '+ Add bile', zh: '+ 加入胆汁' } satisfies Bilingual,
  reset: { en: '↺ Reset', zh: '↺ 重置' } satisfies Bilingual,
  on: {
    en: 'Many tiny drops. Lipase has a much larger surface to work on — that is the whole point of bile.',
    zh: '许多小液滴。脂肪酶可接触的表面积大得多——这就是胆汁的全部意义。',
  } satisfies Bilingual,
  off: {
    en: 'Click "Add bile" to see what emulsification looks like.',
    zh: '点"+ 加入胆汁"看看乳化的样子。',
  } satisfies Bilingual,
} as const

export const BALANCED_PLATE = {
  cardsHint: {
    en: 'Click a food to add it. Click again to take it off.',
    zh: '点击食物加入餐盘。再点一次则移除。',
  } satisfies Bilingual,
  totalLabel: { en: 'servings on the plate', zh: '份已上盘' } satisfies Bilingual,
  empty: { en: 'Your plate is empty.', zh: '餐盘是空的。' } satisfies Bilingual,
  balanced: { en: 'Balanced — all groups covered.', zh: '均衡——各组都有。' } satisfies Bilingual,
  reset: { en: 'Clear plate', zh: '清空餐盘' } satisfies Bilingual,
  groupLabel: {
    veg: { en: 'Vegetables', zh: '蔬菜' } satisfies Bilingual,
    fruit: { en: 'Fruit', zh: '水果' } satisfies Bilingual,
    protein: { en: 'Protein', zh: '蛋白质' } satisfies Bilingual,
    carb: { en: 'Carbs', zh: '碳水' } satisfies Bilingual,
    dairy: { en: 'Dairy', zh: '乳制品' } satisfies Bilingual,
    fat: { en: 'Healthy fats', zh: '健康脂肪' } satisfies Bilingual,
  },
} as const

export const DIGESTION_FLOW = {
  reveal: { en: 'Show definition', zh: '查看释义' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
} as const

export const VILLUS_DETAIL = {
  clickHint: {
    en: 'Click any labelled part of the villus to read what it does.',
    zh: '点击绒毛上任意标号部分，了解其作用。',
  } satisfies Bilingual,
  empty: {
    en: 'Click a part of the villus to read about it.',
    zh: '点击绒毛任一部分了解作用。',
  } satisfies Bilingual,
  transportTitle: {
    en: 'Where each nutrient goes',
    zh: '各种营养物质去哪里',
  } satisfies Bilingual,
  lumenLabel: { en: 'lumen of the small intestine', zh: '小肠肠腔' } satisfies Bilingual,
  lactealTag: { en: 'lacteal', zh: '乳糜管' } satisfies Bilingual,
  wallLabel: { en: 'gut wall (one cell thick)', zh: '肠壁（单层细胞）' } satisfies Bilingual,
} as const

export const FOOD_ENERGY = {
  colFood: { en: 'Food', zh: '食物' } satisfies Bilingual,
  colGroup: { en: 'Group', zh: '类别' } satisfies Bilingual,
  colEnergy: { en: 'Energy', zh: '能量' } satisfies Bilingual,
  colBar: { en: 'Relative', zh: '相对量' } satisfies Bilingual,
  pinnedHint: {
    en: 'Pinned for comparison:',
    zh: '已选中用于对比：',
  } satisfies Bilingual,
  clickHint: {
    en: 'Click a row to pin it; click again to clear. Fat carries more than twice the energy of the same mass of carbohydrate or protein.',
    zh: '点击任一行选中对比，再次点击取消。脂肪的能量是同质量碳水或蛋白的两倍以上。',
  } satisfies Bilingual,
  groupLabel: {
    carb: { en: 'Carb', zh: '碳水' } satisfies Bilingual,
    protein: { en: 'Protein', zh: '蛋白质' } satisfies Bilingual,
    fat: { en: 'Fat', zh: '脂肪' } satisfies Bilingual,
    'fruit-veg': { en: 'Fruit / Veg', zh: '果蔬' } satisfies Bilingual,
    dairy: { en: 'Dairy', zh: '乳制品' } satisfies Bilingual,
    mixed: { en: 'Mixed meal', zh: '混合餐' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// 9-1 Transport in animals — Chapter 2 (B7) extras
// ---------------------------------------------------------------------------

export const HEART_ANATOMY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the blood', zh: '跟着血液走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A red blood cell is travelling body → right heart → lungs → left heart → body. The right-hand panel follows along.',
    zh: '一个红细胞正从全身→右心→肺→左心→全身。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click a part of the heart in the picture to read what happens there.',
    zh: '点击图中任意心脏结构，查看那里发生什么。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first stop will appear on the right in a moment.',
    zh: '旅程即将开始，第一站马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const BLOOD_VESSELS_COMPARE = {
  tableHeading: { en: 'Side by side', zh: '并排比较' } satisfies Bilingual,
  yes: { en: 'yes', zh: '有' } satisfies Bilingual,
  no: { en: 'no', zh: '无' } satisfies Bilingual,
  rowLabel: {
    wall: { en: 'Wall', zh: '管壁' } satisfies Bilingual,
    lumen: { en: 'Lumen', zh: '管腔' } satisfies Bilingual,
    hasValves: { en: 'Valves', zh: '瓣膜' } satisfies Bilingual,
    direction: { en: 'Flow direction', zh: '血流方向' } satisfies Bilingual,
    pressure: { en: 'Pressure', zh: '压力' } satisfies Bilingual,
  },
} as const

export const DOUBLE_CIRCULATION = {
  reveal: { en: 'Show definition', zh: '查看释义' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
  definitionsHeading: {
    en: 'The terms the syllabus uses',
    zh: '考纲里的术语',
  } satisfies Bilingual,
  connector: {
    en: 'the heart pumps again',
    zh: '心脏再次泵血',
  } satisfies Bilingual,
  rowLabel: {
    pulmonary: { en: 'Pulmonary loop', zh: '肺循环' } satisfies Bilingual,
    systemic: { en: 'Systemic loop', zh: '体循环' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// 11-1 Gas exchange and respiration — Chapter 3 (B8) extras
// ---------------------------------------------------------------------------

export const AIRWAY_PATHWAY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the air', zh: '跟着空气走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A breath is travelling larynx → trachea → bronchus → bronchiole → alveoli. The right-hand panel follows along.',
    zh: '一缕空气正从喉→气管→支气管→细支气管→肺泡。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click a part of the breathing system in the picture to read what it does.',
    zh: '点击图中任一呼吸系统结构，查看它的作用。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first stop will appear on the right in a moment.',
    zh: '旅程即将开始，第一站马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const RESPIRATION_COMPARE = {
  heading: { en: 'Aerobic vs anaerobic', zh: '有氧 vs 无氧' } satisfies Bilingual,
  aerobic: { en: 'Aerobic respiration', zh: '有氧呼吸' } satisfies Bilingual,
  anaerobic: { en: 'Anaerobic respiration', zh: '无氧呼吸' } satisfies Bilingual,
  equationsHeading: { en: 'The word equations', zh: '文字表达式' } satisfies Bilingual,
  anaerobicMuscle: { en: 'Anaerobic in muscle', zh: '肌肉中的无氧呼吸' } satisfies Bilingual,
  anaerobicYeast: { en: 'Anaerobic in yeast', zh: '酵母中的无氧呼吸' } satisfies Bilingual,
} as const

export const GAS_EXCHANGE_FEATURES = {
  featureLabel: { en: 'The feature', zh: '特征' } satisfies Bilingual,
  whyLabel: { en: 'Why it matters', zh: '为何重要' } satisfies Bilingual,
} as const

export const SMOKING_EFFECTS = {
  heroAlt: {
    en: 'A burning cigarette, with four arrows pointing at the four things in cigarette smoke that cause harm',
    zh: '一支燃烧的香烟，四支箭头分别指向烟雾中四种有害物质',
  } satisfies Bilingual,
  substancesHeading: {
    en: 'What is in cigarette smoke',
    zh: '香烟烟雾里有什么',
  } satisfies Bilingual,
  substancesIntro: {
    en: 'Four substances in the smoke. Each one does a different kind of damage — together they cause the diseases below.',
    zh: '烟雾中有四种物质。各自造成不同损害——共同引发了下面的疾病。',
  } satisfies Bilingual,
  diseasesHeading: {
    en: 'What smoking does to the body',
    zh: '吸烟对身体的影响',
  } satisfies Bilingual,
  diseasesIntro: {
    en: 'Four diseases the syllabus names. Each card carries a real figure and the mechanism linking the substance above to the disease here.',
    zh: '考纲点名的四种疾病。每张卡片配以真实图示，以及连接上方物质与下方疾病的机理。',
  } satisfies Bilingual,
  mechanismLabel: { en: 'How it harms', zh: '如何伤害' } satisfies Bilingual,
  clinicalLabel: { en: 'What it looks like', zh: '临床表现' } satisfies Bilingual,
} as const

// Shared by the 3D anatomy viewer (`Anatomy3D`). One block because the
// component is the only consumer; if more 3D scenes appear, split it.
export const ANATOMY_3D = {
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a pin to read',
    zh: '拖动旋转·滚轮缩放·点击标记查看',
  } satisfies Bilingual,
} as const

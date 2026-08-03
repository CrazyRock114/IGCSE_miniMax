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

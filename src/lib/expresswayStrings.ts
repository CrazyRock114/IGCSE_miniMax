/**
 * Bilingual interface copy for the Sky G8 Chemistry Expressway.
 *
 * Dedicated to Sky G8 Unit 2: Acids and Bases.
 * Strictly compliant with Cambridge 0620 syllabus.
 * Zero-CJK rule: All CJK literals live in src/lib/ and are rendered via <T value={...} />.
 */

import type { Bilingual } from '@/content/types'

export interface ExpresswayCardData {
  id: string
  icon: string
  badge: Bilingual
  title: Bilingual
  desc: Bilingual
  cta: Bilingual
  path: string
}

export const SKY_G8_EXPRESSWAY = {
  headerBadge: {
    en: 'Sky G8 Revision · Unit 2: Acids & Bases',
    zh: 'Sky G8 专项攻坚 · Unit 2: 酸与碱',
  } as Bilingual,
  title: {
    en: 'Sky G8 Chemistry Expressway',
    zh: 'Sky G8 化学酸碱直通车',
  } as Bilingual,
  subtitle: {
    en: 'Direct high-frequency pathways for Cambridge 0620 Acids, Bases & Salts with interactive simulations, reaction decision trees, and volumetric analysis bench.',
    zh: '专为 Sky G8 化学酸碱单元定制的母舰直通车：直达强弱电离模拟、三种制盐路径决策树与 Paper 5/6 滴定实操台。',
  } as Bilingual,

  cards: [
    {
      id: 'acids-bases-ph',
      icon: '🧪',
      badge: {
        en: '0620.7.1 · Core Simulation',
        zh: '0620.7.1 · 强弱电离对比',
      },
      title: {
        en: 'Acids, Bases & pH Simulation',
        zh: '酸碱与 pH 仿真',
      },
      desc: {
        en: 'Titrate strong and weak acids side by side. Compare degree of dissociation, [H⁺] concentration, and indicator color transitions.',
        zh: '并排对比强酸与弱酸。同浓度下直观感受完全电离与部分电离差异、pH 曲线突跃与指示剂变色。',
      },
      cta: {
        en: 'Launch Simulation ➔',
        zh: '进入酸碱仿真 ➔',
      },
      path: '/lesson/0620/7-1-acids-bases',
    },
    {
      id: 'salts-preparation',
      icon: '⚗️',
      badge: {
        en: '0620.7.3 · Synthesis Tree',
        zh: '0620.7.3 · 三种制盐路径',
      },
      title: {
        en: 'Soluble Salts & Precipitation',
        zh: '可溶盐与沉淀制备法',
      },
      desc: {
        en: 'Three-way salt synthesis decision tree: excess insoluble base, titration with indicator, and ionic precipitation with filtration.',
        zh: '三种制盐路线决策树：过量难溶碱/碳酸盐法、酸碱滴定法与复分解沉淀法，含结晶与纯化全流程。',
      },
      cta: {
        en: 'Explore Routes ➔',
        zh: '进入制备法 ➔',
      },
      path: '/lesson/0620/7-3-salts',
    },
    {
      id: 'titration-practical',
      icon: '🔬',
      badge: {
        en: 'Paper 5/6 · Practical Lab',
        zh: 'Paper 5/6 · 虚拟实验台',
      },
      title: {
        en: 'Acid–Base Titration Workbench',
        zh: '酸碱滴定虚拟实验室',
      },
      desc: {
        en: 'Burette eye-level meniscus reading, white tile color transitions (methyl orange peach, thymolphthalein blue), and concordant titres (±0.10 cm³).',
        zh: '滴定管凹液面平视读数、白瓷板指示剂终点敏锐变色、有效重合体积 (Concordant Titres ≤0.10 cm³) 与容量分析。',
      },
      cta: {
        en: 'Launch Practical Lab ➔',
        zh: '直达滴定实验台 ➔',
      },
      path: '/practical?tab=titration',
    },
  ] as ExpresswayCardData[],
}

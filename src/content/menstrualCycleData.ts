/**
 * 28-Day Menstrual Cycle, 4-Hormone Dynamics & Organ Synchronizer Dataset.
 *
 * Core syllabus anchors:
 * - 0610.16.5.1: Describe the menstrual cycle in terms of changes in the uterus lining and ovary.
 * - 0610.16.5.4: Explain the roles of FSH, LH, oestrogen and progesterone in controlling the
 *   menstrual cycle and their negative/positive feedback loops.
 */

import type { Bilingual, MenstrualTimelineExtra } from '@/content/types'

export interface HormoneState {
  day: number
  fsh: number // Relative scale 0-100
  oestrogen: number // Relative scale 0-100
  lh: number // Relative scale 0-100
  progesterone: number // Relative scale 0-100
  liningThicknessMm: number // 1 to 6 mm
  ovaryPhase: 'follicular' | 'ovulation' | 'luteal' | 'degenerating'
  uterusPhase: 'menstruation' | 'repair' | 'secretory'
  ovaryPhaseName: Bilingual
  uterusPhaseName: Bilingual
  eventNote: Bilingual
}

/**
 * Computes exact hormone levels and anatomical states for any day in a 28-day cycle.
 */
export function getHormoneLevels(day: number, pregnant = false): HormoneState {
  const d = Math.max(1, Math.min(28, Math.round(day)))

  // 1. FSH (Peaks mildly around Day 3-4 to stimulate follicle; small surge at Day 14)
  const fsh =
    d <= 5
      ? 45 + (d - 1) * 3
      : d <= 12
        ? 35 - (d - 5) * 2
        : d === 13 || d === 14
          ? 65
          : 20 - (d - 14) * 0.5

  // 2. Oestrogen (Secreted by growing follicle; sharp peak around Day 12-13)
  const oestrogen =
    d <= 5
      ? 15 + d * 2
      : d <= 13
        ? 25 + Math.pow((d - 5) / 8, 2.5) * 70
        : d <= 16
          ? 40 - (d - 13) * 8
          : d <= 22
            ? 35 + (d - 16) * 3
            : 40 - (d - 22) * 5

  // 3. LH (Quiet until sudden dramatic surge triggering ovulation at Day 13-14)
  const lh =
    d < 12
      ? 12 + d * 0.5
      : d === 12
        ? 35
        : d === 13
          ? 95
          : d === 14
            ? 70
            : d === 15
              ? 25
              : 10

  // 4. Progesterone (Low in follicular phase; produced by corpus luteum, peaks Day 20-22)
  let progesterone = 5
  if (d > 14) {
    if (pregnant) {
      // Maintained high during pregnancy
      progesterone = Math.min(95, 20 + (d - 14) * 5.5)
    } else {
      progesterone =
        d <= 22
          ? 10 + Math.sin(((d - 14) / 8) * (Math.PI / 2)) * 75
          : Math.max(5, 85 - (d - 22) * 14)
    }
  }

  // 5. Uterus lining thickness in mm (1 mm menstruation -> 3.5 mm repair -> 5.5 mm secretory)
  let liningThicknessMm = 1.0
  if (d <= 5) {
    liningThicknessMm = Math.max(1.0, 3.5 - d * 0.5)
  } else if (d <= 14) {
    liningThicknessMm = 1.0 + ((d - 5) / 9) * 2.8
  } else {
    if (pregnant) {
      liningThicknessMm = Math.min(6.0, 3.8 + ((d - 14) / 14) * 2.2)
    } else {
      liningThicknessMm =
        d <= 22
          ? 3.8 + ((d - 14) / 8) * 1.8
          : Math.max(1.2, 5.6 - (d - 22) * 0.7)
    }
  }

  // Phase classifications
  let ovaryPhase: HormoneState['ovaryPhase'] = 'follicular'
  let ovaryPhaseName: Bilingual = { en: 'Follicular Phase', zh: '卵泡期（卵泡发育）' }
  if (d === 13 || d === 14) {
    ovaryPhase = 'ovulation'
    ovaryPhaseName = { en: 'Ovulation', zh: '排卵期（成熟卵子排出）' }
  } else if (d > 14 && d <= 23) {
    ovaryPhase = 'luteal'
    ovaryPhaseName = { en: 'Luteal Phase', zh: '黄体期（黄体分泌孕激素）' }
  } else if (d > 23) {
    ovaryPhase = 'degenerating'
    ovaryPhaseName = { en: 'Corpus Luteum Degeneration', zh: '黄体退化期' }
  }

  let uterusPhase: HormoneState['uterusPhase'] = 'menstruation'
  let uterusPhaseName: Bilingual = { en: 'Menstruation (Flow)', zh: '月经期（内膜脱落出血）' }
  if (d > 5 && d <= 14) {
    uterusPhase = 'repair'
    uterusPhaseName = { en: 'Proliferative / Repair Phase', zh: '增殖修复期（内膜增厚）' }
  } else if (d > 14) {
    uterusPhase = 'secretory'
    uterusPhaseName = { en: 'Secretory Phase', zh: '分泌期（血管充盈维持）' }
  }

  // Notable event description
  let eventNote: Bilingual = {
    en: 'Menstruation: Low progesterone causes old lining to shed. Pituitary starts secreting FSH.',
    zh: '月经期：低孕激素导致子宫内膜脱落；垂体开始分泌 FSH 刺激新卵泡。',
  }
  if (d > 5 && d < 12) {
    eventNote = {
      en: 'Follicle grows and secretes oestrogen, repairing and thickening the endometrium.',
      zh: '卵泡发育并大量分泌雌激素，刺激子宫内膜修复并增厚。',
    }
  } else if (d === 12 || d === 13) {
    eventNote = {
      en: 'High oestrogen level triggers the pituitary LH surge (positive feedback).',
      zh: '高水平雌激素诱发垂体释放 LH 陡增峰值（正反馈调节）。',
    }
  } else if (d === 14) {
    eventNote = {
      en: 'Day 14: LH surge triggers OVULATION — the egg is released into the oviduct!',
      zh: '第 14 天：LH 峰触发排卵——成熟卵子从卵泡破裂释放进入输卵管！',
    }
  } else if (d > 14 && d <= 22) {
    eventNote = {
      en: 'Corpus luteum secretes progesterone, vascularising lining and inhibiting FSH/LH.',
      zh: '残余卵泡形成黄体并分泌孕激素，维持内膜血管丰富并负反馈抑制 FSH/LH。',
    }
  } else if (d > 22) {
    eventNote = pregnant
      ? {
          en: 'Fertilisation & Implantation: Embryo hCG sustains progesterone; lining remains intact!',
          zh: '受精与着床：胚胎信号维持黄体与高孕激素，内膜保持完整不脱落！',
        }
      : {
          en: 'No fertilisation: Corpus luteum breaks down; progesterone plunges, triggering next period.',
          zh: '未受孕：黄体退化萎缩，孕激素急剧跌落，即将诱发下一周期月经。',
        }
  }

  return {
    day: d,
    fsh: Math.round(fsh),
    oestrogen: Math.round(oestrogen),
    lh: Math.round(lh),
    progesterone: Math.round(progesterone),
    liningThicknessMm: Number(liningThicknessMm.toFixed(1)),
    ovaryPhase,
    uterusPhase,
    ovaryPhaseName,
    uterusPhaseName,
    eventNote,
  }
}

export const menstrualTimelineData: MenstrualTimelineExtra = {
  type: 'menstrual-timeline',
  id: 'menstrual-28day-timeline',
  title: {
    en: '28-Day Menstrual Cycle: 4-Hormone & Organ Synchronizer',
    zh: '28天月经周期：四激素与子宫/卵巢动态时间轴联动',
  },
  hint: {
    en: 'Drag the day slider through Days 1–28 to watch FSH, oestrogen, LH, progesterone, follicle release, and uterine lining synchronized in real time.',
    zh: '拖动 1~28 天滑块，实时观察 FSH、雌激素、LH、孕激素的峰值交替以及卵巢排卵与子宫内膜剖面的同步演变。',
  },
  cycleDays: 28,
  examinerNotes: {
    en: 'Paper 4 Core Exam Chain: 1) FSH stimulates follicle; 2) Follicle secretes oestrogen (repairs lining); 3) High oestrogen triggers LH surge; 4) LH triggers ovulation on Day 14; 5) Corpus luteum secretes progesterone (maintains lining, inhibits FSH/LH).',
    zh: 'Paper 4 压轴高频因果链：1) 垂体 FSH 刺激卵泡；2) 卵泡分泌雌激素（修复内膜）；3) 雌激素高峰诱发 LH 尖峰；4) 第14天 LH 峰触发排卵；5) 黄体分泌孕激素（维持内膜并负反馈抑制 FSH/LH）。',
  },
}

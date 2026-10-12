/**
 * Cardiac Cycle, Pressure Curves & Heart Valve State Machine Dataset.
 *
 * Syllabus anchors:
 * - 0610.9.1.5: Describe the functioning of the heart in terms of the contraction of
 *   muscles of the atria and ventricles and the action of the valves in a heartbeat.
 * - 0610.9.1.6: State that the atrioventricular valves prevent backflow from ventricles
 *   to atria, and semilunar valves prevent backflow from arteries to ventricles.
 * - Heart sounds: LUB (AV valves closing at start of ventricular systole) and
 *   DUB (semilunar valves closing at start of diastole).
 */

import type { Bilingual, CardiacCycleExtra } from '@/content/types'

export interface CardiacCyclePhaseDetail {
  id: 'atrial-systole' | 'ventricular-systole' | 'diastole'
  name: Bilingual
  durationSec: number
  startTimeSec: number
  endTimeSec: number
  avValves: 'open' | 'closed'
  slValves: 'open' | 'closed'
  heartSound: Bilingual | null
  bloodFlow: Bilingual
  pressureNote: Bilingual
  leftVentriclePressureMmHg: number
  aortaPressureMmHg: number
  leftAtriumPressureMmHg: number
}

export const CARDIAC_PHASES: CardiacCyclePhaseDetail[] = [
  {
    id: 'atrial-systole',
    name: { en: 'Atrial Systole', zh: '心房收缩期 (0.1s)' },
    durationSec: 0.1,
    startTimeSec: 0.0,
    endTimeSec: 0.1,
    avValves: 'open',
    slValves: 'closed',
    heartSound: null,
    bloodFlow: {
      en: 'Atria contract, squeezing remaining blood down through open AV valves into relaxed ventricles.',
      zh: '左右心房收缩，将剩余血液经张开的房室瓣压入舒张的左右心室。',
    },
    pressureNote: {
      en: 'Atrial pressure rises slightly (~10 mmHg) above ventricular pressure, keeping AV valves open.',
      zh: '心房压力略升至 ~10 mmHg，高于心室压力，促使房室瓣保持张开。',
    },
    leftVentriclePressureMmHg: 12,
    aortaPressureMmHg: 80,
    leftAtriumPressureMmHg: 10,
  },
  {
    id: 'ventricular-systole',
    name: { en: 'Ventricular Systole', zh: '心室收缩期 (0.3s)' },
    durationSec: 0.3,
    startTimeSec: 0.1,
    endTimeSec: 0.4,
    avValves: 'closed',
    slValves: 'open',
    heartSound: { en: '1st Sound: "LUB" (AV valves snap shut)', zh: '第一心音："咚 (LUB)"（房室瓣剧烈闭合）' },
    bloodFlow: {
      en: 'Ventricles contract powerfully from apex up. Blood surges through open semilunar valves into Aorta and Pulmonary Artery.',
      zh: '心室肌由心尖向上强烈收缩，血液冲开动脉半月瓣，高压喷射注入主动脉与肺动脉。',
    },
    pressureNote: {
      en: 'Ventricular pressure shoots up to 120 mmHg, snapping AV valves shut and forcing semilunar valves wide open.',
      zh: '心室压力暴增至 120 mmHg，巨大的心室倒冲压迫使房室瓣骤然闭合，并冲开半月瓣。',
    },
    leftVentriclePressureMmHg: 120,
    aortaPressureMmHg: 120,
    leftAtriumPressureMmHg: 6,
  },
  {
    id: 'diastole',
    name: { en: 'Complete Diastole (Relaxation)', zh: '全心舒张期 (0.4s)' },
    durationSec: 0.4,
    startTimeSec: 0.4,
    endTimeSec: 0.8,
    avValves: 'open',
    slValves: 'closed',
    heartSound: { en: '2nd Sound: "DUB" (Semilunar valves snap shut)', zh: '第二心音："哒 (DUB)"（动脉半月瓣闭合）' },
    bloodFlow: {
      en: 'All chambers relax. Passive filling of atria and ventricles from vena cava and pulmonary veins begins.',
      zh: '全心腔舒张。静脉血持续被动流入心房，并经重开的房室瓣充盈心室。',
    },
    pressureNote: {
      en: 'Ventricular pressure plummets below aortic pressure (~80 mmHg). Arterial backflow catches semilunar cusps, shutting them.',
      zh: '心室压力骤降至 ~2 mmHg，主动脉内血液试图倒流回心室，灌满半月瓣囊袋使其闭合。',
    },
    leftVentriclePressureMmHg: 4,
    aortaPressureMmHg: 82,
    leftAtriumPressureMmHg: 4,
  },
]

/**
 * Returns the exact phase and interpolated pressures at any given cycle time (0.0 to 0.8s).
 */
export function getCardiacStateAtTime(timeSec: number) {
  const t = Math.max(0, Math.min(0.8, timeSec % 0.8))

  let phase = CARDIAC_PHASES[0]!
  if (t < 0.1) {
    phase = CARDIAC_PHASES[0]!
  } else if (t < 0.4) {
    phase = CARDIAC_PHASES[1]!
  } else {
    phase = CARDIAC_PHASES[2]!
  }

  // Calculate left ventricle pressure curve
  let lvPressure = 4
  let aortaPressure = 80
  let laPressure = 4

  if (t < 0.1) {
    // Atrial systole: small bump in atrium and ventricle
    laPressure = 4 + Math.sin((t / 0.1) * Math.PI) * 6
    lvPressure = 4 + Math.sin((t / 0.1) * Math.PI) * 8
    aortaPressure = 80 - t * 20
  } else if (t < 0.4) {
    // Ventricular systole: steep rise up to 120 and back to 100
    const systoleProgress = (t - 0.1) / 0.3
    lvPressure = 12 + Math.sin(systoleProgress * Math.PI) * 108
    aortaPressure = t < 0.16 ? 78 : 80 + Math.sin(((t - 0.16) / 0.24) * Math.PI) * 40
    laPressure = 4 + systoleProgress * 4
  } else {
    // Diastole: low lv pressure, gradual aortic drop from 100 to 80
    const diastoleProgress = (t - 0.4) / 0.4
    lvPressure = Math.max(2, 10 - diastoleProgress * 8)
    aortaPressure = Math.max(80, 100 - diastoleProgress * 20)
    laPressure = 4 + diastoleProgress * 2
  }

  return {
    time: Number(t.toFixed(2)),
    phase,
    lvPressure: Math.round(lvPressure),
    aortaPressure: Math.round(aortaPressure),
    laPressure: Math.round(laPressure),
  }
}

export const cardiacCycleData: CardiacCycleExtra = {
  type: 'cardiac-cycle',
  id: 'cardiac-cycle-valves',
  title: {
    en: 'The Cardiac Cycle: Heart Chamber Pressure & Valve State Machine',
    zh: '心动周期：心腔压力曲线与瓣膜启闭状态机',
  },
  hint: {
    en: 'Scrub through the 0.8-second heartbeat. Watch how AV valves and semilunar valves open and shut in opposite rhythm to generate the "LUB-DUB" heart sounds.',
    zh: '在 0.8 秒的一次心跳中滑动进度条。观察房室瓣与半月瓣如何交替启闭，以及"咚-哒"第一、第二心音的产生机理。',
  },
  phases: CARDIAC_PHASES.map((p) => ({
    id: p.id,
    name: p.name,
    durationSec: p.durationSec,
    avValves: p.avValves,
    slValves: p.slValves,
    bloodFlow: p.bloodFlow,
    pressureNote: p.pressureNote,
  })),
  examinerNotes: {
    en: 'Paper 4 Model Answer: 1) Systole = contraction, Diastole = relaxation; 2) AV valves prevent backflow into atria during ventricular systole; 3) Semilunar valves prevent backflow into ventricles during diastole; 4) Left ventricle wall is much thicker because it pumps against high systemic resistance all over the body.',
    zh: 'Paper 4 压轴采分点：1) 收缩期 (Systole) = 心肌收缩，舒张期 (Diastole) = 心肌舒张；2) 心室收缩时房室瓣关闭防止血液倒流回心房；3) 心室舒张时半月瓣关闭防止血液倒流回心室；4) 左心室壁显著厚于右心室壁，因为需要克服体循环全身各器官的巨大阻力。',
  },
}

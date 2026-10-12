/**
 * Precision Measurement & Timing Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.1.1.1: Measure length and volume with rulers and measuring cylinders.
 * - 0625.1.1.2: Find an average for a small distance or a short time by measuring multiples (e.g. 20 oscillations of a pendulum).
 * - Paper 5/6 Practical skills:
 *   - Micrometer screw gauge (resolution 0.01 mm, zero error correction).
 *   - Vernier callipers (resolution 0.1 mm, main scale + vernier coincidence).
 *   - Simple pendulum timing: measure 20 oscillations using a fiducial marker at equilibrium to reduce human reaction time percentage error.
 */

import type { MeasurementLabExtra } from '@/content/types'

export interface MicrometerReading {
  sleeveMm: number
  thimbleDiv: number
  rawReadingMm: number
  zeroErrorMm: number
  correctedReadingMm: number
}

export function calculateMicrometerReading(
  sleeveMm: number,
  thimbleDiv: number,
  zeroErrorMm = 0,
): MicrometerReading {
  const raw = sleeveMm + thimbleDiv * 0.01
  const corrected = raw - zeroErrorMm
  return {
    sleeveMm,
    thimbleDiv,
    rawReadingMm: Number(raw.toFixed(2)),
    zeroErrorMm,
    correctedReadingMm: Number(corrected.toFixed(2)),
  }
}

export interface VernierReading {
  mainScaleMm: number
  vernierDiv: number
  rawReadingMm: number
  zeroErrorMm: number
  correctedReadingMm: number
}

export function calculateVernierReading(
  mainScaleMm: number,
  vernierDiv: number,
  zeroErrorMm = 0,
): VernierReading {
  const raw = mainScaleMm + vernierDiv * 0.1
  const corrected = raw - zeroErrorMm
  return {
    mainScaleMm,
    vernierDiv,
    rawReadingMm: Number(raw.toFixed(1)),
    zeroErrorMm,
    correctedReadingMm: Number(corrected.toFixed(1)),
  }
}

export interface PendulumResult {
  lengthM: number
  periodSeconds: number
  time20Oscillations: number
  measuredPeriodSeconds: number
}

export function calculatePendulumTiming(lengthM: number, g = 9.8): PendulumResult {
  const theoreticalPeriod = 2 * Math.PI * Math.sqrt(Math.max(0.05, lengthM) / g)
  const time20 = theoreticalPeriod * 20
  const measuredPeriod = time20 / 20
  return {
    lengthM,
    periodSeconds: Number(theoreticalPeriod.toFixed(2)),
    time20Oscillations: Number(time20.toFixed(2)),
    measuredPeriodSeconds: Number(measuredPeriod.toFixed(2)),
  }
}

export const MEASUREMENT_LAB_DEFAULT: MeasurementLabExtra = {
  type: 'measurement-lab',
  id: 'extra-measurement-lab',
  title: {
    en: 'Precision Instruments & Timing Workbench',
    zh: '精密仪器与多周期计时工作台',
  },
  hint: {
    en: 'Rotate the micrometer thimble, slide the vernier jaws, or swing the pendulum to master Paper 5/6 precision measurement techniques.',
    zh: '旋转千分尺微分筒、滑动游标卡尺尺身或摆动单摆，掌握实验卷 Paper 5/6 读数与多次平均避错要领。',
  },
  instruments: [
    {
      id: 'micrometer',
      name: { en: 'Micrometer Screw Gauge', zh: '螺旋测微器 (千分尺)' },
      precisionMm: 0.01,
      description: {
        en: 'Measures small diameters (wires, bearings) to 0.01 mm. Always check for zero error before reading.',
        zh: '用于精确测定微小直径（导线、滚珠等），精度可达 0.01 mm。读数前必须校准并扣除零点误差。',
      },
    },
    {
      id: 'vernier',
      name: { en: 'Vernier Callipers', zh: '游标卡尺' },
      precisionMm: 0.1,
      description: {
        en: 'Measures internal/external diameters and depths to 0.1 mm using main scale and vernier coincident line.',
        zh: '通过主尺毫米数与游标对齐分度线测量内径、外径及深度，精度通常为 0.1 mm。',
      },
    },
    {
      id: 'pendulum',
      name: { en: 'Simple Pendulum Timing', zh: '单摆周期计时 (20次振动求均值)' },
      precisionMm: 1.0,
      description: {
        en: 'Timing 20 complete oscillations and dividing by 20 minimizes human reaction time error (≈ 0.2s).',
        zh: '计时 20 次全振动并除以 20，可将人类反应时间误差（约 0.2s）在单次周期中稀释降至原来 1/20。',
      },
    },
  ],
  examinerNotes: {
    en: 'Cambridge Paper 5/6 Key Rule: When reading a micrometer, true reading = observed reading − zero error. When timing oscillations, count from center of swing (fiducial marker at equilibrium) where bob travels fastest.',
    zh: '剑桥考官实操黄金法则：千分尺真实读数 = 测量读数 − 零点误差（若为正零差则减，负零差则加）。单摆计时务必在平衡位置（摆球速度最快处）放置基准参考标记开始起停秒表。',
  },
}

import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-1-waves',
  subject: '0625',
  syllabus: [
    '0625.3.1.1',
    '0625.3.1.2',
    '0625.3.1.3',
    '0625.3.1.4',
    '0625.3.1.5',
    '0625.3.1.6',
  ],
  tier: 'core',
  estimatedMinutes: 45,

  title: { en: 'Wave motion and the wave equation', zh: '波动与波速公式' },
  summary: {
    en: 'See a wave carry energy without carrying matter, tell transverse from longitudinal, and watch v = fλ hold as you trade frequency against wavelength.',
    zh: '看波如何传递能量而不传递物质，区分横波与纵波，并在频率与波长互换时验证 v = fλ。',
  },

  objectives: [
    { en: 'State that waves transfer energy without transferring matter.', zh: '说明波传递能量而不传递物质。' },
    {
      en: 'Describe wave motion using ropes, springs and water waves.',
      zh: '用绳、弹簧与水波描述波动。',
    },
    {
      en: 'Use the terms wavefront, wavelength, frequency, crest, trough, amplitude and wave speed.',
      zh: '使用波前、波长、频率、波峰、波谷、振幅与波速等术语。',
    },
    { en: 'Recall and use the wave equation v = fλ.', zh: '记住并使用波速公式 v = fλ。' },
    {
      en: 'Know that a transverse wave vibrates at right angles to its direction of travel.',
      zh: '知道横波的振动方向与传播方向垂直。',
    },
    {
      en: 'Know that a longitudinal wave vibrates parallel to its direction of travel.',
      zh: '知道纵波的振动方向与传播方向平行。',
    },
  ],

  glossary: [
    {
      en: 'wavelength',
      zh: '波长',
      definition: {
        en: 'The distance over which the wave pattern repeats — crest to crest, or compression to compression. Symbol λ.',
        zh: '波形重复一次的距离——波峰到波峰，或密部到密部。符号 λ。',
      },
      syllabus: ['0625.3.1.3'],
    },
    {
      en: 'frequency',
      zh: '频率',
      definition: {
        en: 'The number of complete waves passing a point each second, measured in hertz.',
        zh: '每秒通过某点的完整波的个数，单位赫兹。',
      },
      syllabus: ['0625.3.1.3'],
    },
    {
      en: 'amplitude',
      zh: '振幅',
      definition: {
        en: 'The maximum displacement of a particle from its rest position — the middle to a crest, not the full crest-to-trough height.',
        zh: '粒子离开平衡位置的最大位移——从中线到波峰，不是波峰到波谷的全高。',
      },
      syllabus: ['0625.3.1.3'],
    },
    {
      en: 'wavefront',
      zh: '波前',
      definition: {
        en: 'A line joining points on a wave that are all doing the same thing at the same moment.',
        zh: '连接波上同一时刻状态相同各点的线。',
      },
      syllabus: ['0625.3.1.3'],
    },
    {
      en: 'transverse wave',
      zh: '横波',
      definition: {
        en: 'A wave whose particles vibrate at right angles to the direction of travel. Light and water waves are transverse.',
        zh: '粒子振动方向与传播方向垂直的波。光和水波是横波。',
      },
      syllabus: ['0625.3.1.5'],
    },
    {
      en: 'longitudinal wave',
      zh: '纵波',
      definition: {
        en: 'A wave whose particles vibrate along the direction of travel, forming compressions and rarefactions. Sound is longitudinal.',
        zh: '粒子沿传播方向振动的波，形成密部与疏部。声波是纵波。',
      },
      syllabus: ['0625.3.1.6'],
    },
  ],

  equations: [
    {
      latex: 'v = f\\lambda',
      meaning: {
        en: 'Wave speed equals frequency times wavelength. In a given medium the speed is fixed, so f and λ trade off.',
        zh: '波速等于频率乘波长。在给定介质中波速固定，因此频率与波长此消彼长。',
      },
      substitute: (r) =>
        `v = ${formatSigFigs(r['waveSpeed'] ?? 0, 3)}\\ \\text{m/s},\\quad \\lambda = ${formatSigFigs(
          r['wavelength'] ?? 0,
          3
        )}\\ \\text{m}`,
    },
    {
      latex: 'T = \\frac{1}{f}',
      meaning: {
        en: 'The period is the time for one complete wave — the reciprocal of the frequency.',
        zh: '周期是完成一次全振动所需的时间——频率的倒数。',
      },
      substitute: (r) => `T = ${formatSigFigs(r['period'] ?? 0, 3)}\\ \\text{s}`,
    },
  ],

  sim: {
    primitive: 'waves',
    kernel: '3-1-waves',
    animate: { param: 't', speed: 1, loop: 60 },
    hint: {
      en: 'Double the frequency and halve the wavelength — the speed comes back to where it started.',
      zh: '把频率加倍、波长减半——波速会回到原来的值。',
    },
    params: [
      {
        key: 'longitudinal',
        label: { en: 'Wave type', zh: '波的类型' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Transverse', zh: '横波' } },
          { value: 1, label: { en: 'Longitudinal', zh: '纵波' } },
        ],
      },
      {
        key: 'frequency',
        label: { en: 'Frequency', zh: '频率' },
        unit: 'Hz',
        symbol: 'f',
        min: 0.2,
        max: 4,
        step: 0.1,
        default: 1,
      },
      {
        key: 'wavelength',
        label: { en: 'Wavelength', zh: '波长' },
        unit: 'm',
        symbol: 'λ',
        min: 0.4,
        max: 2,
        step: 0.1,
        default: 1,
      },
      {
        key: 'amplitude',
        label: { en: 'Amplitude', zh: '振幅' },
        unit: 'm',
        symbol: 'A',
        min: 0.1,
        max: 1,
        step: 0.05,
        default: 0.6,
      },
      {
        key: 't',
        label: { en: 'Time', zh: '时间' },
        unit: 's',
        min: 0,
        max: 60,
        step: 0.01,
        default: 0,
        hidden: true,
      },
    ],
    readouts: [
      {
        key: 'waveSpeed',
        label: { en: 'Wave speed', zh: '波速' },
        unit: 'm / s',
        symbol: 'v',
        sigFigs: 3,
      },
      { key: 'period', label: { en: 'Period', zh: '周期' }, unit: 's', symbol: 'T', sigFigs: 3 },
      {
        key: 'wavesVisible',
        label: { en: 'Waves in view', zh: '视野内波数' },
        unit: '',
        sigFigs: 2,
      },
      {
        key: 'amplitude',
        label: { en: 'Amplitude', zh: '振幅' },
        unit: 'm',
        symbol: 'A',
        sigFigs: 2,
      },
    ],
    presets: [
      {
        label: { en: 'Transverse', zh: '横波' },
        params: { frequency: 1, wavelength: 1, amplitude: 0.6, longitudinal: 0 },
      },
      {
        label: { en: 'Longitudinal', zh: '纵波' },
        params: { frequency: 1, wavelength: 1, amplitude: 0.6, longitudinal: 1 },
      },
      {
        label: { en: 'Same speed, double f', zh: '波速不变，频率加倍' },
        params: { frequency: 2, wavelength: 0.5, amplitude: 0.6, longitudinal: 0 },
      },
      {
        label: { en: 'Bigger amplitude only', zh: '只增大振幅' },
        params: { frequency: 1, wavelength: 1, amplitude: 1, longitudinal: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '3-1-waves-cp1',
      syllabus: ['0625.3.1.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 1,
      stem: 'State what is transferred by a wave as it travels through a medium.',
      options: ['Energy', 'Matter', 'Both energy and matter', 'Neither energy nor matter'],
      answerIndex: 0,
      markScheme: [{ text: 'Energy', marks: 1 }],
      examinerNote: {
        en: 'Waves transfer energy only. The particles of the medium vibrate about fixed positions and do not travel with the wave.',
        zh: '波只传递能量。介质粒子在固定位置附近振动，并不随波迁移。',
      },
    },
    {
      id: '3-1-waves-cp2',
      syllabus: ['0625.3.1.4'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A water wave has a frequency of 2.5 Hz and a wavelength of 0.80 m. Calculate the speed of the wave.',
      markScheme: [
        { text: 'Uses v = fλ', marks: 1 },
        { text: 'Correct substitution: 2.5 × 0.80', marks: 1 },
        { text: '2.0 m / s', marks: 1 },
      ],
      examinerNote: {
        en: 'Watch for frequencies given in kHz or MHz and wavelengths in cm or nm — converting to hertz and metres first prevents the most common error in this topic.',
        zh: '注意题目中频率可能用 kHz 或 MHz、波长可能用 cm 或 nm——先换成赫兹和米可避免本主题最常见的错误。',
      },
    },
    {
      id: '3-1-waves-cp3',
      syllabus: ['0625.3.1.5', '0625.3.1.6'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 2,
      stem: 'Compare the direction of vibration of the particles in a transverse wave with that in a longitudinal wave.',
      markScheme: [
        {
          text: 'In a transverse wave the particles vibrate at right angles to the direction of travel',
          marks: 1,
          alternatives: ['perpendicular to the direction of propagation'],
        },
        {
          text: 'whereas in a longitudinal wave they vibrate parallel to (along) the direction of travel',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The command word is Compare, so both halves must be linked in one contrast — "at right angles" on its own does not answer the question asked.',
        zh: '命令词是 Compare，两部分必须对照着写在一起——只写"垂直"并没有回答所问的问题。',
      },
    },
    {
      id: '3-1-waves-cp4',
      syllabus: ['0625.3.1.3'],
      tier: 'core',
      commandWord: 'Determine',
      marks: 2,
      stem: 'A displacement–distance graph shows a wave with crests 1.2 m apart. The vertical distance from a crest to a trough is 8.0 cm. Determine the wavelength and the amplitude of the wave.',
      markScheme: [
        { text: 'Wavelength = 1.2 m', marks: 1 },
        { text: 'Amplitude = 4.0 cm (half the crest-to-trough distance)', marks: 1, alternatives: ['0.040 m'] },
      ],
      examinerNote: {
        en: 'Amplitude is measured from the rest position to a crest, so it is half the crest-to-trough height. Quoting 8.0 cm is the classic mistake here.',
        zh: '振幅从平衡位置量到波峰，因此是波峰到波谷高度的一半。写 8.0 cm 是这里的典型错误。',
      },
    },
  ],
}

export default lesson

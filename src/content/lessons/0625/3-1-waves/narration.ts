import type { NarrationScript } from '@/content/types'

export const wavesNarration: NarrationScript = {
  id: '3-1-waves',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Energy without matter', zh: '传能量，不传物质' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A wave carries energy from one place to another without carrying any matter with it. Watch the green particles: each one just vibrates about its own position. None of them travels along with the wave.',
            zh: '波把能量从一处传到另一处，却不带走任何物质。看那些绿色粒子：每一个都只在自己的位置附近振动，没有一个随波一起前进。',
          },
          action: {
            type: 'setParams',
            params: { frequency: 1, wavelength: 1, amplitude: 0.6, longitudinal: 0 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Below the medium is the displacement graph — the picture an exam question will actually give you. The purple bar marks one wavelength: the distance over which the pattern repeats.',
            zh: '介质下方是位移图像——这才是考题真正会给你的图。紫色标尺标出一个波长：图形重复一次所经过的距离。',
          },
        },
      ],
    },
    {
      id: 'types',
      type: 'concept',
      title: { en: 'Transverse or longitudinal', zh: '横波还是纵波' },
      lines: [
        {
          id: 'types-1',
          text: {
            en: 'In a transverse wave the particles vibrate at right angles to the direction the wave travels. Light, water waves and seismic S-waves all behave this way.',
            zh: '横波中粒子的振动方向与波的传播方向垂直。光、水波和地震 S 波都是这样。',
          },
        },
        {
          id: 'types-2',
          text: {
            en: 'Now switch to longitudinal. The particles vibrate along the direction of travel instead, bunching into compressions and spreading into rarefactions. Sound and seismic P-waves do this.',
            zh: '现在切换到纵波。粒子改为沿传播方向振动，挤在一起形成密部，散开形成疏部。声波和地震 P 波就是这样。',
          },
          action: {
            type: 'setParams',
            params: { frequency: 1, wavelength: 1, amplitude: 0.6, longitudinal: 1 },
          },
          pause: 1,
        },
        {
          id: 'types-3',
          text: {
            en: 'Notice the graph underneath looks identical. That catches people out: a displacement graph never tells you which type of wave it is. Only the question text does.',
            zh: '注意下方的图像看起来完全一样。这一点最容易骗人：位移图像永远不能告诉你这是哪种波，只有题目文字才能。',
          },
        },
      ],
    },
    {
      id: 'equation',
      type: 'equation',
      title: { en: 'The wave equation', zh: '波速公式' },
      lines: [
        {
          id: 'eq-1',
          text: {
            en: 'Wave speed is frequency times wavelength. Watch the speed readout as I double the frequency — the wave visibly moves faster.',
            zh: '波速等于频率乘波长。看我把频率加倍时的波速读数——波明显跑得更快了。',
          },
          latex: 'v = f\\lambda',
          action: {
            type: 'setParams',
            params: { frequency: 2, wavelength: 1, amplitude: 0.6, longitudinal: 0 },
          },
        },
        {
          id: 'eq-2',
          text: {
            en: 'Now I halve the wavelength as well. Frequency doubled, wavelength halved — and the speed is back where it started. In a given medium the speed is fixed, so f and lambda always trade off against each other.',
            zh: '现在我把波长也减半。频率加倍、波长减半——波速又回到了原值。在给定介质中波速是固定的，所以频率与波长总是此消彼长。',
          },
          action: {
            type: 'setParams',
            params: { frequency: 2, wavelength: 0.5, amplitude: 0.6, longitudinal: 0 },
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'amplitude',
      type: 'interaction',
      title: { en: 'Amplitude is separate', zh: '振幅是另一回事' },
      lines: [
        {
          id: 'amp-1',
          text: {
            en: 'Amplitude is how far each particle moves from its rest position. Increase it and the wave carries more energy — but the speed does not change at all. Amplitude, frequency and wavelength are independent ideas.',
            zh: '振幅是每个粒子离开平衡位置的最大距离。增大振幅，波携带更多能量——但波速完全不变。振幅、频率与波长是彼此独立的概念。',
          },
          action: {
            type: 'setParams',
            params: { frequency: 1, wavelength: 1, amplitude: 1, longitudinal: 0 },
          },
        },
      ],
    },
    {
      id: 'summary',
      type: 'summary',
      title: { en: 'What to take into the exam', zh: '考场上要记住的' },
      lines: [
        {
          id: 'summary-1',
          text: {
            en: 'Wavelength is measured crest to crest, not crest to trough. Amplitude is from the middle to a crest, not the full height. And check your units before using v equals f lambda — a frequency in kilohertz will wreck the answer.',
            zh: '波长要从波峰量到波峰，不是波峰到波谷。振幅是从中线量到波峰，不是全高。用 v = fλ 前先检查单位——频率若是千赫兹会毁掉整个答案。',
          },
        },
      ],
    },
  ],
}

export default wavesNarration

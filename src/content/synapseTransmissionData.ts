/**
 * Synaptic Transmission, Neurotransmitter Diffusion & Directionality Dataset.
 *
 * Syllabus anchors:
 * - 0610.14.1.7: Describe the structure of a synapse, including the synaptic knob,
 *   synaptic vesicles, neurotransmitter, synaptic cleft and receptor molecules.
 * - 0610.14.1.8: Describe the sequence of events across a synapse:
 *   impulse arrives -> vesicle fusion -> neurotransmitter release -> diffusion across cleft ->
 *   binding to complementary receptor -> new impulse initiated.
 * - Explain why impulses travel in ONE DIRECTION ONLY.
 */

import type { Bilingual, SynapseTransmissionExtra } from '@/content/types'

export interface SynapticStepDetail {
  stepNumber: number
  title: Bilingual
  description: Bilingual
  detail: Bilingual
  activeElements: {
    impulsePre: boolean
    vesicleMoving: boolean
    moleculesInCleft: boolean
    receptorBound: boolean
    impulsePost: boolean
    enzymeActive: boolean
  }
}

export const SYNAPSE_STEPS: SynapticStepDetail[] = [
  {
    stepNumber: 1,
    title: { en: '1. Nerve Impulse Reaches Synaptic Knob', zh: '1. 神经冲动抵达突触前小体' },
    description: {
      en: 'An electrical action potential travels down the axon of the pre-synaptic neurone and reaches the swollen synaptic terminal.',
      zh: '电脉冲（动作电位）沿突触前神经元的轴突传导，抵达膨大的突触小体末端。',
    },
    detail: {
      en: 'Electrical signal depolarises the pre-synaptic membrane, causing voltage-gated calcium channels to open.',
      zh: '膜电位去极化促使突触小体膜上的钙离子通道开放，钙离子内流。',
    },
    activeElements: {
      impulsePre: true,
      vesicleMoving: false,
      moleculesInCleft: false,
      receptorBound: false,
      impulsePost: false,
      enzymeActive: false,
    },
  },
  {
    stepNumber: 2,
    title: { en: '2. Vesicles Move and Fuse with Membrane', zh: '2. 突触小泡向突触前膜移动并融合' },
    description: {
      en: 'Synaptic vesicles containing neurotransmitter (e.g. acetylcholine) migrate towards the pre-synaptic membrane.',
      zh: '储存神经递质（如乙酰胆碱）的突触小泡受刺激向突触前膜迁移并与其紧密融合。',
    },
    detail: {
      en: 'Vesicle membranes fuse with the pre-synaptic surface, preparing for exocytotic release.',
      zh: '小泡膜与前膜融合，为递质的胞吐外排做好准备。',
    },
    activeElements: {
      impulsePre: false,
      vesicleMoving: true,
      moleculesInCleft: false,
      receptorBound: false,
      impulsePost: false,
      enzymeActive: false,
    },
  },
  {
    stepNumber: 3,
    title: { en: '3. Neurotransmitter Released into Cleft', zh: '3. 神经递质胞吐释放进入突触间隙' },
    description: {
      en: 'Neurotransmitter molecules are released by exocytosis into the microscopic 20-nanometre synaptic cleft.',
      zh: '成千上万个神经递质分子通过胞吐方式排入宽约 20 纳米的微观突触间隙液体中。',
    },
    detail: {
      en: 'Electrical signal cannot jump the fluid gap — transmission switches from electrical to chemical.',
      zh: '电信号无法直接跳过充满液体的缝隙——信号由"电信号"转换为"化学信号"。',
    },
    activeElements: {
      impulsePre: false,
      vesicleMoving: false,
      moleculesInCleft: true,
      receptorBound: false,
      impulsePost: false,
      enzymeActive: false,
    },
  },
  {
    stepNumber: 4,
    title: { en: '4. Diffusion Across the Synaptic Cleft', zh: '4. 递质分子在突触间隙中扩散' },
    description: {
      en: 'Neurotransmitter molecules diffuse across the narrow cleft from high concentration to low concentration.',
      zh: '神经递质分子顺浓度梯度从突触前膜侧迅速向突触后膜侧扩散（历时不足 0.5 毫秒）。',
    },
    detail: {
      en: 'Passive diffusion is extremely rapid over a tiny 20 nm distance.',
      zh: '因为突触间隙距离极短（仅 20 纳米），被动扩散极其迅速。',
    },
    activeElements: {
      impulsePre: false,
      vesicleMoving: false,
      moleculesInCleft: true,
      receptorBound: false,
      impulsePost: false,
      enzymeActive: false,
    },
  },
  {
    stepNumber: 5,
    title: { en: '5. Binding to Specific Receptors', zh: '5. 递质与突触后膜特异性受体结合' },
    description: {
      en: 'Neurotransmitter molecules bind to complementary receptor proteins on the post-synaptic membrane.',
      zh: '递质分子与突触后膜上空间构象互补的受体蛋白特异性结合。',
    },
    detail: {
      en: 'Binding opens ion channels (e.g. Na⁺), triggering a NEW electrical impulse along the post-synaptic neurone.',
      zh: '受体结合触发离子通道（如钠通道）开放，在突触后神经元上激发产生新的电脉冲！',
    },
    activeElements: {
      impulsePre: false,
      vesicleMoving: false,
      moleculesInCleft: false,
      receptorBound: true,
      impulsePost: true,
      enzymeActive: false,
    },
  },
  {
    stepNumber: 6,
    title: { en: '6. Enzymatic Inactivation & Recycling', zh: '6. 酶解灭活与递质前体回收' },
    description: {
      en: 'Enzyme (acetylcholinesterase) breaks down neurotransmitter in the cleft to prevent continuous stimulation.',
      zh: '乙酰胆碱酯酶迅速水解游离递质，防止突触后膜被持续异常兴奋刺激。',
    },
    detail: {
      en: 'Breakdown products are reabsorbed into the pre-synaptic knob and rebuilt into neurotransmitter using ATP.',
      zh: '降解碎片被突触前膜重新摄取吸收，并利用线粒体产生的 ATP 重新合成储备小泡。',
    },
    activeElements: {
      impulsePre: false,
      vesicleMoving: false,
      moleculesInCleft: false,
      receptorBound: false,
      impulsePost: false,
      enzymeActive: true,
    },
  },
]

export const synapseTransmissionData: SynapseTransmissionExtra = {
  type: 'synapse-transmission',
  id: 'synaptic-transmission-walkthrough',
  title: {
    en: 'Synaptic Transmission: 6-Step Chemical Relay & Directionality Gate',
    zh: '突触传递：6步化学中继与单向传导闸门机制',
  },
  hint: {
    en: 'Step through the 6 events of synaptic transmission: impulse arrival, vesicle release, cleft diffusion, complementary receptor binding, post-synaptic firing, and enzymatic breakdown.',
    zh: '逐步体验突触传递的 6 个关键阶段：脉冲抵达、小泡释放、间隙扩散、受体互补结合、后膜脉冲触发及酶解复位。',
  },
  steps: SYNAPSE_STEPS.map((s) => ({
    stepNumber: s.stepNumber,
    title: s.title,
    description: s.description,
    detail: s.detail,
  })),
  examinerNotes: {
    en: 'Paper 4 Core Exam Traps: 1) Why can impulses travel in ONE DIRECTION ONLY? Synaptic vesicles containing neurotransmitter are ONLY present in the pre-synaptic neurone, and specific receptors are ONLY present on the post-synaptic membrane; 2) What ensures the signal is not continuous? Enzymes break down the neurotransmitter in the synaptic cleft.',
    zh: 'Paper 4 压轴高频必背因果链：1) 为什么神经冲动只能单向传导？突触小泡与神经递质仅存在于突触前神经元中，而特异性受体蛋白仅存在于突触后膜上；2) 为什么后膜不会持续兴奋？突触间隙中的酶（乙酰胆碱酯酶）迅速分解灭活神经递质。',
  },
}

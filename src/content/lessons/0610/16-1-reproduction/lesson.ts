import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '16-1-reproduction',
  subject: '0610',
  syllabus: [
    '0610.16.1.1',
    '0610.16.1.2',
    '0610.16.1.3',
    '0610.16.2.1',
    '0610.16.2.2',
    '0610.16.2.3',
    '0610.16.2.4',
    '0610.16.3.1',
    '0610.16.3.2',
    '0610.16.3.3',
    '0610.16.3.4',
    '0610.16.3.5',
    '0610.16.3.6',
    '0610.16.3.7',
    '0610.16.3.8',
    '0610.16.3.9',
    '0610.16.3.10',
    '0610.16.3.11',
    '0610.16.3.12',
    '0610.16.4.1',
    '0610.16.4.2',
    '0610.16.4.3',
    '0610.16.4.4',
    '0610.16.4.5',
    '0610.16.4.6',
    '0610.16.4.7',
    '0610.16.4.8',
    '0610.16.4.9',
    '0610.16.4.10',
    '0610.16.5.1',
    '0610.16.5.2',
    '0610.16.5.3',
    '0610.16.5.4',
    '0610.16.6.1',
    '0610.16.6.2',
    '0610.16.6.3',
    '0610.16.6.4',
    '0610.16.6.5',
  ],
  tier: 'extended',
  estimatedMinutes: 75,

  title: { en: 'Reproduction', zh: '生殖' },
  summary: {
    en: 'Ovulation is fourteen days before the next period, not fourteen days after the last one. Lengthen the cycle and watch it move.',
    zh: '排卵是在下一次月经的前十四天，而不是上一次月经之后的第十四天。把周期调长，看它如何移动。',
  },

  objectives: [
    {
      en: 'Describe asexual and sexual reproduction, and discuss the advantages and disadvantages of each. (Extended)',
      zh: '描述无性生殖与有性生殖，并讨论各自的优缺点。（Extended）',
    },
    {
      en: 'Identify the parts of an insect-pollinated flower and state their functions.',
      zh: '识别虫媒花的各部分并说出其功能。',
    },
    {
      en: 'Describe pollination and fertilisation in plants, and the adaptations of insect- and wind-pollinated flowers.',
      zh: '描述植物的传粉与受精，以及虫媒花与风媒花的适应特征。',
    },
    {
      en: 'Describe self- and cross-pollination and their effects on a population, and the growth of the pollen tube. (Extended)',
      zh: '描述自花与异花传粉及其对种群的影响，以及花粉管的生长。（Extended）',
    },
    {
      en: 'Identify the parts of the human reproductive systems and explain the adaptive features of sperm and egg cells.',
      zh: '识别人体生殖系统各部分，并解释精子与卵细胞的适应性特征。',
    },
    {
      en: 'State the functions of the placenta, umbilical cord and amniotic sac, and describe exchange at the placenta. (Extended)',
      zh: '说出胎盘、脐带与羊膜囊的功能，并描述胎盘处的物质交换。（Extended）',
    },
    {
      en: 'Describe and explain the hormonal control of the menstrual cycle and of pregnancy. (Extended)',
      zh: '描述并解释月经周期与妊娠的激素调控。（Extended）',
    },
    {
      en: 'Describe sexually transmitted infections, the transmission of HIV, and how their spread is controlled.',
      zh: '描述性传播感染、HIV 的传播途径，以及如何控制其扩散。',
    },
  ],

  glossary: [
    {
      en: 'pollination',
      zh: '传粉',
      definition: {
        en: 'The transfer of pollen from an anther to a stigma. Not fertilisation — that happens afterwards, when nuclei fuse.',
        zh: '花粉由花药转移到柱头。它不是受精——受精发生在其后，当细胞核融合时。',
      },
      syllabus: ['0610.16.3.5'],
    },
    {
      en: 'fertilisation',
      zh: '受精',
      definition: {
        en: 'The fusion of the nuclei of two gametes, giving a diploid zygote. In humans it happens in the oviduct.',
        zh: '两个配子细胞核的融合，形成二倍体合子。在人体中它发生于输卵管。',
      },
      syllabus: ['0610.16.2.2', '0610.16.4.3'],
    },
    {
      en: 'zygote',
      zh: '合子',
      definition: {
        en: 'The diploid cell formed when two haploid gamete nuclei fuse. It divides to form an embryo.',
        zh: '两个单倍体配子核融合后形成的二倍体细胞。它分裂形成胚胎。',
      },
      syllabus: ['0610.16.2.3'],
    },
    {
      en: 'corpus luteum',
      zh: '黄体',
      definition: {
        en: 'What remains of the follicle after ovulation. It secretes progesterone, and breaks down if no embryo implants.',
        zh: '排卵后卵泡剩余的部分。它分泌孕激素，若无胚胎植入便会退化。',
      },
      syllabus: ['0610.16.5.3'],
    },
    {
      en: 'placenta',
      zh: '胎盘',
      definition: {
        en: 'The organ where the mother’s and the fetus’s blood come close enough to exchange materials by diffusion — without ever mixing.',
        zh: '母体血液与胎儿血液足够接近以进行扩散交换的器官——但两者从不混合。',
      },
      syllabus: ['0610.16.4.8', '0610.16.4.9'],
    },
    {
      en: 'acrosome',
      zh: '顶体',
      definition: {
        en: 'The tip of a sperm, holding enzymes that digest a path through the outer layers of the egg.',
        zh: '精子的顶端，内含能消化卵细胞外层、开出通路的酶。',
      },
      syllabus: ['0610.16.4.4'],
    },
    {
      en: 'amniotic fluid',
      zh: '羊水',
      definition: {
        en: 'The fluid in the amniotic sac. It cushions the fetus against knocks and supports its weight.',
        zh: '羊膜囊中的液体。它缓冲外来撞击并支撑胎儿的重量。',
      },
      syllabus: ['0610.16.4.8'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'plot2d',
    kernel: '16-1-reproduction',
    hint: {
      en: 'Step the day through one cycle and follow the lining first. Then switch the pregnancy on, and then lengthen the cycle.',
      zh: '把日期逐天推进一个周期，先跟着子宫内膜看。然后打开"妊娠"，再把周期调长。',
    },
    params: [
      {
        key: 'day',
        label: { en: 'Day of the cycle', zh: '周期的第几天' },
        unit: '',
        min: 1,
        max: 35,
        step: 1,
        default: 14,
      },
      {
        key: 'cycleLength',
        label: { en: 'Length of the cycle', zh: '周期长度' },
        unit: 'days',
        min: 21,
        max: 35,
        step: 1,
        default: 28,
      },
      {
        key: 'pregnant',
        label: { en: 'Was the egg fertilised?', zh: '卵子是否受精？' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'No', zh: '否' } },
          { value: 1, label: { en: 'Yes', zh: '是' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'ovulation',
        label: { en: 'Ovulation falls on day', zh: '排卵发生在第几天' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'oestrogen',
        label: { en: 'Oestrogen today', zh: '当天的雌激素' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'progesterone',
        label: { en: 'Progesterone today', zh: '当天的孕激素' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'lining',
        label: { en: 'Lining thickness today', zh: '当天的内膜厚度' },
        unit: 'mm',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Menstruation', zh: '月经期' },
        params: { day: 2, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Rebuilding the lining', zh: '内膜重建期' },
        params: { day: 10, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Ovulation: the LH surge', zh: '排卵：LH 峰' },
        params: { day: 14, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Progesterone at its peak', zh: '孕激素峰值' },
        params: { day: 21, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'No pregnancy: the lining goes', zh: '未受孕：内膜脱落' },
        params: { day: 27, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Pregnancy: it is maintained', zh: '妊娠：内膜得以维持' },
        params: { day: 27, cycleLength: 28, pregnant: 1 },
      },
      {
        label: { en: 'A 35-day cycle', zh: '35 天的周期' },
        params: { day: 21, cycleLength: 35, pregnant: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-16-1-cp1',
      syllabus: ['0610.16.5.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the hormones FSH, oestrogen, LH and progesterone control the menstrual cycle.',
      markScheme: [
        {
          text: 'FSH from the pituitary gland causes a follicle to develop in the ovary and stimulates the ovary to secrete oestrogen',
          marks: 1,
        },
        {
          text: 'Oestrogen causes the uterus lining to thicken, and when it is high enough it triggers a surge of LH',
          marks: 1,
        },
        { text: 'The LH surge causes ovulation — the release of the egg from the follicle', marks: 1 },
        {
          text: 'Progesterone from the corpus luteum maintains the thickened lining and inhibits FSH and LH',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Answer it as a chain of causes, not four separate descriptions. Each hormone should be doing something *to* the next stage.',
        zh: '要把它当作一条因果链来答，而不是四段互不相干的描述。每种激素都应当对下一阶段"起作用"。',
      },
    },
    {
      id: '0610-16-1-cp2',
      syllabus: ['0610.16.5.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why menstruation does not occur if the egg is fertilised and the embryo implants.',
      markScheme: [
        {
          text: 'The corpus luteum is maintained rather than breaking down, so progesterone stays high',
          marks: 1,
        },
        { text: 'Progesterone maintains the thickened uterus lining', marks: 1 },
        {
          text: 'so the lining is not shed, and it continues to supply the embryo until the placenta takes over',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The mechanism is progesterone *not falling*. Answers that say "the body knows it is pregnant" describe the outcome without naming the hormone.',
        zh: '机制在于孕激素"没有下降"。写"身体知道自己怀孕了"只是描述结果，没有说出激素。',
      },
    },
    {
      id: '0610-16-1-cp3',
      syllabus: ['0610.16.4.9'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'At the placenta the blood of the mother and the blood of the fetus come very close together but do not mix. Explain why they must not mix, and state two substances that pass from mother to fetus.',
      markScheme: [
        {
          text: 'The mother’s blood is at a much higher pressure and would damage the fetus’s vessels',
          marks: 1,
        },
        {
          text: 'The two may have different blood groups, so the blood could clot / agglutinate',
          marks: 1,
        },
        { text: 'Two from: oxygen, glucose, amino acids, antibodies, water, minerals', marks: 1 },
      ],
      examinerNote: {
        en: 'Say "exchange by diffusion", never "the blood passes across". Materials cross the placenta; blood does not.',
        zh: '要写"通过扩散进行交换"，绝不要写"血液流过去"。穿过胎盘的是物质，不是血液。',
      },
    },
    {
      id: '0610-16-1-cp4',
      syllabus: ['0610.16.4.4', '0610.16.4.5', '0610.16.4.6'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare a human sperm cell with a human egg cell, giving three differences and relating each to its function.',
      markScheme: [
        {
          text: 'The sperm is much smaller and has a tail so that it can swim to the egg; the egg is large and does not move itself',
          marks: 1,
        },
        {
          text: 'The egg has a large amount of cytoplasm containing a food store for the early embryo; the sperm has very little',
          marks: 1,
        },
        {
          text: 'Sperm are produced in millions while one egg is usually released per cycle; or the sperm has an acrosome of enzymes to penetrate the egg',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Relating each to its function" is part of the question. A list of differences with no reasons scores about half.',
        zh: '"把每一点与功能联系起来"是题目的一部分。只列差异而不给理由，大约只能得一半分。',
      },
    },
    {
      id: '0610-16-1-cp5',
      syllabus: ['0610.16.3.7'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the structure of a wind-pollinated flower is adapted for pollination by wind.',
      markScheme: [
        {
          text: 'Anthers hang outside the flower so that the wind can carry the pollen away',
          marks: 1,
        },
        {
          text: 'Stigmas are large and feathery, giving a large surface area to catch pollen from the air',
          marks: 1,
        },
        {
          text: 'Pollen is produced in very large quantities, because most of it will not land on a stigma',
          marks: 1,
        },
        {
          text: 'Pollen grains are small, light and smooth so that they are carried easily by the wind',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Every feature needs its reason. "It has no petals" alone scores nothing — the mark is for saying there is no insect to attract.',
        zh: '每个特征都要给出理由。只写"它没有花瓣"不得分——得分点在于说明没有需要吸引的昆虫。',
      },
    },
    {
      id: '0610-16-1-cp6',
      syllabus: ['0610.16.1.3', '0610.16.2.4'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A grower propagates strawberry plants from runners rather than from seed. Suggest one advantage and one disadvantage of this for the grower.',
      markScheme: [
        {
          text: 'Advantage: the offspring are genetically identical to the parent, so a variety with desirable features is reproduced exactly',
          marks: 1,
        },
        {
          text: 'It is also faster and needs no pollinator or second plant',
          marks: 1,
        },
        {
          text: 'Disadvantage: there is no genetic variation, so a single disease or change in conditions could destroy the whole crop',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The question asks for both sides, so give both. And the disadvantage is about the whole crop, not about an individual plant being weaker.',
        zh: '题目要求两面都答，就都要写。而缺点针对的是整片作物，不是说单株植物更弱。',
      },
    },
    {
      id: '0610-16-1-cp7',
      syllabus: ['0610.16.6.4', '0610.16.6.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe two ways in which HIV is transmitted, and describe two methods used to control the spread of the infection.',
      markScheme: [
        {
          text: 'Two from: unprotected sexual contact; sharing needles; transfusion of infected blood; mother to child across the placenta, during birth or in breast milk',
          marks: 2,
        },
        {
          text: 'Two from: using condoms; screening donated blood; using single-use needles; testing and treating those infected; education about transmission',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'HIV is not spread by ordinary contact — sharing cups, shaking hands or coughing. Naming one of those loses the mark.',
        zh: 'HIV 不通过日常接触传播——共用杯子、握手或咳嗽都不会。写出其中任何一项都会失分。',
      },
    },
    {
      id: '0610-16-1-cp8',
      syllabus: ['0610.16.3.5', '0610.16.3.12'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what happens between a pollen grain landing on a stigma and the fertilisation of an ovule.',
      markScheme: [
        { text: 'The pollen grain germinates and a pollen tube grows out of it', marks: 1 },
        {
          text: 'The pollen tube grows down through the style towards the ovary, carrying the male nucleus',
          marks: 1,
        },
        {
          text: 'It enters an ovule, and the male nucleus fuses with the female nucleus inside it — fertilisation',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The pollen grain does not travel down the style — the tube grows down and carries the nucleus. That distinction is worth a mark.',
        zh: '花粉粒本身并不沿花柱下行——是花粉管向下生长并携带细胞核。这个区别值一分。',
      },
    },
  ],
}

export default lesson

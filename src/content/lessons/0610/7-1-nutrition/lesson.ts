import type { Lesson } from '@/content/types'
import { placementParams } from '@/lib/assignment'
import { ALL_ITEMS, MAX_TARGETS } from './kernel'
import narration from './narration'

const lesson: Lesson = {
  slug: '7-1-nutrition',
  subject: '0610',
  syllabus: [
    '0610.7.1.1',
    '0610.7.1.2',
    '0610.7.1.3',
    '0610.7.2.1',
    '0610.7.2.2',
    '0610.7.3.1',
    '0610.7.3.2',
    '0610.7.3.3',
    '0610.7.3.4',
    '0610.7.3.5',
    '0610.7.3.6',
    '0610.7.3.7',
    '0610.7.4.1',
    '0610.7.4.2',
    '0610.7.4.3',
    '0610.7.4.4',
    '0610.7.4.5',
    '0610.7.4.6',
    '0610.7.4.7',
    '0610.7.4.8',
    '0610.7.5.1',
    '0610.7.5.2',
    '0610.7.5.3',
    '0610.7.5.4',
    '0610.7.5.5',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'Human nutrition', zh: '人体的营养' },
  summary: {
    en: 'The gut is a tube running through you, open at both ends. Nothing in it is yours until it has crossed the wall — and digestion exists to make that crossing possible.',
    zh: '消化道是一根贯穿全身、两端开口的管道。其中的东西在穿过管壁之前都不属于你——消化的存在，正是为了让这次穿越成为可能。',
  },

  objectives: [
    {
      en: 'Describe what is meant by a balanced diet, and state the sources and importance of each nutrient.',
      zh: '说明什么是均衡膳食，并说出各类营养素的来源与重要性。',
    },
    { en: 'State the causes of scurvy and rickets.', zh: '说出坏血病与佝偻病的成因。' },
    {
      en: 'Identify the main organs of the digestive system and describe what each does.',
      zh: '识别消化系统的主要器官，并描述各自的功能。',
    },
    {
      en: 'Describe physical digestion, the four types of tooth and the structure of a tooth.',
      zh: '描述物理性消化、四种牙齿以及牙的结构。',
    },
    {
      en: 'Describe chemical digestion and the functions of amylase, protease and lipase.',
      zh: '描述化学性消化以及淀粉酶、蛋白酶和脂肪酶的功能。',
    },
    {
      en: 'Describe the functions of hydrochloric acid in gastric juice.',
      zh: '描述胃液中盐酸的作用。',
    },
    {
      en: 'Explain the role of bile in emulsifying fats and in neutralising stomach acid. (Extended)',
      zh: '解释胆汁在乳化脂肪和中和胃酸中的作用。（Extended）',
    },
    {
      en: 'Explain how villi and microvilli increase the absorbing surface area, and describe the structure of a villus. (Extended)',
      zh: '解释绒毛与微绒毛如何增大吸收面积，并描述绒毛的结构。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'balanced diet',
      zh: '均衡膳食',
      definition: {
        en: 'The right amount of each nutrient in the right proportions for that particular person — which depends on their age, sex and activity.',
        zh: '对某个特定的人而言，各类营养素的量与比例都恰当的膳食——这取决于其年龄、性别与活动量。',
      },
      syllabus: ['0610.7.1.1'],
    },
    {
      en: 'physical digestion',
      zh: '物理性消化',
      definition: {
        en: 'Breaking food into smaller pieces without changing any molecule. It matters because smaller pieces have a much larger total surface area for enzymes.',
        zh: '把食物弄成更小的碎块而不改变任何分子。它之所以重要，是因为更小的碎块拥有大得多的总表面积供酶作用。',
      },
      syllabus: ['0610.7.3.1', '0610.7.3.2'],
    },
    {
      en: 'chemical digestion',
      zh: '化学性消化',
      definition: {
        en: 'Breaking large insoluble molecules into small soluble ones, so they can be absorbed through the gut wall.',
        zh: '把大的不溶分子分解为小的可溶分子，使其能够穿过肠壁被吸收。',
      },
      syllabus: ['0610.7.4.1', '0610.7.4.2'],
    },
    {
      en: 'bile',
      zh: '胆汁',
      definition: {
        en: 'An alkaline liquid made by the liver and stored in the gall bladder. It emulsifies fat and neutralises stomach acid. It contains no enzymes.',
        zh: '由肝脏生成、贮存于胆囊的碱性液体。它乳化脂肪并中和胃酸。其中不含酶。',
      },
      syllabus: ['0610.7.3.7', '0610.7.4.8'],
    },
    {
      en: 'emulsify',
      zh: '乳化',
      definition: {
        en: 'To break one large drop of fat into many tiny droplets. Physical, not chemical — but it multiplies the surface area lipase can reach.',
        zh: '把一大滴脂肪打散成许多微小的液滴。这是物理过程而非化学过程，但它成倍增大了脂肪酶可接触的表面积。',
      },
      syllabus: ['0610.7.3.7'],
    },
    {
      en: 'villus',
      zh: '绒毛',
      definition: {
        en: 'A finger-like fold of the small intestine wall. It has a wall one cell thick, a capillary network and a lacteal.',
        zh: '小肠壁上指状的皱褶。它的壁只有一个细胞厚，内含毛细血管网和一根乳糜管。',
      },
      syllabus: ['0610.7.5.3', '0610.7.5.4'],
    },
    {
      en: 'lacteal',
      zh: '乳糜管',
      definition: {
        en: 'The lymph vessel in the centre of a villus. Fatty acids and glycerol leave this way, not through the blood.',
        zh: '位于绒毛中央的淋巴管。脂肪酸和甘油由此离开，而不是经血液。',
      },
      syllabus: ['0610.7.5.5'],
    },
  ],

  // The content here is a web of one-to-one facts rather than a relationship between
  // quantities, so there is nothing to write as an equation.
  equations: [],

  sim: {
    primitive: 'match',
    kernel: '7-1-nutrition',
    hint: {
      en: 'Pick one on the left, then its partner on the right. Click a paired item to undo it.',
      zh: '先选左侧的一项，再点击右侧与之配对的一项。点击已配对的条目可撤销。',
    },
    params: [
      {
        key: 'stage',
        label: { en: 'Exercise', zh: '练习' },
        unit: '',
        min: 1,
        max: 4,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Nutrients', zh: '营养素' } },
          { value: 2, label: { en: 'Organs', zh: '器官' } },
          { value: 3, label: { en: 'Enzymes', zh: '酶' } },
          { value: 4, label: { en: 'Absorption', zh: '吸收' } },
        ],
      },
      ...placementParams(ALL_ITEMS, MAX_TARGETS),
    ],
    readouts: [
      { key: 'correct', label: { en: 'Correct', zh: '正确' }, unit: '', sigFigs: 2, exact: true },
      { key: 'paired', label: { en: 'Paired', zh: '已配对' }, unit: '', sigFigs: 2, exact: true },
      { key: 'total', label: { en: 'Pairs', zh: '配对总数' }, unit: '', sigFigs: 2, exact: true },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-7-1-cp1',
      syllabus: ['0610.7.1.3'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A child whose diet contains plenty of calcium still develops rickets. Explain how this is possible.',
      markScheme: [
        { text: 'Rickets is caused by a lack of vitamin D', marks: 1 },
        { text: 'Vitamin D is needed for calcium to be absorbed', marks: 1 },
        {
          text: 'So without it the calcium in the diet cannot be used, the bones stay soft and they bend under the child’s weight',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The question is testing whether you know vitamin D acts on absorption rather than on bone directly. "The child needs more calcium" contradicts the stem and scores nothing.',
        zh: '这道题考查你是否知道维生素 D 作用于"吸收"环节，而不是直接作用于骨骼。写"这个孩子需要更多钙"与题干矛盾，不得分。',
      },
    },
    {
      id: '0610-7-1-cp2',
      syllabus: ['0610.7.3.7', '0610.7.4.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe the two functions of bile in the digestion of a fatty meal, and explain why bile contains no enzymes but still speeds digestion up.',
      markScheme: [
        {
          text: 'Bile emulsifies fat, breaking large drops into many small droplets',
          marks: 1,
        },
        {
          text: 'This increases the surface area available to lipase, so the fat is digested faster',
          marks: 1,
        },
        {
          text: 'Bile is alkaline, so it neutralises the acid arriving from the stomach',
          marks: 1,
        },
        {
          text: 'This raises the pH to the optimum for the pancreatic enzymes working in the small intestine',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Emulsification is physical, not chemical — bile does not break a single chemical bond. Writing "bile digests fat" loses both marks in that half of the answer.',
        zh: '乳化是物理过程而非化学过程——胆汁不切断任何化学键。写"胆汁消化脂肪"会丢掉这半边的两分。',
      },
    },
    {
      id: '0610-7-1-cp3',
      syllabus: ['0610.7.4.3', '0610.7.4.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the digestion of starch in the human digestive system, naming the enzymes involved and where each acts.',
      markScheme: [
        {
          text: 'Salivary amylase in the mouth begins breaking starch down to maltose',
          marks: 1,
        },
        {
          text: 'Pancreatic amylase continues this in the small intestine',
          marks: 1,
        },
        { text: 'Maltase, on the small intestine wall, breaks maltose down to glucose', marks: 1 },
      ],
      examinerNote: {
        en: 'Starch does not go straight to glucose. Missing out maltose, or missing out maltase, is the commonest way to drop a mark here.',
        zh: '淀粉不会直接变成葡萄糖。漏掉麦芽糖或漏掉麦芽糖酶，是这里最常见的失分方式。',
      },
    },
    {
      id: '0610-7-1-cp4',
      syllabus: ['0610.7.5.3', '0610.7.5.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the structure of a villus adapts it for the rapid absorption of the products of digestion.',
      markScheme: [
        {
          text: 'Villi and microvilli give a very large surface area for absorption',
          marks: 1,
        },
        { text: 'The wall is one cell thick, so the diffusion distance is short', marks: 1 },
        {
          text: 'A capillary network carries away glucose and amino acids, maintaining a steep concentration gradient',
          marks: 1,
        },
        { text: 'A lacteal carries away fatty acids and glycerol', marks: 1 },
      ],
      examinerNote: {
        en: 'Three separate ideas — area, distance, gradient — and then the lacteal. Listing features without saying what each achieves scores about half.',
        zh: '这里有三个不同的要点——面积、距离、梯度——然后才是乳糜管。只罗列结构而不说明各自的作用，大约只能拿一半分。',
      },
    },
    {
      id: '0610-7-1-cp5',
      syllabus: ['0610.7.4.5'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State two functions of the hydrochloric acid in gastric juice.',
      markScheme: [
        { text: 'It kills bacteria taken in with the food', marks: 1 },
        {
          text: 'It provides the low pH at which the protease in the stomach works best',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The acid does not digest anything itself. "It breaks down protein" is the protease’s job, and the acid is only setting up the conditions for it.',
        zh: '盐酸本身不消化任何东西。"它分解蛋白质"是蛋白酶的工作，盐酸只是为其创造条件。',
      },
    },
    {
      id: '0610-7-1-cp6',
      syllabus: ['0610.7.3.1', '0610.7.3.2', '0610.7.3.5'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A person swallows their food without chewing it properly. Explain why this slows down the chemical digestion of the meal.',
      markScheme: [
        {
          text: 'Chewing is physical digestion: it breaks the food into smaller pieces',
          marks: 1,
        },
        { text: 'Smaller pieces have a larger total surface area', marks: 1 },
        {
          text: 'Enzymes can only act at the surface, so a smaller surface area means fewer enzyme–substrate collisions and a slower rate',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the surface-area argument you met with rates of reaction, in a body rather than a beaker. The mark is for the link to enzyme access, not just for saying the pieces are big.',
        zh: '这就是你在反应速率里见过的表面积论证，只是场景从烧杯换成了身体。得分点在于把它与酶能否接触底物联系起来，而不只是说"碎块很大"。',
      },
    },
    {
      id: '0610-7-1-cp7',
      syllabus: ['0610.7.2.2'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 2,
      stem: 'Bile is released into the small intestine. Identify the organ that produces bile and the organ that stores it.',
      markScheme: [
        { text: 'The liver produces bile', marks: 1 },
        { text: 'The gall bladder stores it', marks: 1 },
      ],
      examinerNote: {
        en: 'Two marks for two organs, and swapping them scores nothing. The gall bladder is a bag, not a gland.',
        zh: '两个器官各一分，答反了则一分不得。胆囊是一个囊袋，不是腺体。',
      },
    },
  ],
}

export default lesson

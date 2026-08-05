import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '14-1-nervous-system',
  subject: '0610',
  syllabus: [
    '0610.14.1.1',
    '0610.14.1.2',
    '0610.14.1.3',
    '0610.14.1.4',
    '0610.14.1.5',
    '0610.14.1.6',
    '0610.14.1.7',
    '0610.14.1.8',
    '0610.14.1.9',
    '0610.14.1.10',
    '0610.14.2.1',
    '0610.14.2.2',
    '0610.14.2.3',
    '0610.14.2.4',
    '0610.14.2.5',
    '0610.14.2.6',
    '0610.14.2.7',
    '0610.14.2.8',
    '0610.14.2.9',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'The nervous system and the eye', zh: '神经系统与眼' },
  summary: {
    en: 'Your hand is off the hotplate before you know it was hot, because the impulse never went to the brain. A reflex is fast for exactly the reason it is stupid.',
    zh: '在你意识到烫之前，手已经离开了热盘，因为脉冲根本没有传到大脑。反射之所以快，恰恰就是它之所以"笨"的原因。',
  },

  objectives: [
    {
      en: 'Describe the mammalian nervous system as the central nervous system and peripheral nerves, and its role in coordination.',
      zh: '把哺乳动物神经系统描述为中枢神经系统与外周神经，并说明其在协调中的作用。',
    },
    {
      en: 'Identify sensory, relay and motor neurones, and describe a simple reflex arc.',
      zh: '识别感觉、中间与运动神经元，并描述简单的反射弧。',
    },
    {
      en: 'Describe the structure of a synapse and the events at it, and explain why impulses travel one way only. (Extended)',
      zh: '描述突触的结构及其处发生的过程，并解释脉冲为何只能单向传导。（Extended）',
    },
    {
      en: 'Identify the structures of the eye and describe the function of each.',
      zh: '识别眼的结构并描述各部分的功能。',
    },
    {
      en: 'Explain the pupil reflex, including the antagonistic circular and radial muscles. (Extended)',
      zh: '解释瞳孔反射，包括环行肌与辐射肌的拮抗作用。（Extended）',
    },
    {
      en: 'Explain accommodation for near and distant objects. (Extended)',
      zh: '解释看近物与远物时的调节。（Extended）',
    },
    {
      en: 'Describe the distribution and functions of rods and cones, and identify the fovea. (Extended)',
      zh: '描述视杆细胞与视锥细胞的分布与功能，并识别中央凹。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'reflex action',
      zh: '反射',
      definition: {
        en: 'An automatic, rapid response that is not consciously decided on. Fast because the impulse turns round at the spinal cord instead of going to the brain.',
        zh: '一种自动、迅速、无需有意识决定的反应。它之所以快，是因为脉冲在脊髓折返，而不去大脑。',
      },
      syllabus: ['0610.14.1.5', '0610.14.1.6'],
    },
    {
      en: 'synapse',
      zh: '突触',
      definition: {
        en: 'The junction between two neurones. The impulse cannot cross the gap electrically, so a neurotransmitter carries it across chemically.',
        zh: '两个神经元之间的连接处。脉冲无法以电的形式跨过缝隙，因此由神经递质以化学方式把它传过去。',
      },
      syllabus: ['0610.14.1.7', '0610.14.1.8'],
    },
    {
      en: 'neurotransmitter',
      zh: '神经递质',
      definition: {
        en: 'The chemical released from vesicles on one side of a synapse. It diffuses across, binds to receptors on the other side, and starts a new impulse.',
        zh: '由突触一侧的小泡释放的化学物质。它扩散过去，与另一侧的受体结合，引发新的脉冲。',
      },
      syllabus: ['0610.14.1.9'],
    },
    {
      en: 'accommodation',
      zh: '（视觉）调节',
      definition: {
        en: 'Changing the shape of the lens to focus on objects at different distances. Necessary because the retina cannot move.',
        zh: '改变晶状体的形状，以看清不同距离的物体。之所以必要，是因为视网膜无法移动。',
      },
      syllabus: ['0610.14.2.6'],
    },
    {
      en: 'fovea',
      zh: '中央凹',
      definition: {
        en: 'The part of the retina directly opposite the pupil, packed with cones and almost free of rods. It gives the sharpest, most colourful vision.',
        zh: '视网膜上正对瞳孔的部位，密布视锥细胞而几乎没有视杆细胞。它提供最清晰、色彩最丰富的视觉。',
      },
      syllabus: ['0610.14.2.9'],
    },
    {
      en: 'antagonistic muscles',
      zh: '拮抗肌',
      definition: {
        en: 'A pair that pull in opposite directions, so one must relax as the other contracts. The circular and radial muscles of the iris are a pair.',
        zh: '一对方向相反的肌肉，一块收缩时另一块必须舒张。虹膜的环行肌与辐射肌就是这样一对。',
      },
      syllabus: ['0610.14.2.5'],
    },
  ],

  equations: [
    {
      latex: 'P = \\dfrac{1}{v} + \\dfrac{1}{u}',
      meaning: {
        en: 'The power the lens must have, with v the distance to the retina and u the distance to the object, both in metres. The eye cannot change v, so every change in u must be met by the lens.',
        zh: '晶状体所需的屈光力，其中 v 是到视网膜的距离、u 是到物体的距离，单位均为米。眼睛无法改变 v，因此 u 的每一次变化都必须由晶状体来应对。',
      },
      substitute: (r) =>
        `P = ${r['power'] ?? 0}\\ \\mathrm{D} \\quad \\text{spare} = ${r['spare'] ?? 0}\\ \\mathrm{D}`,
    },
    {
      latex: 'I_{\\text{retina}} \\;\\propto\\; I \\times \\pi r^{2}',
      meaning: {
        en: 'Light reaching the retina depends on the area of the pupil, not its width. Halving the diameter quarters the light — which is also why the reflex can only ever change it sixteenfold.',
        zh: '到达视网膜的光取决于瞳孔的面积而非宽度。直径减半，光量降为四分之一——这也正是该反射最多只能改变 16 倍的原因。',
      },
      substitute: (r) =>
        `d = ${r['pupil'] ?? 0}\\ \\mathrm{mm} \\quad I_{\\text{retina}} = ${r['retina'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '14-1-nervous-system',
    hint: {
      en: 'Take the light from almost nothing to full daylight and watch both readings — the pupil, and what actually reaches the retina. Then set the reflex to zero.',
      zh: '把光照从几乎为零调到全日照，同时观察两个读数——瞳孔直径，以及真正到达视网膜的光。然后把反射设为零。',
    },
    params: [
      {
        key: 'light',
        label: { en: 'Light intensity', zh: '光照强度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 0.5,
        default: 50,
      },
      {
        key: 'distance',
        label: { en: 'Distance to the object', zh: '到物体的距离' },
        unit: 'cm',
        min: 5,
        max: 300,
        step: 5,
        default: 100,
      },
      {
        key: 'reflex',
        label: { en: 'Iris muscles working', zh: '虹膜肌肉的功能' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 100,
      },
    ],
    readouts: [
      {
        key: 'pupil',
        label: { en: 'Pupil diameter', zh: '瞳孔直径' },
        unit: 'mm',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'retina',
        label: { en: 'Light reaching the retina', zh: '到达视网膜的光' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'power',
        label: { en: 'Lens power needed', zh: '所需晶状体屈光力' },
        unit: 'D',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'spare',
        label: { en: 'Spare accommodation', zh: '剩余调节力' },
        unit: 'D',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A dim room', zh: '昏暗的房间' },
        params: { light: 0.5, distance: 100, reflex: 100 },
      },
      {
        label: { en: 'Full daylight', zh: '全日照' },
        params: { light: 100, distance: 100, reflex: 100 },
      },
      {
        label: { en: 'Reading, close up', zh: '近距离阅读' },
        params: { light: 60, distance: 25, reflex: 100 },
      },
      {
        label: { en: 'Looking into the distance', zh: '眺望远方' },
        params: { light: 60, distance: 300, reflex: 100 },
      },
      {
        label: { en: 'Too close to focus', zh: '太近，无法聚焦' },
        params: { light: 60, distance: 10, reflex: 100 },
      },
      {
        label: { en: 'A pupil that will not respond', zh: '没有反应的瞳孔' },
        params: { light: 100, distance: 100, reflex: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-14-1-cp1',
      syllabus: ['0610.14.1.5', '0610.14.1.6'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'A person touches a hot object and immediately pulls their hand away. Describe the pathway taken by the impulses, naming the structures involved in order.',
      markScheme: [
        { text: 'A receptor in the skin detects the stimulus (the heat)', marks: 1 },
        { text: 'A sensory neurone carries impulses to the spinal cord', marks: 1 },
        { text: 'A relay neurone in the spinal cord passes them to a motor neurone', marks: 1 },
        {
          text: 'The motor neurone carries impulses to the effector — a muscle in the arm — which contracts and moves the hand away',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The order is the answer. And do not route it through the brain: the impulse turns round at the spinal cord, which is why the response beats the sensation of pain.',
        zh: '顺序本身就是答案。也不要让它经过大脑：脉冲在脊髓折返，这正是为什么反应比疼痛的感觉更快。',
      },
    },
    {
      id: '0610-14-1-cp2',
      syllabus: ['0610.14.1.8', '0610.14.1.9', '0610.14.1.10'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how an impulse crosses a synapse, and why it can only travel in one direction across it.',
      markScheme: [
        {
          text: 'The impulse causes vesicles in the first neurone to release a neurotransmitter into the gap',
          marks: 1,
        },
        { text: 'The neurotransmitter diffuses across the synaptic gap', marks: 1 },
        {
          text: 'It binds to receptor proteins on the second neurone and triggers a new impulse in it',
          marks: 1,
        },
        {
          text: 'The vesicles are only in the first neurone and the receptors only on the second, so transmission is possible in one direction only',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The one-way mark depends on naming both asymmetries — vesicles on one side, receptors on the other. "Because that is the way the neurone points" is not an explanation.',
        zh: '"单向"这一分取决于同时说出两处不对称——小泡在一侧、受体在另一侧。写"因为神经元就是朝那个方向的"不算解释。',
      },
    },
    {
      id: '0610-14-1-cp3',
      syllabus: ['0610.14.2.4', '0610.14.2.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain what happens to the iris and the pupil when a person walks from a dim room into bright sunlight, and why this response is useful.',
      markScheme: [
        { text: 'The circular muscles of the iris contract and the radial muscles relax', marks: 1 },
        { text: 'The pupil constricts, so less light enters the eye', marks: 1 },
        { text: 'This protects the retina from being damaged by very bright light', marks: 1 },
      ],
      examinerNote: {
        en: 'Both muscle sets, in the same sentence — they are antagonistic, so naming one without the other is half an answer. And the pupil is a hole: it cannot itself contract.',
        zh: '两组肌肉要写在同一句里——它们是拮抗的，只说一组只答了一半。另外，瞳孔是一个孔：它本身不会收缩。',
      },
    },
    {
      id: '0610-14-1-cp4',
      syllabus: ['0610.14.2.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe what happens in the eye when a person looks up from a book to a distant object.',
      markScheme: [
        { text: 'The ciliary muscles relax', marks: 1 },
        { text: 'The suspensory ligaments are pulled tight', marks: 1 },
        { text: 'The lens is pulled thinner, so its power decreases and its focal length increases', marks: 1 },
        {
          text: 'Light from the distant object is brought to a focus on the retina rather than in front of it',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the sentence most often reversed. The ciliary muscle is a ring: contracting it makes its diameter smaller and *slackens* the ligaments. Relaxing it lets the ring widen and pulls them tight.',
        zh: '这是最常被写反的一句。睫状肌是一个环：收缩会使其直径变小，从而使悬韧带*松弛*；舒张则让环变宽，把韧带拉紧。',
      },
    },
    {
      id: '0610-14-1-cp5',
      syllabus: ['0610.14.2.7', '0610.14.2.8', '0610.14.2.9'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'An astronomer looking at a very faint star finds that it disappears when they look directly at it, but is visible when they look slightly to one side. Suggest an explanation.',
      markScheme: [
        {
          text: 'Looking directly at the star focuses its image on the fovea',
          marks: 1,
        },
        {
          text: 'The fovea contains almost only cones, and cones need bright light to respond',
          marks: 1,
        },
        {
          text: 'Looking to one side focuses the image on a part of the retina rich in rods, which do respond in dim light',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Three facts assembled into an argument: where the image lands, what is there, and what that cell type can do. Listing the differences between rods and cones without applying them scores one at most.',
        zh: '把三个事实组织成一条论证：像落在哪里、那里有什么细胞、这类细胞能做什么。只罗列视杆与视锥的区别而不加以应用，最多得一分。',
      },
    },
    {
      id: '0610-14-1-cp6',
      syllabus: ['0610.14.1.4'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State the function of a sensory neurone and the function of a motor neurone.',
      markScheme: [
        {
          text: 'A sensory neurone carries impulses from a receptor to the central nervous system',
          marks: 1,
        },
        {
          text: 'A motor neurone carries impulses from the central nervous system to an effector (a muscle or a gland)',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Give the direction and both ends. "It senses things" describes the receptor, not the neurone, and earns nothing.',
        zh: '要写出方向和两端。写"它感受事物"描述的是感受器而不是神经元，不得分。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 4a (14.1 + 14.2 — the
  // nervous system and the eye). See src/content/types.ts for the
  // `LessonExtra` shape. Each module uses a real figure extracted from the
  // G8 PDF so the student sees the textbook picture, not a hand-drawn
  // approximation.
  extras: [
    // 1) The reflex arc in one picture — G8 Figure B9.04 (hand on a hot
    //    plate) with 6 hotspots: pain receptor, sensory neurone, relay
    //    neurone, motor neurone, effector, spinal cord. "Follow the
    //    impulse" mode animates a dot through the arc in the right order,
    //    which is the most-missed fact in the chapter: the reflex turns
    //    round at the spinal cord, and never visits the brain.
    {
      type: 'reflex-arc',
      id: 'reflex-arc',
      title: { en: 'A reflex, step by step', zh: '反射，一步步看清' },
      hint: {
        en: 'Click any part of the reflex arc on the left. "Follow the impulse" walks through receptor → sensory → relay → motor → effector.',
        zh: '点击左侧反射弧的任一部分。点"跟着脉冲走"会从感受器→感觉→中间→运动→效应器一步步走完。',
      },
      initialPart: 'pain-receptor',
      parts: [
        {
          id: 'pain-receptor',
          name: { en: 'pain receptor', zh: '痛觉感受器' },
          description: {
            en: 'A nerve ending in the skin that responds to a stimulus — heat, in this case. It converts the stimulus into an electrical impulse, which is the only signal a neurone can carry. Most reflexes begin with a receptor like this.',
            zh: '皮肤里的神经末梢，对刺激（这里是热）作出反应。它把刺激转成电脉冲——这是神经元唯一能传的信号。多数反射都从这里开始。',
          },
          stop: 1,
        },
        {
          id: 'sensory-neurone',
          name: { en: 'sensory neurone', zh: '感觉神经元' },
          description: {
            en: 'Carries the impulse from the receptor towards the central nervous system. Its long axon runs in a peripheral nerve. In a reflex arc the impulse goes from the skin, up the arm, into the spinal cord.',
            zh: '把脉冲从感受器带到中枢神经系统。它的长轴突走行在外周神经里。反射弧中，脉冲从皮肤上行到脊髓。',
          },
          stop: 2,
        },
        {
          id: 'relay-neurone',
          name: { en: 'relay neurone', zh: '中间神经元' },
          description: {
            en: 'A short neurone whose cell body sits in the spinal cord. It receives the impulse from the sensory neurone and passes it on to a motor neurone. This is where the impulse turns round — the reflex never visits the brain, which is why it can outrun the sensation of pain.',
            zh: '细胞体在脊髓里的短神经元。它从感觉神经元接过脉冲，再传给运动神经元。脉冲就在这里折返——反射从不去大脑，这正是它能跑赢痛觉的原因。',
          },
          stop: 3,
        },
        {
          id: 'motor-neurone',
          name: { en: 'motor neurone', zh: '运动神经元' },
          description: {
            en: 'Carries the impulse from the central nervous system out to the effector. Its axon runs in a peripheral nerve and ends at a muscle (or, for some reflexes, a gland).',
            zh: '把脉冲从中枢神经系统带到效应器。它的轴突走行在外周神经里，终止于肌肉（或在某些反射中是腺体）。',
          },
          stop: 4,
        },
        {
          id: 'effector',
          name: { en: 'effector (muscle)', zh: '效应器（肌肉）' },
          description: {
            en: 'The muscle that responds to the impulse by contracting. In this example it is the bicep — contracting it bends the arm and pulls the hand off the hot plate. The whole reflex, from stimulus to response, takes a small fraction of a second.',
            zh: '对脉冲作出反应而收缩的肌肉。例子里是肱二头肌——收缩时弯曲手臂把手拉离热盘。整个反射从刺激到反应，只需不到一秒。',
          },
          stop: 5,
        },
        {
          id: 'spinal-cord',
          name: { en: 'spinal cord', zh: '脊髓' },
          description: {
            en: 'Part of the central nervous system. The relay neurone lives inside it, which is why the reflex arc turns round here and not in the brain. The brain is informed a moment later — the conscious "ouch!" is much slower than the hand withdrawal.',
            zh: '中枢神经系统的一部分。中间神经元就在它里面，所以反射在这里折返，而不去大脑。大脑晚一点才收到信息——有意识的"哎哟"比手缩回来慢得多。',
          },
        },
      ],
    },

    // 2) The eye in section — G8 Figure B9.06 with 12 hotspots. "Follow
    //    the light" mode walks cornea → pupil → lens → retina → optic nerve.
    {
      type: 'eye-anatomy',
      id: 'eye',
      title: { en: 'The eye, in section', zh: '眼的剖面' },
      hint: {
        en: 'Click any part of the eye. "Follow the light" traces the path from cornea to optic nerve.',
        zh: '点击眼的任一部分。点"跟着光走"会从角膜一路追到视神经。',
      },
      initialPart: 'cornea',
      parts: [
        {
          id: 'cornea',
          name: { en: 'cornea', zh: '角膜' },
          description: {
            en: 'The transparent front of the eye. It does most of the focusing — about two-thirds of the eye\'s total refractive power — before the light has even reached the lens. Damaged corneas can be replaced by transplant; this is one of the most successful transplant operations.',
            zh: '眼前端的透明部分。在光线到达晶状体之前，它就完成了眼大约三分之二的屈光。角膜受损可以通过移植替换——这是最成功的移植手术之一。',
          },
          stop: 1,
        },
        {
          id: 'aqueous-humour',
          name: { en: 'aqueous humour', zh: '房水' },
          description: {
            en: 'A watery fluid between the cornea and the lens. It keeps the front of the eye inflated and carries nutrients to the lens and cornea, which have no blood supply (blood would block the light).',
            zh: '角膜与晶状体之间的水样液体。它维持眼前部充盈，并为没有血管的角膜和晶状体提供养分——血管会挡光。',
          },
          stop: 2,
        },
        {
          id: 'iris',
          name: { en: 'iris', zh: '虹膜' },
          description: {
            en: 'The coloured ring of muscle that controls how much light enters the eye. It has two sets of muscle fibres — circular (which constrict the pupil) and radial (which dilate it) — and the two are antagonistic.',
            zh: '控制进光量的有色肌肉环。它有两组肌纤维——环行的（使瞳孔缩小）和辐射状的（使瞳孔放大）——两者是拮抗的。',
          },
        },
        {
          id: 'pupil',
          name: { en: 'pupil', zh: '瞳孔' },
          description: {
            en: 'The hole in the middle of the iris. It is a hole, not a structure — it cannot itself contract. Its size is set by the iris muscles. In bright light it can be 2 mm across; in the dark, 8 mm. That is a sixteen-fold change in the *area* of the hole.',
            zh: '虹膜中央的孔。它本身不是一个结构——它自己不会收缩。它的大小由虹膜肌肉决定。强光下约 2 mm，黑暗中约 8 mm。这是孔*面积*的 16 倍变化。',
          },
          stop: 3,
        },
        {
          id: 'lens',
          name: { en: 'lens', zh: '晶状体' },
          description: {
            en: 'A flexible, biconvex structure that fine-tunes the focus. The ciliary muscles change its shape — fatter for close objects, thinner for distant ones. With age, the lens stiffens and the near point moves out: that is why older people need reading glasses.',
            zh: '柔软的凸透镜结构，做精细调焦。睫状肌改变它的形状——看近物时变厚，看远物时变薄。随年龄增长，晶状体变硬，近点后退——这就是老年人需要老花镜的原因。',
          },
          stop: 4,
        },
        {
          id: 'ciliary-muscle',
          name: { en: 'ciliary muscle', zh: '睫状肌' },
          description: {
            en: 'A ring of muscle that changes the shape of the lens. When it contracts, the ring gets smaller, the suspensory ligaments slacken, and the lens fattens under its own elasticity. When it relaxes, the ring widens, the ligaments pull the lens thin.',
            zh: '改变晶状体形状的环形肌肉。收缩时环变小，悬韧带松弛，晶状体在自身弹性下变厚；舒张时环变大，悬韧带把晶状体拉薄。',
          },
        },
        {
          id: 'suspensory-ligament',
          name: { en: 'suspensory ligament', zh: '悬韧带' },
          description: {
            en: 'Holds the lens in place and transmits the pull of the ciliary muscle. When the ciliary muscle contracts, the ligaments slacken and the lens fattens; when it relaxes, the ligaments pull the lens thin.',
            zh: '把晶状体固定在位，并把睫状肌的拉力传过去。睫状肌收缩时韧带松弛、晶状体变厚；睫状肌舒张时韧带把晶状体拉薄。',
          },
        },
        {
          id: 'vitreous-humour',
          name: { en: 'vitreous humour', zh: '玻璃体' },
          description: {
            en: 'A clear jelly that fills the main chamber of the eye and holds the retina against the back wall. Without it, the eye would collapse. The light passes through it on its way to the retina.',
            zh: '填充主眼室的透明胶状物，把视网膜压向眼球后壁。没有它眼就会塌陷。光穿过它到达视网膜。',
          },
          stop: 5,
        },
        {
          id: 'retina',
          name: { en: 'retina', zh: '视网膜' },
          description: {
            en: 'The light-sensitive layer at the back of the eye. It contains the receptor cells — rods (for dim light, no colour) and cones (for colour, need bright light). The image is upside down and back to front here; the brain flips it.',
            zh: '眼球后壁的光敏层。含感受器细胞——视杆细胞（弱光下工作，无色觉）和视锥细胞（有色觉，需强光）。像在视网膜上是倒置的——是大脑把它翻正的。',
          },
          stop: 6,
        },
        {
          id: 'fovea',
          name: { en: 'fovea', zh: '中央凹' },
          description: {
            en: 'The small spot on the retina directly opposite the pupil. Packed with cones and almost free of rods. Gives the sharpest, most colourful vision — which is why you turn your head to look at something rather than just moving your eyes.',
            zh: '视网膜上正对瞳孔的小区域。密布视锥细胞，几乎没有视杆细胞。提供最清晰、色彩最丰富的视觉——所以你要看某物时会把头转过去，而不是只用眼睛。',
          },
        },
        {
          id: 'blind-spot',
          name: { en: 'blind spot', zh: '盲点' },
          description: {
            en: 'The place where the optic nerve leaves the eye. There are no receptor cells here, so any light that falls on it produces no signal. You do not notice the gap because the brain fills it in from the other eye.',
            zh: '视神经离开眼球的地方。这里没有感受器细胞，所以光落上去不产生信号。你感觉不到这个"洞"，因为大脑会用另一只眼的信息把它填上。',
          },
        },
        {
          id: 'optic-nerve',
          name: { en: 'optic nerve', zh: '视神经' },
          description: {
            en: 'Carries the impulses from the retina to the visual cortex at the back of the brain. The optic nerves from the two eyes meet at the optic chiasma, where fibres from the left half of each retina cross to the right side of the brain, and vice versa.',
            zh: '把脉冲从视网膜送到大脑后部的视觉皮层。两眼的视神经在视交叉处汇合——每只眼视网膜左半的纤维交叉到大脑右侧，右半交叉到左侧。',
          },
          stop: 7,
        },
      ],
    },
  ],
}

export default lesson

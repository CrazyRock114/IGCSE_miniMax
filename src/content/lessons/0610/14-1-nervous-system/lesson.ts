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

    // 3D brain + 3D eyeball. The 2D figures show the structures in
    // cross-section; the 3D models show their actual 3D shape, which
    // is the only way to grasp "frontal lobe at the front, occipital
    // lobe at the back" as actual positions rather than abstract
    // labels.
    {
      type: 'organ-anatomy',
      id: 'brain-3d',
      title: { en: 'The brain, in 3D', zh: '大脑 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The frontal lobe is at the front, the occipital lobe at the back, the temporal lobes on the sides, and the cerebellum tucked under the back.',
        zh: '拖动旋转。额叶在前，枕叶在后，颞叶在两侧，小脑蜷在后部下方。',
      },
      intro: {
        en: 'The brain is the body\'s command centre — billions of neurons integrating sensation, memory, emotion and movement.',
        zh: '大脑是人体的指挥中心——数十亿神经元整合感觉、记忆、情绪与运动。',
      },
      organ: 'brain',
      system: { en: 'Nervous system', zh: '神经系统' },
      initialPart: 'frontal',
      parts: [
        {
          id: 'frontal',
          name: { en: 'frontal lobe', zh: '额叶' },
          description: {
            en: 'At the front of the brain, behind the forehead. Seat of planning, decision-making, voluntary movement, and personality.',
            zh: '位于大脑前部，额头之后。是计划、决策、随意运动与人格的所在。',
          },
          position3d: [-0.7, 0.65, 0.8],
        },
        {
          id: 'parietal',
          name: { en: 'parietal lobe', zh: '顶叶' },
          description: {
            en: 'At the top of the brain. Seat of body sense — touch, temperature, pain, and awareness of limb position.',
            zh: '位于大脑顶部。是身体感觉的中枢——触觉、温度、疼痛与肢体位置感知。',
          },
          position3d: [0.15, 1.1, 0.65],
        },
        {
          id: 'temporal',
          name: { en: 'temporal lobe', zh: '颞叶' },
          description: {
            en: 'On the side of the brain, behind the temple. Seat of hearing and of forming new memories.',
            zh: '位于大脑侧部，太阳穴之后。是听觉与新记忆形成的中枢。',
          },
          position3d: [0.75, -0.1, 0.82],
        },
        {
          id: 'occipital',
          name: { en: 'occipital lobe', zh: '枕叶' },
          description: {
            en: 'At the back of the brain. Primary visual cortex — the first place that signals from the eyes are interpreted as shapes, colours, and movement.',
            zh: '位于大脑后部。是初级视觉皮层——来自眼睛的信号最早在这里被解读为形状、颜色与运动。',
          },
          position3d: [0.0, -0.95, 0.55],
        },
        {
          id: 'cerebellum',
          name: { en: 'cerebellum', zh: '小脑' },
          description: {
            en: 'Under the back of the brain. Coordinates balance, posture, and the fine timing of movement.',
            zh: '位于大脑后部下方。协调平衡、姿势与动作的精确计时。',
          },
          position3d: [0.72, -0.9, 0.55],
        },
      ],
    },
    {
      type: 'organ-anatomy',
      id: 'eyeball-3d',
      title: { en: 'The eye, in 3D', zh: '眼睛 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The cornea and lens bend the light, the iris controls how much enters, the retina at the back converts it to nerve signals, and the optic nerve carries those signals to the brain.',
        zh: '拖动旋转。角膜和晶状体屈光，虹膜控制进光量，底部视网膜把光转为神经信号，视神经把信号送入大脑。',
      },
      intro: {
        en: 'The eye is a precision sensory organ — a living camera that converts focused light into neural signals interpreted as vision.',
        zh: '眼睛是一个精密的感觉器官——一台活的相机，把聚焦的光转化为神经信号，解读为视觉。',
      },
      organ: 'eyeball',
      system: { en: 'Sensory system', zh: '感觉系统' },
      initialPart: 'cornea',
      parts: [
        {
          id: 'cornea',
          name: { en: 'cornea', zh: '角膜' },
          description: {
            en: 'The clear dome at the front. Does most of the bending of light that focuses an image. Has no blood vessels.',
            zh: '最前端的透明圆顶。负责把光线会聚成像——这是屈光的大部分工作。没有血管。',
          },
          position3d: [-0.94, 0.05, 1.47],
        },
        {
          id: 'iris',
          name: { en: 'iris', zh: '虹膜' },
          description: {
            en: 'The coloured ring. Its muscles change the pupil size — wide in dim light, narrow in bright light.',
            zh: '彩色环。其肌肉改变瞳孔大小——暗处放大、亮处缩小。',
          },
          position3d: [-1.22, -0.53, 1.15],
        },
        {
          id: 'lens',
          name: { en: 'lens', zh: '晶状体' },
          description: {
            en: 'A flexible, transparent disc behind the iris. Tiny muscles change its shape to focus light from near or far objects.',
            zh: '虹膜后方柔韧透明的盘状结构。睫状肌改变其形状，把远近物体的光聚焦。',
          },
          position3d: [-0.5, -0.5, 1.1],
        },
        {
          id: 'retina',
          name: { en: 'retina', zh: '视网膜' },
          description: {
            en: 'The light-sensitive layer at the back. Contains the photoreceptors — cones for colour and detail, rods for dim light.',
            zh: '眼球后部感光的一层。包含感光细胞——锥体感色与细节，杆体感暗光。',
          },
          position3d: [1.0, 0.2, 0.0],
        },
        {
          id: 'optic-nerve',
          name: { en: 'optic nerve', zh: '视神经' },
          description: {
            en: 'A bundle of about a million nerve fibres leaving the back of the eye. Carries the visual signal to the visual cortex.',
            zh: '眼球后部约一百万根神经纤维组成的束，把视觉信号送到视觉皮层。',
          },
          position3d: [1.61, -0.18, 0.54],
        },
      ],
    },

    // The pupil reflex — a one-shot reflex arc that lives in the eye
    // itself, no brain involvement. The textbook mentions it indirectly
    // (B9.04 notes that adrenaline widens the pupil) but does not spell
    // out the actual reflex pathway. The site has no dedicated
    // explainer, so we add one here, right next to the eye anatomy.
    // (Negative feedback: the iris adjusts how much light enters.)
  {
    type: 'concept-explainer',
    id: 'pupil-reflex',
    title: { en: 'The pupil reflex — the eye adjusting its own aperture', zh: '瞳孔反射——眼睛自己调光圈' },
    hint: {
      en: 'The iris is a ring of muscle that changes the size of the pupil without you thinking about it. Bright light → pupil shrinks. Dim light → pupil widens. It is one of the few reflex arcs that has nothing to do with the spinal cord or the brain.',
      zh: '虹膜是一圈肌肉，在你不知不觉中改变瞳孔大小。强光下瞳孔缩小，暗光下瞳孔放大。它是少有的不经过脊髓或大脑的反射弧之一。',
    },
    blocks: [
      {
        id: 'reflex',
        title: { en: 'A reflex arc that lives entirely in the brainstem', zh: '整条反射弧都在脑干里' },
        hook: {
          en: 'Walk out of a dark cinema into bright sunlight and your eyes do not blow out with white — they tighten within a second. Walk back inside and they dilate again. None of this is voluntary. The iris is doing the equivalent of an automatic camera aperture, and the wiring is one of the fastest reflexes in the body.',
          zh: '从黑漆漆的电影院走到阳光刺眼的走廊，眼睛不会瞬间被白光打瞎——一秒钟内瞳孔就收紧了。再走回影院，瞳孔又放大。这一切都不是你主动控制的。虹膜相当于一台相机的自动光圈，整套电路是人体最快的反射之一。',
        },
        mechanism: {
          en: 'Bright light entering the eye hits the retina. A small region of the midbrain called the pretectal area senses the light level via the optic nerve. It sends signals to the sphincter pupillae muscle in the iris, which contracts and shrinks the pupil. The round trip — light in, pupil smaller — happens in about 0.3 seconds. In dim light the same pathway runs the other way, activating the dilator pupillae muscle instead, and the pupil widens. Both branches use the same set of nerve cells, so the same wiring handles both directions.',
          zh: '强光进入眼睛，照射到视网膜。中脑一个叫"顶盖前区"的小区域通过视神经感知亮度，再把信号发给虹膜里的瞳孔括约肌，让它收缩、瞳孔缩小。从光进入，到瞳孔变小，整个回路大约 0.3 秒。暗光下同一通路反向运行，激活瞳孔开大肌，瞳孔放大。两路用同一组神经元，所以同一套电路同时负责放大和缩小。',
        },
        whyItMatters: {
          en: 'This is one of the few reflex arcs the doctor checks with a penlight. A pupil that does not constrict to light is a sign of serious brainstem damage — a key test in an emergency room. Adrenaline overrides the reflex: in a "fight-or-flight" moment the pupil widens regardless of light, because seeing more of the surroundings is more useful than seeing sharply. The two systems (reflex and hormonal) work at different speeds and on different timescales.',
          zh: '这是医生用小手电检查的少数反射之一。瞳孔对光不收缩，是脑干严重受损的信号——急诊室里的关键检查项目。肾上腺素会"覆盖"这个反射：战或逃的瞬间，无论光线如何瞳孔都放大，因为看清更多周围比看清细节更重要。两套系统（反射和激素）速度不同、作用时间尺度也不同。',
        },
        teacherStory: {
          en: 'A quick in-class check: shine a phone flashlight into one eye and watch the other pupil constrict too — the consensual light reflex. Both pupils are wired to the same pretectal area, so shining light in one eye sends the constrict signal to both. This is why doctors check both pupils: a difference between them is a clinical sign of trouble.',
          zh: '一个快速的课堂检查：把手机闪光灯照进一只眼睛，看另一只瞳孔也同时收缩——这就是"同感性对光反射"。两只瞳孔都连到同一个顶盖前区，所以照一只眼睛时收缩信号会同时传给两只。这也是医生为什么要同时检查两只瞳孔——两侧反应不一致就是临床异常信号。',
        },
      },
    ],
  },


  // Why your eyes play tricks on you — visual illusions. This is
  // supplementary material (not in the textbook) but the user asked
  // for it explicitly: classic illusion images plus 2-3 interactive
  // experiments with explanations of the underlying principle.
  {
    type: 'visual-illusions',
    id: 'visual-illusions',
    title: { en: 'Why your eyes play tricks on you', zh: '为什么眼睛会骗你' },
    hint: {
      en: 'Five classic visual illusions and three hands-on experiments. None of them are about bad eyesight — they reveal how the visual cortex fills in, makes assumptions, and shortcuts the work of "seeing".',
      zh: '五个经典视觉错觉加三个可动手的小实验。都不是眼睛有问题——它们揭示了视觉皮层在"填补"、在"假设"、在"走捷径"地看见世界。',
    },
    illusions: [
      // 1. Hermann grid — gray dots at the intersections of black bars
      {
        id: 'hermann-grid',
        title: { en: 'Hermann grid — phantom dots you cannot unsee', zh: '赫尔曼栅格——你无法不看见的幽灵黑点' },
        image: { en: '/figures/illusions/hermann-grid.svg', zh: '/figures/illusions/hermann-grid.svg' },
        whatYouSee: {
          en: 'A grid of thick black bars on a white background. Grey blobs appear at the intersections — but only when you are NOT looking directly at them. The instant you fixate on one, it disappears.',
          zh: '白底上的黑色粗线栅格。在每个交叉点都能看到灰色斑点——但只有在你没直接盯着它的时候。你一盯，斑点就消失。',
        },
        why: {
          en: 'The phenomenon is called "lateral inhibition". Each retinal ganglion cell reports how much light is at the centre of its receptive field versus the surrounding ring. At a black-bar intersection, the surrounding ring is mostly black, so the cell reports a smaller-than-it-should signal. At a non-intersection (a black bar between two white gaps), the surrounding ring has a lot of white, so the cell reports a larger signal. The brain subtracts: intersection cells look DIMMER than non-intersection cells. The illusion is your brain doing its job, not failing at it.',
          zh: '这叫"侧抑制"。每个视网膜神经节细胞都报告自己感受野中心 vs 周围一圈的光强差。在黑色交叉点，周围一圈大半是黑的，所以细胞报告的信号偏小；在普通黑条位置（两头都是白），周围一圈有不少白，信号偏大。大脑做减法：交叉点的细胞比非交叉点的看起来更暗。错觉是大脑在好好工作，而不是出了错。',
        },
      },
      // 2. Müller-Lyer — two lines, same length, look different
      {
        id: 'muller-lyer',
        title: { en: 'Müller-Lyer — same length, different arrows', zh: '缪勒-莱尔错觉——等长的两条线' },
        image: { en: '/figures/illusions/muller-lyer.svg', zh: '/figures/illusions/muller-lyer.svg' },
        whatYouSee: {
          en: 'Two vertical lines of identical length. The one with inward-pointing arrows (><) looks shorter; the one with outward-pointing arrows (<>) looks longer.',
          zh: '两条等长的竖线。箭头朝内（><）的看起来短，箭头朝外（<>）的看起来长。',
        },
        why: {
          en: 'The arrows are depth cues. The inward arrows make the line look like the inside corner of a room (concave, far away); the outward arrows make it look like the outside corner of a building (convex, close). The brain applies size constancy — distant things must be bigger on the retina to be the same size in the world — so the "far" line is judged longer. The illusion is automatic, cross-cultural, and hard to suppress even with a ruler in your hand.',
          zh: '箭头是深度线索。箭头朝内看上去像房间的内墙角（凹面，远处），箭头朝外像建筑的外墙角（凸面，近处）。大脑用"大小恒常性"——远处的东西要在视网膜上更大，才算"实际一样大"——所以"远"的那条被判得更长。这个错觉自动出现，跨文化一致，哪怕你手里拿着尺子也压不住。',
        },
      },
      // 3. Ponzo — two equal circles look different sizes
      {
        id: 'ponzo',
        title: { en: 'Ponzo — equal circles, unequal sizes', zh: '庞氏错觉——两个一样大的圆' },
        image: { en: '/figures/illusions/ponzo.svg', zh: '/figures/illusions/ponzo.svg' },
        whatYouSee: {
          en: 'Two identical circles sitting between two converging lines. The upper circle looks bigger than the lower one.',
          zh: '两个完全相同的圆放在两条向远处汇聚的线之间。上面的圆看上去比下面的大。',
        },
        why: {
          en: 'Converging lines are a strong depth cue for "the upper one is further away". Size constancy again: if two retinal images are the same size, the brain decides the "further" one is bigger in the world. The illusion goes away instantly if you remove the converging lines.',
          zh: '汇聚的线条是一个很强的深度线索——"上面的圆更远"。又是大小恒常性在起作用：两个视网膜上的像一样大，大脑就判断"更远"的那个在世界里更大。把汇聚线去掉，错觉立刻消失。',
        },
      },
      // 4. Ebbinghaus — two equal circles, different surround
      {
        id: 'ebbinghaus',
        title: { en: 'Ebbinghaus — same circle, smaller-feeling inside big circles', zh: '艾宾浩斯错觉——同一个圆，周围都是大圆时显得小' },
        image: { en: '/figures/illusions/ebbinghaus.svg', zh: '/figures/illusions/ebbinghaus.svg' },
        whatYouSee: {
          en: 'Two identical orange circles. The one surrounded by big purple circles looks smaller than the one surrounded by small purple circles.',
          zh: '两个完全相同的橙色圆。周围都是大紫色圆的，看起来比周围都是小紫色圆的小。',
        },
        why: {
          en: 'Pure relative-size judgment. The brain does not measure "absolute size" of a circle, it compares to its neighbours. Big neighbours make the centre look small; small neighbours make it look big. This is the same machinery that lets you tell whether a friend in the distance is an adult or a child — you compare to the lamp post next to them.',
          zh: '纯粹的相对大小判断。大脑不是量"绝对大小"，而是跟邻居比。邻居大，中心就显得小；邻居小，中心就显得大。同一套机制让你能判断远处站着的那个朋友是大人还是小孩——你拿他旁边的路灯当参照。',
        },
      },
      // 5. Color afterimage — stare and see the opposite
      {
        id: 'afterimage',
        title: { en: 'Afterimage — stare, then look at white', zh: '后像——盯住看，然后看白色' },
        image: { en: '/figures/illusions/afterimage.svg', zh: '/figures/illusions/afterimage.svg' },
        whatYouSee: {
          en: 'A solid red square. Stare at the dot in its centre for 30 seconds without moving your eyes, then look at a blank white wall. A cyan-blue square of the same size floats in front of you for a few seconds.',
          zh: '一个纯红色的方块。盯住中心黑点 30 秒眼睛别动，然后看一面白墙。一个同尺寸的青蓝色方块会在你眼前漂浮几秒钟。',
        },
        why: {
          en: 'The retina has three types of colour photoreceptor — red, green, and blue cones. Staring at a red field tires out the red cones, so they temporarily stop firing. When you then look at a white wall, the wall sends red, green AND blue signals — but the red signal is muted. The brain compares: red−0, green−100, blue−100. The leftover green+blue reads as cyan. The afterimage fades as the red cones recover, in a few seconds.',
          zh: '视网膜有三种色觉感光细胞——红、绿、蓝锥体细胞。盯着红色看会让红锥体疲劳，短暂停止工作。这时再看白墙，白墙发来红、绿、蓝三种信号，但红的减弱了。大脑做减法：红−0，绿−100，蓝−100。剩下的绿+蓝就读作青蓝。几秒钟后红锥体恢复，后像消失。',
        },
      },
    ],
    experiments: [
      // 1. Blind spot test
      {
        id: 'blind-spot',
        title: { en: 'Experiment 1: Find your blind spot', zh: '实验 1：找你的盲点' },
        instructions: {
          en: 'Close your LEFT eye. With your RIGHT eye, fixate on the ✕ at the left. The dot to the right will disappear when it lands on your blind spot. To find the exact distance, slowly move the page (or your head) towards and away from the screen. The dot will vanish at one specific distance and reappear if you go closer or further.',
          zh: '闭上左眼。用右眼盯住左边的 ✕。右边的圆点会消失——它正好落在你的盲点上。要找到准确距离，慢慢让页面（或你的头）前后移动。在某个特定距离圆点会消失，离屏幕更近或更远时又会重新出现。',
        },
        principle: {
          en: 'Every retina has a small region with no photoreceptors — the place where the optic nerve fibres exit the eyeball on their way to the brain. Light landing there produces no signal at all. We never notice the gap because (a) the corresponding region in the OTHER eye covers it, and (b) the brain fills in the missing spot with whatever pattern surrounds it. Close one eye and the brain can no longer hide it.',
          zh: '每只视网膜都有一小块没有感光细胞的区域——视神经纤维离开眼球走向大脑的那个点。光落在这里根本不产生信号。我们平时注意不到这个洞，因为：(a) 另一只眼的对应区域会补上，(b) 大脑用周围的图案把缺失的点"补全"。闭上一只眼，大脑就藏不住了。',
        },
      },
      // 2. Müller-Lyer interactive length-match
      {
        id: 'muller-lyer-match',
        title: { en: 'Experiment 2: Beat the Müller-Lyer', zh: '实验 2：打败缪勒-莱尔' },
        instructions: {
          en: 'The LEFT line has inward arrows (><). The RIGHT line has outward arrows (<>). They are EXACTLY the same length. Drag the slider to make the right line as long as the left — and watch how badly your visual system guesses.',
          zh: '左边线是箭头朝内（><），右边线是箭头朝外（<>）。两条线**完全等长**。拖动滑块让右边的线和左边一样长——看看你的视觉系统会错得有多离谱。',
        },
        principle: {
          en: 'Even when you know the lines are the same, the arrows push your perception of length up or down by 10-20%. Children under 10 are not yet fooled — the illusion develops as the brain learns to apply size constancy. The point: knowing is not seeing. Cognitive knowledge and visual perception are separate systems, and the visual one usually wins.',
          zh: '即使你明知道两条线一样长，箭头依然能让你的长度判断偏差 10-20%。10 岁以下的孩子还不会被骗——错觉是随着大脑学会应用大小恒常性才出现的。重点是："知道"不等于"看见"。认知知识和视觉感知是两套系统，而视觉那套通常赢。',
        },
      },
      // 3. Afterimage demo
      {
        id: 'afterimage-demo',
        title: { en: 'Experiment 3: Make a coloured afterimage', zh: '实验 3：造一个彩色后像' },
        instructions: {
          en: 'Stare at the dot in the centre of the coloured square for 30 seconds without moving your eyes. When the square turns grey, look at the centre of the grey square. A faint image in the COMPLEMENTARY colour will float on the grey for a few seconds. Red → cyan. Green → magenta. Blue → yellow.',
          zh: '盯住彩色方块中心的黑点 30 秒，眼睛别动。方块变灰时看灰方块的中心。一个淡淡的、**互补色**的图像会在灰色上漂浮几秒钟。红 → 青。绿 → 品红。蓝 → 黄。',
        },
        principle: {
          en: 'Prolonged staring tires out the photoreceptors of one colour (e.g. the red cones for a red image). When the image turns grey, all three cone types are stimulated equally by the white background — but the tired red cones fire less. Your brain subtracts: red − muted red = cyan. The illusion is the visual system reporting the difference, not the absolute signal. Same mechanism as the Hermann grid, just at a different stage of the visual pipeline.',
          zh: '长时间盯着看会让某一种颜色的感光细胞疲劳（红方块就让红锥体疲劳）。图像变灰时，白背景均匀地刺激三种锥体，但疲劳的那一组反应弱。大脑做减法：红−减弱的红=青。和赫尔曼栅格错觉是同一类机制，只是发生在视觉通路的另一个环节。',
        },
      },
    ],
  },
]
}

export default lesson

import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '17-1-inheritance',
  subject: '0610',
  syllabus: [
    '0610.17.1.1',
    '0610.17.1.2',
    '0610.17.1.3',
    '0610.17.1.4',
    '0610.17.1.5',
    '0610.17.1.6',
    '0610.17.1.7',
    '0610.17.1.8',
    '0610.17.1.9',
    '0610.17.1.10',
    '0610.17.1.11',
    '0610.17.1.12',
    '0610.17.2.1',
    '0610.17.2.2',
    '0610.17.2.3',
    '0610.17.2.4',
    '0610.17.2.5',
    '0610.17.3.1',
    '0610.17.3.2',
    '0610.17.4.1',
    '0610.17.4.2',
    '0610.17.4.3',
    '0610.17.4.4',
    '0610.17.4.5',
    '0610.17.4.6',
    '0610.17.4.7',
    '0610.17.4.8',
    '0610.17.4.9',
    '0610.17.4.10',
    '0610.17.4.11',
    '0610.17.4.12',
    '0610.17.4.13',
    '0610.17.4.14',
    '0610.17.4.15',
    '0610.17.4.16',
    '0610.17.4.17',
    '0610.17.4.18',
  ],
  tier: 'extended',
  estimatedMinutes: 70,

  title: { en: 'Inheritance', zh: '遗传' },
  summary: {
    en: 'Three quarters of the offspring are red, but only half of them carry the white allele — and nothing about a red flower tells you which half it is in. That gap is the whole subject.',
    zh: '四分之三的子代开红花，但其中只有一半携带白花等位基因——而红花本身丝毫看不出它属于哪一半。这道落差，就是这一章的全部内容。',
  },

  objectives: [
    {
      en: 'State that chromosomes are made of DNA, and define a gene and an allele.',
      zh: '说明染色体由 DNA 构成，并给基因和等位基因下定义。',
    },
    {
      en: 'Describe the inheritance of sex in humans using the X and Y chromosomes.',
      zh: '用 X 和 Y 染色体描述人类性别的遗传。',
    },
    {
      en: 'Explain how a protein is made and how DNA controls cell function. (Extended)',
      zh: '解释蛋白质的合成过程，以及 DNA 如何控制细胞功能。（Extended）',
    },
    {
      en: 'Describe haploid and diploid nuclei, and the roles of mitosis and meiosis. (Extended)',
      zh: '描述单倍体核与二倍体核，以及有丝分裂与减数分裂的作用。（Extended）',
    },
    {
      en: 'Use genotype, phenotype, homozygous, heterozygous, dominant and recessive correctly.',
      zh: '正确使用基因型、表现型、纯合、杂合、显性与隐性等术语。',
    },
    {
      en: 'Use Punnett squares to predict the results of monohybrid crosses and calculate ratios.',
      zh: '用棋盘格法预测单基因杂交的结果并计算比例。',
    },
    { en: 'Interpret pedigree diagrams.', zh: '解读系谱图。' },
    {
      en: 'Explain how a test cross identifies an unknown genotype. (Extended)',
      zh: '解释测交如何确定未知基因型。（Extended）',
    },
    {
      en: 'Explain codominance, the inheritance of ABO blood groups, and sex linkage. (Extended)',
      zh: '解释共显性、ABO 血型的遗传以及伴性遗传。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'gene',
      zh: '基因',
      definition: {
        en: 'A length of DNA that codes for one protein. Not for a feature — the feature is a consequence of the protein.',
        zh: '编码一种蛋白质的一段 DNA。它不编码某个特征——特征是蛋白质带来的结果。',
      },
      syllabus: ['0610.17.1.2'],
    },
    {
      en: 'allele',
      zh: '等位基因',
      definition: {
        en: 'One of the alternative versions of a gene. You carry two copies of every gene, and they need not be the same allele.',
        zh: '一个基因的不同版本之一。你的每个基因都有两个拷贝，而它们未必是同一个等位基因。',
      },
      syllabus: ['0610.17.1.3'],
    },
    {
      en: 'genotype',
      zh: '基因型',
      definition: {
        en: 'The alleles an organism carries. Not always visible: RR and Rr look identical.',
        zh: '生物所携带的等位基因。它未必看得见：RR 与 Rr 外表完全相同。',
      },
      syllabus: ['0610.17.4.2'],
    },
    {
      en: 'phenotype',
      zh: '表现型',
      definition: {
        en: 'The observable features of an organism — what the genotype produces.',
        zh: '生物可观察到的特征——即基因型所产生的结果。',
      },
      syllabus: ['0610.17.4.3'],
    },
    {
      en: 'test cross',
      zh: '测交',
      definition: {
        en: 'A cross with a homozygous recessive individual, used to find out whether an organism showing the dominant phenotype is homozygous or heterozygous.',
        zh: '与纯合隐性个体杂交，用来判断表现显性性状的个体是纯合还是杂合。',
      },
      syllabus: ['0610.17.4.13'],
    },
    {
      en: 'codominance',
      zh: '共显性',
      definition: {
        en: 'Where both alleles contribute to the phenotype, so the heterozygote has a phenotype of its own rather than resembling one parent.',
        zh: '两个等位基因都对表现型有贡献，因此杂合体具有自己独特的表现型，而不是像某一亲本。',
      },
      syllabus: ['0610.17.4.14'],
    },
    {
      en: 'sex-linked characteristic',
      zh: '伴性性状',
      definition: {
        en: 'One carried on a sex chromosome, in practice almost always the X. Males show recessive sex-linked conditions far more often, having no second X to mask them.',
        zh: '由性染色体携带的性状，实际上几乎总在 X 上。男性表现出隐性伴性病症的频率高得多，因为他们没有第二条 X 来掩盖它。',
      },
      syllabus: ['0610.17.4.16'],
    },
    {
      en: 'haploid',
      zh: '单倍体',
      definition: {
        en: 'Having one set of chromosomes. Gametes are haploid — 23 in a human — so that fertilisation restores the diploid 46.',
        zh: '只含一套染色体。配子是单倍体——人类为 23 条——使受精后恢复到二倍体的 46 条。',
      },
      syllabus: ['0610.17.1.10'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'punnett',
    kernel: '17-1-inheritance',
    hint: {
      en: 'Set both parents to one copy and read the ratio. Then switch the cross and see the same four squares mean something different.',
      zh: '把双亲都设为一个拷贝，读出比例。然后切换杂交类型，看同样的四个格子如何有了不同的含义。',
    },
    params: [
      {
        key: 'cross',
        label: { en: 'Cross', zh: '杂交类型' },
        unit: '',
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Flower colour', zh: '花色' } },
          { value: 2, label: { en: 'Sickle cell', zh: '镰状细胞' } },
          { value: 3, label: { en: 'Colour blindness', zh: '色盲' } },
        ],
      },
      {
        key: 'father',
        label: { en: 'Father: copies of the allele', zh: '父本：该等位基因的拷贝数' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 1,
        options: [
          { value: 0, label: { en: 'None', zh: '没有' } },
          { value: 1, label: { en: 'One', zh: '一个' } },
          { value: 2, label: { en: 'Two', zh: '两个' } },
        ],
      },
      {
        key: 'mother',
        label: { en: 'Mother: copies of the allele', zh: '母本：该等位基因的拷贝数' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 1,
        options: [
          { value: 0, label: { en: 'None', zh: '没有' } },
          { value: 1, label: { en: 'One', zh: '一个' } },
          { value: 2, label: { en: 'Two', zh: '两个' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'affected',
        label: { en: 'Chance of showing the trait', zh: '表现该性状的概率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'carrier',
        label: { en: 'Chance of carrying one copy', zh: '携带一个拷贝的概率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'unaffected',
        label: { en: 'Chance of not showing it', zh: '不表现该性状的概率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'outcomes',
        label: { en: 'Different phenotypes', zh: '不同表现型的数目' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Two heterozygotes: 3 : 1', zh: '两个杂合体：3∶1' },
        params: { cross: 1, father: 1, mother: 1 },
      },
      {
        label: { en: 'Test cross', zh: '测交' },
        params: { cross: 1, father: 1, mother: 2 },
      },
      {
        label: { en: 'Breeding true', zh: '稳定遗传' },
        params: { cross: 1, father: 0, mother: 0 },
      },
      {
        label: { en: 'Codominance: 1 : 2 : 1', zh: '共显性：1∶2∶1' },
        params: { cross: 2, father: 1, mother: 1 },
      },
      {
        label: { en: 'Sex determination', zh: '性别决定' },
        params: { cross: 3, father: 0, mother: 0 },
      },
      {
        label: { en: 'A carrier mother', zh: '携带者母亲' },
        params: { cross: 3, father: 0, mother: 1 },
      },
      {
        label: { en: 'A colour-blind daughter', zh: '色盲的女儿' },
        params: { cross: 3, father: 1, mother: 1 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-17-1-cp1',
      syllabus: ['0610.17.4.11', '0610.17.4.12'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 4,
      stem: 'In pea plants, tall (T) is dominant to short (t). Two heterozygous tall plants are crossed. Draw a genetic diagram to predict the offspring, and state the expected phenotype ratio.',
      markScheme: [
        { text: 'Parental genotypes Tt × Tt, with gametes T and t from each', marks: 1 },
        { text: 'A completed Punnett square giving TT, Tt, Tt, tt', marks: 1 },
        { text: 'Phenotypes: three tall, one short', marks: 1 },
        { text: 'Ratio 3 : 1 tall to short', marks: 1 },
      ],
      examinerNote: {
        en: 'Marks are for the working. A bare "3 : 1" with no diagram throws away three of the four, however right it is.',
        zh: '分数是给推导过程的。只写一个"3∶1"而没有图，无论多正确都会丢掉四分中的三分。',
      },
    },
    {
      id: '0610-17-1-cp2',
      syllabus: ['0610.17.4.13'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A plant with red flowers may be homozygous or heterozygous. Describe how a test cross could be used to find out which, and state how the results would be interpreted.',
      markScheme: [
        { text: 'Cross it with a homozygous recessive plant — one with white flowers', marks: 1 },
        { text: 'If all the offspring have red flowers, the unknown plant is homozygous', marks: 1 },
        {
          text: 'If about half the offspring have white flowers, the unknown plant is heterozygous',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'It must be the homozygous recessive. Crossing with another red plant tells you nothing, because a dominant allele from either parent would hide the result.',
        zh: '必须与纯合隐性个体杂交。与另一株红花杂交毫无用处，因为任一亲本提供的显性等位基因都会掩盖结果。',
      },
    },
    {
      id: '0610-17-1-cp3',
      syllabus: ['0610.17.4.14', '0610.17.4.18'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Two people who each have sickle cell trait have a child. Explain the possible genotypes and phenotypes of the child, and give the probability of each.',
      markScheme: [
        { text: 'Both parents are heterozygous, and each can pass on either allele', marks: 1 },
        {
          text: 'The child may be homozygous normal (1 in 4), heterozygous (2 in 4) or homozygous sickle (1 in 4)',
          marks: 1,
        },
        {
          text: 'Because the alleles are codominant, the heterozygote has its own phenotype — sickle cell trait — rather than appearing normal',
          marks: 1,
        },
        {
          text: 'So the phenotype ratio is 1 : 2 : 1 unaffected to trait to sickle cell anaemia',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The genotypes are the same 1 : 2 : 1 as any heterozygous cross. What codominance changes is that all three are visibly different, so the phenotype ratio is 1 : 2 : 1 and not 3 : 1.',
        zh: '基因型与任何杂合杂交一样都是 1∶2∶1。共显性改变的是这三者在外观上都不同，因此表现型比是 1∶2∶1 而不是 3∶1。',
      },
    },
    {
      id: '0610-17-1-cp4',
      syllabus: ['0610.17.4.16', '0610.17.4.17'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Red–green colour blindness is caused by a recessive allele carried on the X chromosome. Explain why the condition is much more common in males than in females.',
      markScheme: [
        {
          text: 'A male has only one X chromosome, so he has only one copy of the gene',
          marks: 1,
        },
        {
          text: 'The Y chromosome does not carry a matching allele, so a single recessive allele is expressed',
          marks: 1,
        },
        {
          text: 'A female has two X chromosomes, so a dominant allele on one masks a recessive allele on the other; she must inherit two recessive alleles to be affected',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The Y is the key and is the part most often left out. "Males only have one X" is half of it — the mark is for saying the Y has no allele to mask it with.',
        zh: 'Y 染色体是关键，也是最常被漏掉的部分。"男性只有一条 X"只答了一半——得分点在于指出 Y 上没有可用来掩盖它的等位基因。',
      },
    },
    {
      id: '0610-17-1-cp5',
      syllabus: ['0610.17.1.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why approximately half of all babies born are male and half are female.',
      markScheme: [
        { text: 'A mother has two X chromosomes, so every egg carries an X', marks: 1 },
        {
          text: 'A father has an X and a Y, so half of his sperm carry X and half carry Y',
          marks: 1,
        },
        {
          text: 'Each type of sperm is equally likely to fertilise the egg, giving an equal chance of XX and XY',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The sex of a child is decided by the father, because the mother has nothing but X to give. That is the point of the question.',
        zh: '孩子的性别由父亲决定，因为母亲只能提供 X。这正是本题的用意。',
      },
    },
    {
      id: '0610-17-1-cp6',
      syllabus: ['0610.17.1.5', '0610.17.1.6', '0610.17.1.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how the base sequence of a gene determines the structure and function of a protein.',
      markScheme: [
        {
          text: 'The sequence of bases in the gene determines the sequence of amino acids in the protein',
          marks: 1,
        },
        {
          text: 'A copy of the gene is made as mRNA, which passes out of the nucleus to a ribosome',
          marks: 1,
        },
        {
          text: 'The ribosome assembles the amino acids in the order the mRNA specifies',
          marks: 1,
        },
        {
          text: 'The sequence of amino acids determines the shape the protein folds into, and its shape determines what it can do',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Finish on shape. A protein works by fitting something — an active site, a receptor — so a change in shape is a change in function, and that is the last link in the chain.',
        zh: '要落在"形状"上收尾。蛋白质靠契合来工作——活性位点、受体——因此形状的改变就是功能的改变，这是链条的最后一环。',
      },
    },
    {
      id: '0610-17-1-cp7',
      syllabus: ['0610.17.2.1', '0610.17.3.2'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare mitosis and meiosis in terms of the number and genetic make-up of the cells produced.',
      markScheme: [
        {
          text: 'Mitosis produces two cells; meiosis produces four',
          marks: 1,
        },
        {
          text: 'Mitosis keeps the chromosome number the same (diploid); meiosis halves it (haploid)',
          marks: 1,
        },
        {
          text: 'Mitosis gives cells genetically identical to the parent cell; meiosis gives cells that are genetically different',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Compare" needs both sides in each point. Three facts about mitosis with nothing about meiosis scores nothing.',
        zh: '"Compare"要求每一点都写出两边。只写三条关于有丝分裂的事实而不提减数分裂，一分不得。',
      },
    },
    {
      id: '0610-17-1-cp8',
      syllabus: ['0610.17.4.10'],
      tier: 'core',
      commandWord: 'Deduce',
      marks: 2,
      stem: 'In a pedigree diagram, two unaffected parents have a daughter who is affected by a genetic condition. Deduce whether the allele causing the condition is dominant or recessive, and give a reason.',
      markScheme: [
        { text: 'The allele is recessive', marks: 1 },
        {
          text: 'Because both parents must carry it without showing it, which is only possible if it is masked by a dominant allele',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This one comparison settles it. Two unaffected parents with an affected child means recessive, every time — and if the affected child is a daughter, it is probably not sex-linked either.',
        zh: '这一个对比就能定论。两个未患病的双亲生出患病的孩子，永远意味着隐性——而如果患病的是女儿，那多半也不是伴性遗传。',
      },
    },
  ],
}

export default lesson

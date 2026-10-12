import type { QualitativeAnalysisLabExtra } from './types'

export const defaultQualitativeAnalysisLabData: QualitativeAnalysisLabExtra = {
  type: 'qualitative-analysis-lab',
  id: 'qualitative-analysis-workbench',
  title: {
    en: 'Paper 6 Qualitative Analysis Interactive Workbench',
    zh: 'Paper 6 实验定性分析与离子气体检验工作台'
  },
  hint: {
    en: 'Simulate dropwise addition of NaOH, NH₃, AgNO₃, and Ba(NO₃)₂. Observe precipitate colors, solubility in excess, gas tests, and flame emission colors.',
    zh: '模拟逐滴加入 NaOH、NH₃、硝酸银及硝酸钡试剂。观察沉淀颜色、过量溶解性、特征气体检验与焰色反应。'
  },
  cations: [
    {
      id: 'al3',
      name: { en: 'Aluminium ion (Al³⁺)', zh: '铝离子 (Al³⁺)' },
      formula: 'Al³⁺',
      naohFew: {
        en: 'White precipitate forms',
        zh: '生成白色沉淀 [Al(OH)₃]'
      },
      naohExcess: {
        en: 'Precipitate dissolves giving a colourless solution',
        zh: '白色沉淀溶解，得到无色澄清溶液 [形成四羟基合铝酸根]'
      },
      nh3Few: {
        en: 'White precipitate forms',
        zh: '生成白色沉淀'
      },
      nh3Excess: {
        en: 'Precipitate is insoluble in excess ammonia',
        zh: '沉淀不溶于过量氨水'
      },
      precipitateColor: '#f8fafc',
      isSolubleExcessNaOH: true,
      isSolubleExcessNH3: false
    },
    {
      id: 'nh4',
      name: { en: 'Ammonium ion (NH₄⁺)', zh: '铵根离子 (NH₄⁺)' },
      formula: 'NH₄⁺',
      naohFew: {
        en: 'No precipitate; ammonia gas produced on gentle warming',
        zh: '无沉淀生成；微热释放出刺激性氨气'
      },
      naohExcess: {
        en: 'Ammonia gas turns damp red litmus paper blue',
        zh: '持续释放刺激性氨气，使湿润红色石蕊试纸变蓝'
      },
      nh3Few: {
        en: 'No reaction',
        zh: '无反应'
      },
      nh3Excess: {
        en: 'No reaction',
        zh: '无反应'
      },
      precipitateColor: 'transparent',
      isSolubleExcessNaOH: false,
      isSolubleExcessNH3: false
    },
    {
      id: 'ca2',
      name: { en: 'Calcium ion (Ca²⁺)', zh: '钙离子 (Ca²⁺)' },
      formula: 'Ca²⁺',
      naohFew: {
        en: 'White precipitate forms',
        zh: '生成白色微溶沉淀 [Ca(OH)₂]'
      },
      naohExcess: {
        en: 'Precipitate is insoluble in excess NaOH',
        zh: '白色沉淀在过量 NaOH 中不溶解'
      },
      nh3Few: {
        en: 'No precipitate (or very slight faint white ppt)',
        zh: '无沉淀（或仅产生极微量微弱浑浊）'
      },
      nh3Excess: {
        en: 'No precipitate formed',
        zh: '无沉淀'
      },
      precipitateColor: '#f1f5f9',
      isSolubleExcessNaOH: false,
      isSolubleExcessNH3: false
    },
    {
      id: 'cr3',
      name: { en: 'Chromium(III) ion (Cr³⁺)', zh: '铬(III)离子 (Cr³⁺)' },
      formula: 'Cr³⁺',
      naohFew: {
        en: 'Green precipitate forms',
        zh: '生成灰绿色沉淀 [Cr(OH)₃]'
      },
      naohExcess: {
        en: 'Precipitate dissolves giving a green solution',
        zh: '沉淀溶解形成深绿色溶液'
      },
      nh3Few: {
        en: 'Grey-green precipitate forms',
        zh: '生成灰绿色沉淀'
      },
      nh3Excess: {
        en: 'Precipitate is insoluble in excess ammonia',
        zh: '沉淀不溶于过量氨水'
      },
      precipitateColor: '#10b981',
      isSolubleExcessNaOH: true,
      isSolubleExcessNH3: false
    },
    {
      id: 'cu2',
      name: { en: 'Copper(II) ion (Cu²⁺)', zh: '铜(II)离子 (Cu²⁺)' },
      formula: 'Cu²⁺',
      naohFew: {
        en: 'Light blue precipitate forms',
        zh: '生成浅蓝色絮状沉淀 [Cu(OH)₂]'
      },
      naohExcess: {
        en: 'Precipitate is insoluble in excess NaOH',
        zh: '浅蓝色沉淀不溶于过量 NaOH'
      },
      nh3Few: {
        en: 'Light blue precipitate forms',
        zh: '生成浅蓝色沉淀'
      },
      nh3Excess: {
        en: 'Dissolves giving a deep royal-blue solution',
        zh: '沉淀溶解，形成清澈透亮的深深皇家蓝络合物溶液 [Cu(NH₃)₄]²⁺'
      },
      precipitateColor: '#38bdf8',
      isSolubleExcessNaOH: false,
      isSolubleExcessNH3: true
    },
    {
      id: 'fe2',
      name: { en: 'Iron(II) ion (Fe²⁺)', zh: '铁(II)离子 (Fe²⁺)' },
      formula: 'Fe²⁺',
      naohFew: {
        en: 'Green precipitate forms',
        zh: '生成白偏浅绿色沉淀 [Fe(OH)₂]'
      },
      naohExcess: {
        en: 'Insoluble; turns reddish-brown at surface on contact with air',
        zh: '沉淀不溶解；在空气中接触氧气表面迅速被氧化转为红褐色'
      },
      nh3Few: {
        en: 'Green precipitate forms',
        zh: '生成绿色沉淀'
      },
      nh3Excess: {
        en: 'Insoluble in excess ammonia (slowly turns brown at top)',
        zh: '不溶于过量氨水（液面接触空气逐渐氧化泛棕黄色）'
      },
      precipitateColor: '#22c55e',
      isSolubleExcessNaOH: false,
      isSolubleExcessNH3: false
    },
    {
      id: 'fe3',
      name: { en: 'Iron(III) ion (Fe³⁺)', zh: '铁(III)离子 (Fe³⁺)' },
      formula: 'Fe³⁺',
      naohFew: {
        en: 'Red-brown precipitate forms',
        zh: '立即生成红褐色胶状沉淀 [Fe(OH)₃]'
      },
      naohExcess: {
        en: 'Precipitate is insoluble in excess NaOH',
        zh: '红褐色沉淀完全不溶于过量 NaOH'
      },
      nh3Few: {
        en: 'Red-brown precipitate forms',
        zh: '生成红褐色沉淀'
      },
      nh3Excess: {
        en: 'Precipitate is insoluble in excess ammonia',
        zh: '红褐色沉淀完全不溶于过量氨水'
      },
      precipitateColor: '#b45309',
      isSolubleExcessNaOH: false,
      isSolubleExcessNH3: false
    },
    {
      id: 'zn2',
      name: { en: 'Zinc ion (Zn²⁺)', zh: '锌离子 (Zn²⁺)' },
      formula: 'Zn²⁺',
      naohFew: {
        en: 'White precipitate forms',
        zh: '生成白色沉淀 [Zn(OH)₂]'
      },
      naohExcess: {
        en: 'Precipitate dissolves giving a colourless solution',
        zh: '沉淀完全溶解生成无色溶液 [形成锌酸根配离子]'
      },
      nh3Few: {
        en: 'White precipitate forms',
        zh: '生成白色沉淀'
      },
      nh3Excess: {
        en: 'Precipitate dissolves giving a colourless solution',
        zh: '沉淀完全溶解生成无色溶液 [形成锌氨络离子 [Zn(NH₃)₄]²⁺]'
      },
      precipitateColor: '#ffffff',
      isSolubleExcessNaOH: true,
      isSolubleExcessNH3: true
    }
  ],
  anions: [
    {
      id: 'carbonate',
      name: { en: 'Carbonate (CO₃²⁻)', zh: '碳酸根 (CO₃²⁻)' },
      formula: 'CO₃²⁻',
      reagent: {
        en: 'Add dilute hydrochloric acid (HCl)',
        zh: '加入稀盐酸或稀硝酸'
      },
      observation: {
        en: 'Vigorous effervescence of colorless gas; gas turns limewater cloudy white (CO₂)',
        zh: '剧烈产生无色气体气泡，气体使澄清石灰水变浑浊白色沉淀 (CO₂)'
      },
      equation: 'CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l)'
    },
    {
      id: 'chloride',
      name: { en: 'Chloride (Cl⁻)', zh: '氯离子 (Cl⁻)' },
      formula: 'Cl⁻',
      reagent: {
        en: 'Acidify with dilute HNO₃, then add aqueous AgNO₃',
        zh: '加入稀硝酸酸化，再滴入硝酸银溶液'
      },
      observation: {
        en: 'Dense white precipitate forms (AgCl)',
        zh: '生成致密白色沉淀 (AgCl)'
      },
      precipitateColor: '#ffffff',
      equation: 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)'
    },
    {
      id: 'bromide',
      name: { en: 'Bromide (Br⁻)', zh: '溴离子 (Br⁻)' },
      formula: 'Br⁻',
      reagent: {
        en: 'Acidify with dilute HNO₃, then add aqueous AgNO₃',
        zh: '加入稀硝酸酸化，再滴入硝酸银溶液'
      },
      observation: {
        en: 'Cream / pale yellow precipitate forms (AgBr)',
        zh: '生成淡黄色 / 奶油色沉淀 (AgBr)'
      },
      precipitateColor: '#fef08a',
      equation: 'Ag⁺(aq) + Br⁻(aq) → AgBr(s)'
    },
    {
      id: 'iodide',
      name: { en: 'Iodide (I⁻)', zh: '碘离子 (I⁻)' },
      formula: 'I⁻',
      reagent: {
        en: 'Acidify with dilute HNO₃, then add aqueous AgNO₃',
        zh: '加入稀硝酸酸化，再滴入硝酸银溶液'
      },
      observation: {
        en: 'Bright yellow precipitate forms (AgI)',
        zh: '生成鲜黄色沉淀 (AgI)'
      },
      precipitateColor: '#eab308',
      equation: 'Ag⁺(aq) + I⁻(aq) → AgI(s)'
    },
    {
      id: 'nitrate',
      name: { en: 'Nitrate (NO₃⁻)', zh: '硝酸根 (NO₃⁻)' },
      formula: 'NO₃⁻',
      reagent: {
        en: 'Add aqueous NaOH, then aluminium foil; warm gently',
        zh: '加入氢氧化钠溶液与铝箔，微热'
      },
      observation: {
        en: 'Ammonia gas produced; pungent gas turns damp red litmus blue',
        zh: '释放氨气气体；刺鼻气体使湿润红色石蕊试纸变蓝'
      },
      equation: '8Al + 3NO₃⁻ + 5OH⁻ + 18H₂O → 3NH₃ + 8[Al(OH)₄]⁻'
    },
    {
      id: 'sulfate',
      name: { en: 'Sulfate (SO₄²⁻)', zh: '硫酸根 (SO₄²⁻)' },
      formula: 'SO₄²⁻',
      reagent: {
        en: 'Acidify with dilute HNO₃, then add aqueous Ba(NO₃)₂',
        zh: '加入稀硝酸酸化，再加入硝酸钡溶液'
      },
      observation: {
        en: 'Dense white precipitate forms (BaSO₄)',
        zh: '生成致密白色沉淀 (BaSO₄)'
      },
      precipitateColor: '#ffffff',
      equation: 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)'
    },
    {
      id: 'sulfite',
      name: { en: 'Sulfite (SO₃²⁻)', zh: '亚硫酸根 (SO₃²⁻)' },
      formula: 'SO₃²⁻',
      reagent: {
        en: 'Add dilute hydrochloric acid; warm gently',
        zh: '加入稀盐酸，温热反应体系'
      },
      observation: {
        en: 'Sulfur dioxide gas produced; turns acidified potassium manganate(VII) purple to colourless',
        zh: '释放出二氧化硫气体；使酸性高锰酸钾溶液由紫色褪为无色'
      },
      equation: 'SO₃²⁻(aq) + 2H⁺(aq) → SO₂(g) + H₂O(l)'
    }
  ],
  gases: [
    {
      id: 'ammonia',
      name: { en: 'Ammonia (NH₃)', zh: '氨气 (NH₃)' },
      formula: 'NH₃',
      test: {
        en: 'Hold damp red litmus paper near gas opening',
        zh: '用湿润红色石蕊试纸放在气体试管口'
      },
      result: {
        en: 'Damp red litmus paper turns blue (alkaline gas)',
        zh: '湿润红色石蕊试纸变蓝（唯一碱性气体）'
      },
      colorHint: '#38bdf8'
    },
    {
      id: 'carbon-dioxide',
      name: { en: 'Carbon dioxide (CO₂)', zh: '二氧化碳 (CO₂)' },
      formula: 'CO₂',
      test: {
        en: 'Bubble gas through aqueous calcium hydroxide (limewater)',
        zh: '将气体通入澄清石灰水 [Ca(OH)₂ aq]'
      },
      result: {
        en: 'Limewater turns cloudy white milky precipitate',
        zh: '澄清石灰水生成微细碳酸钙白色沉淀变浑浊'
      },
      colorHint: '#94a3b8'
    },
    {
      id: 'chlorine',
      name: { en: 'Chlorine (Cl₂)', zh: '氯气 (Cl₂)' },
      formula: 'Cl₂',
      test: {
        en: 'Hold damp blue litmus paper near gas',
        zh: '用湿润蓝色石蕊试纸检验气体'
      },
      result: {
        en: 'Bleaches damp litmus paper white (turns red momentarily first)',
        zh: '漂白湿润石蕊试纸变白（先短暂因酸性变红，随后彻底漂白褪色）'
      },
      colorHint: '#a3e635'
    },
    {
      id: 'hydrogen',
      name: { en: 'Hydrogen (H₂)', zh: '氢气 (H₂)' },
      formula: 'H₂',
      test: {
        en: 'Hold a lighted wooden splint near mouth of tube',
        zh: '用燃着的木条靠近试管口'
      },
      result: {
        en: 'Burns with a distinctive squeaky "pop" sound',
        zh: '气体燃烧发出清脆的特有"爆鸣声"'
      },
      colorHint: '#f59e0b'
    },
    {
      id: 'oxygen',
      name: { en: 'Oxygen (O₂)', zh: '氧气 (O₂)' },
      formula: 'O₂',
      test: {
        en: 'Insert a glowing wooden splint into the test tube',
        zh: '将带火星的木条伸入试管内'
      },
      result: {
        en: 'Relights the glowing wooden splint',
        zh: '带火星的木条猛烈复燃'
      },
      colorHint: '#ef4444'
    },
    {
      id: 'sulfur-dioxide',
      name: { en: 'Sulfur dioxide (SO₂)', zh: '二氧化硫 (SO₂)' },
      formula: 'SO₂',
      test: {
        en: 'Bubble through acidified aqueous potassium manganate(VII)',
        zh: '通入酸性高锰酸钾溶液 [KMnO₄ aq]'
      },
      result: {
        en: 'Turns acidified KMnO₄ from deep purple to completely colourless',
        zh: '使酸性高锰酸钾溶液由深紫色迅速还原褪至无色'
      },
      colorHint: '#a855f7'
    }
  ],
  flameTests: [
    {
      id: 'li',
      name: { en: 'Lithium (Li⁺)', zh: '锂 (Li⁺)' },
      ion: 'Li⁺',
      flameColor: '#ef4444',
      flameDescription: { en: 'Red (crimson)', zh: '红色（洋红色）' }
    },
    {
      id: 'na',
      name: { en: 'Sodium (Na⁺)', zh: '钠 (Na⁺)' },
      ion: 'Na⁺',
      flameColor: '#eab308',
      flameDescription: { en: 'Yellow / Orange-yellow', zh: '黄色 / 橙黄色' }
    },
    {
      id: 'k',
      name: { en: 'Potassium (K⁺)', zh: '钾 (K⁺)' },
      ion: 'K⁺',
      flameColor: '#c084fc',
      flameDescription: { en: 'Lilac (pale purple)', zh: '浅紫色（丁香紫）' }
    },
    {
      id: 'ca',
      name: { en: 'Calcium (Ca²⁺)', zh: '钙 (Ca²⁺)' },
      ion: 'Ca²⁺',
      flameColor: '#f97316',
      flameDescription: { en: 'Orange-red', zh: '橙红色（砖红）' }
    },
    {
      id: 'ba',
      name: { en: 'Barium (Ba²⁺)', zh: '钡 (Ba²⁺)' },
      ion: 'Ba²⁺',
      flameColor: '#84cc16',
      flameDescription: { en: 'Light green (apple green)', zh: '浅绿色（苹果绿）' }
    },
    {
      id: 'cu',
      name: { en: 'Copper(II) (Cu²⁺)', zh: '铜 (Cu²⁺)', },
      ion: 'Cu²⁺',
      flameColor: '#06b6d4',
      flameDescription: { en: 'Blue-green', zh: '蓝绿色' }
    }
  ],
  examinerNotes: {
    en: 'Paper 6 Secret: To distinguish Al³⁺, Zn²⁺, and Ca²⁺: (1) Add NaOH: Ca²⁺ ppt is insoluble in excess, but Al³⁺ and Zn²⁺ dissolve. (2) Add aqueous NH₃: Al³⁺ ppt is insoluble in excess, while Zn²⁺ dissolves completely! In halide tests, always acidify with dilute HNO₃ first to eliminate carbonate interference.',
    zh: 'Paper 6 核心必考秘籍：区分 Al³⁺、Zn²⁺、Ca²⁺ 三大白色沉淀：(1) 加 NaOH：Ca²⁺ 沉淀过量不溶，Al³⁺ 和 Zn²⁺ 沉淀皆溶；(2) 加 NH₃：Al³⁺ 沉淀过量不溶，而 Zn²⁺ 沉淀过量完全溶解！检验卤素离子前必须先加稀硝酸，目的是彻底排除碳酸根干扰。'
  }
}

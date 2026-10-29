import type { G8SaltsGuideExtra } from '@/content/types'

export const g8SaltsGuideData: G8SaltsGuideExtra = {
  type: 'g8-salts-guide',
  id: 'g8-u2-salts-preparation-handout',
  title: {
    en: 'G8 Unit 2: Salt Preparation Methods & Solubility Mastery Guide',
    zh: 'G8 第二单元：三大盐类制备法与溶解度综合精讲',
  },
  hint: {
    en: 'Master the three routes to prepare pure, dry chemical salts (Lessons 13–16 of the Cambridge curriculum) using original textbook diagrams, filtration steps, and titration procedures.',
    zh: '基于官方课本与 PPT 原版实验图示，深度掌握制备纯净干燥盐类的三大工艺路线、过滤提纯及滴定终点判定。',
  },
  sections: [
    {
      id: 'solubility-rules-and-strategy',
      title: {
        en: '1. General Solubility Rules & 3-Route Decision Tree',
        zh: '1. 盐类溶解性一般规律与三大制备路线决策树',
      },
      badge: {
        en: 'Lesson 13 · Core Strategy',
        zh: '第 13 课 · 核心决策树',
      },
      subtitle: {
        en: 'The logic behind choosing whether to use Precipitation, Titration, or the Excess Base method',
        zh: '选择沉淀法、滴定法或过量难溶固体法的严密判断逻辑',
      },
      description: {
        en: 'Choosing how to make a salt in the laboratory is never guesswork. It depends strictly on two physical facts: 1. Is the target salt soluble or insoluble in water? 2. If it is soluble, is the starting base soluble (an alkali) or insoluble?',
        zh: '在实验室中选择制备某种盐的路线绝非随意猜测，而是完全由两个物理事实严格决定：1. 目标产物盐是可溶的还是难溶的？2. 如果是可溶盐，所选用的碱是可溶的（强碱溶液）还是难溶的固体？',
      },
      image: '/figures/g8/0620-7-3-salts/fig-3-1-soluble-salt-prep-method.png',
      imageCaption: {
        en: 'Figure 3.1: The systematic pathway for salt preparation. Knowing salt solubility dictates whether you synthesize via precipitation (insoluble salt) or crystallisation from solution (soluble salt).',
        zh: '图 3.1：制备盐类的系统性决策路径。根据盐在水中的溶解度，严格决定采用沉淀过滤法（难溶盐）还是溶液结晶法（可溶盐）。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Universal Solubility Rules to Memorise',
            zh: '剑桥 0620 考纲必背溶解性铁律',
          },
          body: {
            en: '• ALL Nitrates (NO₃⁻) are SOLUBLE without exception.\n• ALL Common Sodium (Na⁺), Potassium (K⁺), and Ammonium (NH₄⁺) salts are SOLUBLE.\n• ALL Chlorides (Cl⁻) are SOLUBLE, EXCEPT Silver chloride (AgCl) and Lead(II) chloride (PbCl₂).\n• ALL Sulfates (SO₄²⁻) are SOLUBLE, EXCEPT Barium sulfate (BaSO₄), Calcium sulfate (CaSO₄), and Lead(II) sulfate (PbSO₄).\n• Most Carbonates (CO₃²⁻) and Hydroxides (OH⁻) are INSOLUBLE (except Group 1 and ammonium).',
            zh: '• 所有硝酸盐（NO₃⁻）全部可溶，绝无例外！\n• 所有钠盐（Na⁺）、钾盐（K⁺）、铵盐（NH₄⁺）全部可溶！\n• 氯化物（Cl⁻）绝大多数可溶，唯二不溶：氯化银 (AgCl) 与氯化铅 (PbCl₂)！\n• 硫酸盐（SO₄²⁻）绝大多数可溶，唯三不溶：硫酸钡 (BaSO₄)、硫酸钙 (CaSO₄)、硫酸铅 (PbSO₄)！\n• 碳酸盐（CO₃²⁻）与氢氧化物（OH⁻）绝大多数不溶（除钠、钾、铵外）。',
          },
        },
        {
          title: {
            en: 'The 3-Route Decision Algorithm',
            zh: '三大制盐路线终极决策算法',
          },
          body: {
            en: '1. Target salt is INSOLUBLE? → Use Route 3: Precipitation (mix two soluble solutions, filter precipitate).\n2. Target salt is SOLUBLE, made from INSOLUBLE base/carbonate/metal? → Use Route 1: Excess Solid Method.\n3. Target salt is SOLUBLE, made from SOLUBLE alkali (Na, K, NH₄)? → Use Route 2: Titration Method.',
            zh: '1. 目标盐【难溶于水】？→ 必选【路线 3：沉淀法】（混合两种可溶盐溶液，过滤沉淀）。\n2. 目标盐【可溶】，起始碱【难溶于水】（如 CuO, Mg, CaCO₃）？→ 必选【路线 1：过量难溶固体法】。\n3. 目标盐【可溶】，起始碱【可溶于水】（钠、钾、铵的强碱溶液）？→ 必选【路线 2：酸碱滴定法】。',
          },
        },
      ],
      keyTakeaway: {
        en: 'The Core Rule: If you want sodium chloride (NaCl) or potassium sulfate (K₂SO₄), you CANNOT use the excess base method, because excess NaOH or KOH would dissolve and contaminate your crystals! You MUST use titration.',
        zh: '核心避坑铁律：制备氯化钠（NaCl）或硫酸钾（K₂SO₄）时，绝对不能用过量碱法！因为多加的 NaOH 或 KOH 会完全溶解在水中，无法通过过滤除去，导致结晶产品被强碱严重污染！此时必须使用滴定法。',
      },
      quiz: {
        question: {
          en: 'Which method must be used to prepare a pure, dry sample of insoluble barium sulfate (BaSO₄)?',
          zh: '制备纯净干燥的难溶性硫酸钡（BaSO₄）样品，必须采用哪种方法？',
        },
        options: [
          { en: 'Precipitation by mixing barium chloride solution and sodium sulfate solution', zh: '沉淀法：将氯化钡溶液与硫酸钠溶液混合过滤' },
          { en: 'Excess solid method using barium metal and sulfuric acid', zh: '过量固体法：将钡金属投入硫酸中' },
          { en: 'Acid-alkali titration using a burette and indicator', zh: '滴定法：使用滴定管与指示剂滴定' },
          { en: 'Direct evaporation of sea water', zh: '海水直接蒸发' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Correct! Barium sulfate is an insoluble salt, so it must be made by precipitation mixing two soluble solutions (BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl).',
          zh: '回答正确！硫酸钡是难溶盐，必须采用沉淀法：取两种可溶性溶液混合，瞬时析出白色沉淀并过滤收集。',
        },
      },
    },
    {
      id: 'method-1-excess-insoluble-base',
      title: {
        en: '2. Method 1: The Excess Insoluble Base / Carbonate Route',
        zh: '2. 路线一：过量难溶固体反应结晶法（制备大部分可溶盐）',
      },
      badge: {
        en: 'Lesson 13 · Core Synthesis',
        zh: '第 13 课 · 经典制盐法',
      },
      subtitle: {
        en: 'Four sequential stages: React, Filter, Evaporate to saturation, and Crystallise',
        zh: '四大标准操作流程：加热反应、过滤多余固体、蒸发浓缩至饱和、缓慢降温结晶',
      },
      description: {
        en: 'This is the most common laboratory method to prepare soluble salts of transition metals or alkaline earth metals (such as copper(II) sulfate or magnesium chloride). An insoluble metal oxide, hydroxide, carbonate, or unreactive metal is added in excess to warm acid.',
        zh: '这是中学实验室制备过渡金属或碱土金属可溶盐（如五水硫酸铜或氯化镁）最通用的方法。将难溶的金属氧化物、氢氧化物、碳酸盐或活泼金属过量加入温热的酸中，彻底消耗掉所有酸液。',
      },
      image: '/figures/g8/0620-7-3-salts/fig-3-1-soluble-salt-prep-method.png',
      secondaryImage: '/figures/g8/0620-7-3-salts/fig-3-4-crystallisation-basin.png',
      imageCaption: {
        en: 'Figure 3.2 & 3.3: Left: The four core stages of preparing copper sulfate crystals from copper(II) oxide and sulfuric acid. Right: Evaporating basin heated over a beaker water bath until the crystallisation point is reached.',
        zh: '图 3.2 与 3.3：左图为氧化铜与稀硫酸制备硫酸铜晶体的四步核心流程；右图为利用水浴温和加热蒸发皿至结晶点的标准实验操作。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Stage 1: React with Excess Solid',
            zh: '第一阶段：温热酸液，加入过量难溶固体',
          },
          body: {
            en: 'Warm dilute sulfuric acid in a beaker. Add copper(II) oxide powder spatula by spatula with continuous stirring. Continue adding until some black solid remains unreacted at the bottom. This proves that ALL acid has been completely neutralised.',
            zh: '在烧杯中微热稀硫酸。用药匙分批加入黑色的氧化铜粉末并用玻璃棒持续搅拌。持续添加直至烧杯底部出现多余未溶解的黑色固体，这确证了所有的酸已被完全反应中和完毕。',
          },
          equation: '\\mathrm{CuO(s) + H_2SO_4(aq) \\rightarrow CuSO_4(aq) + H_2O(l)}',
        },
        {
          title: {
            en: 'Stage 2: Filter Off Excess Unreacted Solid',
            zh: '第二阶段：过滤除去多余的难溶固体',
          },
          body: {
            en: 'Filter the warm mixture through filter paper in a funnel into a conical flask. The unreacted black CuO remains on the filter paper as residue. The clear blue filtrate contains only dissolved copper(II) sulfate and water.',
            zh: '趁热将混合液倒入垫有滤纸的漏斗中过滤。未反应的多余氧化铜黑粉作为滤渣留在滤纸上，流入下方容器的纯净蓝色滤液中只含有溶质硫酸铜和水。',
          },
        },
        {
          title: {
            en: 'Stage 3: Evaporate to Crystallisation Point',
            zh: '第三阶段：蒸发浓缩至出现结晶膜（结晶点）',
          },
          body: {
            en: 'Pour the filtrate into an evaporating basin and heat gently over a water bath or Bunsen burner. Evaporate water until a saturated solution is formed (test: dip a cold glass rod into the solution; small crystals form on the tip). NEVER boil to complete dryness!',
            zh: '将滤液移入蒸发皿中，用酒精灯或水浴温和加热蒸发多余水分，直至溶液达到饱和状态（检验方法：用冷玻璃棒伸入溶液蘸取，棒尖迅速析出微细晶体，即达结晶点）。切忌蒸干！',
          },
        },
        {
          title: {
            en: 'Stage 4: Cool, Filter Crystals, and Dry',
            zh: '第四阶段：缓慢冷却结晶、过滤晶体并干燥',
          },
          body: {
            en: 'Remove from heat and leave the warm saturated solution to cool down slowly at room temperature (slow cooling yields large, well-defined blue crystals). Filter off the crystals, wash with a drop of ice-cold distilled water, and pat dry gently between filter papers or in a desiccator.',
            zh: '停止加热，将饱和溶液静置室温下缓慢降温（缓慢降温能够生长出规则硕大的纯净晶体）。抽滤析出的晶体，用极微量冰蒸馏水稍作淋洗，最后用滤纸轻轻吸干或置于干燥器中干燥。',
          },
        },
      ],
      keyTakeaway: {
        en: 'Cambridge Exam Criteria: 1. State why excess solid is added: "To ensure that all the acid is used up / reacted". 2. State how to dry: "Pat dry between pieces of filter paper" (never strongly heat dry, or water of crystallisation is lost!).',
        zh: '剑桥考官评分硬指标：1. 问为什么加过量固体？答：“确保所有的酸被完全中和反应耗尽”；2. 问晶体如何干燥？答：“用滤纸轻轻吸干”（绝不能用火高温烘干，否则会失去结晶水变成无水粉末！）。',
      },
      quiz: {
        question: {
          en: 'Why is copper(II) oxide added in excess when preparing copper(II) sulfate crystals?',
          zh: '在制备硫酸铜晶体时，为什么要加入过量的氧化铜？',
        },
        options: [
          { en: 'To speed up the filtration process', zh: '为了加快过滤速率' },
          { en: 'To ensure all the sulfuric acid is completely reacted and neutralised', zh: '确保所有的硫酸被彻底反应消耗完毕，保证产物纯净' },
          { en: 'To make the solution alkaline', zh: '为了使溶液变成强碱性' },
          { en: 'To change the crystal color to green', zh: '为了让晶体变成绿色' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! Adding insoluble base in excess ensures that no free acid remains in the solution. The excess solid is easily removed by filtration.',
          zh: '回答正确！加入过量的难溶固体能够确保没有任何残留的游离酸液，剩余的多余固体在下一步只需简单过滤即可彻底去除。',
        },
      },
    },
    {
      id: 'method-2-acid-alkali-titration',
      title: {
        en: '3. Method 2: The Acid–Alkali Titration Route',
        zh: '3. 路线二：酸碱滴定法（制备钠盐、钾盐与铵盐）',
      },
      badge: {
        en: 'Lesson 14 · Precision Technique',
        zh: '第 14 课 · 精密定量分析',
      },
      subtitle: {
        en: 'Using burette, volumetric pipette, and indicator to find exact stoichiometric neutralisation',
        zh: '利用滴定管、移液管与指示剂精确测定等摩尔中和点，制备无杂质可溶盐',
      },
      description: {
        en: 'Soluble bases (alkalis such as NaOH, KOH, and aqueous NH₃) cannot be added in excess because any excess alkali will dissolve and irreversibly contaminate the crystal product. Titration determines the EXACT volume of acid needed to neutralise a fixed volume of alkali.',
        zh: '可溶性碱（如氢氧化钠、氢氧化钾或氨水）不能使用过量法，因为过量的碱会完全溶于水，无法通过过滤分离，从而严重污染结晶盐产品。必须通过滴定精确测定刚好完全中和固定体积碱所需的酸体积。',
      },
      image: '/figures/g8/0620-7-3-salts/fig-3-2-titration-apparatus.png',
      secondaryImage: '/figures/g8/0620-7-3-salts/fig-3-3-titration-curve-endpoint.png',
      imageCaption: {
        en: 'Figure 3.4 & 3.5: Left: Titration apparatus: burette clamped vertically, volumetric pipette with safety filler, conical flask on a white tile. Right: The characteristic sharp pH transition curve at equivalence point.',
        zh: '图 3.4 与 3.5：左图为标准滴定装置（垂直夹持的滴定管、带洗耳球的移液管、垫有白瓷板的锥形瓶）；右图为滴定化学计量当量点附近的突跃 pH 曲线。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Apparatus Rigour & Reading Rules',
            zh: '仪器使用与刻度读数规范',
          },
          body: {
            en: '• Volumetric Pipette: Measures one precise fixed volume (e.g. exactly 25.0 cm³ of alkali) into conical flask.\n• Burette: 50.00 cm³ scale graduated to 0.1 cm³. Read meniscus bottom at eye level.\n• White Tile: Placed under the flask to make the sharp indicator colour change clearly visible.',
            zh: '• 移液管：准确量取单一固定体积（如精确 25.0 cm³ 碱液）转移入锥形瓶。\n• 滴定管：刻度精度达 0.1 cm³，读数时视线必须与凹液面最低处保持水平平视。\n• 白瓷板：垫在锥形瓶下方，衬托对比指示剂瞬时变色的敏锐观察。',
          },
        },
        {
          title: {
            en: 'Step-by-Step Titration Procedure',
            zh: '滴定制备可溶盐四步法',
          },
          body: {
            en: '1. Pipette 25.0 cm³ of NaOH(aq) into conical flask; add 2–3 drops of indicator (e.g. methyl orange: yellow).\n2. Run acid from burette dropwise with constant swirling until indicator turns peach/orange at end point.\n3. Record titre; repeat until concordant titres (within 0.10 cm³ of each other) are obtained.\n4. CRITICAL STEP: Repeat the exact reaction using identical volumes of acid and alkali WITHOUT ANY INDICATOR! Then evaporate and crystallise pure salt crystals.',
            zh: '1. 用移液管吸取 25.0 cm³ NaOH 溶液注入锥形瓶，加入 2–3 滴指示剂（如甲基橙，显黄色）。\n2. 从滴定管逐滴滴入酸，同时持续摇晃锥形瓶，直至溶液刚变成桃橙色（终点）。\n3. 记录消耗体积；重复实验直至获得相差在 0.10 cm³ 以内的重现性读数（Concordant titres）。\n4. 核心关键步骤：用记录的精确体积，在【完全不加指示剂】的情况下重新混合两溶液！然后蒸发浓缩结晶，获得 100% 纯净的白色盐晶体。',
          },
          equation: '\\mathrm{HCl(aq) + NaOH(aq) \\rightarrow NaCl(aq) + H_2O(l)}',
        },
      ],
      keyTakeaway: {
        en: 'The Golden Exam Mark: Students ALWAYS forget to explain why the second titration is performed without indicator: "To obtain pure salt crystals unpolluted by indicator dye!".',
        zh: '剑桥满分踩分点：考卷经常提问“为什么第二次混合不能加入指示剂？”必答要点：“避免指示剂色素污染析出的纯净盐晶体！”',
      },
      quiz: {
        question: {
          en: 'Why is the titration repeated using the measured volumes of acid and alkali without adding any indicator?',
          zh: '为什么第二次配制盐溶液时，要按照测得的准确体积混合酸和碱，而绝对不能添加指示剂？',
        },
        options: [
          { en: 'Because indicator makes the reaction explode', zh: '因为指示剂会引发爆炸' },
          { en: 'To ensure the crystallised salt product is not contaminated by indicator dye', zh: '为了确保结晶出的盐产品不被指示剂有机染料污染' },
          { en: 'Because indicator stops the water from evaporating', zh: '因为指示剂会阻止水分蒸发' },
          { en: 'To make the solution acidic', zh: '为了让溶液保持强酸性' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! Indicators are intensely coloured organic dyes. If left in the solution, the resulting salt crystals will be tinted and impure.',
          zh: '回答正确！指示剂是有色有机染料分子，若残留在溶液中，结晶出来的盐就会被染料着色并严重失纯。',
        },
      },
    },
    {
      id: 'method-3-precipitation-insoluble-salts',
      title: {
        en: '4. Method 3: The Precipitation Route for Insoluble Salts',
        zh: '4. 路线三：沉淀反应法（制备所有难溶性盐）',
      },
      badge: {
        en: 'Lesson 16 · Ionic Precipitation',
        zh: '第 16 课 · 离子沉淀反应',
      },
      subtitle: {
        en: 'Mixing two soluble solutions, filtration, washing with distilled water, and drying',
        zh: '两种可溶性溶液混合瞬时沉淀、抽滤、蒸馏水洗涤去除杂质离子及干燥',
      },
      description: {
        en: 'Insoluble salts (such as barium sulfate BaSO₄, lead(II) iodide PbI₂, or silver chloride AgCl) cannot be prepared by crystallisation from solution because they do not dissolve. Instead, they are made by combining two soluble solutions: each solution supplies one half of the insoluble compound.',
        zh: '难溶性盐（如硫酸钡 BaSO₄、碘化铅 PbI₂ 或氯化银 AgCl）无法通过溶液蒸发结晶来制备，因为它们根本不溶于水。制备难溶盐的唯一捷径是离子沉淀法：将分别提供阳离子和阴离子的两种可溶性水溶液相混合。',
      },
      image: '/figures/g8/0620-7-3-salts/fig-3-5-precipitation-insoluble-salts.png',
      secondaryImage: '/figures/g8/0620-7-3-salts/fig-3-6-filter-wash-dry-precipitate.png',
      imageCaption: {
        en: 'Figure 3.6 & 3.7: Left: Precipitation reaction immediately forming a cloud of insoluble barium sulfate when solutions are mixed. Right: Filtering, washing with distilled water on the filter paper, and drying in a low-temperature oven.',
        zh: '图 3.6 与 3.7：左图为两溶液混合瞬间产生白色硫酸钡沉淀；右图为在漏斗滤纸上用洗瓶蒸馏水冲洗沉淀物以去除附着的可溶性杂质离子，最后置于烘箱干燥。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Pairing Soluble Reagents Rule',
            zh: '两种可溶性起始反应物的配对原则',
          },
          body: {
            en: 'To make an insoluble salt AB:\n• Reagent 1: A soluble salt containing cation A⁺ (e.g. any nitrate, like Ba(NO₃)₂ or Pb(NO₃)₂).\n• Reagent 2: A soluble salt or acid containing anion B⁻ (e.g. sodium salt or dilute acid, like Na₂SO₄ or dilute H₂SO₄).',
            zh: '制备难溶盐 AB 的万能配对公式：\n• 反应物 1：提供 A⁺ 阳离子的可溶盐（万能首选：任何硝酸盐，如硝酸钡或硝酸铅）。\n• 反应物 2：提供 B⁻ 阴离子的可溶盐或稀酸（如钠盐或稀酸，硫酸钠或稀硫酸）。',
          },
          equation: '\\mathrm{BaCl_2(aq) + Na_2SO_4(aq) \\rightarrow BaSO_4(s)\\downarrow + 2NaCl(aq)}',
        },
        {
          title: {
            en: 'Ionic Equation & Spectator Ions',
            zh: '离子反应方程式与旁观离子剔除',
          },
          body: {
            en: 'The Na⁺ and Cl⁻ ions do not take part in the reaction — they remain dissolved throughout as spectator ions. The essential ionic reaction is simply the two ions snapping together to form the lattice solid.',
            zh: '溶液中的 Na⁺ 与 Cl⁻ 离子在反应前后状态完全未变，作为“旁观离子（Spectator ions）”保留在水中。真正的反应本质仅仅是两个目标离子迅速结合成牢固的晶格固体。',
          },
          equation: '\\mathrm{Ba^{2+}(aq) + SO_4^{2-}(aq) \\rightarrow BaSO_4(s)\\downarrow}',
        },
        {
          title: {
            en: 'The 3-Step Purification: Filter, Wash, Dry',
            zh: '三步纯化提纯标准流程：过滤、洗涤、干燥',
          },
          body: {
            en: '1. Filter: Pour the cloudy mixture through filter paper. The insoluble precipitate is trapped on the paper as residue.\n2. Wash: Wash the residue with several portions of distilled water on the filter paper to remove adhering soluble spectator ions (e.g. NaCl).\n3. Dry: Dry the pure solid in a warm drying oven or leave in a desiccator.',
            zh: '1. 过滤：混合液倒入滤纸漏斗，白色沉淀作为滤渣截留在滤纸上。\n2. 洗涤（必答考点）：用洗瓶取少量冷蒸馏水冲洗滤纸上的沉淀物数次，彻底洗去附着在沉淀表面的可溶性杂质离子（如 NaCl）。\n3. 干燥：将纯净沉淀置于低温烘箱中烘干，或置于干燥器中静置干燥。',
          },
        },
      ],
      keyTakeaway: {
        en: 'Cambridge 0620 Paper 6 Question: "Why must the precipitate on the filter paper be washed with distilled water?" Correct Answer: "To remove soluble impurities / to wash away spectator ions like sodium chloride".',
        zh: '剑桥 Paper 6 实验大题满分必答：“为什么必须用蒸馏水冲洗滤纸上的沉淀？”标准答案：“洗去附着在沉淀表面的可溶性杂质 / 除去可溶性旁观离子（如氯化钠）”。',
      },
      quiz: {
        question: {
          en: 'Why must a precipitated insoluble salt be washed with distilled water before drying?',
          zh: '为什么沉淀法制得的难溶盐在干燥前必须用蒸馏水进行冲洗？',
        },
        options: [
          { en: 'To dissolve the precipitate', zh: '为了把沉淀溶解掉' },
          { en: 'To remove any remaining soluble impurities from the solution', zh: '为了洗去残留在沉淀表面上的可溶性杂质和旁观离子' },
          { en: 'To make the precipitate heavier', zh: '为了让沉淀质量增加' },
          { en: 'To turn the precipitate blue', zh: '为了把沉淀变成蓝色' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! Washing with distilled water washes away the liquid film containing dissolved soluble spectator salts (such as NaCl), leaving a pure precipitate.',
          zh: '回答正确！蒸馏水冲洗能彻底带走包裹在沉淀微晶表面含有可溶性盐（如 NaCl）的液体薄膜，确保干燥后得到的是高纯度难溶盐。',
        },
      },
    },
    {
      id: 'hydrated-salts-water-of-crystallisation',
      title: {
        en: '5. Hydrated Salts & The Reversible Test for Water',
        zh: '5. 结晶水合物、脱水反应与无水硫酸铜可逆检水',
      },
      badge: {
        en: 'Lesson 13/15 · Practical Mastery',
        zh: '第 13/15 课 · 结晶水与水检验',
      },
      subtitle: {
        en: 'Water molecules trapped inside salt crystals and the blue-to-white reversible chemical equilibrium',
        zh: '晶体晶格中固定的水分子，与五水硫酸铜蓝白可逆相变的化学平衡',
      },
      description: {
        en: 'Many soluble salt crystals are not totally dry ionic lattices; they chemically trap a definite stoichiometric ratio of water molecules inside their crystalline structure, known as "water of crystallisation". Heating drives this water off, creating an anhydrous salt.',
        zh: '许多可溶性盐晶体并非纯粹的离子晶格，而是在结晶生长过程中，按固定的化学计量比将水分子锁定在晶格骨架中，这被称为“结晶水（Water of crystallisation）”。加热能赶走结晶水，形成无水盐。',
      },
      image: '/figures/g8/0620-7-3-salts/fig-3-4-crystallisation-basin.png',
      imageCaption: {
        en: 'Figure 3.8: Heating blue hydrated copper(II) sulfate crystals in an evaporating dish drives off steam, leaving a fine white powder of anhydrous copper(II) sulfate.',
        zh: '图 3.8：在蒸发皿中加热蓝色的五水硫酸铜晶体，水蒸气逸出后，留下松散的无水硫酸铜白色粉末。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Hydrated vs Anhydrous Definitions',
            zh: '结晶水合物与无水物权威定义',
          },
          body: {
            en: '• Hydrated substance: A substance containing water of crystallisation chemically bonded within its crystal framework (e.g. CuSO₄·5H₂O, bright blue crystals).\n• Anhydrous substance: A substance with all water of crystallisation removed (e.g. CuSO₄, pure white powder).',
            zh: '• 结晶水合物（Hydrated）：在其晶体骨架结构中含有化学结合结晶水的晶体物质（如 CuSO₄·5H₂O，明亮蓝色大晶体）。\n• 无水物（Anhydrous）：去除了所有结晶水的干燥化合物（如 CuSO₄，纯白色干燥粉末）。',
          },
          equation: '\\mathrm{CuSO_4\\cdot 5H_2O(s) \\; [\\text{blue}] \\; \\rightleftharpoons \\; CuSO_4(s) \\; [\\text{white}] + 5H_2O(l)}',
        },
        {
          title: {
            en: 'The Reversible Chemical Test for Water',
            zh: '利用无水硫酸铜检验微量水（剑桥 0620 核心实验）',
          },
          body: {
            en: 'Anhydrous copper(II) sulfate is an official test for the presence of water: when drops of water are added to white anhydrous CuSO₄, it turns VIBRANT BLUE and releases heat (exothermic).',
            zh: '无水硫酸铜是化学中确证水存在的官方标准试剂：当向白色无水硫酸铜粉末滴加无色液体时，若粉末立刻变为鲜艳的蓝色，并放出热量发烫，即确证含有水。',
          },
        },
        {
          title: {
            en: 'Testing Purity vs Testing Presence',
            zh: '高频失分辨析：检验水存在 vs 检验水纯度',
          },
          body: {
            en: '• Chemical test for PRESENCE of water: Anhydrous copper(II) sulfate turns from white to blue (or anhydrous cobalt(II) chloride paper turns from blue to pink).\n• Physical test for PURITY of water: Measure the boiling point (must boil at exactly 100 °C at 1 atm) or melting point (freezes at exactly 0 °C).',
            zh: '• 检验【水是否存在】（化学检验）：无水硫酸铜由白变蓝（或无水氯化钴试纸由蓝变粉红）。\n• 检验【水是否纯净】（物理检验）：测定沸点（1 标准大气压下恰好在 100 °C 沸腾）或凝固点（恰好在 0 °C 结冰）。',
          },
        },
      ],
      keyTakeaway: {
        en: 'Examiner Trap: Anhydrous copper(II) sulfate tests if water is PRESENT, not whether it is PURE! Contaminated salt water will still turn it blue. To test purity, you MUST measure boiling point = 100 °C.',
        zh: '考官经典陷阱：无水硫酸铜变蓝只能证明“有水存在”，不能证明“是纯水”！盐水、糖水甚至尿液滴上去都会变蓝。要证明水纯不纯，必须测沸点是否严格为 100 °C！',
      },
      quiz: {
        question: {
          en: 'A student adds a liquid to white anhydrous copper(II) sulfate, which turns blue. What does this confirm?',
          zh: '学生向白色无水硫酸铜中滴加一种无色液体，固体变蓝。这确证了什么？',
        },
        options: [
          { en: 'The liquid is pure water', zh: '该液体是纯水' },
          { en: 'Water is present in the liquid', zh: '该液体中含有水' },
          { en: 'The liquid is an acid', zh: '该液体是一种强酸' },
          { en: 'The liquid contains sodium ions', zh: '该液体含有钠离子' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! The color change from white to blue confirms that water is PRESENT, but does not prove purity (any aqueous mixture will turn it blue).',
          zh: '回答正确！由白变蓝只能证明有水存在，无法证明纯净（哪怕是盐水或醋滴上去也会变蓝）。',
        },
      },
    },
  ],
}

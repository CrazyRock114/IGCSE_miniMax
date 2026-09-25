/**
 * Structured content data for Cambridge IGCSE Biology (0610) animated tours.
 *
 * Each tour is authored as pure Bilingual data, adhering to the project's
 * architectural principle: "Course copy is data, never JSX".
 */

import type { Bilingual } from './types'

export interface BiologyTourStepData {
  id: string
  /** Target element selector */
  elementSelector: string
  title: Bilingual
  description: Bilingual
  badge?: Bilingual
  badgeVariant?: 'default' | 'ox' | 'deox' | 'highlight'
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export interface BiologyTourData {
  id: string
  title: Bilingual
  prompt: Bilingual
  steps: BiologyTourStepData[]
}

/**
 * 0610 Topic 9.1: Double Circulation in Humans.
 * Step-by-step pathway of blood through pulmonary and systemic loops.
 */
export const DOUBLE_CIRCULATION_TOUR: BiologyTourData = {
  id: 'double-circulation',
  title: {
    en: 'Blood Circulation Animation Tour',
    zh: '血液循环流动路径动画导览',
  },
  prompt: {
    en: 'Follow a red blood cell across the complete double circulation journey.',
    zh: '跟随红细胞完整走一遍人体的体循环与肺循环双通路。',
  },
  steps: [
    {
      id: 'body-tissues',
      elementSelector: '[data-station="body-tissues"]',
      title: { en: '1. Body Tissues (Capillaries)', zh: '1. 全身组织毛细血管' },
      description: {
        en: 'Cells consume oxygen and glucose for aerobic respiration. Carbon dioxide and metabolic waste diffuse into the blood, deoxygenating it.',
        zh: '细胞消耗氧气和葡萄糖进行有氧呼吸。二氧化碳和代谢废物扩散进入血液，血液转为缺氧状态。',
      },
      badge: { en: 'Systemic Exchange', zh: '组织物质交换' },
      badgeVariant: 'highlight',
      side: 'top',
    },
    {
      id: 'vena-cava-2',
      elementSelector: '[data-station="vena-cava-2"]',
      title: { en: '2. Vena Cava', zh: '2. 腔静脉' },
      description: {
        en: 'Large veins (superior & inferior) collecting deoxygenated blood under low pressure from the upper and lower body, returning it to the heart.',
        zh: '汇集全身各处低压缺氧血的主静脉（上、下腔静脉），将缺氧血输送回右心。',
      },
      badge: { en: 'Deoxygenated', zh: '缺氧回流' },
      badgeVariant: 'deox',
      side: 'top',
    },
    {
      id: 'right-heart',
      elementSelector: '[data-station="right-heart"]',
      title: { en: '3. Right Heart (Atrium & Ventricle)', zh: '3. 右半心（心房与心室）' },
      description: {
        en: 'Right atrium receives deoxygenated blood; right ventricle contracts with moderate muscular pressure to pump blood into the pulmonary artery.',
        zh: '右心房接收缺氧血；右心室以适度压力收缩泵血，将血液推入肺动脉。',
      },
      badge: { en: 'Pumps to Lungs', zh: '泵向肺循环' },
      badgeVariant: 'deox',
      side: 'bottom',
    },
    {
      id: 'pulmonary-artery-2',
      elementSelector: '[data-station="pulmonary-artery-2"]',
      title: { en: '4. Pulmonary Artery', zh: '4. 肺动脉' },
      description: {
        en: 'Carries deoxygenated blood away from the heart to the lungs. (The ONLY artery in the human body carrying deoxygenated blood!)',
        zh: '将缺氧血从心脏送往肺部。（人体中唯一一条运送缺氧血的动脉！）',
      },
      badge: { en: 'Deoxygenated Artery', zh: '缺氧动脉' },
      badgeVariant: 'deox',
      side: 'bottom',
    },
    {
      id: 'lungs',
      elementSelector: '[data-station="lungs"]',
      title: { en: '5. Lungs (Gas Exchange)', zh: '5. 肺部毛细血管（气体交换）' },
      description: {
        en: 'Blood flows across alveoli: CO₂ diffuses into alveolar air to be exhaled; O₂ diffuses in and binds to haemoglobin, turning blood bright scarlet.',
        zh: '血液流经肺泡毛细血管：二氧化碳扩散排出体外，氧气扩散入血与血红蛋白结合，转变为鲜红色的充氧血。',
      },
      badge: { en: 'Gas Exchange', zh: '终末气体交换' },
      badgeVariant: 'highlight',
      side: 'bottom',
    },
    {
      id: 'pulmonary-vein-2',
      elementSelector: '[data-station="pulmonary-vein-2"]',
      title: { en: '6. Pulmonary Vein', zh: '6. 肺静脉' },
      description: {
        en: 'Carries freshly oxygenated blood from the lungs back to the left atrium of the heart. (The ONLY vein carrying oxygenated blood!)',
        zh: '将富氧血从肺部输送回心脏左心房。（人体中唯一一条运送充氧血的静脉！）',
      },
      badge: { en: 'Oxygenated Vein', zh: '充氧静脉' },
      badgeVariant: 'ox',
      side: 'bottom',
    },
    {
      id: 'left-heart',
      elementSelector: '[data-station="left-heart"]',
      title: { en: '7. Left Heart (Thick Muscular Wall)', zh: '7. 左半心（厚壁高压泵）' },
      description: {
        en: 'Left atrium receives oxygenated blood; left ventricle (thickest muscular wall) contracts forcefully to re-pressurise blood for the body.',
        zh: '左心房接收充氧血；左心室拥有极厚的肌肉壁，强力收缩为血液重新施加高压，准备送往全身。',
      },
      badge: { en: 'High Pressure Pump', zh: '高压泵血' },
      badgeVariant: 'ox',
      side: 'top',
    },
    {
      id: 'aorta-2',
      elementSelector: '[data-station="aorta-2"]',
      title: { en: '8. Aorta', zh: '8. 主动脉' },
      description: {
        en: 'The largest systemic artery, branching out to deliver high-pressure oxygenated blood to the brain, liver, kidneys, and limbs.',
        zh: '人体最粗大的主干动脉，分出各级分支将高压充氧血分配给大脑、内脏与四肢，开启下一个循环！',
      },
      badge: { en: 'Systemic Distribution', zh: '体循环分配' },
      badgeVariant: 'ox',
      side: 'top',
    },
  ],
}

/**
 * 0610 Topic 14.1: The Human Reflex Arc.
 * Rapid, involuntary impulse transmission avoiding conscious brain delay.
 */
export const REFLEX_ARC_TOUR: BiologyTourData = {
  id: 'reflex-arc',
  title: {
    en: 'Reflex Arc Impulse Tour',
    zh: '神经反射弧与电冲动传导动画导览',
  },
  prompt: {
    en: 'Watch the electrical impulse travel through the 6 components of the reflex arc.',
    zh: '观看神经电冲动如何经由反射弧六大结构高速传导并瞬间避险。',
  },
  steps: [
    {
      id: 'pain-receptor',
      elementSelector: '[data-reflex-hotspot="pain-receptor"], [data-part="pain-receptor"]',
      title: { en: '1. Pain Receptor in Skin', zh: '1. 皮肤疼痛感受器' },
      description: {
        en: 'The hand touches a dangerously hot plate. Specialized receptors in the dermis detect the thermal stimulus and generate an electrical impulse.',
        zh: '手指意外触碰滚烫热盘。真皮层中的特异性感受器敏锐检测到热刺激，瞬间转化为电性神经冲动。',
      },
      badge: { en: 'Stimulus Detection', zh: '刺激感受' },
      side: 'right',
    },
    {
      id: 'sensory-neurone',
      elementSelector: '[data-reflex-hotspot="sensory-neurone"], [data-part="sensory-neurone"]',
      title: { en: '2. Sensory Neurone', zh: '2. 传入感觉神经元' },
      description: {
        en: 'The action potential travels rapidly along the long axon of the sensory neurone from the arm into the spinal cord via the dorsal root.',
        zh: '电冲动沿着感觉神经元的长轴突，从手臂外周经由脊神经后根高速传入中枢脊髓。',
      },
      badge: { en: 'Afferent Pathway', zh: '传入通路' },
      side: 'top',
    },
    {
      id: 'spinal-cord',
      elementSelector: '[data-reflex-hotspot="spinal-cord"], [data-part="spinal-cord"]',
      title: { en: '3. Spinal Cord (Grey Matter)', zh: '3. 脊髓中枢（灰质）' },
      description: {
        en: 'The impulse arrives in the grey matter of the spinal cord. CRITICAL EXAM POINT: The impulse turns round here directly WITHOUT waiting for the brain, saving precious fractions of a second!',
        zh: '冲动进入脊髓蝴蝶形灰质。核心考点：反射直接在此处中继折返，无需等待大脑思考决策，节省了极其宝贵的避险时间！',
      },
      badge: { en: 'Brain Bypassed', zh: '绕过大脑决策' },
      badgeVariant: 'highlight',
      side: 'left',
    },
    {
      id: 'relay-neurone',
      elementSelector: '[data-reflex-hotspot="relay-neurone"], [data-part="relay-neurone"]',
      title: { en: '4. Relay Neurone & Synapses', zh: '4. 中间神经元与突触传递' },
      description: {
        en: 'A short neurone inside the CNS. Neurotransmitters diffuse across microscopic synaptic gaps to trigger an impulse in the motor neurone.',
        zh: '完全位于中枢内部的中间短神经元。神经递质分子扩散跨越微观突触间隙，激发运动神经元产生冲动。',
      },
      badge: { en: 'Synaptic Transmission', zh: '突触化学传递' },
      side: 'left',
    },
    {
      id: 'motor-neurone',
      elementSelector: '[data-reflex-hotspot="motor-neurone"], [data-part="motor-neurone"]',
      title: { en: '5. Motor Neurone', zh: '5. 传出运动神经元' },
      description: {
        en: 'The impulse leaves the spinal cord via the ventral root and speeds down the motor axon toward the effector muscle in the upper arm.',
        zh: '电冲动经由脊髓前根发出，沿着运动神经元轴突高速向下传导至上臂肌肉效应器。',
      },
      badge: { en: 'Efferent Pathway', zh: '传出通路' },
      side: 'bottom',
    },
    {
      id: 'effector',
      elementSelector: '[data-reflex-hotspot="effector"], [data-part="effector"]',
      title: { en: '6. Effector (Bicep Muscle)', zh: '6. 效应器（肱二头肌）' },
      description: {
        en: 'The motor end-plate stimulates the bicep muscle to contract instantly, pulling the hand away from danger before pain is even felt in the brain!',
        zh: '运动终板刺激肱二头肌强力收缩，在人脑感知到明显疼痛之前，手臂就已被反射性瞬间抽回！',
      },
      badge: { en: 'Protective Response', zh: '反射性抽离避险' },
      badgeVariant: 'highlight',
      side: 'bottom',
    },
  ],
}

/**
 * 0610 Topic 7.1: The Human Digestive System Journey.
 * Digestion, enzyme action, absorption, and egestion from mouth to anus.
 */
export const DIGESTIVE_ANATOMY_TOUR: BiologyTourData = {
  id: 'digestive-anatomy',
  title: {
    en: 'Digestive System Journey Tour',
    zh: '食物消化与吸收全程动画导览',
  },
  prompt: {
    en: 'Track mechanical breakdown, chemical digestion by enzymes, and villi absorption.',
    zh: '跟随食团深入人体消化系统，探索物理粉碎、酶解消化与小肠绒毛吸收全过程。',
  },
  steps: [
    {
      id: 'mouth',
      elementSelector: '[data-organ-hotspot="mouth"], [data-organ="mouth"]',
      title: { en: '1. Mouth & Salivary Glands', zh: '1. 口腔与唾液腺' },
      description: {
        en: 'Teeth mechanically crush food to increase surface area. Salivary amylase begins digesting cooked starch into maltose under neutral pH (6.5–7.5).',
        zh: '牙齿物理咀嚼研磨食物增大表面积。唾液淀粉酶在中性最适 pH 下将淀粉初步水解为麦芽糖。',
      },
      badge: { en: 'Mechanical & Amylase', zh: '咀嚼与淀粉酶' },
      side: 'right',
    },
    {
      id: 'oesophagus',
      elementSelector: '[data-organ-hotspot="oesophagus"], [data-organ="oesophagus"]',
      title: { en: '2. Oesophagus & Peristalsis', zh: '2. 食管与蠕动推进' },
      description: {
        en: 'Food is swallowed as a bolus. Waves of alternating circular and longitudinal muscular contractions (peristalsis) propel food down to the stomach.',
        zh: '食物形成润滑食团被吞咽。环形肌与纵行肌规律交替收缩（蠕动 Peristalsis），由重力与肌力合力推入胃中。',
      },
      badge: { en: 'Peristalsis Wave', zh: '自主蠕动推进' },
      side: 'right',
    },
    {
      id: 'stomach',
      elementSelector: '[data-organ-hotspot="stomach"], [data-organ="stomach"]',
      title: { en: '3. Stomach (Acid & Pepsin)', zh: '3. 胃（胃酸与胃蛋白酶）' },
      description: {
        en: 'Churns food into acidic chyme. Hydrochloric acid (HCl, pH 1.5–2) kills harmful bacteria and creates the optimum acidic pH for pepsin, which digests proteins into peptides.',
        zh: '强力肌层将食物研磨成酸性食糜。胃酸（HCl，pH 2）强效灭活细菌，并为胃蛋白酶提供最适酸度，将大分子蛋白质水解为多肽。',
      },
      badge: { en: 'Pepsin pH 2', zh: '强酸蛋白水解' },
      badgeVariant: 'highlight',
      side: 'left',
    },
    {
      id: 'gall-bladder',
      elementSelector: '[data-organ-hotspot="gall-bladder"], [data-organ="gall-bladder"]',
      title: { en: '4. Liver & Gall Bladder (Bile)', zh: '4. 肝脏、胆囊与胆汁乳化' },
      description: {
        en: 'Bile produced by liver and stored in gall bladder is secreted into duodenum. It is alkaline to neutralise stomach acid, and EMULSIFIES fats (splits large drops into droplets to boost lipase surface area)!',
        zh: '肝脏生成、胆囊储存的胆汁排入十二指肠。呈碱性以中和胃酸，并对脂肪进行物理“乳化”（将大油滴分散为无数微滴，数倍提升脂肪酶接触面积）！',
      },
      badge: { en: 'Fat Emulsification', zh: '物理胆汁乳化' },
      side: 'left',
    },
    {
      id: 'pancreas',
      elementSelector: '[data-organ-hotspot="pancreas"], [data-organ="pancreas"]',
      title: { en: '5. Pancreas (Enzyme Factory)', zh: '5. 胰腺（消化酶工厂）' },
      description: {
        en: 'Secretes alkaline pancreatic juice into the small intestine, containing three major enzymes: pancreatic amylase, trypsin (protease), and pancreatic lipase.',
        zh: '向小肠分泌弱碱性胰液，包含核心消化三剑客：胰淀粉酶、胰蛋白酶以及胰脂肪酶，彻底分解三大营养素。',
      },
      badge: { en: 'Amylase/Trypsin/Lipase', zh: '胰液三重酶' },
      side: 'right',
    },
    {
      id: 'small-intestine',
      elementSelector: '[data-organ-hotspot="small-intestine"], [data-organ="small-intestine"]',
      title: { en: '6. Small Intestine (Villi Absorption)', zh: '6. 小肠（小肠绒毛吸收）' },
      description: {
        en: 'Digestion completes here. Millions of villi & microvilli give a huge surface area: glucose and amino acids absorb into blood capillaries; fatty acids and glycerol absorb into central lacteals.',
        zh: '在此彻底完成终末消化。数以百万计的微观绒毛构成网球场般的巨大吸收面：葡萄糖和氨基酸进入毛细血管，脂肪酸与甘油被中央乳糜管吸收。',
      },
      badge: { en: 'Villi & Lacteals', zh: '绒毛与乳糜管' },
      badgeVariant: 'highlight',
      side: 'right',
    },
    {
      id: 'large-intestine',
      elementSelector: '[data-organ-hotspot="large-intestine"], [data-organ="large-intestine"]',
      title: { en: '7. Large Intestine / Colon', zh: '7. 大肠（水分重吸收）' },
      description: {
        en: 'Reabsorbs water, mineral ions, and vitamins from indigestible plant fibres and residue, transforming fluid chyme into semi-solid faeces.',
        zh: '对无法消化的植物纤维残渣中的剩余水分和无机盐进行高比例重吸收，将流体残渣固化压实为半固态粪便。',
      },
      badge: { en: 'Water Reabsorption', zh: '水分高效回收' },
      side: 'left',
    },
    {
      id: 'rectum',
      elementSelector: '[data-organ-hotspot="rectum"], [data-organ="rectum"]',
      title: { en: '8. Rectum & Anus (Egestion)', zh: '8. 直肠与肛门（排遗）' },
      description: {
        en: 'Faeces are stored in rectum before being expelled via anus by egestion. (Exam note: Egestion is expelling undigested food; excretion is removing cellular metabolic wastes).',
        zh: '成形粪便暂时储存于直肠，最终由肛门括约肌舒张经排遗（Egestion）排出体外。（常考区别：排遗是排出未消化食物残渣，排泄 Excretion 则是排出细胞代谢废物）。',
      },
      badge: { en: 'Egestion', zh: '未消化残渣排遗' },
      side: 'bottom',
    },
  ],
}

/**
 * 0610 Topic 11.1: Human Gas Exchange & Airway Pathway.
 * Airflow from larynx through cartilage rings to alveoli diffusion.
 */
export const AIRWAY_PATHWAY_TOUR: BiologyTourData = {
  id: 'airway-pathway',
  title: {
    en: 'Airway & Gas Exchange Tour',
    zh: '呼吸气道与肺泡气体交换动画导览',
  },
  prompt: {
    en: 'Follow an inhaled breath through the airway tree to gas exchange across the alveoli.',
    zh: '跟随吸入的一缕空气穿过软骨气道树，直达肺泡壁进行高效氧气与二氧化碳交换。',
  },
  steps: [
    {
      id: 'larynx',
      elementSelector: '[data-airway-hotspot="larynx"], [data-part="larynx"]',
      title: { en: '1. Larynx (Voice Box)', zh: '1. 喉（声带与进气口）' },
      description: {
        en: 'Air passes the epiglottis into the larynx. The vocal cords vibrate to produce sound; during swallowing, the flap seals the larynx to protect airways.',
        zh: '吸入空气越过会厌软骨进入喉腔。内含声带负责发声，吞咽时会厌软骨严密下扣封堵喉口，防止异物误入气道。',
      },
      badge: { en: 'Airway Entrance', zh: '气道上入口' },
      side: 'right',
    },
    {
      id: 'trachea',
      elementSelector: '[data-airway-hotspot="trachea"], [data-part="trachea"]',
      title: { en: '2. Trachea & Cartilage Rings', zh: '2. 气管与 C 型软骨环' },
      description: {
        en: 'Lined with C-shaped rings of cartilage that prevent collapse when breathing in causes a drop in pressure. Ciliated epithelium and goblet cells trap dust and sweep mucus upwards.',
        zh: '气管壁坚挺排列着 C 型透明软骨环，防止吸气负压导致气道闭合塌陷；内衬纤毛柱状上皮与杯状细胞，黏捕尘埃并向上清扫咳出。',
      },
      badge: { en: 'Cartilage Support', zh: '软骨支架与清扫' },
      badgeVariant: 'highlight',
      side: 'right',
    },
    {
      id: 'left-bronchus',
      elementSelector: '[data-airway-hotspot="left-bronchus"], [data-part="left-bronchus"]',
      title: { en: '3. Bronchus (Left & Right)', zh: '3. 支气管分支' },
      description: {
        en: 'The trachea splits into left and right bronchi, each branching into their respective lungs, carrying warmed and filtered air deeper into thorax.',
        zh: '气管在胸腔正中分叉为左、右主支气管，分别长驱直入左右肺叶，输送湿润清洁的暖气流。',
      },
      badge: { en: 'Dual Branching', zh: '左右双通道' },
      side: 'right',
    },
    {
      id: 'bronchiole',
      elementSelector: '[data-airway-hotspot="bronchiole"], [data-part="bronchiole"]',
      title: { en: '4. Bronchioles (Tree)', zh: '4. 细支气管分支树' },
      description: {
        en: 'Narrow tubes without cartilage rings. The smooth muscle in their walls can contract or relax to control the volume of air reaching terminal air sacs.',
        zh: '无软骨支撑的微细气道分支。管壁含有平滑肌纤维，可通过舒缩精密调控通往深层肺泡的气体流速与通气量。',
      },
      badge: { en: 'Flow Regulation', zh: '微细通气调控' },
      side: 'left',
    },
    {
      id: 'alveoli',
      elementSelector: '[data-airway-hotspot="alveoli"], [data-part="alveoli"]',
      title: { en: '5. Alveoli & Gas Exchange', zh: '5. 肺泡群与毛细血管气体交换' },
      description: {
        en: 'The functional unit of gas exchange. Highly adapted: single-cell thin wall (short diffusion distance), moist surface, massive combined surface area, and rich capillary network!',
        zh: '气体交换的核心终点。四大生物学适应特征：单层上皮超薄壁（极短扩散距离）、湿润内膜溶气、网球场般巨大总表面积、丰富毛细血管血流！',
      },
      badge: { en: 'Gas Diffusion', zh: '终末气体扩散' },
      badgeVariant: 'highlight',
      side: 'bottom',
    },
  ],
}

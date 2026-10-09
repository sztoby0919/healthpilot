const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const symptomDB = [
  {
    keywords: ['发烧', '发热', 'fever', 'temperature', '体温高', '高烧', '低烧'],
    condition: '发烧 / Fever',
    severity: 'medium',
    advice: '发烧通常是身体对感染的反应。建议：\n1. 多喝水，保持水分\n2. 适当休息\n3. 体温超过38.5°C可考虑服用退烧药\n4. 如持续3天以上或伴有其他严重症状，请及时就医',
    department: '内科 / 感染科'
  },
  {
    keywords: ['咳嗽', 'cough', '咳', '干咳', '有痰', '嗓子痒'],
    condition: '咳嗽 / Cough',
    severity: 'low',
    advice: '咳嗽可能由感冒、过敏或刺激引起。建议：\n1. 多喝温水\n2. 避免烟雾和刺激性气体\n3. 如咳嗽超过2周、咳血或伴有呼吸困难，请就医',
    department: '呼吸内科'
  },
  {
    keywords: ['头痛', '头疼', 'headache', '偏头痛', '头晕', '头昏'],
    condition: '头痛 / Headache',
    severity: 'low',
    advice: '头痛可能由压力、疲劳、脱水等引起。建议：\n1. 保证充足睡眠\n2. 适量运动\n3. 避免长时间看屏幕\n4. 如头痛剧烈、突然发作或伴有视力模糊，请立即就医',
    department: '神经内科'
  },
  {
    keywords: ['胸痛', '胸闷', '心慌', '心悸', 'chest pain', '呼吸困难', '呼吸急促', '气短'],
    condition: '胸痛/胸闷 / Chest Pain',
    severity: 'high',
    advice: '⚠️ 胸痛可能是严重疾病的信号！建议：\n1. 立即停止活动，保持平静\n2. 如疼痛持续超过5分钟或伴有出汗、恶心，请立即拨打120\n3. 即使症状缓解，也请尽快就医检查',
    department: '心内科 / 急诊科'
  },
  {
    keywords: ['腹痛', '肚子疼', '胃痛', 'stomach', 'abdominal', '拉肚子', '腹泻', '恶心', '呕吐'],
    condition: '腹痛/消化问题 / Abdominal Pain',
    severity: 'medium',
    advice: '腹痛可能由消化不良、肠胃炎等引起。建议：\n1. 暂时清淡饮食，避免油腻\n2. 多补充水分\n3. 如腹痛剧烈、持续超过24小时或伴有血便，请就医',
    department: '消化内科'
  },
  {
    keywords: ['皮疹', '皮肤', '过敏', 'rash', '痒', '红疹', '湿疹', '痘痘'],
    condition: '皮肤问题 / Skin Issue',
    severity: 'low',
    advice: '皮肤问题可能由过敏、感染或刺激引起。建议：\n1. 避免抓挠\n2. 保持皮肤清洁干燥\n3. 如皮疹扩散、伴有发热或呼吸困难，请就医',
    department: '皮肤科'
  },
  {
    keywords: ['焦虑', '抑郁', '失眠', '压力', 'anxiety', 'depression', 'insomnia', '睡不着', '情绪低'],
    condition: '心理健康 / Mental Health',
    severity: 'medium',
    advice: '心理健康同样重要！建议：\n1. 保持规律作息\n2. 适量运动有助于缓解压力\n3. 与亲友交流\n4. 如情绪问题持续影响生活，请寻求专业心理咨询',
    department: '心理科 / 精神科'
  },
  {
    keywords: ['眼睛', '视力', 'eye', '模糊', '干涩', '眼疲劳'],
    condition: '眼部问题 / Eye Issue',
    severity: 'low',
    advice: '眼部问题可能由用眼过度引起。建议：\n1. 每用眼40分钟休息10分钟\n2. 保持适当屏幕距离\n3. 如视力突然下降或伴有眼痛，请就医',
    department: '眼科'
  },
  {
    keywords: ['关节', '肌肉', '骨', 'joint', 'muscle', '腰痛', '颈椎', '扭伤'],
    condition: '骨骼肌肉问题 / Musculoskeletal',
    severity: 'low',
    advice: '骨骼肌肉问题可能由劳损或姿势不当引起。建议：\n1. 适当休息，避免过度使用\n2. 热敷或冷敷缓解疼痛\n3. 如疼痛严重或伴有肿胀，请就医',
    department: '骨科 / 康复科'
  },
  {
    keywords: ['口渴', '多尿', '体重', '血糖', 'diabetes', '乏力', '疲劳'],
    condition: '代谢问题（如糖尿病）/ Metabolic Issue',
    severity: 'medium',
    advice: '这些症状可能与血糖异常有关。建议：\n1. 注意饮食控制，减少高糖食物\n2. 适量运动\n3. 建议到医院进行血糖检测',
    department: '内分泌科'
  }
];

app.post('/api/analyze', (req, res) => {
  const { symptoms, age, gender } = req.body;
  const text = symptoms.toLowerCase();
  const results = [];
  for (const item of symptomDB) {
    for (const keyword of item.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        if (!results.find(r => r.condition === item.condition)) {
          results.push(item);
        }
        break;
      }
    }
  }
  if (results.length === 0) {
    results.push({
      condition: '未匹配到具体症状',
      severity: 'low',
      advice: '您的症状描述比较模糊，建议详细描述症状部位、持续时间、严重程度和伴随症状。如症状持续或加重，请及时就医。',
      department: '建议咨询全科医生'
    });
  }
  const highSeverity = results.find(r => r.severity === 'high');
  res.json({
    results,
    urgency: highSeverity ? 'high' : results.length > 2 ? 'medium' : 'low',
    disclaimer: '⚠️ 本工具仅供参考，不能替代专业医疗诊断。如有严重症状，请立即就医。',
    input: { symptoms, age, gender }
  });
});

app.get('/api/health-tips', (req, res) => {
  const tips = [
    { category: '饮食', tip: '每天摄入5种以上的蔬菜和水果，有助于增强免疫力。', icon: '🥗' },
    { category: '运动', tip: '每周至少150分钟中等强度运动，如快走、游泳或骑车。', icon: '🏃' },
    { category: '睡眠', tip: '成年人每天需要7-9小时的优质睡眠。保持规律的作息时间。', icon: '😴' },
    { category: '饮水', tip: '每天饮水1500-2000ml，约8杯水。少量多次饮用效果更佳。', icon: '💧' },
    { category: '心理', tip: '每天花10分钟进行深呼吸或冥想，有助于减轻压力。', icon: '🧘' },
    { category: '体检', tip: '建议每年进行一次全面体检，早发现早治疗。', icon: '🏥' },
    { category: '护眼', tip: '遵循20-20-20法则：每20分钟看20英尺远的物体20秒。', icon: '👁️' },
    { category: '姿势', tip: '保持正确坐姿，屏幕距离眼睛50-70cm，屏幕顶端与眼睛平齐。', icon: '🪑' }
  ];
  res.json(tips);
});

app.post('/api/bmi', (req, res) => {
  const { weight, height } = req.body;
  const bmi = weight / ((height / 100) ** 2);
  let category, advice;
  if (bmi < 18.5) { category = '偏瘦'; advice = '建议增加营养摄入，适当进行力量训练增加肌肉量。'; }
  else if (bmi < 24) { category = '正常'; advice = '恭喜！您的BMI在正常范围内，请继续保持健康的生活方式。'; }
  else if (bmi < 28) { category = '偏胖'; advice = '建议控制饮食，增加有氧运动，每周至少3次30分钟以上的运动。'; }
  else { category = '肥胖'; advice = '建议咨询医生或营养师，制定科学的减重计划。注意饮食控制和规律运动。'; }
  res.json({ bmi: bmi.toFixed(1), category, advice });
});

app.listen(PORT, () => {
  console.log(`HealthPilot running at http://localhost:${PORT}`);
});

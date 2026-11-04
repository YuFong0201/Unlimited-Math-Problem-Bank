import { Problem, GeneratorOptions } from '../types';

// 1. 指定的 30 個常見姓名
const NAMES = [
  '家瑋', '宇軒', '柏翰', '思妤', '欣潔', '沛蓁', '育哲', '子晴', '睿安', '品妤',
  '承恩', '亮宇', '品涵', '庭瑄', '冠宇', '聖傑', '家豪', '雅婷', '怡君', '建宏',
  '宗翰', '冠廷', '詩涵', '郁婷', '彥廷', '佩萱', '威宇', '靖雯', '哲瑋', '詠晴'
];

// 2. 六年級速率與距離生活情境（拆分為專屬類型）
interface SpeedScenario {
  activity: string;       // 移動/活動情境
  unitDistance: string;   // 距離單位
  unitTime: string;       // 時間單位
  unitSpeed: string;      // 速率單位
  type: 'speed' | 'distance' | 'time';
}

const SPEED_SCENARIOS: SpeedScenario[] = [
  // 求速率 (距離 ÷ 時間)
  { activity: '參加校園大拉力賽跑步', unitDistance: '公尺', unitTime: '分鐘', unitSpeed: '公尺/分', type: 'speed' },
  { activity: '騎腳踏車去圖書館借書', unitDistance: '公里', unitTime: '小時', unitSpeed: '公里/時', type: 'speed' },
  { activity: '參加運動會 100 公尺短跑', unitDistance: '公尺', unitTime: '秒', unitSpeed: '公尺/秒', type: 'speed' },
  { activity: '走路去校外教學集合地點', unitDistance: '公尺', unitTime: '分鐘', unitSpeed: '公尺/分', type: 'speed' },

  // 求距離 (速率 × 時間)
  { activity: '練跑運動會大拉力賽', unitDistance: '公尺', unitTime: '分鐘', unitSpeed: '公尺/分', type: 'distance' },
  { activity: '搭乘校外教學遊覽車', unitDistance: '公里', unitTime: '小時', unitSpeed: '公里/時', type: 'distance' },
  { activity: '慢跑至校園生態池', unitDistance: '公尺', unitTime: '分鐘', unitSpeed: '公尺/分', type: 'distance' },

  // 求時間 (距離 ÷ 速率)
  { activity: '前往圖書館還書', unitDistance: '公尺', unitTime: '分鐘', unitSpeed: '公尺/分', type: 'time' },
  { activity: '騎腳踏車前往公園', unitDistance: '公里', unitTime: '小時', unitSpeed: '公里/時', type: 'time' },
  { activity: '走路回家', unitDistance: '公尺', unitTime: '分鐘', unitSpeed: '公尺/分', type: 'time' }
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 支援傳入 subType 參數 ('speed' | 'distance' | 'time')
export function generateSpeedWordProblem(
  options: GeneratorOptions,
  subType?: 'speed' | 'distance' | 'time'
): Problem[] {
  const count = options.count || 10;
  const problems: Problem[] = [];

  // 根據要求篩選情境
  const targetScenarios = subType 
    ? SPEED_SCENARIOS.filter(s => s.type === subType)
    : SPEED_SCENARIOS;

  let shuffledNames = shuffle(NAMES);
  let shuffledScenarios = shuffle(targetScenarios);

  let nameIndex = 0;
  let scenarioIndex = 0;

  for (let i = 0; i < count; i++) {
    if (nameIndex >= shuffledNames.length) {
      shuffledNames = shuffle(NAMES);
      nameIndex = 0;
    }
    if (scenarioIndex >= shuffledScenarios.length) {
      shuffledScenarios = shuffle(targetScenarios);
      scenarioIndex = 0;
    }

    const currentName = shuffledNames[nameIndex++];
    const scenario = shuffledScenarios[scenarioIndex++];
    const currentType = subType || scenario.type;

    let expression = '';
    let answer = '';

    if (currentType === 'speed') {
      // 求速率 = 距離 ÷ 時間
      const speed = Math.floor(Math.random() * 40) + 10;
      const time = Math.floor(Math.random() * 8) + 2;
      const distance = speed * time;

      expression = `${currentName}${scenario.activity}，花了 ${time} ${scenario.unitTime}走了 ${distance} ${scenario.unitDistance}。請問${currentName}移動的平均速率是多少${scenario.unitSpeed}？`;
      answer = `${speed} ${scenario.unitSpeed}`;

    } else if (currentType === 'distance') {
      // 求距離 = 速率 × 時間
      const speed = Math.floor(Math.random() * 50) + 20;
      const time = Math.floor(Math.random() * 10) + 3;
      const distance = speed * time;

      expression = `${currentName}${scenario.activity}，平均速率是 ${speed} ${scenario.unitSpeed}，一共花了 ${time} ${scenario.unitTime}。請問${currentName}一共移動了多少${scenario.unitDistance}？`;
      answer = `${distance} ${scenario.unitDistance}`;

    } else {
      // 求時間 = 距離 ÷ 速率
      const speed = Math.floor(Math.random() * 30) + 10;
      const time = Math.floor(Math.random() * 6) + 2;
      const distance = speed * time;

      expression = `${currentName}${scenario.activity}，距離是 ${distance} ${scenario.unitDistance}，若${currentName}以平均速率 ${speed} ${scenario.unitSpeed} 前進，需要花幾${scenario.unitTime}？`;
      answer = `${time} ${scenario.unitTime}`;
    }

    problems.push({
      id: `speed_${currentType}_${Date.now()}_${i}`,
      expression,
      answer,
      operator: 'word-problem'
    });
  }

  return problems;
}
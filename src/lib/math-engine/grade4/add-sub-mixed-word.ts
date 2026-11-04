import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const NAMES = ['小明', '小華', '小美', '阿光', '莉莉', '小強', '萱萱', '小傑', '小芳', '小天', '小宇', '小婷'];

/**
 * 四年級：加減四則運算應用題 (不需括號，順序計算)
 * 單元 ID: G4-WORD-10
 */
export const generateGrade4AddSubMixedWord: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 4);
    const name = NAMES[getRandomInt(0, NAMES.length - 1)];

    if (type === 1) {
      // 情境 1：乘車/入場人數變動 (A + B - C)
      const isLargeFacility = Math.random() < 0.5;

      let vehicle = '';
      let A = 0, B = 0, C = 0;

      if (isLargeFacility) {
        // 大容量：火車、捷運、高鐵、展覽館 (100 ~ 450 人)
        const facilities = ['火車', '捷運', '高鐵'];
        vehicle = facilities[getRandomInt(0, facilities.length - 1)];
        A = getRandomInt(100, 450);
        B = getRandomInt(20, 95);
        C = getRandomInt(10, Math.min(A + B - 5, 90));
      } else {
        // 中小型：遊覽車、公車、客運 (20 ~ 45 人，符合真實載客量)
        const buses = ['遊覽車', '公車', '客運', '校車'];
        vehicle = buses[getRandomInt(0, buses.length - 1)];
        A = getRandomInt(20, 35);
        B = getRandomInt(5, 15);
        C = getRandomInt(5, Math.min(A + B - 2, 20));
      }

      const exprText = `${vehicle}上原本有 ${A} 人，到站後有 ${B} 人上車，又有 ${C} 人下車，現在${vehicle}上有幾個人？請列出一個算式記下來。`;
      const ans = A + B - C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 人`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else if (type === 2) {
      // 情境 2：先減少再增加 (A - B + C)
      const isLargeFacility = Math.random() < 0.5;

      let vehicle = '';
      let A = 0, B = 0, C = 0;

      if (isLargeFacility) {
        // 大容量
        const facilities = ['列車', '高鐵'];
        vehicle = facilities[getRandomInt(0, facilities.length - 1)];
        A = getRandomInt(120, 350);
        B = getRandomInt(10, A - 20);
        C = getRandomInt(15, 85);
      } else {
        // 中小型
        const buses = ['客運', '公車', '巴士'];
        vehicle = buses[getRandomInt(0, buses.length - 1)];
        A = getRandomInt(25, 42);
        B = getRandomInt(5, A - 5);
        C = getRandomInt(5, 15);
      }

      const exprText = `${vehicle}上原本有 ${A} 人，到站後有 ${B} 人下車，又有 ${C} 人上車，現在${vehicle}上有幾個人？請列出一個算式記下來。`;
      const ans = A - B + C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 人`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else if (type === 3) {
      // 情境 3：個人理財與零用錢收支 (A + B - C)
      const A = getRandomInt(150, 850);
      const B = getRandomInt(50, 450);
      const C = getRandomInt(30, Math.min(A + B - 10, 500));

      const exprText = `${name}原本有 ${A} 元，過年收到壓歲錢 ${B} 元，買故事書花了 ${C} 元，${name}現在還有多少元？請列出一個算式記下來。`;
      const ans = A + B - C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 元`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else {
      // 情境 4：庫存連續運出/減少 (A - B - C)
      const A = getRandomInt(350, 980);
      const B = getRandomInt(40, Math.floor(A / 2));
      const C = getRandomInt(20, A - B - 10);

      const items = [
        { name: '蘋果', unit: '顆', place: '水果店' },
        { name: '高麗菜', unit: '顆', place: '菜市場' },
        { name: '故事書', unit: '本', place: '書店' },
        { name: '白米', unit: '包', place: '超市' },
      ];
      const item = items[getRandomInt(0, items.length - 1)];

      const exprText = `${item.place}原本有 ${A} ${item.unit}${item.name}，早上賣出 ${B} ${item.unit}，下午又賣出 ${C} ${item.unit}，還剩下幾${item.unit}${item.name}？請列出一個算式記下來。`;
      const ans = A - B - C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} ${item.unit}`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    }
  }

  return problems;
};
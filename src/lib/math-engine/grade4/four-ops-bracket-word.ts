import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const NAMES = ['小明', '小華', '小美', '阿光', '莉莉', '小強', '萱萱', '小傑', '小芳', '小天', '小宇', '小婷'];

/**
 * 四年級：四則運算應用題 (含括號先算)
 * 單元 ID: G4-WORD-13
 */
export const generateGrade4FourOpsBracketWord: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 4);
    const name = NAMES[getRandomInt(0, NAMES.length - 1)];

    if (type === 1) {
      // (A + B) × C
      const A = getRandomInt(15, 35);
      const B = getRandomInt(5, 15);
      const C = getRandomInt(3, 8);

      const exprText = `一箱蘋果原本有 ${A} 顆，果農又放進 ${B} 顆，水果店買了 ${C} 箱，一共有幾顆蘋果？請列出一個算式記下來。`;
      const ans = (A + B) * C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 顆`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else if (type === 2) {
      // (A - B) × C
      const A = getRandomInt(20, 40);
      const B = getRandomInt(3, 10);
      const C = getRandomInt(4, 10);

      const exprText = `一包餅乾原本有 ${A} 塊，小華吃掉了 ${B} 塊，媽媽買了 ${C} 包這種剩下的餅乾，一共有幾塊餅乾？請列出一個算式記下來。`;
      const ans = (A - B) * C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 塊`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else if (type === 3) {
      // (A + B) ÷ C
      const C = getRandomInt(3, 8);           // 平分人數
      const quotient = getRandomInt(10, 25);  // 每人分到數
      const totalSum = C * quotient;
      const A = getRandomInt(10, totalSum - 5);
      const B = totalSum - A;

      const exprText = `${name}有 ${A} 張卡片，妹妹有 ${B} 張卡片，兩人把卡片合起來平分給 ${C} 個同學，每個同學可以分到幾張卡片？請列出一個算式記下來。`;
      const ans = quotient;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 張`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else {
      // (A - B) ÷ C
      const C = getRandomInt(3, 8);
      const quotient = getRandomInt(12, 30);
      const remain = C * quotient;
      const B = getRandomInt(10, 40);
      const A = remain + B;

      const exprText = `${name}原本有 ${A} 顆糖果，送給弟弟 ${B} 顆後，把剩下的糖果平分給 ${C} 個同學，每個同學可以分到幾顆糖果？請列出一個算式記下來。`;
      const ans = quotient;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 顆`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    }
  }

  return problems;
};
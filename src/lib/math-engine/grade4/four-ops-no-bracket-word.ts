import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const NAMES = ['小明', '小華', '小美', '阿光', '莉莉', '小強', '萱萱', '小傑', '小芳', '小天', '小宇', '小婷'];

/**
 * 四年級：四則運算應用題 (先乘除後加減，無括號)
 * 單元 ID: G4-WORD-12
 */
export const generateGrade4FourOpsNoBracketWord: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 4);
    const name = NAMES[getRandomInt(0, NAMES.length - 1)];

    if (type === 1) {
      // 先乘後加：A + B × C
      const A = getRandomInt(150, 500); // 存款
      const B = getRandomInt(30, 80);   // 每期存入
      const C = getRandomInt(3, 8);     // 個月

      const exprText = `${name}原本有 ${A} 元，之後每個月存 ${B} 元，存了 ${C} 個月後，${name}現在一共有多少元？請列出一個算式記下來。`;
      const ans = A + B * C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 元`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else if (type === 2) {
      // 先乘後減：A - B × C
      const C = getRandomInt(6, 12);     // 每盒枝數
      const B = getRandomInt(5, 15);     // 賣出盒數
      const sold = B * C;
      const A = sold + getRandomInt(30, 150); // 原有總數

      const exprText = `文具店原本有 ${A} 枝鉛筆，賣掉了 ${B} 盒，每盒有 ${C} 枝，還剩下幾枝鉛筆？請列出一個算式記下來。`;
      const ans = A - sold;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 枝`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else if (type === 3) {
      // 先除後加：A + B ÷ C
      const C = getRandomInt(3, 8);           // 平分組數
      const quotient = getRandomInt(5, 15);   // 每組拿到數量
      const B = C * quotient;                 // 總發放數
      const A = getRandomInt(10, 50);         // 自己原有數量

      const exprText = `${name}原本有 ${A} 張貼紙，老師又拿出一包共有 ${B} 張的貼紙平分給 ${C} 個同學，${name}拿到了自己那份後，現在一共有幾張貼紙？請列出一個算式記下來。`;
      const ans = A + quotient;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 張`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    } else {
      // 先除後減：A - B ÷ C
      const C = getRandomInt(2, 6);           // 故事書數量
      const pricePerBook = getRandomInt(80, 150); // 每本價格
      const B = C * pricePerBook;             // 總消費
      const A = B + getRandomInt(100, 500);   // 身上原有錢

      const exprText = `${name}帶了 ${A} 元去書局，買了 ${C} 本定價相同的故事書一共花了 ${B} 元，${name}還剩下多少元？請列出一個算式記下來。`;
      const ans = A - pricePerBook;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} 元`,
        operator: 'word',
        meta: { layout: 'horizontal', isWordProblem: true },
      });
    }
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：三位數減法 (退位)
 * 單元 ID: G2-SUB-04
 */
export const generateGrade2Sub3DBorrow: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const num1 = getRandomInt(200, 999);
    // 強制個位退位
    const u1 = num1 % 10;
    const u2 = u1 === 9 ? 9 : getRandomInt(u1 + 1, 9);

    const h1 = Math.floor(num1 / 100);
    const h2 = getRandomInt(1, h1 - 1);
    const t1 = Math.floor((num1 % 100) / 10);
    const t2 = getRandomInt(0, 9);

    const num2 = h2 * 100 + t2 * 10 + u2;

    // 若計算結果不大於 0，調高被減數
    const actualNum1 = num1 <= num2 ? num2 + getRandomInt(50, 200) : num1;
    const diff = actualNum1 - num2;

    problems.push({
      id: generateId(),
      expression: `${actualNum1} - ${num2} =`,
      answer: String(diff),
      operator: '-',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
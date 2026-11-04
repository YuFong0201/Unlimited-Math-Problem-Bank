import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：三位數加法 (進位)
 * 單元 ID: G2-ADD-06
 */
export const generateGrade2Add3DCarry: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    let num1 = getRandomInt(100, 899);
    let num2 = getRandomInt(100, 999 - num1);

    // 檢查是否有進位，若無則強制設定個位進位
    const u1 = num1 % 10;
    const u2 = num2 % 10;
    if (u1 + u2 < 10) {
      const newU1 = getRandomInt(1, 9);
      const newU2 = getRandomInt(10 - newU1, 9);
      num1 = Math.floor(num1 / 10) * 10 + newU1;
      num2 = Math.floor(num2 / 10) * 10 + newU2;
    }

    const sum = num1 + num2;

    problems.push({
      id: generateId(),
      expression: `${num1} + ${num2} =`,
      answer: String(sum),
      operator: '+',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
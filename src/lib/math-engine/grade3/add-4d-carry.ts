import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：四位數加法 (進位)
 * 單元 ID: G3-ADD-01
 */
export const generateGrade3Add4DCarry: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    let num1 = getRandomInt(1000, 8999);
    let num2 = getRandomInt(1000, 9999 - num1);

    // 強制個位進位，確保題目符合「進位」要求
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
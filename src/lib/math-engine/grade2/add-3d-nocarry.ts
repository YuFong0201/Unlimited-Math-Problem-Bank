import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：三位數加法 (不進位)
 * 單元 ID: G2-ADD-05
 */
export const generateGrade2Add3DNoCarry: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const h1 = getRandomInt(1, 8);
    const h2 = getRandomInt(1, 9 - h1);

    const t1 = getRandomInt(0, 9);
    const t2 = getRandomInt(0, 9 - t1);

    const u1 = getRandomInt(0, 9);
    const u2 = getRandomInt(0, 9 - u1);

    const num1 = h1 * 100 + t1 * 10 + u1;
    const num2 = h2 * 100 + t2 * 10 + u2;
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
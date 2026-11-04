import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：三位數減法 (不退位)
 * 單元 ID: G2-SUB-03
 */
export const generateGrade2Sub3DNoBorrow: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const h1 = getRandomInt(2, 9);
    const h2 = getRandomInt(1, h1 - 1);

    const t1 = getRandomInt(1, 9);
    const t2 = getRandomInt(0, t1);

    const u1 = getRandomInt(1, 9);
    const u2 = getRandomInt(0, u1);

    const num1 = h1 * 100 + t1 * 10 + u1;
    const num2 = h2 * 100 + t2 * 10 + u2;
    const diff = num1 - num2;

    problems.push({
      id: generateId(),
      expression: `${num1} - ${num2} =`,
      answer: String(diff),
      operator: '-',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
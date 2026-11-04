import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：二位數進位加法 (一次進位)
 * 單元 ID: G2-ADD-03
 */
export const generateGrade2Add2D1Carry: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 個位進位：u1 + u2 >= 10
    const u1 = getRandomInt(1, 9);
    const u2 = getRandomInt(10 - u1, 9);

    // 十位不進位：t1 + t2 + 1 <= 9
    const t1 = getRandomInt(1, 7);
    const t2 = getRandomInt(1, 8 - t1);

    const num1 = t1 * 10 + u1;
    const num2 = t2 * 10 + u2;
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
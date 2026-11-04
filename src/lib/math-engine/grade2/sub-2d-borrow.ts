import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：二位數退位減法
 * 單元 ID: G2-SUB-02
 */
export const generateGrade2Sub2DBorrow: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 個位退位：u1 < u2
    const u1 = getRandomInt(0, 8);
    const u2 = getRandomInt(u1 + 1, 9);

    // 十位確保結果為正：t1 > t2
    const t1 = getRandomInt(2, 9);
    const t2 = getRandomInt(1, t1 - 1);

    const num1 = t1 * 10 + u1;
    const num2 = t2 * 10 + u2;
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
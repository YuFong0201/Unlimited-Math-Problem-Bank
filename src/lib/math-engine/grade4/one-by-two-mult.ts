import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：一位數乘以二位數（計算題）
 * 單元 ID: G4-MUL-08
 */
export const generateOneByTwoDigitMult: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const multiplicand = getRandomInt(2, 9);    // 被乘數：一位數 (2 ~ 9)
    const multiplier = getRandomInt(10, 99);   // 乘數：二位數 (10 ~ 99)
    const answer = multiplicand * multiplier;

    problems.push({
      id: generateId(),
      expression: `${multiplicand} × ${multiplier} =`,
      answer: String(answer),
      operator: '×',
      meta: {
        layout: 'vertical',
      },
    });
  }

  return problems;
};
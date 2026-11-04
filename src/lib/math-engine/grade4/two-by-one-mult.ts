import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：二位數乘以一位數（計算題）
 * 單元 ID: G4-MUL-07
 */
export const generateTwoByOneDigitMult: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const multiplicand = getRandomInt(10, 99); // 被乘數：二位數 (10 ~ 99)
    const multiplier = getRandomInt(2, 9);    // 乘數：一位數 (2 ~ 9)
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
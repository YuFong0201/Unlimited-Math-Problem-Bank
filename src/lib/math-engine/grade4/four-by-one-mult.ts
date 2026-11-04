import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：四位數乘以一位數（計算題）
 * 單元 ID: G4-MUL-06
 */
export const generateFourByOneDigitMult: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const multiplicand = getRandomInt(1000, 9999); // 被乘數：四位數 (1000 ~ 9999)
    const multiplier = getRandomInt(2, 9);         // 乘數：一位數 (2 ~ 9)
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
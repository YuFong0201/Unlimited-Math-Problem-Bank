import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：二位數除以二位數（計算題）
 * 單元 ID: G4-DIV-04
 */
export const generateTwoByTwoDigitDiv: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 確保被除數大於等於除數，避免商為 0
    const divisor = getRandomInt(10, 99);        // 除數：二位數 (10 ~ 99)
    const dividend = getRandomInt(divisor, 99);  // 被除數：二位數 (divisor ~ 99)

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;

    const answerStr = remainder > 0 ? `${quotient} ... ${remainder}` : `${quotient}`;

    problems.push({
      id: generateId(),
      expression: `${dividend} ÷ ${divisor} =`,
      answer: answerStr,
      operator: '÷',
      meta: {
        layout: 'vertical',
      },
    });
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

export const generateThreeByTwoDigitDiv: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const dividend = getRandomInt(100, 999); // 被除數：三位數 (100 ~ 999)
    const divisor = getRandomInt(10, 99);    // 除數：二位數 (10 ~ 99)

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
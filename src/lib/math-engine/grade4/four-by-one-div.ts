import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

export const generateFourByOneDigitDiv: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const dividend = getRandomInt(1000, 9999); // 被除數：四位數 (1000 ~ 9999)
    const divisor = getRandomInt(2, 9);       // 除數：一位數 (2 ~ 9)

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;

    // 格式化答案：若有餘數顯示為 "商 ... 餘數"，若整除則只顯示 "商"
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
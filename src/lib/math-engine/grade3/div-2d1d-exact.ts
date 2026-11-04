import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：二位數除以一位數 (商為一位數，整除)
 * 單元 ID: G3-DIV-01
 */
export const generateGrade3Div2D1DExact: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const divisor = getRandomInt(2, 9);
    const quotient = getRandomInt(2, 9); // 商為一位數
    const dividend = divisor * quotient;

    // 確保被除數為二位數
    if (dividend < 10) {
      i--;
      continue;
    }

    problems.push({
      id: generateId(),
      expression: `${dividend} ÷ ${divisor} =`,
      answer: String(quotient),
      operator: 'divide',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：二位數除以一位數 (商為一位數，有餘數)
 * 單元 ID: G3-DIV-02
 */
export const generateGrade3Div2D1DRem: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const divisor = getRandomInt(3, 9);
    const quotient = getRandomInt(2, 9);
    const remainder = getRandomInt(1, divisor - 1); // 有餘數
    const dividend = divisor * quotient + remainder;

    if (dividend < 10 || dividend > 99) {
      i--;
      continue;
    }

    problems.push({
      id: generateId(),
      expression: `${dividend} ÷ ${divisor} =`,
      answer: `${quotient} ... ${remainder}`,
      operator: 'divide',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
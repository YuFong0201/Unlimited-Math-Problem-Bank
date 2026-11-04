import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：三位數除以一位數 (商為三位或二位數，有餘數)
 * 單元 ID: G3-DIV-04
 */
export const generateGrade3Div3D1DRem: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const divisor = getRandomInt(3, 9);
    const minQuotient = Math.ceil(100 / divisor);
    const maxQuotient = Math.floor(995 / divisor);

    const quotient = getRandomInt(minQuotient, maxQuotient);
    const remainder = getRandomInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;

    if (dividend < 100 || dividend > 999) {
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
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：三位數除以一位數 (商為三位或二位數，整除)
 * 單元 ID: G3-DIV-03
 */
export const generateGrade3Div3D1DExact: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const divisor = getRandomInt(2, 9);
    // 商為二位數或三位數 (10 ~ 499)
    const minQuotient = Math.ceil(100 / divisor);
    const maxQuotient = Math.floor(999 / divisor);

    const quotient = getRandomInt(minQuotient, maxQuotient);
    const dividend = divisor * quotient;

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
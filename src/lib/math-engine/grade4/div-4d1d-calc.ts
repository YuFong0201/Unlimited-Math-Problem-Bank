import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：四位數除一位數 (可整除)
 * 單元 ID: G4-DIV-18
 */
export const generateGrade4Div4D1DCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 1. 除數：1 位數 (2 ~ 9)
    const divisor = getRandomInt(2, 9);

    // 2. 被除數目標範圍：4 位數 (1000 ~ 9999)
    // 計算可能的商數範圍 (minQuotient ~ maxQuotient)
    const minQuotient = Math.ceil(1000 / divisor);
    const maxQuotient = Math.floor(9999 / divisor);

    const quotient = getRandomInt(minQuotient, maxQuotient);
    const dividend = divisor * quotient;

    problems.push({
      id: generateId(),
      expression: `${dividend} ÷ ${divisor} =`,
      answer: String(quotient),
      operator: 'divide',
      meta: {
        layout: 'vertical',
      },
    });
  }

  return problems;
};
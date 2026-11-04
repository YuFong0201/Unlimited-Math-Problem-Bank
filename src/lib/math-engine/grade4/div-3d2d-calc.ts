import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：三位數除二位數 (可整除)
 * 單元 ID: G4-DIV-19
 */
export const generateGrade4Div3D2DCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 1. 除數：2 位數 (10 ~ 99)
    const divisor = getRandomInt(10, 99);

    // 2. 被除數目標範圍：3 位數 (100 ~ 999)
    const minQuotient = Math.ceil(100 / divisor);
    const maxQuotient = Math.floor(999 / divisor);

    // 若該除數無法產生 3 位數被除數，重抽一次
    if (minQuotient > maxQuotient) {
      i--;
      continue;
    }

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
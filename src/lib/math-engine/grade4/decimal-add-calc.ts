import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：小數加法計算題 (最多十位數、小數兩位)
 * 單元 ID: G4-DEC-16
 */
export const generateGrade4DecimalAddCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    let h1 = getRandomInt(1, 9999);
    let h2 = getRandomInt(1, 9999);

    if (h1 % 100 === 0) h1 += getRandomInt(1, 99);
    if (h2 % 100 === 0) h2 += getRandomInt(1, 99);

    const num1 = h1 / 100;
    const num2 = h2 / 100;
    const sum = (h1 + h2) / 100;

    problems.push({
      id: generateId(),
      expression: `${num1} + ${num2} =`,
      answer: String(sum),
      operator: '+',
      meta: {
        layout: 'vertical',
      },
    });
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：小數減法計算題 (最多十位數、小數兩位，答案為正數)
 * 單元 ID: G4-DEC-17
 */
export const generateGrade4DecimalSubCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    let h1 = getRandomInt(200, 9999);
    let h2 = getRandomInt(1, h1 - 10);

    if (h1 % 100 === 0) h1 += getRandomInt(1, 99);
    if (h2 % 100 === 0) h2 += getRandomInt(1, 99);

    if (h1 <= h2) {
      h1 = h2 + getRandomInt(50, 500);
    }

    const num1 = h1 / 100;
    const num2 = h2 / 100;
    const diff = (h1 - h2) / 100;

    problems.push({
      id: generateId(),
      expression: `${num1} - ${num2} =`,
      answer: String(diff),
      operator: '-',
      meta: {
        layout: 'vertical',
      },
    });
  }

  return problems;
};
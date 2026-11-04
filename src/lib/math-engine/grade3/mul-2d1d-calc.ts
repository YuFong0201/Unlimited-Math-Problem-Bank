import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：二位數乘以一位數
 * 單元 ID: G3-MUL-01
 */
export const generateGrade3Mul2D1DCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const num1 = getRandomInt(10, 99);
    const num2 = getRandomInt(2, 9);
    const product = num1 * num2;

    problems.push({
      id: generateId(),
      expression: `${num1} × ${num2} =`,
      answer: String(product),
      operator: 'multiply',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
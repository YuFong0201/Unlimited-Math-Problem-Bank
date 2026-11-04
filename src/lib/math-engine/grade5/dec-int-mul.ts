import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 五年級：整數乘以小數
 * 單元 ID: G5-DEC-01
 */
export const generateGrade5DecIntMul: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const intVal = getRandomInt(2, 45);
    const decVal = (getRandomInt(11, 99) / 10).toFixed(1); // 1.1 ~ 9.9

    const product = (intVal * parseFloat(decVal)).toFixed(2).replace(/\.?0+$/, '');

    problems.push({
      id: generateId(),
      expression: `${intVal} × ${decVal} =`,
      answer: product,
      operator: 'multiply',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 五年級：小數乘以小數 (最多至小數點後兩位)
 * 單元 ID: G5-DEC-02
 */
export const generateGrade5DecMulDec: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const dec1 = (getRandomInt(12, 98) / 10).toFixed(1);
    const dec2 = (getRandomInt(12, 98) / 10).toFixed(1);

    const product = (parseFloat(dec1) * parseFloat(dec2)).toFixed(2).replace(/\.?0+$/, '');

    problems.push({
      id: generateId(),
      expression: `${dec1} × ${dec2} =`,
      answer: product,
      operator: 'multiply',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：一位數加減乘混合 (先乘後加減)
 * 單元 ID: G2-MIX-01
 */
export const generateGrade2Mix1DAddSubMul: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 3);
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    const c = getRandomInt(1, 20);

    let expr = '';
    let ans = 0;

    switch (type) {
      case 1:
        // a * b + c
        expr = `${a} × ${b} + ${c} =`;
        ans = a * b + c;
        break;
      case 2:
        // c + a * b
        expr = `${c} + ${a} × ${b} =`;
        ans = c + a * b;
        break;
      case 3:
      default:
        // a * b - c (確保 ans > 0)
        const product = a * b;
        const validC = getRandomInt(1, Math.max(1, product - 1));
        expr = `${a} × ${b} - ${validC} =`;
        ans = product - validC;
        break;
    }

    problems.push({
      id: generateId(),
      expression: expr,
      answer: String(ans),
      operator: 'mix',
    });
  }

  return problems;
};
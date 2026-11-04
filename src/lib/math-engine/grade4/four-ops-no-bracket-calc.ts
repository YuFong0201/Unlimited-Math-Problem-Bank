import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：四則運算計算題 (先乘除後加減，無括號)
 * 單元 ID: G4-MIX-14
 */
export const generateGrade4FourOpsNoBracketCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 4);

    if (type === 1) {
      // A + B × C
      const A = getRandomInt(50, 350);
      const B = getRandomInt(6, 25);
      const C = getRandomInt(4, 12);
      const ans = A + B * C;

      problems.push({
        id: generateId(),
        expression: `${A} + ${B} × ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else if (type === 2) {
      // A - B × C (確保結果為正整數)
      const B = getRandomInt(6, 20);
      const C = getRandomInt(3, 12);
      const product = B * C;
      const A = product + getRandomInt(20, 200);
      const ans = A - product;

      problems.push({
        id: generateId(),
        expression: `${A} - ${B} × ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else if (type === 3) {
      // A + B ÷ C (確保 100% 整除)
      const C = getRandomInt(3, 9);
      const quotient = getRandomInt(8, 30);
      const B = C * quotient;
      const A = getRandomInt(40, 250);
      const ans = A + quotient;

      problems.push({
        id: generateId(),
        expression: `${A} + ${B} ÷ ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else {
      // A - B ÷ C (確保 100% 整除且結果為正整數)
      const C = getRandomInt(3, 9);
      const quotient = getRandomInt(6, 25);
      const B = C * quotient;
      const A = quotient + getRandomInt(20, 200);
      const ans = A - quotient;

      problems.push({
        id: generateId(),
        expression: `${A} - ${B} ÷ ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    }
  }

  return problems;
};
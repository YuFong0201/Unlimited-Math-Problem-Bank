import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 四年級：四則運算計算題 (含括號先算)
 * 單元 ID: G4-MIX-15
 */
export const generateGrade4FourOpsBracketCalc: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 4);

    if (type === 1) {
      // (A + B) × C
      const A = getRandomInt(15, 60);
      const B = getRandomInt(12, 40);
      const C = getRandomInt(3, 12);
      const ans = (A + B) * C;

      problems.push({
        id: generateId(),
        expression: `(${A} + ${B}) × ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else if (type === 2) {
      // (A - B) × C
      const B = getRandomInt(10, 50);
      const A = B + getRandomInt(8, 30);
      const C = getRandomInt(3, 12);
      const ans = (A - B) * C;

      problems.push({
        id: generateId(),
        expression: `(${A} - ${B}) × ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else if (type === 3) {
      // (A + B) ÷ C (確保 100% 整除)
      const C = getRandomInt(3, 9);
      const quotient = getRandomInt(6, 25);
      const sum = C * quotient;
      const A = getRandomInt(10, sum - 5);
      const B = sum - A;
      const ans = quotient;

      problems.push({
        id: generateId(),
        expression: `(${A} + ${B}) ÷ ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else {
      // (A - B) ÷ C (確保 100% 整除)
      const C = getRandomInt(3, 9);
      const quotient = getRandomInt(6, 25);
      const diff = C * quotient;
      const B = getRandomInt(15, 80);
      const A = B + diff;
      const ans = quotient;

      problems.push({
        id: generateId(),
        expression: `(${A} - ${B}) ÷ ${C} =`,
        answer: String(ans),
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    }
  }

  return problems;
};
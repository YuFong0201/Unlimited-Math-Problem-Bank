import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * 五年級：分數乘以分數 (含有約分環節)
 * 單元 ID: G5-FRA-06
 */
export const generateGrade5FraMulFra: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 透過反向構造可約分的數字：a/b * c/d，安排 a 與 d 或 c 與 b 有公因數
    const factor = getRandomInt(2, 4);
    const base1 = getRandomInt(1, 5);
    const base2 = getRandomInt(2, 6);

    const num1 = base1 * factor;
    const den1 = getRandomInt(num1 + 1, 15);

    const den2 = base2 * factor;
    const num2 = getRandomInt(1, den2 - 1);

    const totalNum = num1 * num2;
    const totalDen = den1 * den2;

    const commonGcd = gcd(totalNum, totalDen);
    const finalNum = totalNum / commonGcd;
    const finalDen = totalDen / commonGcd;

    const ansStr = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    problems.push({
      id: generateId(),
      expression: `${num1}/${den1} × ${num2}/${den2} =`,
      answer: ansStr,
      operator: 'multiply',
      meta: { type: 'fraction' },
    });
  }

  return problems;
};
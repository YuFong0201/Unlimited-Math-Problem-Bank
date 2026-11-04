import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * 六年級：分數除以分數 (轉乘倒數後可約分)
 * 單元 ID: G6-FRA-01
 */
export const generateGrade6FraDivFra: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 設計可約分的組合: (a/b) ÷ (c/d) = (a/b) × (d/c)
    const factor = getRandomInt(2, 4);
    const base1 = getRandomInt(1, 5);
    const base2 = getRandomInt(2, 6);

    const num1 = base1 * factor;
    const den1 = getRandomInt(num1 + 1, 15);

    const num2 = base2 * factor;
    const den2 = getRandomInt(1, 15);

    // 原始算式：(num1 / den1) ÷ (num2 / den2)
    // 相當於：(num1 / den1) × (den2 / num2)
    const totalNum = num1 * den2;
    const totalDen = den1 * num2;

    const commonGcd = gcd(totalNum, totalDen);
    const finalNum = totalNum / commonGcd;
    const finalDen = totalDen / commonGcd;

    const ansStr = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    problems.push({
      id: generateId(),
      expression: `${num1}/${den1} ÷ ${num2}/${den2} =`,
      answer: ansStr,
      operator: 'divide',
      meta: { type: 'fraction' },
    });
  }

  return problems;
};
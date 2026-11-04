import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * 五年級：整數乘以分數
 * 單元 ID: G5-FRA-05
 */
export const generateGrade5FraIntMul: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const integer = getRandomInt(2, 12);
    const den = getRandomInt(2, 12);
    const num = getRandomInt(1, den - 1);

    const totalNum = integer * num;
    const commonGcd = gcd(totalNum, den);

    const finalNum = totalNum / commonGcd;
    const finalDen = den / commonGcd;

    const ansStr = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    problems.push({
      id: generateId(),
      expression: `${integer} × ${num}/${den} =`,
      answer: ansStr,
      operator: 'multiply',
      meta: { type: 'fraction' },
    });
  }

  return problems;
};
import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

/**
 * 五年級：異分母分數減法
 * 單元 ID: G5-FRA-03
 */
export const generateGrade5FraDiffSub: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    let den1 = getRandomInt(2, 12);
    let den2 = getRandomInt(2, 12);
    while (den1 === den2) den2 = getRandomInt(2, 12);

    let num1 = getRandomInt(1, den1 - 1);
    let num2 = getRandomInt(1, den2 - 1);

    const commonDen = lcm(den1, den2);
    let s1 = num1 * (commonDen / den1);
    let s2 = num2 * (commonDen / den2);

    // 確保結果為正數
    if (s1 <= s2) {
      num1 = den1 - 1;
      s1 = num1 * (commonDen / den1);
      if (s1 <= s2) {
        num2 = 1;
        s2 = num2 * (commonDen / den2);
      }
    }

    const ansNum = s1 - s2;
    const ansGcd = gcd(ansNum, commonDen);
    const finalNum = ansNum / ansGcd;
    const finalDen = commonDen / ansGcd;

    const ansStr = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    problems.push({
      id: generateId(),
      expression: `${num1}/${den1} - ${num2}/${den2} =`,
      answer: ansStr,
      operator: '-',
      meta: { type: 'fraction' },
    });
  }

  return problems;
};
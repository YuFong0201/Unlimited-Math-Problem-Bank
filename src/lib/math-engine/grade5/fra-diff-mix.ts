import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

/**
 * 五年級：異分母分數加減混合
 * 單元 ID: G5-FRA-04
 */
export const generateGrade5FraDiffMix: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const den1 = getRandomInt(2, 8);
    const den2 = getRandomInt(2, 8);
    const den3 = getRandomInt(2, 8);

    const num1 = getRandomInt(1, den1);
    const num2 = getRandomInt(1, den2);
    const num3 = getRandomInt(1, den3);

    const op1 = i % 2 === 0 ? '+' : '-';
    const op2 = i % 3 === 0 ? '-' : '+';

    const commonDen = lcm(lcm(den1, den2), den3);
    const s1 = num1 * (commonDen / den1);
    const s2 = num2 * (commonDen / den2);
    const s3 = num3 * (commonDen / den3);

    let ansNum = op1 === '+' ? s1 + s2 : s1 - s2;
    ansNum = op2 === '+' ? ansNum + s3 : ansNum - s3;

    // 若計算結果不大於 0，重抽一次
    if (ansNum <= 0) {
      i--;
      continue;
    }

    const ansGcd = gcd(ansNum, commonDen);
    const finalNum = ansNum / ansGcd;
    const finalDen = commonDen / ansGcd;

    const ansStr = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    problems.push({
      id: generateId(),
      expression: `${num1}/${den1} ${op1} ${num2}/${den2} ${op2} ${num3}/${den3} =`,
      answer: ansStr,
      operator: 'mix',
      meta: { type: 'fraction' },
    });
  }

  return problems;
};
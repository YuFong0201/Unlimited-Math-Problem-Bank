import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

// 最大公因數與最小公倍數計算
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

/**
 * 六年級：兩數的最小公倍數 (兩數必定有大於 1 的公因數，適合練習短除法)
 * 單元 ID: G6-WORD-06
 */
export const generateGrade6WordLcm: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  // 共通公因數池 (確保第一步短除法能除得盡)
  const commonFactorPool = [2, 3, 4, 5, 7, 8, 9, 10, 11, 13];

  for (let i = 0; i < count; i++) {
    // 1. 隨機選定一個大於 1 的共通公因數 g
    const g = commonFactorPool[getRandomInt(0, commonFactorPool.length - 1)];

    // 2. 挑選兩個互質的數 a 與 b
    let a = getRandomInt(2, 8);
    let b = getRandomInt(2, 8);

    // 確保 a 與 b 不相等且互質
    while (a === b || gcd(a, b) !== 1) {
      a = getRandomInt(2, 8);
      b = getRandomInt(2, 8);
    }

    const num1 = g * a;
    const num2 = g * b;

    // 控制數字不大於 99，避免計算量過大
    if (num1 > 99 || num2 > 99) {
      i--;
      continue;
    }

    const ansLcm = lcm(num1, num2);

    problems.push({
      id: generateId(),
      expression: `找出 ${num1} 和 ${num2} 的最小公倍數。`,
      answer: String(ansLcm),
      operator: 'word-problem',
      meta: {
        isWordProblem: true,
        layout: 'word',
      },
    });
  }

  return problems;
};
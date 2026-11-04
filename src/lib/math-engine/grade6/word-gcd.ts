import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

// 最大公因數與互質判斷
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * 六年級：兩數的最大公因數 (答案限定為 2, 3, 5, 7, 11, 13，絕不為 1)
 * 單元 ID: G6-WORD-05
 */
export const generateGrade6WordGcd: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  // 限定的最大公因數池（絕不包含 1，且最高到 13）
  const targetGcdPool = [2, 3, 5, 7, 11, 13];

  for (let i = 0; i < count; i++) {
    // 1. 隨機選定一個指定的最大公因數 g
    const targetGcd = targetGcdPool[getRandomInt(0, targetGcdPool.length - 1)];

    // 2. 尋找兩互質係數 a 與 b，使得兩數 (g * a, g * b) 均為兩位數（<= 99）
    const maxMultiplier = Math.floor(99 / targetGcd);
    let a = getRandomInt(2, maxMultiplier);
    let b = getRandomInt(2, maxMultiplier);

    // 確保 a 與 b 不相等且互質 (gcd(a, b) === 1)
    while (a === b || gcd(a, b) !== 1) {
      a = getRandomInt(2, maxMultiplier);
      b = getRandomInt(2, maxMultiplier);
    }

    const num1 = targetGcd * a;
    const num2 = targetGcd * b;

    problems.push({
      id: generateId(),
      expression: `找出 ${num1} 和 ${num2} 的最大公因數。`,
      answer: String(targetGcd),
      operator: 'word-problem',
      meta: {
        isWordProblem: true,
        layout: 'word',
      },
    });
  }

  return problems;
};
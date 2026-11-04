import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 六年級：質因數分解應用題
 * 單元 ID: G6-WORD-04
 */
export const generateGrade6WordPrimeFactor: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  const primePool = [2, 3, 5, 7, 11, 13];

  for (let i = 0; i < count; i++) {
    // 隨機選取 2 ~ 4 個質數因子相乘（質數不大於 13）
    const factorCount = getRandomInt(2, 4);
    const chosenFactors: number[] = [];
    let product = 1;

    for (let j = 0; j < factorCount; j++) {
      const p = primePool[getRandomInt(0, primePool.length - 1)];
      // 避免數字過大（控制在 300 以內）
      if (product * p > 300) break;
      chosenFactors.push(p);
      product *= p;
    }

    chosenFactors.sort((a, b) => a - b);
    const factorStr = chosenFactors.join(' × ');

    problems.push({
      id: generateId(),
      expression: `用短除法將 ${product} 質因數分解。`,
      answer: `${product} = ${factorStr}`,
      operator: 'word-problem',
      meta: {
        isWordProblem: true,
        layout: 'word',
      },
    });
  }

  return problems;
};
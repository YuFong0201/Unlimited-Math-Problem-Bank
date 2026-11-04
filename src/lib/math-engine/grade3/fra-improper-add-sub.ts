import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：同分母真分數/假分數加減 (分母 10 以內)
 * 單元 ID: G3-FRA-02
 */
export const generateGrade3FraImproperAddSub: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const den = getRandomInt(3, 10);
    const isAdd = i % 2 === 0;

    let num1 = 1;
    let num2 = 1;
    let ansNum = 1;
    const opStr = isAdd ? '+' : '-';

    if (isAdd) {
      // 加法：分子可超過分母 (假分數)
      num1 = getRandomInt(1, den + 2);
      num2 = getRandomInt(1, den + 3);
      ansNum = num1 + num2;
    } else {
      // 減法：被減數可為假分數
      num1 = getRandomInt(den, den + 5);
      num2 = getRandomInt(1, num1 - 1);
      ansNum = num1 - num2;
    }

    problems.push({
      id: generateId(),
      expression: `${num1}/${den} ${opStr} ${num2}/${den} =`,
      answer: `${ansNum}/${den}`,
      operator: isAdd ? '+' : '-',
      meta: { type: 'fraction' },
    });
  }

  return problems;
};
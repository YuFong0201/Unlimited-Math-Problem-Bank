import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：同分母真分數加減 (分母 10 以內)
 * 單元 ID: G3-FRA-01
 */
export const generateGrade3FraProperAddSub: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const den = getRandomInt(3, 10); // 分母 <= 10
    const isAdd = i % 2 === 0;

    let num1 = 1;
    let num2 = 1;
    let ansNum = 1;
    const opStr = isAdd ? '+' : '-';

    if (isAdd) {
      // 加法：確保兩者皆為真分數且和不大於分母（或符合真分數範疇）
      num1 = getRandomInt(1, den - 2);
      num2 = getRandomInt(1, den - num1 - 1);
      ansNum = num1 + num2;
    } else {
      // 減法：確保被減數與減數皆為真分數
      num1 = getRandomInt(2, den - 1);
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
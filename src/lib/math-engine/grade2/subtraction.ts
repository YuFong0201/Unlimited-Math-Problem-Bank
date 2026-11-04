import { Problem, ProblemGenerator } from '../types';
import { getRandomInt, generateId } from '../utils';

export const generateTwoDigitSubWithBorrow: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const onesA = getRandomInt(0, 8);
    const onesB = getRandomInt(onesA + 1, 9);
    const tensA = getRandomInt(2, 9);
    const tensB = getRandomInt(1, tensA - 1);
    const num1 = tensA * 10 + onesA;
    const num2 = tensB * 10 + onesB;
    problems.push({
      id: generateId(),
      expression: `${num1} - ${num2} =`,
      answer: (num1 - num2).toString(),
      operator: '-'
    });
  }
  return problems;
};
import { Problem, ProblemGenerator } from '../types';
import { getRandomInt, generateId } from '../utils';

export const generateThreeByTwoDigitMult: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const num1 = getRandomInt(100, 999);
    const num2 = getRandomInt(10, 99);
    problems.push({
      id: generateId(),
      expression: `${num1} × ${num2} =`,
      answer: (num1 * num2).toString(),
      operator: '×'
    });
  }
  return problems;
};
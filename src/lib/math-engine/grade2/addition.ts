import { Problem, ProblemGenerator } from '../types';
import { getRandomInt, generateId } from '../utils';

export const generateTwoDigitAddNoCarry: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const tensA = getRandomInt(1, 8);
    const tensB = getRandomInt(1, 9 - tensA);
    const onesA = getRandomInt(0, 9);
    const onesB = getRandomInt(0, 9 - onesA);
    const num1 = tensA * 10 + onesA;
    const num2 = tensB * 10 + onesB;
    problems.push({
      id: generateId(),
      expression: `${num1} + ${num2} =`,
      answer: (num1 + num2).toString(),
      operator: '+'
    });
  }
  return problems;
};

export const generateTwoDigitAddSingleCarry: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const onesA = getRandomInt(1, 9);
    const onesB = getRandomInt(10 - onesA, 9);
    const tensA = getRandomInt(1, 7);
    const tensB = getRandomInt(1, 8 - tensA);
    const num1 = tensA * 10 + onesA;
    const num2 = tensB * 10 + onesB;
    problems.push({
      id: generateId(),
      expression: `${num1} + ${num2} =`,
      answer: (num1 + num2).toString(),
      operator: '+'
    });
  }
  return problems;
};
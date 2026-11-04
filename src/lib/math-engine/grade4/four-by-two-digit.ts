import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

export const generateFourByTwoDigit: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {

    const multiplicand = getRandomInt(1000, 4999);

    const multiplier = getRandomInt(10, 99);

    const answer = multiplicand * multiplier;

    problems.push({
      id: generateId(),
      expression: `${multiplicand} × ${multiplier} =`,
      answer: String(answer),
      operator: '×',
      meta: {
        layout: 'vertical',
      },
    });
  }

  return problems;
};
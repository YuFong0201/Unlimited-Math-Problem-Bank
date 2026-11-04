import { Problem, GeneratorOptions } from '../types';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

// G1-2D-01: 兩位數加減法 (不進退位)
export function generateGrade1TwoDigitNoRegroup(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const isAdd = Math.random() < 0.5;

    if (isAdd) {
      const tens1 = getRandomInt(1, 7);
      const ones1 = getRandomInt(0, 8);
      const tens2 = getRandomInt(1, 9 - tens1);
      const ones2 = getRandomInt(0, 9 - ones1);

      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      const sum = num1 + num2;

      problems.push({
        id: generateId('G1-2D-01'),
        expression: `${num1} + ${num2} = `,
        answer: `${sum}`,
        operator: '+',
        meta: { operand1: num1, operand2: num2 },
      });
    } else {
      const tens1 = getRandomInt(2, 9);
      const ones1 = getRandomInt(1, 9);
      const tens2 = getRandomInt(1, tens1);
      const ones2 = getRandomInt(0, ones1);

      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      const diff = num1 - num2;

      problems.push({
        id: generateId('G1-2D-01'),
        expression: `${num1} - ${num2} = `,
        answer: `${diff}`,
        operator: '-',
        meta: { operand1: num1, operand2: num2 },
      });
    }
  }
  return problems;
}
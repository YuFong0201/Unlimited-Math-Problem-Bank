import { Problem, GeneratorOptions } from '../types';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

// G1-ADD-01: 十以內的加法 (計算題)
export function generateGrade1Add10Math(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const num1 = getRandomInt(1, 9);
    const num2 = getRandomInt(1, 10 - num1);
    const sum = num1 + num2;

    problems.push({
      id: generateId('G1-ADD-01'),
      expression: `${num1} + ${num2} = `,
      answer: `${sum}`,
      operator: '+',
      meta: { operand1: num1, operand2: num2 },
    });
  }
  return problems;
}

// G1-ADD-02: 18以內的加法 (計算題)
export function generateGrade1Add18Math(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const num1 = getRandomInt(2, 9);
    const num2 = getRandomInt(Math.max(1, 11 - num1), 9);
    const sum = num1 + num2;

    problems.push({
      id: generateId('G1-ADD-02'),
      expression: `${num1} + ${num2} = `,
      answer: `${sum}`,
      operator: '+',
      meta: { operand1: num1, operand2: num2 },
    });
  }
  return problems;
}
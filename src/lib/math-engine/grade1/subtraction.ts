import { Problem, GeneratorOptions } from '../types';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

// 🎯 G1-SUB-01: 十以內的減法 (計算題 - 限制僅個位數減個位數：被減數 1~9)
export function generateGrade1Sub10Math(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const num1 = getRandomInt(1, 9); // 被減數限制在 1 ~ 9 (個位數)
    const num2 = getRandomInt(1, num1); // 減數為 1 ~ num1 (確保結果 >= 0)
    const diff = num1 - num2;

    problems.push({
      id: generateId('G1-SUB-01'),
      expression: `${num1} - ${num2} = `,
      answer: `${diff}`,
      operator: '-',
      meta: { operand1: num1, operand2: num2 },
    });
  }
  return problems;
}

// G1-SUB-02: 18以內的減法 (退位減法/被減數 11~18)
export function generateGrade1Sub18Math(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const num1 = getRandomInt(11, 18);
    const num2 = getRandomInt(num1 - 9, 9);
    const diff = num1 - num2;

    problems.push({
      id: generateId('G1-SUB-02'),
      expression: `${num1} - ${num2} = `,
      answer: `${diff}`,
      operator: '-',
      meta: { operand1: num1, operand2: num2 },
    });
  }
  return problems;
}
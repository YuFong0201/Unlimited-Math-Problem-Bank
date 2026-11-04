import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 五年級：小數除以整數 (商最高至三位小數，整除)
 * 單元 ID: G5-DEC-04
 */
export const generateGrade5DecDivInt: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const divisor = getRandomInt(2, 9);
    
    // 1. 生成 1~2 位小數的商 (如 0.15, 1.25, 3.4)
    const quotientVal = getRandomInt(12, 899) / (i % 2 === 0 ? 10 : 100);
    // 自動消除商末尾多餘的 0
    const quotientStr = Number(quotientVal.toFixed(2)).toString();

    // 2. 計算被除數 (被除數 = 除數 × 商)
    // 使用 Number().toString() 會自動消除 12.50 -> 12.5，但 13.00 會變成 13
    const dividendVal = Number((quotientVal * divisor).toFixed(3));
    const dividendStr = dividendVal.toString();


    const isTrueDecimal = /^\d+\.\d*[1-9]\d*$/.test(dividendStr);

    if (!isTrueDecimal) {
      i--; 
      continue;
    }

    problems.push({
      id: generateId(),
      expression: `${dividendStr} ÷ ${divisor} =`,
      answer: quotientStr,
      operator: 'divide',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
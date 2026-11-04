import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 六年級：小數除以小數 (數字最多到小數點後兩位，商最多到小數點後三位，整除無餘數)
 * 單元 ID: G6-DEC-01
 */
export const generateGrade6DecDivDec: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 1. 生成 1~2 位小數的除數 (例如 0.2, 0.15, 1.2, 2.45)
    const divisorScale = Math.random() > 0.5 ? 10 : 100;
    const divisorVal = Number((getRandomInt(2, 250) / divisorScale).toFixed(2));
    
    // 確保除數不為 0 且有效
    if (divisorVal === 0) {
      i--;
      continue;
    }

    // 2. 生成 1~3 位小數的商數 (最高到小數點後 3 位)
    const quotientScaleOptions = [10, 100, 1000];
    const quotientScale = quotientScaleOptions[getRandomInt(0, 2)];
    const quotientVal = Number((getRandomInt(1, 999) / quotientScale).toFixed(3));

    // 3. 計算被除數 (被除數 = 除數 × 商)
    // 限制乘積精確度，並轉回 Number 清除末尾零
    const dividendVal = Number((divisorVal * quotientVal).toFixed(5));
    const dividendStr = dividendVal.toString();
    const divisorStr = divisorVal.toString();
    const quotientStr = quotientVal.toString();
    const getDecLen = (str: string) => (str.includes('.') ? str.split('.')[1].length : 0);

    if (
      getDecLen(dividendStr) > 2 ||
      getDecLen(divisorStr) > 2 ||
      !/^\d+\.\d*[1-9]\d*$/.test(dividendStr)
    ) {
      i--; // 不符合規定，重新抽題
      continue;
    }

    problems.push({
      id: generateId(),
      expression: `${dividendStr} ÷ ${divisorStr} =`,
      answer: quotientStr,
      operator: 'divide',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
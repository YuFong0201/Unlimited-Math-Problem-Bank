import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 五年級：整數除以整數 (商最高至三位小數，整除)
 * 單元 ID: G5-DEC-03
 */
export const generateGrade5DecIntDivInt: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    // 預設常見能除盡的小數商 (0.5, 0.25, 0.125, 0.2, 0.04 等)
    const divisorOptions = [2, 4, 5, 8, 10, 16, 20, 25, 40, 50];
    const divisor = divisorOptions[getRandomInt(0, divisorOptions.length - 1)];

    // 隨機指定商 (包含小數，最多 3 位)
    const quotientVal = getRandomInt(1, 999) / (i % 2 === 0 ? 10 : 100);
    const dividend = Math.round(quotientVal * divisor);

    // 確保被除數與除數為整數且整除
    const actualQuotient = dividend / divisor;
    const decDigits = (String(actualQuotient).split('.')[1] || '').length;

    if (decDigits > 3 || dividend % divisor === 0 && actualQuotient >= 100) {
      i--;
      continue;
    }

    problems.push({
      id: generateId(),
      expression: `${dividend} ÷ ${divisor} =`,
      answer: String(actualQuotient),
      operator: 'divide',
      meta: { layout: 'vertical' },
    });
  }

  return problems;
};
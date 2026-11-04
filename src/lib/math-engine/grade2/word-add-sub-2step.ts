import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：加減兩步驟應用題 (不含括號)
 * 單元 ID: G2-WORD-01
 */
export const generateGrade2WordAddSub2Step: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  const templates = [
    // 型態 1：先減後加（公車/人數）
    () => {
      const original = getRandomInt(25, 60);
      const off = getRandomInt(5, 15);
      const on = getRandomInt(6, 20);
      const ans = original - off + on;
      return {
        expr: `公車上原本有 ${original} 人，到了第一站有 ${off} 人下車，又有 ${on} 人上車，現在公車上有幾個人？`,
        ans: `${ans}`,
      };
    },
    // 型態 2：連加（收集/購買）
    () => {
      const a = getRandomInt(12, 35);
      const b = getRandomInt(15, 40);
      const c = getRandomInt(10, 30);
      const ans = a + b + c;
      return {
        expr: `小明第一天收集了 ${a} 張貼紙，第二天收集了 ${b} 張，第三天又收集了 ${c} 張，小明三天一共收集了幾張貼紙？`,
        ans: `${ans}`,
      };
    },
    // 型態 3：先加後減（水果/庫存）
    () => {
      const init = getRandomInt(30, 70);
      const buy = getRandomInt(15, 30);
      const sell = getRandomInt(20, 40);
      const ans = init + buy - sell;
      return {
        expr: `水果店原本有 ${init} 個蘋果，老闆又進貨了 ${buy} 個，下午賣出了 ${sell} 個，水果店現在還剩下幾個蘋果？`,
        ans: `${ans}`,
      };
    },
  ];

  for (let i = 0; i < count; i++) {
    const tIndex = i % templates.length;
    const { expr, ans } = templates[tIndex]();

    problems.push({
      id: generateId(),
      expression: expr,
      answer: ans,
      operator: 'word-problem',
      meta: {
        isWordProblem: true,
        layout: 'word',
      },
    });
  }

  return problems;
};
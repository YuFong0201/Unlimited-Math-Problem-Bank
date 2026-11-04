import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 二年級：乘法應用與加減乘混合應用題 (先乘後加/減)
 * 單元 ID: G2-WORD-02
 */
export const generateGrade2WordMulMix: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  const templates = [
    // 型態 1：純乘法應用題
    () => {
      const boxes = getRandomInt(3, 9);
      const perBox = getRandomInt(2, 9);
      const ans = boxes * perBox;
      return {
        expr: `一盒巧克力有 ${perBox} 顆，媽媽買了 ${boxes} 盒，一共是多少顆巧克力？`,
        ans: `${ans}`,
      };
    },
    // 型態 2：先乘後加
    () => {
      const groups = getRandomInt(2, 6);
      const perGroup = getRandomInt(3, 8);
      const extra = getRandomInt(5, 25);
      const ans = groups * perGroup + extra;
      return {
        expr: `教室裡有 ${groups} 組桌子，每組坐 ${perGroup} 個小朋友，另外還有 ${extra} 個小朋友站在外面，一共有幾個小朋友？`,
        ans: `${ans}`,
      };
    },
    // 型態 3：先乘後減
    () => {
      const packs = getRandomInt(3, 8);
      const perPack = getRandomInt(4, 9);
      const eaten = getRandomInt(3, packs * perPack - 1);
      const ans = packs * perPack - eaten;
      return {
        expr: `小華買了 ${packs} 包餅乾，每包有 ${perPack} 片，分享給同學吃掉了 ${eaten} 片後，還剩下幾片餅乾？`,
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
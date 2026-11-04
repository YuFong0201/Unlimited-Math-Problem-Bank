import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 五年級：擴分與約分練習 (使用 _ 作為挖空標記)
 * 單元 ID: G5-FRA-01
 */
export const generateGrade5FraReduction: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const isExpanding = i % 2 === 0;
    const holeType = getRandomInt(1, 2); // 1: 挖空分子, 2: 挖空分母

    const baseDen = getRandomInt(2, 9);
    const baseNum = getRandomInt(1, baseDen - 1);
    const factor = getRandomInt(2, 5);

    const scaledNum = baseNum * factor;
    const scaledDen = baseDen * factor;

    let expr = '';
    let ans = '';

    if (isExpanding) {
      if (holeType === 1) {
        expr = `${baseNum}/${baseDen} = _/${scaledDen}`;
        ans = String(scaledNum);
      } else {
        expr = `${baseNum}/${baseDen} = ${scaledNum}/_`;
        ans = String(scaledDen);
      }
    } else {
      if (holeType === 1) {
        expr = `${scaledNum}/${scaledDen} = _/${baseDen}`;
        ans = String(baseNum);
      } else {
        expr = `${scaledNum}/${scaledDen} = ${baseNum}/_`;
        ans = String(baseDen);
      }
    }

    problems.push({
      id: generateId(),
      expression: expr,
      answer: ans,
      operator: 'equal',
      meta: { 
        type: 'fraction',
      },
    });
  }

  return problems;
};
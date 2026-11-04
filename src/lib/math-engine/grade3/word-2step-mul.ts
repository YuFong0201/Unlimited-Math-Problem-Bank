import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 三年級：兩步驟連乘應用題
 * 單元 ID: G3-WORD-01
 */
export const generateGrade3Word2StepMul: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  const templates = [
    // 情境 1：麵包店打包（箱 -> 盒 -> 個）
    () => {
      const boxes = getRandomInt(3, 6);
      const packsPerBox = getRandomInt(4, 8);
      const itemsPerPack = getRandomInt(5, 10);
      const ans = boxes * packsPerBox * itemsPerPack;
      return {
        expr: `烘焙坊做菠蘿麵包，裝了 ${boxes} 大箱，每一大箱有 ${packsPerBox} 盒，每一盒有 ${itemsPerPack} 個，烘焙坊一共做了幾個菠蘿麵包？`,
        ans: `${ans}`,
      };
    },
    // 情境 2：禮堂/會議室座席（排 -> 桌 -> 人）
    () => {
      const rows = getRandomInt(4, 8);
      const tablesPerRow = getRandomInt(3, 6);
      const seatsPerTable = getRandomInt(4, 8);
      const ans = rows * tablesPerRow * seatsPerTable;
      return {
        expr: `學校禮堂擺放座椅，一共有 ${rows} 排，每一排有 ${tablesPerRow} 張長桌，每一張長桌可以坐 ${seatsPerTable} 位學生，禮堂一共可以坐幾位學生？`,
        ans: `${ans}`,
      };
    },
    // 情境 3：飲料卡車運送（車 -> 箱 -> 瓶）
    () => {
      const trucks = getRandomInt(2, 5);
      const boxesPerTruck = getRandomInt(10, 25);
      const bottlesPerBox = getRandomInt(6, 12);
      const ans = trucks * boxesPerTruck * bottlesPerBox;
      return {
        expr: `便利商店補貨，貨車運來 ${trucks} 輛卡車的牛奶，每輛卡車載有 ${boxesPerTruck} 箱，每箱有 ${bottlesPerBox} 瓶，一共運來幾瓶牛奶？`,
        ans: `${ans}`,
      };
    },
    // 情境 4：水果批發（箱 -> 包 -> 顆）
    () => {
      const crates = getRandomInt(3, 8);
      const bagsPerCrate = getRandomInt(5, 10);
      const applesPerBag = getRandomInt(4, 8);
      const ans = crates * bagsPerCrate * applesPerBag;
      return {
        expr: `水果行進貨蘋果，一共有 ${crates} 箱，每箱裡面裝有 ${bagsPerCrate} 袋，每袋裡面有 ${applesPerBag} 顆蘋果，水果行一共進貨了幾顆蘋果？`,
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
import { Problem, GeneratorOptions } from '../types';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

const NAMES = ['小明', '小華', '小美', '阿光', '莉莉', '小強', '萱萱', '小傑', '小芳', '小天', '小宇', '小婷'];

const CONTAINERS = [
  '盒子裡',
  '箱子裡',
  '櫃子裡',
  '抽屜裡',
  '書包裡',
  '桌子上',
  '架子上',
];

interface ItemGroup {
  items: string[];
  unit: string;
  addActions: string[];       
  subEdibleActions?: string[]; 
  subGeneralActions: string[];  
}

const ITEM_GROUPS: ItemGroup[] = [

  {
    items: ['蘋果', '糖果', '草莓', '巧克力'],
    unit: '顆',
    addActions: ['媽媽又給他', '爸爸又買了', '阿姨又送他'],
    subEdibleActions: ['吃掉了', '分給妹妹吃了', '分給朋友吃了'],
    subGeneralActions: ['分給朋友', '不小心掉到地上壞了'],
  },

  {
    items: ['鉛筆', '彩色筆', '蠟筆'],
    unit: '枝',
    addActions: ['自己又買了', '爸爸又送他', '老師又獎勵他'],
    subGeneralActions: ['分給同學', '借給朋友', '不小心弄丟了', '用到不能用了'],
  },

  {
    items: ['玩具車', '小模型車'],
    unit: '台',
    addActions: ['自己又買了', '爸爸又送他', '叔叔買給他'],
    subGeneralActions: ['送給朋友', '借給同學', '不小心弄丟了', '玩壞了'],
  },

  {
    items: ['積木', '公仔', '魔術方塊'],
    unit: '個',
    addActions: ['自己又買了', '爸爸又送他'],
    subGeneralActions: ['分給朋友', '借給同學', '不小心弄丟了'],
  },

  {
    items: ['餅乾', '蛋糕'],
    unit: '塊',
    addActions: ['媽媽又給他', '老師又獎勵他', '阿姨送他'],
    subEdibleActions: ['吃掉了', '分給弟弟吃了', '分給同學吃了'],
    subGeneralActions: ['分給同學', '分給朋友'],
  },

  {
    items: ['橡皮擦'],
    unit: '塊',
    addActions: ['自己又買了', '老師獎勵他'],
    subGeneralActions: ['借給同學', '不小心弄丟了', '用掉了'],
  },

  {
    items: ['貼紙', '卡片', '色紙'],
    unit: '張',
    addActions: ['自己又買了', '老師又送他'],
    subGeneralActions: ['送給朋友', '貼在牆上用掉了', '不小心弄髒了'],
  },

  {
    items: ['氣球'],
    unit: '顆',
    addActions: ['爸爸又買了', '叔叔又送他'],
    subGeneralActions: ['送給小弟弟', '不小心破掉了', '飛走了'],
  },

  {
    items: ['襪子', '手套'],
    unit: '雙',
    addActions: ['媽媽又買了', '爸爸買給他'],
    subGeneralActions: ['洗衣服時弄丟了', '送給弟弟', '穿舊扔掉了'],
  },
];

// G1-WORD-01: 加法應用題 (18以內)
export function generateGrade1AddWordProblem(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const is18 = Math.random() < 0.5;
    const name = NAMES[getRandomInt(0, NAMES.length - 1)];
    const group = ITEM_GROUPS[getRandomInt(0, ITEM_GROUPS.length - 1)];
    const item = group.items[getRandomInt(0, group.items.length - 1)];
    const addAction = group.addActions[getRandomInt(0, group.addActions.length - 1)];

    if (!is18) {
      const num1 = getRandomInt(1, 9);
      const num2 = getRandomInt(1, 10 - num1);
      problems.push({
        id: generateId('G1-WORD-01'),
        expression: `${name}原本有 ${num1} ${group.unit}${item}，${addAction} ${num2} ${group.unit}，請問${name}現在一共有幾${group.unit}${item}？`,
        answer: `${num1 + num2} ${group.unit}`,
        operator: '+',
      });
    } else {
      const num1 = getRandomInt(2, 9);
      const num2 = getRandomInt(Math.max(1, 11 - num1), 9);
      problems.push({
        id: generateId('G1-WORD-01'),
        expression: `${name}早上買了 ${num1} ${group.unit}${item}，下午又買了 ${num2} ${group.unit}，今天一共買了幾${group.unit}${item}？`,
        answer: `${num1 + num2} ${group.unit}`,
        operator: '+',
      });
    }
  }
  return problems;
}

// G1-WORD-02: 減法應用題 (18以內)
export function generateGrade1SubWordProblem(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const is18 = Math.random() < 0.5;
    const name = NAMES[getRandomInt(0, NAMES.length - 1)];
    const group = ITEM_GROUPS[getRandomInt(0, ITEM_GROUPS.length - 1)];
    const item = group.items[getRandomInt(0, group.items.length - 1)];

    const possibleActions = group.subEdibleActions
      ? [...group.subGeneralActions, ...group.subEdibleActions]
      : group.subGeneralActions;
    const action = possibleActions[getRandomInt(0, possibleActions.length - 1)];

    if (!is18) {
      const num1 = getRandomInt(1, 9);
      const num2 = getRandomInt(1, num1);
      problems.push({
        id: generateId('G1-WORD-02'),
        expression: `${name}原本有 ${num1} ${group.unit}${item}，${action} ${num2} ${group.unit}後，還剩下幾${group.unit}${item}？`,
        answer: `${num1 - num2} ${group.unit}`,
        operator: '-',
      });
    } else {
      const num1 = getRandomInt(11, 18);
      const num2 = getRandomInt(num1 - 9, 9);
      const container = CONTAINERS[getRandomInt(0, CONTAINERS.length - 1)];

      problems.push({
        id: generateId('G1-WORD-02'),
        expression: `${container}原本有 ${num1} ${group.unit}${item}，${action} ${num2} ${group.unit}，還剩幾${group.unit}${item}？`,
        answer: `${num1 - num2} ${group.unit}`,
        operator: '-',
      });
    }
  }
  return problems;
}

// G1-WORD-03: 30以內的數與位值
export function generateGrade1Number30(options: GeneratorOptions): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < options.count; i++) {
    const type = getRandomInt(1, 4);
    const num = getRandomInt(11, 30);
    const tens = Math.floor(num / 10);
    const ones = num % 10;

    if (type === 1) {
      problems.push({
        id: generateId('G1-WORD-03'),
        expression: `數字 「${num}」 是由 (   ) 個十和 (   ) 個一合起來的？`,
        answer: `${tens} 個十，${ones} 個一`,
        operator: 'word',
        meta: { num, tens, ones },
      });
    } else if (type === 2) {
      const start = getRandomInt(11, 26);
      const seq = [start, start + 1, start + 2, start + 3, start + 4];
      const missingIdx = getRandomInt(1, 3);
      const ans = seq[missingIdx];
      seq[missingIdx] = NaN;

      problems.push({
        id: generateId('G1-WORD-03'),
        expression: `請依順序填填看：${seq.map((n) => (isNaN(n) ? '(   )' : n)).join('、')}`,
        answer: `${ans}`,
        operator: 'word',
        meta: { missingValue: ans },
      });
    } else if (type === 3) {
      let numB = getRandomInt(11, 30);
      while (numB === num) {
        numB = getRandomInt(11, 30);
      }
      const isGreater = Math.random() < 0.5;
      const ans = isGreater ? Math.max(num, numB) : Math.min(num, numB);
      const symbol = isGreater ? '大' : '小';

      problems.push({
        id: generateId('G1-WORD-03'),
        expression: `「${num}」和「${numB}」，哪一個數字比較 ${symbol}？`,
        answer: `${ans}`,
        operator: 'word',
        meta: { numA: num, numB, result: ans },
      });
    } else {
      problems.push({
        id: generateId('G1-WORD-03'),
        expression: `${tens} 個十和 ${ones} 個一合起來是多少？`,
        answer: `${num}`,
        operator: 'word',
        meta: { tens, ones, result: num },
      });
    }
  }
  return problems;
}
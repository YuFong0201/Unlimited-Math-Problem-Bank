import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

const NAMES = ['小明', '小華', '小美', '阿光', '莉莉', '小強', '萱萱', '小傑', '小芳', '小天', '小宇', '小婷'];

/**
 * 四年級：乘除四則運算應用題 (整除、不需括號、順序計算)
 * 單元 ID: G4-MIX-11
 */
export const generateGrade4MultDivMixedWord: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomInt(1, 3);
    const name = NAMES[getRandomInt(0, NAMES.length - 1)];

    if (type === 1) {
      // 類型 1：先乘後除 (A × B ÷ C)
      let A = 0, B = 0, C = 0;
      while (true) {
        A = getRandomInt(4, 24);   
        B = getRandomInt(3, 12);   
        C = getRandomInt(2, 10);   
        if ((A * B) % C === 0 && (A * B) / C <= 500) break;
      }

      const foodItems = [
        { name: '餅乾', packUnit: '盒', unit: '個' },
        { name: '巧克力', packUnit: '盒', unit: '顆' },
        { name: '果凍', packUnit: '袋', unit: '個' },
        { name: '軟糖', packUnit: '包', unit: '顆' },
      ];
      const food = foodItems[getRandomInt(0, foodItems.length - 1)];

      const exprText = `1 ${food.packUnit}${food.name}有 ${A} ${food.unit}，老師買了 ${B} ${food.packUnit}，平分給 ${C} 組同學，每組可以分到幾個${food.name}？請列出一個算式記下來。`;
      const ans = (A * B) / C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} ${food.unit}`,
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else if (type === 2) {
      // 類型 2：先除後乘 (A ÷ B × C)
      let A = 0, B = 0, C = 0;
      while (true) {
        B = getRandomInt(4, 12);               
        const factor = getRandomInt(10, 50);  
        A = B * factor;                      
        C = getRandomInt(2, 20);               
        if (A <= 960 && (A / B) * C <= 2000) break;
      }

      const fruitItems = [
        { name: '蘋果', packUnit: '袋', unit: '顆' },
        { name: '橘子', packUnit: '箱', unit: '顆' },
        { name: '鉛筆', packUnit: '盒', unit: '枝' },
      ];
      const item = fruitItems[getRandomInt(0, fruitItems.length - 1)];

      const exprText = `水果店把 ${A} ${item.unit}${item.name}每 ${B} ${item.unit}裝成一${item.packUnit}，${name}賣出了 ${C} ${item.packUnit}，一共賣出了幾${item.unit}${item.name}？請列出一個算式記下來。`;
      const ans = (A / B) * C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} ${item.unit}`,
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    } else {
      // 類型 3：連續平分 (A ÷ B ÷ C)
      // 確保 A % B === 0 且 (A / B) % C === 0
      let A = 0, B = 0, C = 0;
      while (true) {
        B = getRandomInt(2, 6);            
        C = getRandomInt(2, 6);              
        const base = getRandomInt(5, 30);    
        A = B * C * base;                    
        if (A >= 100 && A <= 960) break;
      }

      const schoolItems = [
        { name: '故事書', unit: '本' },
        { name: '圖畫紙', unit: '張' },
        { name: '跳繩', unit: '條' },
      ];
      const item = schoolItems[getRandomInt(0, schoolItems.length - 1)];

      const exprText = `學校買了 ${A} ${item.unit}${item.name}，平分給 ${B} 個年級，每個年級有 ${C} 個班級，平均每個班級可以分到幾${item.unit}${item.name}？請列出一個算式記下來。`;
      const ans = A / B / C;

      problems.push({
        id: generateId(),
        expression: exprText,
        answer: `${ans} ${item.unit}`,
        operator: 'word',
        meta: { layout: 'horizontal' },
      });
    }
  }

  return problems;
};
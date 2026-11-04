import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';

/**
 * 六年級：代數方程啟蒙應用題 (13 種多樣化生活情境)
 * 單元 ID: G6-WORD-07
 */
export const generateGrade6WordAlgebra: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  // 定義 13 種豐富且合理的日常生活情境生成器
  const templates = [
    // 情境 1：零用錢加法 (x + a = b)
    () => {
      const x = getRandomInt(20, 80);
      const a = getRandomInt(15, 50);
      const b = x + a;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `小明原本有一些零用錢，過年收到了 ${a} 元紅包後，現在一共有 ${b} 元。假設小明原本有 ${varName} 元，請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} + ${a} = ${b}；${varName} = ${x}`,
      };
    },

    // 情境 2：花費減法 (x - a = b)
    () => {
      const b = getRandomInt(30, 90);
      const a = getRandomInt(15, 60);
      const x = a + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `小華儲蓄罐裡原本有 ${varName} 元，買了一本 ${a} 元的課外書後，還剩下 ${b} 元。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} - ${a} = ${b}；${varName} = ${x}`,
      };
    },

    // 情境 3：文具批量購買乘法 (a * x = b)
    () => {
      const x = getRandomInt(5, 25);
      const a = getRandomInt(4, 9);
      const b = a * x;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `文具店裡每支自動鉛筆賣 ${a} 元，老師買了 ${varName} 支作為獎品，一共付了 ${b} 元。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${a} × ${varName} = ${b}；${varName} = ${x}`,
      };
    },

    // 情境 4：點心均分除法 (x / a = b)
    () => {
      const b = getRandomInt(4, 12);
      const a = getRandomInt(3, 8);
      const x = a * b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `媽媽烤了一批手工餅乾一共 ${varName} 塊，平分給 ${a} 位小朋友，每位小朋友分到 ${b} 塊。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} ÷ ${a} = ${b}；${varName} = ${x}`,
      };
    },

    // 情境 5：兩步驟-買東西與額外消費 (a * x + b = c)
    () => {
      const x = getRandomInt(12, 35);
      const a = getRandomInt(2, 5);
      const b = getRandomInt(10, 40);
      const c = a * x + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `小英買了 ${a} 杯飲料，每杯 ${varName} 元，另外又買了一盒 ${b} 元的雞塊，一共花了 ${c} 元。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} × ${a} + ${b} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 6：兩步驟-看書進度與剩餘頁數 (total - a * x = b)
    () => {
      const x = getRandomInt(8, 20);
      const a = getRandomInt(3, 7);
      const b = getRandomInt(15, 50);
      const total = a * x + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `一本小說共有 ${total} 頁，小強每天看 ${varName} 頁，看了 ${a} 天後，還剩下 ${b} 頁沒看。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${total} - ${varName} × ${a} = ${b}；${varName} = ${x}`,
      };
    },

    // 情境 7：兩步驟-公車乘客上下車人數 (x - a + b = c)
    () => {
      const x = getRandomInt(18, 45);
      const a = getRandomInt(5, 12);
      const b = getRandomInt(6, 15);
      const c = x - a + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `公車上原本有 ${varName} 人，到站後有 ${a} 人下車，又有 ${b} 人上車，現在車上共有 ${c} 人。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} - ${a} + ${b} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 8：兩步驟-水果裝箱與總重 (a * x + b = c)
    () => {
      const x = getRandomInt(3, 8);
      const a = getRandomInt(4, 8);
      const b = getRandomInt(2, 5);
      const c = a * x + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `水果行包裝禮盒，每箱蘋果重 ${varName} 公斤，載運了 ${a} 箱，加上外包裝籃子共重 ${b} 公斤，總重為 ${c} 公斤。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} × ${a} + ${b} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 9：運動步數目標 (a * x + b = c)
    () => {
      const x = getRandomInt(400, 1200); // 每次健走步數
      const a = getRandomInt(3, 6);     // 健走次數
      const b = getRandomInt(1000, 3000); // 晨跑步數
      const c = a * x + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `爸爸早上跑步走了 ${b} 步，下午在操場散步了 ${a} 圈，每圈走了 ${varName} 步，整天共走了 ${c} 步。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} × ${a} + ${b} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 10：超商集點換贈品 (x - a * b = c)
    () => {
      const b = getRandomInt(3, 8);  // 每張集點卡需要的點數
      const a = getRandomInt(2, 5);  // 兌換的贈品份數
      const c = getRandomInt(5, 20); // 剩餘點數
      const x = a * b + c;           // 原有總點數
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `小美原本有 ${varName} 點超商點數，兌換了 ${a} 份贈品（每份贈品需要 ${b} 點）後，還剩下 ${c} 點。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} - ${b} × ${a} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 11：麵包店裝盒分裝 (a * x + b = c)
    () => {
      const x = getRandomInt(6, 12);  // 每盒蛋塔個數
      const a = getRandomInt(3, 8);   // 盒數
      const b = getRandomInt(1, 5);   // 零散個數
      const c = a * x + b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `麵包店師傅做了 ${c} 個葡式蛋塔，裝滿了 ${a} 盒（每盒有 ${varName} 個）後，還剩下 ${b} 個沒裝盒。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} × ${a} + ${b} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 12：停車場收費費率 (b + a * x = c)
    () => {
      const x = getRandomInt(20, 50); // 每小時停車費
      const a = getRandomInt(2, 6);   // 停放小時數
      const b = getRandomInt(10, 30); // 基本入場費
      const c = b + a * x;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `停車場收取基本費 ${b} 元，之後每小時收取 ${varName} 元。爸爸停了 ${a} 小時，結算時共付了 ${c} 元。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${b} + ${varName} × ${a} = ${c}；${varName} = ${x}`,
      };
    },

    // 情境 13：植物生長高度差 (x + a * b = c)
    () => {
      const x = getRandomInt(10, 35); // 初始高度 (公分)
      const a = getRandomInt(2, 5);   // 成長週數
      const b = getRandomInt(3, 8);   // 每週長高 (公分)
      const c = x + a * b;
      const varName = Math.random() > 0.5 ? 'x' : 'y';
      return {
        expr: `園藝課種植綠豆芽，初始高度為 ${varName} 公分，之後每週長高 ${b} 公分，連續觀察 ${a} 週後，高度達到 ${c} 公分。請依題意列出算式並求出 ${varName} 是多少？`,
        ans: `${varName} + ${b} × ${a} = ${c}；${varName} = ${x}`,
      };
    },
  ];

  for (let i = 0; i < count; i++) {
    const tIndex = (i + getRandomInt(0, templates.length - 1)) % templates.length;
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
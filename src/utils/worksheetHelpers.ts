import { Problem } from '@/lib/math-engine/types';

// 陣列分頁 Chunk 處理
export const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  if (!arr || arr.length === 0) return [];
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

// 年級標籤轉換器 (例: G1 -> 一年級)
export const getGradeLabel = (unitId: string): string => {
  const prefix = unitId.substring(0, 2);
  const gradeMap: Record<string, string> = {
    G1: '一年級',
    G2: '二年級',
    G3: '三年級',
    G4: '四年級',
    G5: '五年級',
    G6: '六年級',
  };
  return gradeMap[prefix] ? `${gradeMap[prefix]}` : `${prefix}`;
};

// 寬鬆且嚴謹的應用題多重判定條件
export const checkIsWordProblem = (unitId: string, problems?: Problem[]): boolean => {
  if (!unitId) return false;
  // 1. 檢查 ID 是否包含 WORD 或 NUM (數與位值)
  if (unitId.includes('WORD') || unitId.includes('NUM')) return true;
  // 2. 檢查題目的 operator 或 meta 屬性
  if (problems && problems.length > 0) {
    const first = problems[0];
    return first.operator === 'word' || first.meta?.isWordProblem === true || first.meta?.layout === 'word';
  }
  return false;
};
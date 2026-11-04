import { ProblemGenerator, Problem } from './types';

import {
  generateGrade1Add10Math,
  generateGrade1Add18Math,
  generateGrade1Sub10Math,
  generateGrade1Sub18Math,
  generateGrade1Number30,
  generateGrade1AddWordProblem,
  generateGrade1SubWordProblem,
  generateGrade1TwoDigitNoRegroup,
} from './grade1';

import {
  generateTwoDigitAddNoCarry,
  generateTwoDigitAddSingleCarry,
  generateGrade2Add2D1Carry,
  generateGrade2Add2D2Carry,
  generateGrade2Sub2DBorrow,
  generateGrade2Add3DNoCarry,
  generateGrade2Add3DCarry,
  generateGrade2Sub3DNoBorrow,
  generateGrade2Sub3DBorrow,
  generateGrade2Mix1DAddSubMul,
  generateGrade2WordAddSub2Step,
  generateGrade2WordMulMix,

} from './grade2';

import { 
  generateGrade3Add4DCarry,
  generateGrade3Mul2D1DCalc,
  generateGrade3Mul3D1DCalc,
  generateGrade3Div2D1DExact,
  generateGrade3Div2D1DRem,
  generateGrade3Div3D1DExact,
  generateGrade3Div3D1DRem,
  generateGrade3Word2StepMul,
  generateGrade3FraProperAddSub,
  generateGrade3FraImproperAddSub,
} from './grade3';

import {
  generateThreeByTwoDigitMult,
  generateFourByTwoDigit,
  generateFourByOneDigitMult,
  generateTwoByOneDigitMult,
  generateOneByTwoDigitMult,
  generateTwoByTwoDigitMult,
  generateFourByOneDigitDiv,
  generateTwoByTwoDigitDiv,
  generateThreeByTwoDigitDiv,
  generateGrade4AddSubMixedWord,
  generateGrade4MultDivMixedWord,
  generateGrade4FourOpsNoBracketCalc,
  generateGrade4FourOpsNoBracketWord,
  generateGrade4FourOpsBracketCalc,
  generateGrade4FourOpsBracketWord,
  generateGrade4DecimalAddCalc,
  generateGrade4DecimalSubCalc,
  generateGrade4Div4D1DCalc,
  generateGrade4Div3D2DCalc,
} from './grade4';

import {
  generateGrade5FraReduction,
  generateGrade5FraDiffAdd,
  generateGrade5FraDiffSub,
  generateGrade5FraDiffMix,
  generateGrade5FraIntMul,
  generateGrade5FraMulFra,
  generateGrade5DecIntMul,
  generateGrade5DecMulDec,
  generateGrade5DecIntDivInt,
  generateGrade5DecDivInt,
} from './grade5';

import { 
  generateSpeedWordProblem,
  generateGrade6WordPrimeFactor,
  generateGrade6WordGcd,
  generateGrade6WordLcm,
  generateGrade6FraDivFra,
  generateGrade6DecDivDec,
  generateGrade6WordAlgebra,
 } from './grade6';

export const MathRegistry: Record<string, { title: string; generator: ProblemGenerator }> = {
  // ── 一年級單元 (格式規範：G1-類別-編號) ──────────────────────────────────
  'G1-ADD-01': { title: '10以內的加法 (計算題)', generator: generateGrade1Add10Math },
  'G1-ADD-02': { title: '18以內的加法 (計算題)', generator: generateGrade1Add18Math },
  'G1-SUB-01': { title: '10以內的減法 (計算題)', generator: generateGrade1Sub10Math },
  'G1-SUB-02': { title: '18以內的減法 (計算題)', generator: generateGrade1Sub18Math },
  'G1-WORD-01': { title: '18以內的加法 (應用題)', generator: generateGrade1AddWordProblem },
  'G1-WORD-02': { title: '18以內的減法 (應用題)', generator: generateGrade1SubWordProblem },
  'G1-WORD-03': { title: '30以內的數與位值 (填空)', generator: generateGrade1Number30 },
  'G1-2D-01': { title: '兩位數加減法 (不進退位)', generator: generateGrade1TwoDigitNoRegroup },

  // ── 二年級單元 ────────────────────────────────────────────────────────
  'G2-ADD-01': { title: '二位數加二位數 (不進位) (計算題)', generator: generateTwoDigitAddNoCarry },
  'G2-ADD-03': { title: '二位數加二位數 (一次進位) (計算題)', generator: generateGrade2Add2D1Carry },
  'G2-ADD-04': { title: '二位數加二位數 (二次進位) (計算題)', generator: generateGrade2Add2D2Carry },
  'G2-ADD-02': { title: '二位數加二位數 (進位混合) (計算題)', generator: generateTwoDigitAddSingleCarry },
  'G2-ADD-05': { title: '三位數加三位數 (不進位) (計算題)', generator: generateGrade2Add3DNoCarry },
  'G2-ADD-06': { title: '三位數加三位數 (進位) (計算題)', generator: generateGrade2Add3DCarry },
  'G2-SUB-02': { title: '二位數減二位數 (退位) (計算題)', generator: generateGrade2Sub2DBorrow },
  'G2-SUB-03': { title: '三位數減三位數 (不退位) (計算題)', generator: generateGrade2Sub3DNoBorrow },
  'G2-SUB-04': { title: '三位數減三位數 (退位) (計算題)', generator: generateGrade2Sub3DBorrow },
  'G2-MIX-01': { title: '加減乘混合運算 (計算題)', generator: generateGrade2Mix1DAddSubMul },
  'G2-WORD-01': { title: '加減兩步驟 (應用題)', generator: generateGrade2WordAddSub2Step },
  'G2-WORD-02': { title: '乘法與加減乘混合 (應用題)', generator: generateGrade2WordMulMix },

  // ── 三年級單元 ────────────────────────────────────────────────────────
  'G3-ADD-01': { title: '四位數加法(進位)', generator: generateGrade3Add4DCarry },
  'G3-MUL-01': { title: '二位數乘一位數', generator: generateGrade3Mul2D1DCalc },
  'G3-MUL-02': { title: '三位數乘一位數', generator: generateGrade3Mul3D1DCalc },
  'G3-DIV-01': { title: '二位數除一位數(整除)', generator: generateGrade3Div2D1DExact },
  'G3-DIV-02': { title: '二位數除一位數(有餘數)', generator: generateGrade3Div2D1DRem },
  'G3-DIV-03': { title: '三位數除一位數(整除)', generator: generateGrade3Div3D1DExact },
  'G3-DIV-04': { title: '三位數除一位數(有餘數)', generator: generateGrade3Div3D1DRem },
  'G3-WORD-01': { title: '兩步驟連乘應用題', generator: generateGrade3Word2StepMul },
  'G3-FRA-01': { title: '分數加減(真分數)', generator: generateGrade3FraProperAddSub },
  'G3-FRA-02': { title: '分數加減(真/假分數)', generator: generateGrade3FraImproperAddSub },

  // ── 四年級單元 ────────────────────────────────────────────────────────
  'G4-MUL-06': { title: '四位數乘一位數 (計算題)', generator: generateFourByOneDigitMult },
  'G4-MUL-07': { title: '二位數乘一位數 (計算題)', generator: generateTwoByOneDigitMult },
  'G4-MUL-08': { title: '一位數乘二位數 (計算題)', generator: generateOneByTwoDigitMult },
  'G4-MUL-09': { title: '二位數乘二位數 (計算題)', generator: generateTwoByTwoDigitMult },
  'G4-MUL-01': { title: '三位數乘二位數 (計算題)', generator: generateThreeByTwoDigitMult },
  'G4-MUL-02': { title: '四位數乘二位數 (計算題)', generator: generateFourByTwoDigit },
  'G4-DIV-03': { title: '四位數除一位數 (計算題)', generator: generateFourByOneDigitDiv },
  'G4-DIV-04': { title: '二位數除二位數 (餘數) (計算題)', generator: generateTwoByTwoDigitDiv },
  'G4-DIV-05': { title: '三位數除二位數 (餘數) (計算題)', generator: generateThreeByTwoDigitDiv },
  'G4-DIV-18': { title: '四位數除一位數 (整除) (計算題)', generator: generateGrade4Div4D1DCalc },
  'G4-DIV-19': { title: '三位數除二位數 (整除) (計算題)', generator: generateGrade4Div3D2DCalc },
  'G4-WORD-10': { title: '順序加減四則 (應用題)', generator: generateGrade4AddSubMixedWord },
  'G4-WORD-11': { title: '順序乘除四則 (應用題)', generator: generateGrade4MultDivMixedWord },
  'G4-WORD-12': { title: '先乘除後加減 (應用題)', generator: generateGrade4FourOpsNoBracketWord },
  'G4-WORD-13': { title: '含括號四則 (應用題)', generator: generateGrade4FourOpsBracketWord },
  'G4-MIX-14':  { title: '先乘除後加減 (計算題)', generator: generateGrade4FourOpsNoBracketCalc },
  'G4-MIX-15':  { title: '含括號四則 (計算題)', generator: generateGrade4FourOpsBracketCalc },
  'G4-DEC-16': { title: '小數加法 (計算題)', generator: generateGrade4DecimalAddCalc },
  'G4-DEC-17': { title: '小數減法 (計算題)', generator: generateGrade4DecimalSubCalc },


  // ── 五年級單元 ────────────────────────────────────────────────────────
  'G5-FRA-01': { title: '擴分與約分練習 (計算題)', generator: generateGrade5FraReduction },
  'G5-FRA-02': { title: '異分母分數加法 (計算題)', generator: generateGrade5FraDiffAdd },
  'G5-FRA-03': { title: '異分母分數減法 (計算題)', generator: generateGrade5FraDiffSub },
  'G5-FRA-04': { title: '異分母分數加減混合 (計算題)', generator: generateGrade5FraDiffMix },
  'G5-FRA-05': { title: '整數乘以分數 (計算題)', generator: generateGrade5FraIntMul },
  'G5-FRA-06': { title: '分數乘以分數 (計算題)', generator: generateGrade5FraMulFra },
  'G5-DEC-01': { title: '整數乘以小數 (計算題)', generator: generateGrade5DecIntMul },
  'G5-DEC-02': { title: '小數乘以小數 (計算題)', generator: generateGrade5DecMulDec },
  'G5-DEC-03': { title: '整數除以整數 (商取至小數第三位) (計算題)', generator: generateGrade5DecIntDivInt },
  'G5-DEC-04': { title: '小數除以整數 (計算題)', generator: generateGrade5DecDivInt },

  // ── 六年級單元 ────────────────────────────────────────────────────────
  'G6-WORD-01': { title: '求速率 (應用題)', generator: (opt) => generateSpeedWordProblem(opt, 'speed') },
  'G6-WORD-02': { title: '求距離 (應用題)', generator: (opt) => generateSpeedWordProblem(opt, 'distance') },
  'G6-WORD-03': { title: '求時間 (應用題)', generator: (opt) => generateSpeedWordProblem(opt, 'time') },
  'G6-WORD-04': { title: '質因數分解 (計算題)', generator: generateGrade6WordPrimeFactor },
  'G6-WORD-05': { title: '最大公因數 (計算題)', generator: generateGrade6WordGcd },
  'G6-WORD-06': { title: '最小公倍數 (計算題)', generator: generateGrade6WordLcm },
  'G6-FRA-01': { title: '分數除以分數 (計算題)', generator: generateGrade6FraDivFra },
  'G6-DEC-01': { title: '小數除以小數 (計算題)', generator: generateGrade6DecDivDec },
  'G6-WORD-07': { title: '未知數方程 (應用題)', generator: generateGrade6WordAlgebra },
  
};

export function getAvailableUnits() {
  return Object.keys(MathRegistry).map((key) => ({
    id: key,
    title: MathRegistry[key].title,
  }));
}

/**
 * @param unitId 單元編號 (例如: 'G1-ADD-01')
 * @param count 出題數量
 */
export function generateWorksheet(unitId: string, count: number): Problem[] {
  const unit = MathRegistry[unitId];
  if (!unit) {
    throw new Error(`系統尚未支援此單元：${unitId}`);
  }

  // 防護檢查
  if (typeof unit.generator !== 'function') {
    throw new Error(
      `單元 [${unitId}] 的 generator 載入失敗！當前內容為：${String(unit.generator)}`
    );
  }

  return unit.generator({ count });
}

export function generateSingleProblem(unitId: string): Problem {
  const problems = generateWorksheet(unitId, 1);
  return problems[0];
}
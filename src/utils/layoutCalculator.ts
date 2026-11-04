export interface LayoutConfigParams {
  unitId: string;
  isWordProblem: boolean;
  spacingFactor: number;
  layoutPref: 'horizontal' | 'vertical';
}

export const getItemsPerPage = ({
  unitId,
  isWordProblem,
  spacingFactor,
  layoutPref,
}: LayoutConfigParams): number => {
  const isFraction = unitId.includes('FRAC');
  const isMultiplication = unitId.includes('MULT') || unitId.includes('MUL');
  const isDivision = unitId.includes('DIV');

  if (isWordProblem) {
    if (spacingFactor >= 250) return 2;
    if (spacingFactor >= 150) return 3;
    if (spacingFactor <= 60) return 5;
    return 4;
  }

  if (isFraction) {
    if (spacingFactor >= 310) return 10;
    if (spacingFactor >= 230) return 12;
    if (spacingFactor >= 170) return 14;
    if (spacingFactor >= 120) return 16;
    if (spacingFactor >= 80) return 18;
    return 20;
  }

  if (isDivision) {
    if (layoutPref === 'vertical') {
      if (spacingFactor >= 350) return 12;
      if (spacingFactor >= 250) return 16;
      if (spacingFactor >= 180) return 20;
      if (spacingFactor <= 60) return 32;
      if (spacingFactor <= 120) return 24;
      return 24;
    }
    if (spacingFactor >= 350) return 10;
    if (spacingFactor >= 250) return 14;
    if (spacingFactor >= 180) return 16;
    if (spacingFactor >= 150) return 20;
    if (spacingFactor <= 60) return 28;
    if (spacingFactor <= 120) return 22;
    return 22;
  }

  if (isMultiplication) {
    if (layoutPref === 'vertical') {
      if (spacingFactor >= 350) return 8;
      if (spacingFactor >= 250) return 12;
      if (spacingFactor >= 180) return 12;
      if (spacingFactor <= 120) return 16;
      return 16;
    }
    if (spacingFactor >= 350) return 6;
    if (spacingFactor >= 250) return 8;
    if (spacingFactor >= 200) return 10;
    if (spacingFactor >= 150) return 12;
    if (spacingFactor >= 120) return 14;
    if (spacingFactor >= 80) return 16;
    if (spacingFactor >= 70) return 18;
    return 22;
  }

  if (layoutPref === 'vertical') {
    if (spacingFactor >= 350) return 12;
    if (spacingFactor >= 250) return 16;
    if (spacingFactor >= 180) return 20;
    if (spacingFactor <= 80) return 24;
    return 20;
  }

  if (spacingFactor >= 350) return 10;
  if (spacingFactor >= 250) return 12;
  if (spacingFactor >= 180) return 16;
  if (spacingFactor <= 60) return 28;
  if (spacingFactor <= 90) return 24;
  return 20;
};
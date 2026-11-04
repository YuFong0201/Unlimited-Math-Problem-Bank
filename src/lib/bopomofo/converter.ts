export const IVS_CODES = {
  ALT_1: '\u{E0100}',
  ALT_2: '\u{E0101}',
};

export function parseManualBopomofo(text: string): string {
  if (!text) return text;

  return text.replace(/([\u4e00-\u9fa5])\[(\d+)\]/g, (_, char, codeIndex) => {
    const index = parseInt(codeIndex, 10);
    if (index === 1) return char + IVS_CODES.ALT_1;
    if (index === 2) return char + IVS_CODES.ALT_2;
    return char;
  });
}
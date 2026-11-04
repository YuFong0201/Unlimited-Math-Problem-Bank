// 🎯 src/lib/bopomofo/dictionary.ts

export interface BopomofoOption {
  label: string;
  classSuffix: string;
}

export interface BopomofoEntry {
  defaultClassSuffix: string; 
  options: BopomofoOption[];
}


export const BOPOMOFO_OPTIONS_MAP: Record<string, BopomofoEntry> = {
  數: {
    defaultClassSuffix: '', 
    options: [
      { label: 'ㄕㄨˇ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄕㄨˋ ', classSuffix: '' },
    ],
  },
  個: {
    defaultClassSuffix: 'font-bopomofo-alt1', 
    options: [
      { label: 'ㄍㄜ˙ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄍㄜˋ ', classSuffix: 'font-bopomofo-alt3' },
    ],
  },
  長: {
    defaultClassSuffix: '', 
    options: [
      { label: 'ㄓㄤˇ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄔㄤˊ ', classSuffix: '' },
    ],
  },
  倒: {
    defaultClassSuffix: 'font-bopomofo-alt1', 
    options: [
      { label: 'ㄉㄠˋ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄉㄠˇ ', classSuffix: '' },
    ],
  },
  行: {
    defaultClassSuffix: 'font-bopomofo-alt1', 
    options: [
      { label: 'ㄏㄤˊ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄒㄧㄥˊ ', classSuffix: '' },
    ],
  },
  量: {
    defaultClassSuffix: 'font-bopomofo-alt1', 
    options: [
      { label: 'ㄌㄧㄤˋ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄌㄧㄤˊ ', classSuffix: 'font-bopomofo-alt2' },
    ],
  },
  一: {
    defaultClassSuffix: '', 
    options: [
      { label: 'ㄧ ', classSuffix: '' },
      { label: 'ㄧˊ ', classSuffix: 'font-bopomofo-alt1' },
      { label: 'ㄧˋ ', classSuffix: 'font-bopomofo-alt2' },
    ],
  },
};
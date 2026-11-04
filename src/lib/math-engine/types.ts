export interface Problem {
  id: string;
  expression: string;
  answer: string;
  operator: string;
  meta?: any;
}

export interface GeneratorOptions {
  count: number;
}

export type ProblemGenerator = (options: GeneratorOptions) => Problem[];
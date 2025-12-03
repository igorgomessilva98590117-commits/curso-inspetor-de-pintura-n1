export enum Tab {
  HOME = 'HOME',
  THEORY = 'THEORY',
  PRACTICAL = 'PRACTICAL',
  LAB = 'LAB',
  CASES = 'CASES',
  DOCS = 'DOCS',
  MENTOR = 'MENTOR'
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface PaintSystem {
  code: string;
  name: string;
  description: string;
  application: string;
}

export interface NormSummary {
  code: string;
  title: string;
  points: string[];
}
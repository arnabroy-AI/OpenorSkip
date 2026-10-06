export interface Persona {
  id: string;
  name: string;
  role: string;
  mrr: string;
  avatar: string;
  timeSensitivity: 'extreme' | 'high' | 'medium';
  primaryInterest: string;
  skepticism: 'high' | 'moderate' | 'low';
  decisions?: Array<{
    titleIndex: number;
    action: 'open' | 'skip' | 'confused';
    reason: string;
    keyWord: string;
  }>;
}

export interface TriggerWord {
  word: string;
  impact: string;
  count?: number;
  personaQuote?: string;
}

export interface TitleResult {
  titleIndex: number;
  titleText: string;
  opens: number;
  skips: number;
  confused: number;
  openRate: number;
  verdict: string;
  oneLineSummary: string;
  triggerWordsPositive: TriggerWord[];
  triggerWordsNegative: TriggerWord[];
}

export interface SimulationResponse {
  success: boolean;
  engine: string;
  latencyMs: number;
  sampleSize: number;
  titles: string[];
  titleResults: TitleResult[];
  winnerIndex: number;
  expectedLiftPercent: number;
  recommendationSummary: string;
  personas: Persona[];
}

export interface HistoricalIssue {
  id: string;
  issueNumber: number;
  date: string;
  titleSent: string;
  realOpenRate: number;
  simulatedScore: number;
  simulatedRank: number;
  realRank: number;
  inTop2: boolean;
}

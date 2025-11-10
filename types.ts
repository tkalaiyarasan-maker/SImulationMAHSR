export interface Option {
  label: string;
  impact: string;
  delay: number;
  cost: number;
}

export interface Challenge {
  month: number;
  title: string;
  description: string;
  options: Option[];
}

export interface HistoryEntry {
  round: number;
  label: string;
  delay: number;
  cost: number;
}

export interface GameState {
  currentMonth: number;
  totalDelayDays: number;
  costOverrun: number;
  currentChallengeIndex: number;
  isDecisionPending: boolean;
  isIntermission: boolean;
  isGameOver: boolean;
  history: HistoryEntry[];
}

export interface User {
  name: string;
  id: string;
  role: 'guest' | 'admin';
}

export interface SimulationResult {
  userName: string;
  userId: string;
  totalDelayDays: number;
  costOverrun: number;
  date: string; // ISO string format
  outcome: string;
}

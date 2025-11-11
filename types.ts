export interface User {
  name: string;
  id: string;
  role: 'guest' | 'admin';
}

export interface Option {
  label: string;
  impact: string;
  delay: number; // in days
  cost: number;  // in Cr
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

export interface SimulationResult {
  userName: string;
  userId: string;
  date: string;
  totalDelayDays: number;
  costOverrun: number;
  outcome: string;
}

export interface Email {
  id: number;
  from: string;
  subject: string;
  body: string;
  priority: number; // Lower number = higher priority
}

export interface EmailEvent {
  round: number; // Appears AFTER this round
  emails: Email[];
}

export interface AuthKey {
  key: string;
  createdAt: number;
  expiresAt: number;
}

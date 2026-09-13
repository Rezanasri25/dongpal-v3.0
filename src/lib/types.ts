import type { CurrencyCode } from "./money";

export type Person = {
  id: string;
  name: string;
  avatar: string;
  color: string;
};

export type LineItem = {
  id: string;
  name: string;
  amount: number;
  assignedTo: string[];
};

export type SplitMode = "equal" | "percent" | "items";

export type ShareRow = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  amount: number;
  percent: number;
};

export type HistoryEntry = {
  id: string;
  title: string;
  createdAt: number;
  currency: CurrencyCode;
  base: number;
  tipPercent: number;
  taxPercent: number;
  taxAmount: number;
  tipAmount: number;
  grand: number;
  people: Person[];
  shares: ShareRow[];
  mode: SplitMode;
  items: LineItem[];
  paidBy: string | null;
  note?: string;
};

export type SharePayload = {
  v: 1;
  t: string;
  c: CurrencyCode;
  g: number;
  d: number;
  p: { n: string; a: string; s: number; c: string }[];
  pay?: string | null;
};

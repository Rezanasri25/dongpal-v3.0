export type CurrencyCode = "IRR" | "IRT" | "USD" | "EUR" | "AED" | "TRY" | "GBP";

export type Currency = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Multiply by this to get IRR. */
  toIRR: number;
  decimals: number;
  /** Suggested cash-friendly rounding unit in this currency. */
  cashRound: number;
};

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  IRR: { code: "IRR", label: "ریال", symbol: "ریال", toIRR: 1, decimals: 0, cashRound: 1000 },
  IRT: { code: "IRT", label: "تومان", symbol: "تومان", toIRR: 10, decimals: 0, cashRound: 100 },
  USD: { code: "USD", label: "دلار", symbol: "$", toIRR: 1_374_600, decimals: 2, cashRound: 0.01 },
  EUR: { code: "EUR", label: "یورو", symbol: "€", toIRR: 1_594_500, decimals: 2, cashRound: 0.01 },
  AED: { code: "AED", label: "درهم", symbol: "د.إ", toIRR: 374_300, decimals: 2, cashRound: 0.01 },
  TRY: { code: "TRY", label: "لیر", symbol: "₺", toIRR: 33_400, decimals: 2, cashRound: 0.01 },
  GBP: { code: "GBP", label: "پوند", symbol: "£", toIRR: 1_856_000, decimals: 2, cashRound: 0.01 },
};

export const CURRENCY_LIST: Currency[] = [
  CURRENCIES.IRR,
  CURRENCIES.IRT,
  CURRENCIES.USD,
  CURRENCIES.EUR,
  CURRENCIES.AED,
  CURRENCIES.TRY,
  CURRENCIES.GBP,
];

const FA = "۰۱۲۳۴۵۶۷۸۹";

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => FA[Number(d)] ?? d);
}

export function toWesternDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(FA.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - "٠".charCodeAt(0)));
}

export function parseAmountInput(raw: string): number {
  const cleaned = toWesternDigits(raw)
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");
  if (!cleaned) return 0;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function formatGrouped(n: number, decimals = 0): string {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  const fixed = abs.toFixed(decimals);
  const [intPart, frac] = fixed.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const body = decimals > 0 && frac ? `${grouped}.${frac}` : grouped;
  return toPersianDigits(sign + body);
}

export function formatAmount(n: number, code: CurrencyCode): string {
  const c = CURRENCIES[code];
  return formatGrouped(n, c.decimals);
}

export function formatAmountWithUnit(n: number, code: CurrencyCode): string {
  const c = CURRENCIES[code];
  const num = formatAmount(n, code);
  if (code === "USD" || code === "EUR" || code === "GBP" || code === "TRY") {
    return `${c.symbol}${num}`;
  }
  return `${num} ${c.symbol}`;
}

export function convertAmount(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return amount;
  const irr = amount * CURRENCIES[from].toIRR;
  const out = irr / CURRENCIES[to].toIRR;
  const d = CURRENCIES[to].decimals;
  const f = 10 ** d;
  return Math.round(out * f) / f;
}

export function faDate(ts: number): string {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

export function faDateLong(ts: number): string {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ts));
}

import type { LineItem, Person, ShareRow, SplitMode } from "./types";
import { CURRENCIES, type CurrencyCode } from "./money";

export function computeTotals(
  base: number,
  tipPercent: number,
  taxPercent: number,
  taxIncluded: boolean,
  tipOnTax: boolean,
) {
  const tipP = Math.max(0, tipPercent) / 100;
  const taxP = Math.max(0, taxPercent) / 100;
  let net = base;
  let taxAmount = 0;
  if (taxIncluded && taxP > 0) {
    net = base / (1 + taxP);
    taxAmount = base - net;
  } else {
    taxAmount = net * taxP;
  }
  const tipBase = tipOnTax ? net + taxAmount : net;
  const tipAmount = tipBase * tipP;
  const grand = taxIncluded ? base + tipAmount : net + taxAmount + tipAmount;
  return { net, taxAmount, tipAmount, grand };
}

/** Largest-remainder so rounded shares always sum to the grand total. */
export function allocate(grand: number, weights: number[], decimals: number): number[] {
  const n = weights.length;
  if (n === 0) return [];
  const factor = 10 ** decimals;
  const totalW = weights.reduce((a, b) => a + b, 0);
  if (totalW <= 0) {
    const even = Math.floor((grand * factor) / n) / factor;
    const out = Array.from({ length: n }, () => even);
    const drift = roundTo(grand - even * n, decimals);
    out[0] = roundTo(out[0] + drift, decimals);
    return out;
  }
  const exact = weights.map((w) => (grand * w) / totalW);
  const floors = exact.map((x) => Math.floor(x * factor) / factor);
  let remain = Math.round((grand - floors.reduce((a, b) => a + b, 0)) * factor);
  const order = exact
    .map((x, i) => ({ i, frac: x * factor - Math.floor(x * factor) }))
    .sort((a, b) => b.frac - a.frac);
  const out = floors.slice();
  const step = 1 / factor;
  for (let k = 0; k < order.length && remain > 0; k++) {
    out[order[k].i] = roundTo(out[order[k].i] + step, decimals);
    remain -= 1;
  }
  return out;
}

export function roundTo(n: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

export function cashRound(n: number, unit: number): number {
  if (!unit || unit <= 0) return n;
  return Math.round(n / unit) * unit;
}

export function redistributePercents(
  percents: Record<string, number>,
  id: string,
  next: number,
  ids: string[],
): Record<string, number> {
  const clamped = Math.max(0, Math.min(100, Math.round(next)));
  const others = ids.filter((x) => x !== id);
  const rest = 100 - clamped;
  const currentOthers = others.map((oid) => percents[oid] ?? 0);
  const sumOthers = currentOthers.reduce((a, b) => a + b, 0);
  const out: Record<string, number> = { ...percents, [id]: clamped };
  if (others.length === 0) {
    out[id] = 100;
    return out;
  }
  if (sumOthers <= 0) {
    const even = Math.floor(rest / others.length);
    const leftover = rest - even * others.length;
    others.forEach((oid, i) => {
      out[oid] = even + (i < leftover ? 1 : 0);
    });
    return out;
  }
  const raw = others.map((oid) => ((percents[oid] ?? 0) / sumOthers) * rest);
  const floors = raw.map((x) => Math.floor(x));
  let remain = rest - floors.reduce((a, b) => a + b, 0);
  const order = raw
    .map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac);
  const adj = floors.slice();
  for (let k = 0; k < order.length && remain > 0; k++) {
    adj[order[k].i] += 1;
    remain -= 1;
  }
  others.forEach((oid, i) => {
    out[oid] = adj[i];
  });
  return out;
}

export function equalPercents(ids: string[]): Record<string, number> {
  const n = ids.length || 1;
  const even = Math.floor(100 / n);
  const leftover = 100 - even * n;
  const out: Record<string, number> = {};
  ids.forEach((id, i) => {
    out[id] = even + (i < leftover ? 1 : 0);
  });
  return out;
}

export function buildShares(opts: {
  people: Person[];
  grand: number;
  currency: CurrencyCode;
  mode: SplitMode;
  percents: Record<string, number>;
  items: LineItem[];
  cashRoundUnit: number | 0;
}): ShareRow[] {
  const { people, grand, currency, mode, percents, items, cashRoundUnit } = opts;
  const decimals = CURRENCIES[currency].decimals;
  if (people.length === 0) return [];

  let amounts: number[] = [];
  let weights: number[] = [];

  if (mode === "items" && items.length > 0) {
    const byId: Record<string, number> = Object.fromEntries(people.map((p) => [p.id, 0]));
    let assigned = 0;
    for (const item of items) {
      const who = item.assignedTo.filter((id) => byId[id] !== undefined);
      if (who.length === 0) continue;
      const slice = item.amount / who.length;
      who.forEach((id) => {
        byId[id] += slice;
      });
      assigned += item.amount;
    }
    const leftover = grand - assigned;
    if (leftover > 0.0001) {
      const even = leftover / people.length;
      people.forEach((p) => {
        byId[p.id] += even;
      });
    }
    amounts = people.map((p) => byId[p.id] ?? 0);
    const sum = amounts.reduce((a, b) => a + b, 0) || 1;
    // Re-allocate to grand so rounding is clean
    weights = amounts.map((a) => a / sum);
    amounts = allocate(grand, weights, decimals);
  } else {
    weights = people.map((p) => percents[p.id] ?? 0);
    const sumW = weights.reduce((a, b) => a + b, 0);
    if (sumW <= 0) weights = people.map(() => 1);
    amounts = allocate(grand, weights, decimals);
  }

  if (cashRoundUnit && cashRoundUnit > 0 && currency !== "USD" && currency !== "EUR" && currency !== "GBP") {
    const rounded = amounts.map((a) => cashRound(a, cashRoundUnit));
    const drift = roundTo(grand - rounded.reduce((a, b) => a + b, 0), decimals);
    if (rounded.length) rounded[0] = roundTo(rounded[0] + drift, decimals);
    amounts = rounded;
  }

  const safeGrand = grand || 1;
  return people.map((p, i) => ({
    id: p.id,
    name: p.name,
    avatar: p.avatar,
    color: p.color,
    amount: amounts[i] ?? 0,
    percent: Math.round(((amounts[i] ?? 0) / safeGrand) * 1000) / 10,
  }));
}

export function settle(shares: ShareRow[], paidBy: string | null) {
  if (!paidBy) return [];
  const payer = shares.find((s) => s.id === paidBy);
  if (!payer) return [];
  return shares
    .filter((s) => s.id !== paidBy && s.amount > 0)
    .map((s) => ({ from: s, to: payer, amount: s.amount }));
}

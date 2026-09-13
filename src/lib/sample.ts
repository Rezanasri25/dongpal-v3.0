import type { LineItem } from "./types";

export const SAMPLE_RECEIPT = {
  merchant: "رستوران خوب",
  date: "۱۴۰۵/۰۶/۲۱",
  currency: "IRR" as const,
  items: [
    { name: "غذای اصلی", amount: 1_200_000 },
    { name: "سالاد", amount: 250_000 },
    { name: "نوشیدنی", amount: 250_000 },
    { name: "دسر", amount: 300_000 },
  ],
  subtotal: 2_000_000,
  tax: 189_000,
  tip: 0,
  total: 2_289_000,
};

export function sampleItems(): LineItem[] {
  return SAMPLE_RECEIPT.items.map((it, i) => ({
    id: `sample-${i}`,
    name: it.name,
    amount: it.amount,
    assignedTo: [],
  }));
}

export const TEMPLATES = [
  { id: "resto", label: "رستوران", tax: 10, tip: 10, title: "شام رستوران" },
  { id: "cafe", label: "کافه", tax: 10, tip: 10, title: "کافه" },
  { id: "taxi", label: "تاکسی", tax: 0, tip: 0, title: "تاکسی" },
  { id: "trip", label: "سفر", tax: 0, tip: 0, title: "هزینه سفر" },
  { id: "party", label: "مهمونی", tax: 0, tip: 10, title: "مهمونی" },
  { id: "shop", label: "خرید", tax: 10, tip: 0, title: "خرید گروهی" },
] as const;

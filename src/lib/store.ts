import { useMemo } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { uid } from "./ids";
import type { CurrencyCode } from "./money";
import { convertAmount, CURRENCIES } from "./money";
import { buildShares, computeTotals, equalPercents, redistributePercents } from "./split";
import type { HistoryEntry, LineItem, Person, SplitMode } from "./types";

export const AVATARS = [
  { id: "ali", src: "/avatars/ali.jpg", color: "#0A9B82" },
  { id: "sara", src: "/avatars/sara.jpg", color: "#7B6CF6" },
  { id: "mehdi", src: "/avatars/mehdi.jpg", color: "#14B8A6" },
  { id: "nazanin", src: "/avatars/nazanin.jpg", color: "#6D28D9" },
  { id: "mina", src: "/avatars/mina.jpg", color: "#C084FC" },
  { id: "reza", src: "/avatars/reza.jpg", color: "#F59E0B" },
  { id: "niloofar", src: "/avatars/niloofar.jpg", color: "#FB7185" },
] as const;

const DEFAULT_FRIENDS: Person[] = [
  { id: "ali", name: "علی", avatar: "/avatars/ali.jpg", color: "#0A9B82" },
  { id: "sara", name: "سارا", avatar: "/avatars/sara.jpg", color: "#7B6CF6" },
  { id: "mehdi", name: "مهدی", avatar: "/avatars/mehdi.jpg", color: "#14B8A6" },
  { id: "nazanin", name: "نازنین", avatar: "/avatars/nazanin.jpg", color: "#6D28D9" },
  { id: "reza", name: "رضا", avatar: "/avatars/reza.jpg", color: "#F59E0B" },
  { id: "niloofar", name: "نیلوفر", avatar: "/avatars/niloofar.jpg", color: "#FB7185" },
];

const DEFAULT_SELECTED = ["ali", "sara", "mehdi", "nazanin"];

type DangState = {
  onboarded: boolean;
  profile: Person;
  friends: Person[];
  title: string;
  base: number;
  currency: CurrencyCode;
  tipPercent: number;
  taxPercent: number;
  taxIncluded: boolean;
  tipOnTax: boolean;
  cashRound: boolean;
  haptics: boolean;
  selectedIds: string[];
  percents: Record<string, number>;
  mode: SplitMode;
  items: LineItem[];
  paidBy: string | null;
  lastResult: HistoryEntry | null;
  history: HistoryEntry[];
  remindPersonId: string | null;

  selectedPeople: () => Person[];
  setOnboarded: () => void;
  setProfile: (p: Partial<Person>) => void;
  setTitle: (t: string) => void;
  setBase: (n: number) => void;
  setCurrency: (c: CurrencyCode) => void;
  setTip: (n: number) => void;
  setTax: (n: number) => void;
  setTaxIncluded: (v: boolean) => void;
  setTipOnTax: (v: boolean) => void;
  setCashRound: (v: boolean) => void;
  setHaptics: (v: boolean) => void;
  setPeopleCount: (n: number) => void;
  toggleSelected: (id: string) => void;
  setPercent: (id: string, v: number) => void;
  equalize: () => void;
  setMode: (m: SplitMode) => void;
  setPaidBy: (id: string | null) => void;
  addFriend: (p: Omit<Person, "id"> & { id?: string }) => string;
  updateFriend: (id: string, p: Partial<Person>) => void;
  removeFriend: (id: string) => void;
  addItem: (item?: Partial<LineItem>) => void;
  updateItem: (id: string, p: Partial<LineItem>) => void;
  removeItem: (id: string) => void;
  applyReceipt: (opts: {
    merchant: string;
    total: number;
    tax?: number | null;
    items: { name: string; amount: number }[];
    currency?: CurrencyCode;
  }) => void;
  applyTemplate: (title: string, tax: number, tip: number) => void;
  commitSplit: () => HistoryEntry | null;
  loadHistory: (id: string) => void;
  deleteHistory: (id: string) => void;
  resetDraft: () => void;
  setRemindPerson: (id: string | null) => void;
  clearAll: () => void;
};

function peopleFrom(friends: Person[], ids: string[]): Person[] {
  return ids.map((id) => friends.find((f) => f.id === id)).filter(Boolean) as Person[];
}

export const useDangStore = create<DangState>()(
  persist(
    (set, get) => ({
      onboarded: false,
      profile: {
        id: "me",
        name: "من",
        avatar: "/avatars/mina.jpg",
        color: "#C084FC",
      },
      friends: DEFAULT_FRIENDS,
      title: "شام رستوران",
      base: 2_450_000,
      currency: "IRR",
      tipPercent: 10,
      taxPercent: 9,
      taxIncluded: false,
      tipOnTax: false,
      cashRound: false,
      haptics: true,
      selectedIds: DEFAULT_SELECTED,
      percents: equalPercents(DEFAULT_SELECTED),
      mode: "equal",
      items: [],
      paidBy: null,
      lastResult: null,
      history: [],
      remindPersonId: null,

      selectedPeople: () => peopleFrom(get().friends, get().selectedIds),

      setOnboarded: () => set({ onboarded: true }),
      setProfile: (p) =>
        set((s) => ({
          profile: { ...s.profile, ...p },
          friends: s.friends.map((f) => (f.id === "me" ? { ...f, ...p } : f)),
        })),
      setTitle: (title) => set({ title }),
      setBase: (base) => set({ base: Math.max(0, base) }),
      setCurrency: (currency) => {
        const prev = get().currency;
        if (prev === currency) {
          set({ currency });
          return;
        }
        const base = convertAmount(get().base, prev, currency);
        const items = get().items.map((it) => ({
          ...it,
          amount: convertAmount(it.amount, prev, currency),
        }));
        set({ currency, base, items });
      },
      setTip: (tipPercent) => set({ tipPercent: Math.max(0, Math.min(40, tipPercent)) }),
      setTax: (taxPercent) => set({ taxPercent: Math.max(0, Math.min(30, taxPercent)) }),
      setTaxIncluded: (taxIncluded) => set({ taxIncluded }),
      setTipOnTax: (tipOnTax) => set({ tipOnTax }),
      setCashRound: (cashRound) => set({ cashRound }),
      setHaptics: (haptics) => set({ haptics }),
      setPeopleCount: (n) => {
        const count = Math.max(2, Math.min(20, Math.round(n)));
        const s = get();
        let ids = s.selectedIds.slice();
        const friends = s.friends.slice();
        if (count > ids.length) {
          const unused = friends.filter((f) => !ids.includes(f.id));
          while (ids.length < count) {
            if (unused.length) {
              ids.push(unused.shift()!.id);
            } else {
              const idx = ids.length + 1;
              const av = AVATARS[idx % AVATARS.length];
              const person: Person = {
                id: uid("p-"),
                name: `نفر ${idx}`,
                avatar: av.src,
                color: av.color,
              };
              friends.push(person);
              ids.push(person.id);
            }
          }
        } else {
          ids = ids.slice(0, count);
        }
        set({
          friends,
          selectedIds: ids,
          percents: equalPercents(ids),
          mode: "equal",
        });
      },
      toggleSelected: (id) => {
        const s = get();
        const has = s.selectedIds.includes(id);
        const ids = has ? s.selectedIds.filter((x) => x !== id) : [...s.selectedIds, id];
        if (ids.length < 2) return;
        set({ selectedIds: ids, percents: equalPercents(ids) });
      },
      setPercent: (id, v) => {
        const ids = get().selectedIds;
        set({ percents: redistributePercents(get().percents, id, v, ids), mode: "percent" });
      },
      equalize: () => set({ percents: equalPercents(get().selectedIds), mode: "equal" }),
      setMode: (mode) => set({ mode }),
      setPaidBy: (paidBy) =>
        set((s) => {
          const last = s.lastResult ? { ...s.lastResult, paidBy } : s.lastResult;
          return {
            paidBy,
            lastResult: last,
            history: last ? s.history.map((h) => (h.id === last.id ? last : h)) : s.history,
          };
        }),
      addFriend: (p) => {
        const id = p.id ?? uid("f-");
        const person: Person = {
          id,
          name: p.name,
          avatar: p.avatar,
          color: p.color,
        };
        set((s) => ({ friends: [...s.friends, person] }));
        return id;
      },
      updateFriend: (id, p) =>
        set((s) => ({
          friends: s.friends.map((f) => (f.id === id ? { ...f, ...p } : f)),
        })),
      removeFriend: (id) =>
        set((s) => {
          const friends = s.friends.filter((f) => f.id !== id);
          const selectedIds = s.selectedIds.filter((x) => x !== id);
          return {
            friends,
            selectedIds: selectedIds.length >= 2 ? selectedIds : s.selectedIds,
            percents: equalPercents(selectedIds.length >= 2 ? selectedIds : s.selectedIds),
          };
        }),
      addItem: (item) =>
        set((s) => ({
          mode: "items",
          items: [
            ...s.items,
            {
              id: uid("i-"),
              name: item?.name ?? "آیتم جدید",
              amount: item?.amount ?? 0,
              assignedTo: item?.assignedTo ?? s.selectedIds.slice(),
            },
          ],
        })),
      updateItem: (id, p) =>
        set((s) => ({
          items: s.items.map((it) => (it.id === id ? { ...it, ...p } : it)),
        })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
      applyReceipt: ({ merchant, total, tax, items, currency }) => {
        const s = get();
        const code = currency ?? s.currency;
        const lineItems: LineItem[] = items.map((it) => ({
          id: uid("i-"),
          name: it.name,
          amount: it.amount,
          assignedTo: s.selectedIds.slice(),
        }));
        let taxPercent = s.taxPercent;
        if (tax && total) {
          const sub = total - tax;
          if (sub > 0) taxPercent = Math.round((tax / sub) * 1000) / 10;
        }
        set({
          title: merchant || s.title,
          base: total,
          currency: code,
          taxPercent,
          taxIncluded: Boolean(tax && tax > 0),
          items: lineItems,
          mode: lineItems.length ? "items" : s.mode,
        });
      },
      applyTemplate: (title, tax, tip) => set({ title, taxPercent: tax, tipPercent: tip }),
      commitSplit: () => {
        const s = get();
        const people = peopleFrom(s.friends, s.selectedIds);
        if (!people.length || s.base <= 0) return null;
        const { taxAmount, tipAmount, grand } = computeTotals(
          s.base,
          s.tipPercent,
          s.taxPercent,
          s.taxIncluded,
          s.tipOnTax,
        );
        const cashUnit = s.cashRound ? CURRENCIES[s.currency].cashRound : 0;
        const shares = buildShares({
          people,
          grand,
          currency: s.currency,
          mode: s.mode,
          percents: s.mode === "equal" ? equalPercents(s.selectedIds) : s.percents,
          items: s.items,
          cashRoundUnit: cashUnit,
        });
        const entry: HistoryEntry = {
          id: uid("h-"),
          title: s.title || "تقسیم هزینه",
          createdAt: Date.now(),
          currency: s.currency,
          base: s.base,
          tipPercent: s.tipPercent,
          taxPercent: s.taxPercent,
          taxAmount,
          tipAmount,
          grand,
          people,
          shares,
          mode: s.mode,
          items: s.items,
          paidBy: s.paidBy,
        };
        set({
          lastResult: entry,
          history: [entry, ...s.history].slice(0, 80),
        });
        return entry;
      },
      loadHistory: (id) => {
        const entry = get().history.find((h) => h.id === id);
        if (!entry) return;
        set({
          lastResult: entry,
          title: entry.title,
          base: entry.base,
          currency: entry.currency,
          tipPercent: entry.tipPercent,
          taxPercent: entry.taxPercent,
          selectedIds: entry.people.map((p) => p.id),
          percents: Object.fromEntries(entry.shares.map((s) => [s.id, Math.round(s.percent)])),
          mode: entry.mode,
          items: entry.items,
          paidBy: entry.paidBy,
        });
      },
      deleteHistory: (id) =>
        set((s) => ({
          history: s.history.filter((h) => h.id !== id),
          lastResult: s.lastResult?.id === id ? null : s.lastResult,
        })),
      resetDraft: () =>
        set({
          title: "شام رستوران",
          base: 0,
          tipPercent: 10,
          taxPercent: 9,
          items: [],
          mode: "equal",
          percents: equalPercents(get().selectedIds),
          paidBy: null,
        }),
      setRemindPerson: (remindPersonId) => set({ remindPersonId }),
      clearAll: () =>
        set({
          history: [],
          lastResult: null,
        }),
    }),
    {
      name: "dangpal-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        onboarded: s.onboarded,
        profile: s.profile,
        friends: s.friends,
        title: s.title,
        base: s.base,
        currency: s.currency,
        tipPercent: s.tipPercent,
        taxPercent: s.taxPercent,
        taxIncluded: s.taxIncluded,
        tipOnTax: s.tipOnTax,
        cashRound: s.cashRound,
        haptics: s.haptics,
        selectedIds: s.selectedIds,
        percents: s.percents,
        mode: s.mode,
        items: s.items,
        paidBy: s.paidBy,
        lastResult: s.lastResult,
        history: s.history,
      }),
    },
  ),
);

export function useSelectedPeople(): Person[] {
  const friends = useDangStore((s) => s.friends);
  const selectedIds = useDangStore((s) => s.selectedIds);
  return useMemo(
    () => selectedIds.map((id) => friends.find((f) => f.id === id)).filter(Boolean) as Person[],
    [friends, selectedIds],
  );
}

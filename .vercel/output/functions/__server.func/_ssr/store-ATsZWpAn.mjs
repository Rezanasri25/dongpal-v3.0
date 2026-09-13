import { c as convertAmount, n as CURRENCIES } from "./money-BI8SPXPF.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-ATsZWpAn.js
function uid(prefix = "") {
	return `${prefix}${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}
function computeTotals(base, tipPercent, taxPercent, taxIncluded, tipOnTax) {
	const tipP = Math.max(0, tipPercent) / 100;
	const taxP = Math.max(0, taxPercent) / 100;
	let net = base;
	let taxAmount = 0;
	if (taxIncluded && taxP > 0) {
		net = base / (1 + taxP);
		taxAmount = base - net;
	} else taxAmount = net * taxP;
	const tipAmount = (tipOnTax ? net + taxAmount : net) * tipP;
	const grand = taxIncluded ? base + tipAmount : net + taxAmount + tipAmount;
	return {
		net,
		taxAmount,
		tipAmount,
		grand
	};
}
/** Largest-remainder so rounded shares always sum to the grand total. */
function allocate(grand, weights, decimals) {
	const n = weights.length;
	if (n === 0) return [];
	const factor = 10 ** decimals;
	const totalW = weights.reduce((a, b) => a + b, 0);
	if (totalW <= 0) {
		const even = Math.floor(grand * factor / n) / factor;
		const out = Array.from({ length: n }, () => even);
		const drift = roundTo(grand - even * n, decimals);
		out[0] = roundTo(out[0] + drift, decimals);
		return out;
	}
	const exact = weights.map((w) => grand * w / totalW);
	const floors = exact.map((x) => Math.floor(x * factor) / factor);
	let remain = Math.round((grand - floors.reduce((a, b) => a + b, 0)) * factor);
	const order = exact.map((x, i) => ({
		i,
		frac: x * factor - Math.floor(x * factor)
	})).sort((a, b) => b.frac - a.frac);
	const out = floors.slice();
	const step = 1 / factor;
	for (let k = 0; k < order.length && remain > 0; k++) {
		out[order[k].i] = roundTo(out[order[k].i] + step, decimals);
		remain -= 1;
	}
	return out;
}
function roundTo(n, decimals) {
	const f = 10 ** decimals;
	return Math.round(n * f) / f;
}
function cashRound(n, unit) {
	if (!unit || unit <= 0) return n;
	return Math.round(n / unit) * unit;
}
function redistributePercents(percents, id, next, ids) {
	const clamped = Math.max(0, Math.min(100, Math.round(next)));
	const others = ids.filter((x) => x !== id);
	const rest = 100 - clamped;
	const sumOthers = others.map((oid) => percents[oid] ?? 0).reduce((a, b) => a + b, 0);
	const out = {
		...percents,
		[id]: clamped
	};
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
	const raw = others.map((oid) => (percents[oid] ?? 0) / sumOthers * rest);
	const floors = raw.map((x) => Math.floor(x));
	let remain = rest - floors.reduce((a, b) => a + b, 0);
	const order = raw.map((x, i) => ({
		i,
		frac: x - Math.floor(x)
	})).sort((a, b) => b.frac - a.frac);
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
function equalPercents(ids) {
	const n = ids.length || 1;
	const even = Math.floor(100 / n);
	const leftover = 100 - even * n;
	const out = {};
	ids.forEach((id, i) => {
		out[id] = even + (i < leftover ? 1 : 0);
	});
	return out;
}
function buildShares(opts) {
	const { people, grand, currency, mode, percents, items, cashRoundUnit } = opts;
	const decimals = CURRENCIES[currency].decimals;
	if (people.length === 0) return [];
	let amounts = [];
	let weights = [];
	if (mode === "items" && items.length > 0) {
		const byId = Object.fromEntries(people.map((p) => [p.id, 0]));
		let assigned = 0;
		for (const item of items) {
			const who = item.assignedTo.filter((id) => byId[id] !== void 0);
			if (who.length === 0) continue;
			const slice = item.amount / who.length;
			who.forEach((id) => {
				byId[id] += slice;
			});
			assigned += item.amount;
		}
		const leftover = grand - assigned;
		if (leftover > 1e-4) {
			const even = leftover / people.length;
			people.forEach((p) => {
				byId[p.id] += even;
			});
		}
		amounts = people.map((p) => byId[p.id] ?? 0);
		const sum = amounts.reduce((a, b) => a + b, 0) || 1;
		weights = amounts.map((a) => a / sum);
		amounts = allocate(grand, weights, decimals);
	} else {
		weights = people.map((p) => percents[p.id] ?? 0);
		if (weights.reduce((a, b) => a + b, 0) <= 0) weights = people.map(() => 1);
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
		percent: Math.round((amounts[i] ?? 0) / safeGrand * 1e3) / 10
	}));
}
function settle(shares, paidBy) {
	if (!paidBy) return [];
	const payer = shares.find((s) => s.id === paidBy);
	if (!payer) return [];
	return shares.filter((s) => s.id !== paidBy && s.amount > 0).map((s) => ({
		from: s,
		to: payer,
		amount: s.amount
	}));
}
var AVATARS = [
	{
		id: "ali",
		src: "/avatars/ali.jpg",
		color: "#0A9B82"
	},
	{
		id: "sara",
		src: "/avatars/sara.jpg",
		color: "#7B6CF6"
	},
	{
		id: "mehdi",
		src: "/avatars/mehdi.jpg",
		color: "#14B8A6"
	},
	{
		id: "nazanin",
		src: "/avatars/nazanin.jpg",
		color: "#6D28D9"
	},
	{
		id: "mina",
		src: "/avatars/mina.jpg",
		color: "#C084FC"
	},
	{
		id: "reza",
		src: "/avatars/reza.jpg",
		color: "#F59E0B"
	},
	{
		id: "niloofar",
		src: "/avatars/niloofar.jpg",
		color: "#FB7185"
	}
];
var DEFAULT_FRIENDS = [
	{
		id: "ali",
		name: "علی",
		avatar: "/avatars/ali.jpg",
		color: "#0A9B82"
	},
	{
		id: "sara",
		name: "سارا",
		avatar: "/avatars/sara.jpg",
		color: "#7B6CF6"
	},
	{
		id: "mehdi",
		name: "مهدی",
		avatar: "/avatars/mehdi.jpg",
		color: "#14B8A6"
	},
	{
		id: "nazanin",
		name: "نازنین",
		avatar: "/avatars/nazanin.jpg",
		color: "#6D28D9"
	},
	{
		id: "reza",
		name: "رضا",
		avatar: "/avatars/reza.jpg",
		color: "#F59E0B"
	},
	{
		id: "niloofar",
		name: "نیلوفر",
		avatar: "/avatars/niloofar.jpg",
		color: "#FB7185"
	}
];
var DEFAULT_SELECTED = [
	"ali",
	"sara",
	"mehdi",
	"nazanin"
];
function peopleFrom(friends, ids) {
	return ids.map((id) => friends.find((f) => f.id === id)).filter(Boolean);
}
var useDangStore = create()(persist((set, get) => ({
	onboarded: false,
	profile: {
		id: "me",
		name: "من",
		avatar: "/avatars/mina.jpg",
		color: "#C084FC"
	},
	friends: DEFAULT_FRIENDS,
	title: "شام رستوران",
	base: 245e4,
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
	setProfile: (p) => set((s) => ({
		profile: {
			...s.profile,
			...p
		},
		friends: s.friends.map((f) => f.id === "me" ? {
			...f,
			...p
		} : f)
	})),
	setTitle: (title) => set({ title }),
	setBase: (base) => set({ base: Math.max(0, base) }),
	setCurrency: (currency) => {
		const prev = get().currency;
		if (prev === currency) {
			set({ currency });
			return;
		}
		set({
			currency,
			base: convertAmount(get().base, prev, currency),
			items: get().items.map((it) => ({
				...it,
				amount: convertAmount(it.amount, prev, currency)
			}))
		});
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
		if (count > ids.length) {
			const unused = s.friends.filter((f) => !ids.includes(f.id));
			while (ids.length < count) if (unused.length) ids.push(unused.shift().id);
			else {
				const idx = ids.length + 1;
				const av = AVATARS[idx % AVATARS.length];
				const person = {
					id: uid("p-"),
					name: `نفر ${idx}`,
					avatar: av.src,
					color: av.color
				};
				s.friends = [...s.friends, person];
				ids.push(person.id);
			}
		} else ids = ids.slice(0, count);
		set({
			friends: s.friends,
			selectedIds: ids,
			percents: equalPercents(ids),
			mode: "equal"
		});
	},
	toggleSelected: (id) => {
		const s = get();
		const ids = s.selectedIds.includes(id) ? s.selectedIds.filter((x) => x !== id) : [...s.selectedIds, id];
		if (ids.length < 2) return;
		set({
			selectedIds: ids,
			percents: equalPercents(ids)
		});
	},
	setPercent: (id, v) => {
		const ids = get().selectedIds;
		set({
			percents: redistributePercents(get().percents, id, v, ids),
			mode: "percent"
		});
	},
	equalize: () => set({
		percents: equalPercents(get().selectedIds),
		mode: "equal"
	}),
	setMode: (mode) => set({ mode }),
	setPaidBy: (paidBy) => set((s) => {
		const last = s.lastResult ? {
			...s.lastResult,
			paidBy
		} : s.lastResult;
		return {
			paidBy,
			lastResult: last,
			history: last ? s.history.map((h) => h.id === last.id ? last : h) : s.history
		};
	}),
	addFriend: (p) => {
		const id = p.id ?? uid("f-");
		const person = {
			id,
			name: p.name,
			avatar: p.avatar,
			color: p.color
		};
		set((s) => ({ friends: [...s.friends, person] }));
		return id;
	},
	updateFriend: (id, p) => set((s) => ({ friends: s.friends.map((f) => f.id === id ? {
		...f,
		...p
	} : f) })),
	removeFriend: (id) => set((s) => {
		const friends = s.friends.filter((f) => f.id !== id);
		const selectedIds = s.selectedIds.filter((x) => x !== id);
		return {
			friends,
			selectedIds: selectedIds.length >= 2 ? selectedIds : s.selectedIds,
			percents: equalPercents(selectedIds.length >= 2 ? selectedIds : s.selectedIds)
		};
	}),
	addItem: (item) => set((s) => ({
		mode: "items",
		items: [...s.items, {
			id: uid("i-"),
			name: item?.name ?? "آیتم جدید",
			amount: item?.amount ?? 0,
			assignedTo: item?.assignedTo ?? s.selectedIds.slice()
		}]
	})),
	updateItem: (id, p) => set((s) => ({ items: s.items.map((it) => it.id === id ? {
		...it,
		...p
	} : it) })),
	removeItem: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
	applyReceipt: ({ merchant, total, tax, items, currency }) => {
		const s = get();
		const code = currency ?? s.currency;
		const lineItems = items.map((it) => ({
			id: uid("i-"),
			name: it.name,
			amount: it.amount,
			assignedTo: s.selectedIds.slice()
		}));
		let taxPercent = s.taxPercent;
		if (tax && total) {
			const sub = total - tax;
			if (sub > 0) taxPercent = Math.round(tax / sub * 1e3) / 10;
		}
		set({
			title: merchant || s.title,
			base: total,
			currency: code,
			taxPercent,
			taxIncluded: Boolean(tax && tax > 0),
			items: lineItems,
			mode: lineItems.length ? "items" : s.mode
		});
	},
	applyTemplate: (title, tax, tip) => set({
		title,
		taxPercent: tax,
		tipPercent: tip
	}),
	commitSplit: () => {
		const s = get();
		const people = peopleFrom(s.friends, s.selectedIds);
		if (!people.length || s.base <= 0) return null;
		const { taxAmount, tipAmount, grand } = computeTotals(s.base, s.tipPercent, s.taxPercent, s.taxIncluded, s.tipOnTax);
		const cashUnit = s.cashRound ? CURRENCIES[s.currency].cashRound : 0;
		const shares = buildShares({
			people,
			grand,
			currency: s.currency,
			mode: s.mode,
			percents: s.mode === "equal" ? equalPercents(s.selectedIds) : s.percents,
			items: s.items,
			cashRoundUnit: cashUnit
		});
		const entry = {
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
			paidBy: s.paidBy
		};
		set({
			lastResult: entry,
			history: [entry, ...s.history].slice(0, 80)
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
			paidBy: entry.paidBy
		});
	},
	deleteHistory: (id) => set((s) => ({
		history: s.history.filter((h) => h.id !== id),
		lastResult: s.lastResult?.id === id ? null : s.lastResult
	})),
	resetDraft: () => set({
		title: "شام رستوران",
		base: 0,
		tipPercent: 10,
		taxPercent: 9,
		items: [],
		mode: "equal",
		percents: equalPercents(get().selectedIds),
		paidBy: null
	}),
	setRemindPerson: (remindPersonId) => set({ remindPersonId }),
	clearAll: () => set({
		history: [],
		lastResult: null
	})
}), {
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
		history: s.history
	})
}));
function useSelectedPeople() {
	return useDangStore((s) => s.friends.filter((f) => s.selectedIds.includes(f.id)));
}
//#endregion
export { useSelectedPeople as a, useDangStore as i, computeTotals as n, settle as r, AVATARS as t };

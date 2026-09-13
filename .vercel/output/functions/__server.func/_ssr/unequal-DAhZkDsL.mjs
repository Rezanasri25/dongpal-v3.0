import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, d as formatAmount, i as Phone, o as TopBar, p as formatGrouped, t as Avatar } from "./money-BI8SPXPF.mjs";
import { r as Donut, t as Btn } from "./ui-D7unGhWs.mjs";
import { a as useSelectedPeople, i as useDangStore, n as computeTotals } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/unequal-DAhZkDsL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/unequal.tsx?tsr-split=component";
function UnequalPage() {
	const nav = useNavigate();
	const people = useSelectedPeople();
	const percents = useDangStore((s) => s.percents);
	const setPercent = useDangStore((s) => s.setPercent);
	const equalize = useDangStore((s) => s.equalize);
	const commitSplit = useDangStore((s) => s.commitSplit);
	const base = useDangStore((s) => s.base);
	const currency = useDangStore((s) => s.currency);
	const tip = useDangStore((s) => s.tipPercent);
	const tax = useDangStore((s) => s.taxPercent);
	const taxIncluded = useDangStore((s) => s.taxIncluded);
	const tipOnTax = useDangStore((s) => s.tipOnTax);
	const { grand } = (0, import_react.useMemo)(() => computeTotals(base, tip, tax, taxIncluded, tipOnTax), [
		base,
		tip,
		tax,
		taxIncluded,
		tipOnTax
	]);
	const totalPct = people.reduce((a, p) => a + (percents[p.id] ?? 0), 0);
	function confirm() {
		if (!commitSplit()) {
			toast("مبلغ رو وارد کن");
			nav({ to: "/home" });
			return;
		}
		nav({ to: "/result" });
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
		title: "تقسیم نابرابر",
		subtitle: "سهم هر نفر را مشخص کن",
		onBack: () => nav({ to: "/home" })
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, {
		nav: false,
		className: "px-5 pb-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "stagger space-y-3 pt-2",
			children: [
				people.map((p) => {
					const pct = percents[p.id] ?? 0;
					const amount = grand * pct / 100;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "card px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
								src: p.avatar,
								name: p.name,
								size: 44
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[14px] font-bold",
											children: p.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 53,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[15px] font-extrabold tabular",
											style: { color: p.color },
											children: [formatGrouped(pct), "٪"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 54,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 52,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "range",
										min: 0,
										max: 100,
										value: pct,
										onChange: (e) => setPercent(p.id, Number(e.target.value)),
										className: "person-slider mt-2",
										style: {
											"--thumb": p.color,
											background: `linear-gradient(to left, ${p.color} ${pct}%, #ECEFF5 ${pct}%)`
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 60,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-left text-[11px] tabular text-muted",
										children: [
											formatAmount(amount, currency),
											" ",
											currency === "IRR" ? "ریال" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 64,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 51,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 17
						}, this)
					}, p.id, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 18
					}, this);
				}),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card flex items-center gap-3 px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Donut, { slices: people.map((p) => ({
							value: percents[p.id] ?? 0,
							color: p.color
						})) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[12px] text-muted",
								children: "مجموع"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 78,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[16px] font-extrabold tabular",
								children: [formatGrouped(totalPct), "٪"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[12px] text-muted",
								children: "ریال"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[16px] font-extrabold tabular text-ink",
								children: formatAmount(grand, currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
					onClick: confirm,
					children: "ثبت سهم‌ها"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
					variant: "lavender",
					onClick: () => {
						equalize();
						confirm();
					},
					children: "به طور مساوی تقسیم کن"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 10
	}, this);
}
//#endregion
export { UnequalPage as component };

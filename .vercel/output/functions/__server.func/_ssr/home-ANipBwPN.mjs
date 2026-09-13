import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Pencil, n as Users, o as Settings2, v as Gift, y as FileText } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, d as formatAmount, h as toPersianDigits, i as Phone, m as parseAmountInput, n as CURRENCIES, p as formatGrouped, s as cn, t as Avatar } from "./money-BI8SPXPF.mjs";
import { a as Sparkle, o as Stepper, s as hapticSelect, t as Btn } from "./ui-D7unGhWs.mjs";
import { a as useSelectedPeople, i as useDangStore, n as computeTotals } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as TEMPLATES } from "./sample-BEk908eW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-ANipBwPN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/home.tsx?tsr-split=component";
var MAIN_CURRENCIES = [
	"IRR",
	"IRT",
	"USD",
	"EUR"
];
function HomePage() {
	const nav = useNavigate();
	const profile = useDangStore((s) => s.profile);
	const title = useDangStore((s) => s.title);
	const base = useDangStore((s) => s.base);
	const currency = useDangStore((s) => s.currency);
	const tip = useDangStore((s) => s.tipPercent);
	const tax = useDangStore((s) => s.taxPercent);
	const taxIncluded = useDangStore((s) => s.taxIncluded);
	const people = useSelectedPeople();
	const setBase = useDangStore((s) => s.setBase);
	const setCurrency = useDangStore((s) => s.setCurrency);
	const setTip = useDangStore((s) => s.setTip);
	const setTax = useDangStore((s) => s.setTax);
	const setPeopleCount = useDangStore((s) => s.setPeopleCount);
	const applyTemplate = useDangStore((s) => s.applyTemplate);
	const equalize = useDangStore((s) => s.equalize);
	const commitSplit = useDangStore((s) => s.commitSplit);
	const setTaxIncluded = useDangStore((s) => s.setTaxIncluded);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const totals = (0, import_react.useMemo)(() => computeTotals(base, tip, tax, taxIncluded, false), [
		base,
		tip,
		tax,
		taxIncluded
	]);
	const unit = CURRENCIES[currency];
	function startEdit() {
		setDraft(base ? String(Math.round(base)) : "");
		setEditing(true);
	}
	function commitEdit(raw) {
		const n = parseAmountInput(raw ?? draft);
		setBase(n);
		setEditing(false);
	}
	function appendDigit(d) {
		hapticSelect();
		if (d === "back") {
			setDraft((s) => s.slice(0, -1));
			return;
		}
		if (d === "000") {
			setDraft((s) => s ? s + "000" : s);
			return;
		}
		setDraft((s) => {
			return (s + d).replace(/^0+(?=\d)/, "").slice(0, 12);
		});
	}
	function doSplit(mode) {
		if (base <= 0) {
			toast("اول مبلغ کل رو وارد کن");
			startEdit();
			return;
		}
		if (people.length < 2) {
			toast("حداقل دو نفر لازم داریم");
			return;
		}
		if (mode === "unequal") {
			nav({ to: "/unequal" });
			return;
		}
		if (mode === "items") {
			nav({ to: "/items" });
			return;
		}
		equalize();
		if (commitSplit()) nav({ to: "/result" });
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, {
		nav: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "flex items-center gap-3 px-5 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => nav({ to: "/profile" }),
					"aria-label": "پروفایل",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
						src: profile.avatar,
						name: profile.name,
						size: 46
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex-1 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-[23px] font-black text-primary",
						children: "تقسیمینو"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[12px] font-bold text-muted flex items-center justify-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ساده، سریع، منصفانه" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-heart",
							children: "💜"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					"aria-label": "تنظیمات",
					onClick: () => nav({ to: "/more" }),
					className: "grid size-10 place-items-center rounded-full bg-white text-muted shadow-[0_6px_18px_rgba(28,32,51,0.06)]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings2, { size: 18 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "stagger px-5 pt-4 pb-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: cn("chip shrink-0", title === t.title && "active"),
						onClick: () => {
							hapticSelect();
							applyTemplate(t.title, t.tax, t.tip);
						},
						children: t.label
					}, t.id, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 33
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card relative px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[12px] font-medium text-muted",
									children: "مبلغ کل"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 124,
									columnNumber: 17
								}, this),
								editing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									autoFocus: true,
									inputMode: "numeric",
									value: draft,
									onChange: (e) => setDraft(e.target.value.replace(/[^\d]/g, "")),
									onBlur: () => commitEdit(),
									onKeyDown: (e) => e.key === "Enter" && commitEdit(),
									className: "mt-1 w-[220px] bg-transparent text-[34px] font-extrabold tabular tracking-tight text-ink outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 28
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: startEdit,
									className: "mt-1 text-right",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[34px] font-extrabold leading-none tabular tracking-tight text-ink",
										children: formatAmount(base, currency)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 126,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 340
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[13px] font-semibold text-muted",
									children: unit.label
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => nav({ to: "/scan" }),
									className: "grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary",
									"aria-label": "اسکن رسید",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 20 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: startEdit,
									className: "grid size-8 place-items-center text-muted",
									"aria-label": "ویرایش مبلغ",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { size: 15 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 13
						}, this),
						editing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "keypad mt-4",
							children: [
								"1",
								"2",
								"3",
								"4",
								"5",
								"6",
								"7",
								"8",
								"9",
								"000",
								"0",
								"back"
							].map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "key",
								onClick: () => appendDigit(k),
								children: k === "back" ? "⌫" : toPersianDigits(k)
							}, k, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 93
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 24
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex gap-2",
							children: MAIN_CURRENCIES.map((code) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => {
									hapticSelect();
									setCurrency(code);
								},
								className: cn("h-10 flex-1 rounded-full text-[13px] font-bold transition-[background-color,color,transform] duration-150 active:scale-[0.96]", currency === code ? "bg-primary text-white" : "bg-bg text-muted"),
								children: code === "IRR" ? "ریال" : code === "IRT" ? "تومان" : CURRENCIES[code].symbol
							}, code, false, {
								fileName: _jsxFileName,
								lineNumber: 151,
								columnNumber: 44
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card flex items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 text-[13px] font-semibold text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { size: 16 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 15
						}, this), "تعداد نفرات"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stepper, {
						value: people.length,
						min: 2,
						max: 12,
						onChange: setPeopleCount
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 160,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "card px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gift, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 17
							}, this), "انعام (اختیاری)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stepper, {
							value: tip,
							min: 0,
							max: 30,
							suffix: "٪",
							onChange: setTip
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "card px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 17
							}, this), "مالیات (اختیاری)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 177,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stepper, {
							value: tax,
							min: 0,
							max: 20,
							suffix: "٪",
							onChange: setTax
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setTaxIncluded(!taxIncluded),
					className: "flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-[12.5px] font-medium text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "مالیات داخل مبلغ کل است" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: cn("h-6 w-11 rounded-full p-0.5 transition-[background-color] duration-200", taxIncluded ? "bg-primary" : "bg-line"),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("block size-5 rounded-full bg-white transition-transform duration-200", taxIncluded ? "-translate-x-5" : "translate-x-0") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 188,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 185,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card flex items-center justify-between px-5 py-3 text-[13px]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-muted",
						children: "قابل تقسیم"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold tabular text-ink",
						children: [
							formatGrouped(totals.grand, unit.decimals),
							" ",
							unit.symbol
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
					onClick: () => doSplit("equal"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkle, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 13
					}, this), "تقسیم کن"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 199,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						variant: "lavender",
						className: "h-12 text-[13.5px]",
						onClick: () => doSplit("unequal"),
						children: "تقسیم نابرابر"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						variant: "ghost",
						className: "h-12 text-[13.5px]",
						onClick: () => doSplit("items"),
						children: "تقسیم آیتمی"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 203,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 111,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 89,
		columnNumber: 10
	}, this);
}
//#endregion
export { HomePage as component };

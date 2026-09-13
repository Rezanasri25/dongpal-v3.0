import { f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Grip, c as ScanLine, g as House, n as Users, x as Clock3 } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/money-BI8SPXPF.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName = "/app/applet/src/components/shell.tsx";
function Phone({ children, nav = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "app-root",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("phone", className),
			children: [children, nav ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BottomNav, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 16
			}, this) : null]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
function Scroll({ children, nav = true, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("phone-scroll", !nav && "no-nav", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 5
	}, this);
}
var TABS = [
	{
		to: "/home",
		label: "خانه",
		icon: House
	},
	{
		to: "/friends",
		label: "دوستان",
		icon: Users
	},
	{
		to: "/scan",
		label: "اسکن",
		icon: ScanLine,
		scan: true
	},
	{
		to: "/history",
		label: "تاریخچه",
		icon: Clock3
	},
	{
		to: "/more",
		label: "بیشتر",
		icon: Grip
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
		className: "bottom-nav",
		"aria-label": "منوی اصلی",
		children: TABS.map((tab) => {
			const active = pathname === tab.to || tab.to === "/home" && pathname === "/";
			if ("scan" in tab && tab.scan) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: tab.to,
				"aria-label": tab.label,
				className: cn("nav-scan", active && "active"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScanLine, {
					size: 22,
					strokeWidth: 2.2
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 15
				}, this)
			}, tab.to, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 13
			}, this);
			const Icon = tab.icon;
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: tab.to,
				className: cn("nav-item", active && "active"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
					size: 20,
					strokeWidth: active ? 2.4 : 1.9
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: tab.label }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 13
				}, this)]
			}, tab.to, true, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 11
			}, this);
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 5
	}, this);
}
function TopBar({ title, subtitle, onBack, right, light = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "flex items-center gap-3 px-5 pt-5 pb-3",
		children: [
			onBack ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: onBack,
				"aria-label": "بازگشت",
				className: light ? "grid size-10 place-items-center rounded-full bg-white/10 text-white active:scale-[0.96]" : "grid size-10 place-items-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(28,32,51,0.06)] active:scale-[0.96]",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
					width: "18",
					height: "18",
					viewBox: "0 0 24 24",
					fill: "none",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
						d: "M9 5l7 7-7 7",
						stroke: "currentColor",
						strokeWidth: "2.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-10" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0 flex-1 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: light ? "text-[17px] font-bold text-white" : "text-[17px] font-bold text-ink",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 9
				}, this), subtitle ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: light ? "mt-0.5 text-[12px] text-white/70" : "mt-0.5 text-[12px] text-muted",
					children: subtitle
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 11
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 7
			}, this),
			right ?? /* @__PURE__ */ (void 0)("span", { className: "size-10" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 17
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 94,
		columnNumber: 5
	}, this);
}
function Avatar({ src, name, size = 44, className, ring }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
		src,
		alt: name,
		width: size,
		height: size,
		className: cn("rounded-full object-cover bg-primary-soft", className),
		style: {
			width: size,
			height: size,
			boxShadow: ring ? `0 0 0 2px ${ring}` : void 0
		}
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 138,
		columnNumber: 5
	}, this);
}
var CURRENCIES = {
	IRR: {
		code: "IRR",
		label: "ریال",
		symbol: "ریال",
		toIRR: 1,
		decimals: 0,
		cashRound: 1e3
	},
	IRT: {
		code: "IRT",
		label: "تومان",
		symbol: "تومان",
		toIRR: 10,
		decimals: 0,
		cashRound: 100
	},
	USD: {
		code: "USD",
		label: "دلار",
		symbol: "$",
		toIRR: 1374600,
		decimals: 2,
		cashRound: .01
	},
	EUR: {
		code: "EUR",
		label: "یورو",
		symbol: "€",
		toIRR: 1594500,
		decimals: 2,
		cashRound: .01
	},
	AED: {
		code: "AED",
		label: "درهم",
		symbol: "د.إ",
		toIRR: 374300,
		decimals: 2,
		cashRound: .01
	},
	TRY: {
		code: "TRY",
		label: "لیر",
		symbol: "₺",
		toIRR: 33400,
		decimals: 2,
		cashRound: .01
	},
	GBP: {
		code: "GBP",
		label: "پوند",
		symbol: "£",
		toIRR: 1856e3,
		decimals: 2,
		cashRound: .01
	}
};
var CURRENCY_LIST = [
	CURRENCIES.IRR,
	CURRENCIES.IRT,
	CURRENCIES.USD,
	CURRENCIES.EUR,
	CURRENCIES.AED,
	CURRENCIES.TRY,
	CURRENCIES.GBP
];
var FA = "۰۱۲۳۴۵۶۷۸۹";
function toPersianDigits(value) {
	return String(value).replace(/[0-9]/g, (d) => FA[Number(d)] ?? d);
}
function toWesternDigits(value) {
	return value.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - "٠".charCodeAt(0)));
}
function parseAmountInput(raw) {
	const cleaned = toWesternDigits(raw).replace(/,/g, "").replace(/[^\d.]/g, "");
	if (!cleaned) return 0;
	const n = Number(cleaned);
	return Number.isFinite(n) ? n : 0;
}
function formatGrouped(n, decimals = 0) {
	const sign = n < 0 ? "−" : "";
	const [intPart, frac] = Math.abs(n).toFixed(decimals).split(".");
	const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return toPersianDigits(sign + (decimals > 0 && frac ? `${grouped}.${frac}` : grouped));
}
function formatAmount(n, code) {
	const c = CURRENCIES[code];
	return formatGrouped(n, c.decimals);
}
function formatAmountWithUnit(n, code) {
	const c = CURRENCIES[code];
	const num = formatAmount(n, code);
	if (code === "USD" || code === "EUR" || code === "GBP" || code === "TRY") return `${c.symbol}${num}`;
	return `${num} ${c.symbol}`;
}
function convertAmount(amount, from, to) {
	if (from === to) return amount;
	const out = amount * CURRENCIES[from].toIRR / CURRENCIES[to].toIRR;
	const f = 10 ** CURRENCIES[to].decimals;
	return Math.round(out * f) / f;
}
function faDate(ts) {
	return new Intl.DateTimeFormat("fa-IR", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(ts));
}
function faDateLong(ts) {
	return new Intl.DateTimeFormat("fa-IR", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(ts));
}
//#endregion
export { Scroll as a, convertAmount as c, formatAmount as d, formatAmountWithUnit as f, toPersianDigits as h, Phone as i, faDate as l, parseAmountInput as m, CURRENCIES as n, TopBar as o, formatGrouped as p, CURRENCY_LIST as r, cn as s, Avatar as t, faDateLong as u };

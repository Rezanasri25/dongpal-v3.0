import { f as Minus, u as Plus } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { h as toPersianDigits, s as cn } from "./money-BI8SPXPF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-D7unGhWs.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function haptic(ms = 12) {
	try {
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(ms);
	} catch {}
}
function hapticSelect() {
	haptic(8);
}
var _jsxFileName = "/app/applet/src/components/ui.tsx";
function Btn({ variant = "primary", className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		className: cn("btn", `btn-${variant}`, className),
		...props,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
function Stepper({ value, onChange, min = 0, max = 99, suffix, label }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-between gap-3",
		children: [
			label ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "sr-only",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 16
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				"aria-label": "کم کردن",
				className: "grid size-11 place-items-center rounded-full bg-bg text-muted active:scale-[0.96]",
				onClick: () => {
					hapticSelect();
					onChange(Math.max(min, value - 1));
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Minus, { size: 16 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-12 text-center text-[22px] font-bold tabular text-ink",
				children: [toPersianDigits(value), suffix ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "mr-0.5 text-[15px] font-semibold text-muted",
					children: suffix
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 19
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				"aria-label": "زیاد کردن",
				className: "grid size-11 place-items-center rounded-full bg-primary-soft text-primary active:scale-[0.96]",
				onClick: () => {
					hapticSelect();
					onChange(Math.min(max, value + 1));
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 5
	}, this);
}
function Heart({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: cn("inline-block", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
			fill: "currentColor",
			d: "M12 21s-6.7-4.35-9.33-8.22C.7 9.9 1.4 6.2 4.4 4.86 6.3 4 8.4 4.5 12 8c3.6-3.5 5.7-4 7.6-3.14 3 1.34 3.7 5.04 1.73 7.92C18.7 16.65 12 21 12 21z"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 5
	}, this);
}
function Sparkle({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: cn("size-5", className),
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
			d: "M12 3l1.2 6.3L19 12l-5.8 2.7L12 21l-1.2-6.3L5 12l5.8-2.7L12 3z",
			fill: "currentColor"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 5
	}, this);
}
function Confetti() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: [
			[
				"#0A9B82",
				"-18px",
				"40px",
				"120deg"
			],
			[
				"#7B6CF6",
				"12px",
				"-30px",
				"-80deg"
			],
			[
				"#F59E0B",
				"40px",
				"10px",
				"200deg"
			],
			[
				"#FB7185",
				"-40px",
				"-10px",
				"60deg"
			],
			[
				"#38BDF8",
				"8px",
				"55px",
				"-40deg"
			],
			[
				"#0A9B82",
				"28px",
				"-50px",
				"90deg"
			],
			[
				"#C084FC",
				"-8px",
				"70px",
				"160deg"
			],
			[
				"#FBBF24",
				"55px",
				"30px",
				"-120deg"
			],
			[
				"#14B8A6",
				"-55px",
				"20px",
				"30deg"
			],
			[
				"#7B6CF6",
				"0px",
				"-70px",
				"210deg"
			],
			[
				"#FB7185",
				"70px",
				"-20px",
				"-15deg"
			],
			[
				"#0A9B82",
				"-70px",
				"-40px",
				"75deg"
			]
		].map(([color, x, _delay, rot], i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "confetti-bit",
			style: {
				left: `${8 + i * 7 % 84}%`,
				background: color,
				animationDelay: `${i * 30}ms`,
				"--x": x,
				"--r": rot
			}
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 128,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 126,
		columnNumber: 5
	}, this);
}
function Donut({ slices, size = 56 }) {
	const r = 16;
	const c = 2 * Math.PI * r;
	let offset = 0;
	const sum = slices.reduce((a, s) => a + s.value, 0) || 1;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 44 44",
		className: "-rotate-90",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
			cx: "22",
			cy: "22",
			r,
			fill: "none",
			stroke: "#ECEFF5",
			strokeWidth: "8"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 7
		}, this), slices.map((s, i) => {
			const len = s.value / sum * c;
			const dash = `${len} ${c - len}`;
			const el = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "22",
				cy: "22",
				r,
				fill: "none",
				stroke: s.color,
				strokeWidth: "8",
				strokeDasharray: dash,
				strokeDashoffset: -offset,
				strokeLinecap: "butt"
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 11
			}, this);
			offset += len;
			return el;
		})]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 158,
		columnNumber: 5
	}, this);
}
//#endregion
export { Sparkle as a, Heart as i, Confetti as n, Stepper as o, Donut as r, hapticSelect as s, Btn as t };

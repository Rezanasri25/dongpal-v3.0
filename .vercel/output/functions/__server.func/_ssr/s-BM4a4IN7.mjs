import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, f as formatAmountWithUnit, i as Phone, o as TopBar, u as faDateLong } from "./money-BI8SPXPF.mjs";
import { t as Btn } from "./ui-D7unGhWs.mjs";
import { n as decodePayload } from "./share-DYFYe-Pd.mjs";
import { n as Route$2 } from "./router-D3IZdQAo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s-BM4a4IN7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/s.tsx?tsr-split=component";
function SharedPage() {
	const { d } = Route$2.useSearch();
	const nav = useNavigate();
	const payload = (0, import_react.useMemo)(() => d ? decodePayload(d) : null, [d]);
	if (!payload) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
		title: "لینک نامعتبر",
		onBack: () => nav({ to: "/" })
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "px-6 pt-8 text-center text-muted",
		children: "این دعوت پیدا نشد یا خراب شده."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
		title: payload.t,
		subtitle: faDateLong(payload.d),
		onBack: () => nav({ to: "/" })
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, {
		nav: false,
		className: "px-5 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card mb-4 px-5 py-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[13px] text-muted",
					children: "مبلغ کل"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[28px] font-extrabold tabular",
					children: formatAmountWithUnit(payload.g, payload.c)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card divide-y divide-line overflow-hidden",
				children: payload.p.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: p.a,
							alt: "",
							className: "size-11 rounded-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "flex-1 font-bold",
							children: p.n
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-extrabold tabular",
							children: formatAmountWithUnit(p.s, payload.c)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 15
						}, this)
					]
				}, i, true, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 36
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 flex items-center justify-center gap-1 text-[13px] font-medium text-muted",
				children: ["ساخته‌شده با تقسیمینو", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-heart",
					children: "💜"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
				className: "mt-5",
				onClick: () => nav({ to: "/home" }),
				children: "خودت هم تقسیم کن"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 26,
		columnNumber: 10
	}, this);
}
//#endregion
export { SharedPage as component };

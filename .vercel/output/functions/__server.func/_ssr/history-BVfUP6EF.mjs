import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Trash2 } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, f as formatAmountWithUnit, i as Phone, l as faDate, t as Avatar } from "./money-BI8SPXPF.mjs";
import { i as useDangStore } from "./store-ATsZWpAn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BVfUP6EF.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/history.tsx?tsr-split=component";
function HistoryPage() {
	const nav = useNavigate();
	const history = useDangStore((s) => s.history);
	const load = useDangStore((s) => s.loadHistory);
	const del = useDangStore((s) => s.deleteHistory);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, {
		nav: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "px-5 pt-6 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-[22px] font-extrabold",
				children: "تاریخچه"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[13px] text-muted",
				children: "دنگ‌های قبلی‌ت اینجان"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-5 space-y-2",
			children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card px-6 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "/art/plane.jpg",
						alt: "",
						className: "mx-auto h-28 w-28 object-contain"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 19,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 font-bold",
						children: "هنوز دنگی نداری"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 20,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-[13px] text-muted",
						children: "اولین خرج گروهی رو تقسیم کن"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 21,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 35
			}, this) : history.map((h) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => {
					load(h.id);
					nav({ to: "/result" });
				},
				className: "card flex w-full items-center gap-3 px-4 py-3 text-right",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex -space-x-2 space-x-reverse",
						children: h.people.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
							src: p.avatar,
							name: p.name,
							size: 32,
							className: "ring-2 ring-white"
						}, p.id, false, {
							fileName: _jsxFileName,
							lineNumber: 29,
							columnNumber: 50
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "truncate text-[14px] font-bold",
							children: h.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-muted",
							children: faDate(h.createdAt)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-left",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[13px] font-extrabold tabular",
							children: formatAmountWithUnit(h.grand, h.currency)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 36,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-muted",
							children: [h.people.length, " نفر"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						role: "button",
						tabIndex: 0,
						className: "grid size-8 place-items-center text-faint",
						onClick: (e) => {
							e.stopPropagation();
							del(h.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 15 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 43,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 17
					}, this)
				]
			}, h.id, true, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 39
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 17,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 12,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 10
	}, this);
}
//#endregion
export { HistoryPage as component };

import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, i as Phone, r as CURRENCY_LIST, s as cn, t as Avatar } from "./money-BI8SPXPF.mjs";
import { i as useDangStore } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/more-DSCOr2A_.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/more.tsx?tsr-split=component";
function MorePage() {
	const nav = useNavigate();
	const profile = useDangStore((s) => s.profile);
	const currency = useDangStore((s) => s.currency);
	const cashRound = useDangStore((s) => s.cashRound);
	const haptics = useDangStore((s) => s.haptics);
	const tipOnTax = useDangStore((s) => s.tipOnTax);
	const setCurrency = useDangStore((s) => s.setCurrency);
	const setCashRound = useDangStore((s) => s.setCashRound);
	const setHaptics = useDangStore((s) => s.setHaptics);
	const setTipOnTax = useDangStore((s) => s.setTipOnTax);
	const resetDraft = useDangStore((s) => s.resetDraft);
	const clearAll = useDangStore((s) => s.clearAll);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, {
		nav: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "px-5 pt-6 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-[22px] font-extrabold",
				children: "بیشتر"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 24,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-5 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => nav({ to: "/profile" }),
					className: "card flex w-full items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
							src: profile.avatar,
							name: profile.name,
							size: 52
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 30,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[16px] font-bold",
								children: profile.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 32,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[12px] text-muted",
								children: "ویرایش پروفایل"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 33,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 31,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronLeft, {
							size: 18,
							className: "text-faint"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 35,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "px-4 pt-3 text-[12px] font-bold text-muted",
						children: "ارز پیش‌فرض"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2 p-4",
						children: CURRENCY_LIST.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setCurrency(c.code),
							className: cn("chip", currency === c.code && "active"),
							children: c.label
						}, c.code, false, {
							fileName: _jsxFileName,
							lineNumber: 41,
							columnNumber: 39
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ToggleRow, {
					label: "گرد کردن به واحد نقدی",
					on: cashRound,
					onChange: setCashRound
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ToggleRow, {
					label: "انعام روی مبلغ+مالیات",
					on: tipOnTax,
					onChange: setTipOnTax
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ToggleRow, {
					label: "لرزش لمسی",
					on: haptics,
					onChange: setHaptics
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					className: "card w-full px-4 py-4 text-right text-[14px] font-semibold",
					onClick: () => {
						resetDraft();
						toast("پیش‌نویس پاک شد");
					},
					children: "شروع تقسیم جدید"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					className: "card w-full px-4 py-4 text-right text-[14px] font-semibold text-red-500",
					onClick: () => {
						clearAll();
						toast("تاریخچه پاک شد");
					},
					children: "پاک کردن تاریخچه"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "px-2 pb-6 pt-4 text-center text-[12px] leading-6 text-muted",
					children: [
						"تقسیمینو · خرجهامون با هم، دوستی‌هامون همیشگی 💜",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this),
						"نرخ ارز تقریبی است و فقط برای تبدیل سریع استفاده می‌شود."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 26,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 10
	}, this);
}
function ToggleRow({ label, on, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: () => onChange(!on),
		className: "card flex w-full items-center justify-between px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-[14px] font-semibold",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: cn("h-6 w-11 rounded-full p-0.5", on ? "bg-primary" : "bg-line"),
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("block size-5 rounded-full bg-white transition-transform duration-200", on ? "-translate-x-5" : "translate-x-0") }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 85,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 84,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 82,
		columnNumber: 10
	}, this);
}
//#endregion
export { MorePage as component };

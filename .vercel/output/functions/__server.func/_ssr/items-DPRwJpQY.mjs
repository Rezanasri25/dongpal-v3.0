import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, d as formatAmount, i as Phone, m as parseAmountInput, o as TopBar, s as cn, t as Avatar } from "./money-BI8SPXPF.mjs";
import { t as Btn } from "./ui-D7unGhWs.mjs";
import { a as useSelectedPeople, i as useDangStore } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/items-DPRwJpQY.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/items.tsx?tsr-split=component";
function ItemsPage() {
	const nav = useNavigate();
	const items = useDangStore((s) => s.items);
	const addItem = useDangStore((s) => s.addItem);
	const updateItem = useDangStore((s) => s.updateItem);
	const removeItem = useDangStore((s) => s.removeItem);
	const commitSplit = useDangStore((s) => s.commitSplit);
	const setMode = useDangStore((s) => s.setMode);
	const currency = useDangStore((s) => s.currency);
	const people = useSelectedPeople();
	function confirm() {
		if (!items.length) {
			toast("حداقل یک آیتم اضافه کن");
			return;
		}
		setMode("items");
		if (commitSplit()) nav({ to: "/result" });
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
		title: "تقسیم آیتمی",
		subtitle: "هر کی چی خورده؟",
		onBack: () => nav({ to: "/home" })
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 31,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, {
		nav: false,
		className: "px-5 pb-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-3",
			children: [
				items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card px-5 py-8 text-center text-[13px] text-muted",
					children: "آیتم‌های رسید یا سفارش رو اضافه کن، بعد مشخص کن کی‌ها سهیم‌ان."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 33
				}, this) : null,
				items.map((it) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									value: it.name,
									onChange: (e) => updateItem(it.id, { name: e.target.value }),
									className: "min-w-0 flex-1 bg-transparent text-[14px] font-bold outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 41,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									inputMode: "numeric",
									value: it.amount ? String(Math.round(it.amount)) : "",
									onChange: (e) => updateItem(it.id, { amount: parseAmountInput(e.target.value) }),
									className: "w-28 bg-transparent text-left text-[14px] font-extrabold tabular outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 44,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => removeItem(it.id),
									className: "text-faint",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 16 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 48,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 47,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 40,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mb-2 text-left text-[11px] text-muted",
							children: formatAmount(it.amount, currency)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: people.map((p) => {
								const on = it.assignedTo.includes(p.id);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										const assignedTo = on ? it.assignedTo.filter((id) => id !== p.id) : [...it.assignedTo, p.id];
										updateItem(it.id, { assignedTo });
									},
									className: cn("flex items-center gap-1 rounded-full py-1 pl-2 pr-1 text-[11px] font-semibold", on ? "bg-primary text-white" : "bg-bg text-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
										src: p.avatar,
										name: p.name,
										size: 22
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 61,
										columnNumber: 23
									}, this), p.name]
								}, p.id, true, {
									fileName: _jsxFileName,
									lineNumber: 55,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 15
						}, this)
					]
				}, it.id, true, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 28
				}, this)),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
					variant: "lavender",
					onClick: () => addItem({
						name: "آیتم جدید",
						amount: 0
					}),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 13
					}, this), "آیتم جدید"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
					onClick: confirm,
					children: "تقسیم کن"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 10
	}, this);
}
//#endregion
export { ItemsPage as component };

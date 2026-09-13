import { i as __toESM } from "../_runtime.mjs";
import { H as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, i as Phone, s as cn, t as Avatar } from "./money-BI8SPXPF.mjs";
import { t as Btn } from "./ui-D7unGhWs.mjs";
import { i as useDangStore, t as AVATARS } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/friends-DHETdxXM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/friends.tsx?tsr-split=component";
function FriendsPage() {
	const friends = useDangStore((s) => s.friends);
	const selected = useDangStore((s) => s.selectedIds);
	const toggle = useDangStore((s) => s.toggleSelected);
	const addFriend = useDangStore((s) => s.addFriend);
	const updateFriend = useDangStore((s) => s.updateFriend);
	const removeFriend = useDangStore((s) => s.removeFriend);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [avatar, setAvatar] = (0, import_react.useState)(AVATARS[0]);
	function save() {
		const n = name.trim();
		if (!n) {
			toast("اسم دوستت چیه؟");
			return;
		}
		addFriend({
			name: n,
			avatar: avatar.src,
			color: avatar.color
		});
		setName("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, {
		nav: true,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "px-5 pt-6 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-[22px] font-extrabold text-ink",
				children: "دوستان"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[13px] text-muted",
				children: "برای این دنگ انتخاب‌شون کن"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 34,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-5 space-y-2",
			children: [friends.map((f) => {
				const on = selected.includes(f.id);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card flex items-center gap-3 px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => toggle(f.id),
							className: "flex min-w-0 flex-1 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
								src: f.avatar,
								name: f.name,
								size: 48,
								ring: on ? f.color : void 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									defaultValue: f.name,
									onClick: (e) => e.stopPropagation(),
									onBlur: (e) => updateFriend(f.id, { name: e.target.value.trim() || f.name }),
									className: "w-full bg-transparent text-[15px] font-bold outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted",
									children: on ? "در این دنگ هست" : "خارج از دنگ"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 48,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 42,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							"aria-label": "حذف",
							className: "grid size-9 place-items-center text-faint",
							onClick: () => removeFriend(f.id),
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => toggle(f.id),
							className: cn("h-7 rounded-full px-3 text-[11px] font-bold", on ? "bg-primary text-white" : "bg-bg text-muted"),
							children: on ? "هست" : "نیست"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 17
						}, this)
					]
				}, f.id, true, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 18
				}, this);
			}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
				variant: "lavender",
				className: "mt-3",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 13
				}, this), "دوست جدید"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 33,
			columnNumber: 7
		}, this), open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "sheet",
			onClick: () => setOpen(false),
			role: "presentation",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sheet-panel",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mb-3 text-[16px] font-bold",
						children: "دوست جدید"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						autoFocus: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "اسم",
						className: "mb-3 h-12 w-full rounded-2xl bg-bg px-4 text-[15px] outline-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-4 flex gap-2 overflow-x-auto",
						children: AVATARS.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setAvatar(a),
							className: cn("rounded-full", avatar.id === a.id && "ring-2 ring-primary ring-offset-2"),
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: a.src,
								alt: "",
								className: "size-12 rounded-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 19
							}, this)
						}, a.id, false, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 33
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						onClick: save,
						children: "اضافه کن"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 15
		}, this) : null]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 10
	}, this);
}
//#endregion
export { FriendsPage as component };

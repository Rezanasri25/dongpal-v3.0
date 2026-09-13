import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, i as Phone, o as TopBar, s as cn } from "./money-BI8SPXPF.mjs";
import { t as Btn } from "./ui-D7unGhWs.mjs";
import { i as useDangStore, t as AVATARS } from "./store-ATsZWpAn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BRUUS_fr.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/profile.tsx?tsr-split=component";
function ProfilePage() {
	const nav = useNavigate();
	const profile = useDangStore((s) => s.profile);
	const setProfile = useDangStore((s) => s.setProfile);
	const setOnboarded = useDangStore((s) => s.setOnboarded);
	const addFriend = useDangStore((s) => s.addFriend);
	const friends = useDangStore((s) => s.friends);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
		title: "حساب کاربری",
		subtitle: "همین‌جا روی این دستگاه ذخیره می‌شه",
		onBack: () => nav({ to: "/home" })
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 14,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, {
		nav: false,
		className: "px-5 pb-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "stagger text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: profile.avatar,
					alt: "",
					className: "mx-auto size-28 rounded-full object-cover shadow-[0_12px_30px_rgba(28,32,51,0.12)]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 flex justify-center gap-2 overflow-x-auto pb-2",
					children: AVATARS.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setProfile({
							avatar: a.src,
							color: a.color
						}),
						className: cn("rounded-full", profile.avatar === a.src && "ring-2 ring-primary ring-offset-2"),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: a.src,
							alt: "",
							className: "size-12 rounded-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 25,
							columnNumber: 17
						}, this)
					}, a.id, false, {
						fileName: _jsxFileName,
						lineNumber: 21,
						columnNumber: 31
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					value: profile.name,
					onChange: (e) => setProfile({ name: e.target.value }),
					className: "mt-4 h-14 w-full rounded-2xl bg-white px-4 text-center text-[18px] font-bold shadow-[0_10px_32px_rgba(28,32,51,0.06)] outline-none",
					placeholder: "اسمت چیه؟"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
					className: "mt-6",
					onClick: () => {
						setOnboarded();
						if (!friends.some((f) => f.id === "me")) addFriend({
							id: "me",
							name: profile.name,
							avatar: profile.avatar,
							color: profile.color
						});
						nav({ to: "/home" });
					},
					children: "ذخیره و ادامه"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-[12px] text-muted",
					children: "بدون اینترنت و بدون ثبت‌نام. داده‌ها روی خودت می‌مونه."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 13,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProfilePage as component };

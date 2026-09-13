import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { w as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as Phone } from "./money-BI8SPXPF.mjs";
import { i as Heart, t as Btn } from "./ui-D7unGhWs.mjs";
import { i as useDangStore } from "./store-ATsZWpAn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-XmxApv7j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function WelcomePage() {
	const nav = useNavigate();
	const onboarded = useDangStore((s) => s.onboarded);
	const setOnboarded = useDangStore((s) => s.setOnboarded);
	(0, import_react.useEffect)(() => {
		if (onboarded) nav({
			to: "/home",
			replace: true
		});
	}, [onboarded, nav]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, {
		className: "bg-[#FAF6EF]",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative flex h-full flex-col justify-between overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-8 px-6 text-center z-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-[44px] font-black leading-none tracking-tight text-primary",
						children: "تقسیمینو"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 21,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-[17px] font-bold leading-7 text-ink",
						children: [
							"خرجهامون با هم،",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 26,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1.5",
								children: ["دوستی‌هامون همیشگی", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-4 text-heart fill-heart" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 29,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mx-auto flex flex-1 items-end justify-center w-full max-w-[360px] px-4 -mb-3 z-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "absolute top-2 right-12 z-10 rotate-[-10deg] animate-pulse",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
								width: "38",
								height: "28",
								viewBox: "0 0 38 28",
								fill: "none",
								stroke: "#0A9B82",
								strokeWidth: "2.4",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M4 22h30l-4-15-7 8-4-11-4 11-7-8-4 15z" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 39,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
										cx: "4",
										cy: "7",
										r: "1.5",
										fill: "#0A9B82"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 40,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
										cx: "19",
										cy: "4",
										r: "1.5",
										fill: "#0A9B82"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 41,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
										cx: "34",
										cy: "7",
										r: "1.5",
										fill: "#0A9B82"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 42,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "absolute top-4 left-14 z-10 text-primary text-[20px] font-bold select-none rotate-12",
							children: "✦"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 47,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "absolute top-14 left-3 z-10 rotate-[8deg] select-none text-primary font-bold text-[13px] leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "با هم" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 54,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 53,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "سبک‌تر!" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 57,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-grid size-5 place-items-center rounded-full border-[1.8px] border-primary text-[11px] font-extrabold",
									children: ":)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 58,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: "/art/hero_clean.png",
							alt: "دوستان تقسیمینو",
							className: "w-full max-h-[min(54vh,440px)] object-contain object-bottom pointer-events-none select-none drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative z-10 bg-white rounded-t-[36px] px-6 pt-6 pb-6 shadow-[0_-12px_32px_rgba(28,32,51,0.06)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
							onClick: () => {
								setOnboarded();
								nav({ to: "/home" });
							},
							className: "h-14 text-[16px] font-extrabold shadow-[0_10px_24px_rgba(10,155,130,0.28)]",
							children: ["شروع کنیم", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-7 place-items-center rounded-full bg-white/20 mr-1",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, {
									size: 16,
									strokeWidth: 2.6
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 78,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
							variant: "lavender",
							onClick: () => nav({ to: "/profile" }),
							className: "mt-3 h-14 text-[15.5px] font-extrabold",
							children: "ورود به حساب کاربری"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-center text-[12px] font-semibold text-muted",
							children: "بدون ثبت‌نام هم می‌تونی استفاده کنی"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto mt-4 h-1 w-28 rounded-full bg-[#1C2033]/15" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { WelcomePage as component };

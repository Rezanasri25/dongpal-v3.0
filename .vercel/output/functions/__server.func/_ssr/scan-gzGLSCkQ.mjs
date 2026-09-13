import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Image, p as LoaderCircle, t as Zap } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { f as formatAmountWithUnit, i as Phone, o as TopBar } from "./money-BI8SPXPF.mjs";
import { t as Btn } from "./ui-D7unGhWs.mjs";
import { i as useDangStore } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scan-gzGLSCkQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var parseReceipt = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("fcec610c2504bb1f8ffac937c32fa6d3f102d046a73ae3fed34c95260613cb39"));
var _jsxFileName = "/app/applet/src/routes/scan.tsx?tsr-split=component";
function ScanPage() {
	const nav = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const applyReceipt = useDangStore((s) => s.applyReceipt);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [parsed, setParsed] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)("/art/receipt.jpg");
	const [flash, setFlash] = (0, import_react.useState)(false);
	async function run(blob, demo) {
		setBusy(true);
		try {
			let imageBase64 = "";
			let mime = "image/jpeg";
			if (blob && !demo) {
				const packed = await compress(blob);
				imageBase64 = packed.b64;
				mime = packed.mime;
			}
			const res = await parseReceipt({ data: {
				imageBase64,
				mime,
				demo
			} });
			if (!res.ok) {
				toast("نتونستم رسید رو بخونم — دستی وارد کن");
				return;
			}
			setParsed(res.receipt);
		} catch {
			toast("خطا در اسکن");
		} finally {
			setBusy(false);
		}
	}
	function confirm() {
		if (!parsed) return;
		applyReceipt({
			merchant: parsed.merchant,
			total: parsed.total,
			tax: parsed.tax,
			items: parsed.items,
			currency: parsed.currency
		});
		toast("رسید اعمال شد");
		nav({ to: parsed.items.length ? "/items" : "/home" });
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full min-h-0 flex-1 flex-col bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-white",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
					title: "اسکن رسید",
					subtitle: "با یک عکس، همه‌چیز ساده‌تر",
					onBack: () => nav({ to: "/home" }),
					light: true
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative min-h-0 flex-1 overflow-hidden bg-[#2a2d36]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: preview,
						alt: "رسید",
						className: "h-full w-full object-cover opacity-90"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "viewfinder",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "tl" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "tr" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "bl" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "br" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "absolute bottom-6 left-0 right-0 text-center text-[13px] font-semibold text-white",
						children: "رسید را در کادر قرار دهید"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 11
					}, this),
					busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute inset-0 grid place-items-center bg-black/40",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-10 animate-spin text-white" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 19
					}, this) : null
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between px-8 pb-[calc(18px+env(safe-area-inset-bottom))] pt-4 bg-[#1c2033]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-label": "گالری",
						className: "grid size-12 place-items-center rounded-2xl bg-white/10 text-white",
						onClick: () => fileRef.current?.click(),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { size: 22 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 84,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-label": "شutter",
						disabled: busy,
						onClick: () => run(null, true),
						className: "grid size-[74px] place-items-center rounded-full border-4 border-white/70 bg-primary shadow-[0_8px_24px_rgba(10,155,130,0.45)] active:scale-[0.96]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-14 rounded-full bg-white/20" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-label": "فلاش",
						onClick: () => setFlash((v) => !v),
						className: `grid size-12 place-items-center rounded-2xl ${flash ? "bg-primary text-white" : "bg-white/10 text-white"}`,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { size: 22 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						capture: "environment",
						className: "hidden",
						onChange: async (e) => {
							const f = e.target.files?.[0];
							if (!f) return;
							setPreview(URL.createObjectURL(f));
							await run(f, false);
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 82,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 61,
		columnNumber: 7
	}, this), parsed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "sheet",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "sheet-panel max-h-[78%] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-[16px] font-bold",
					children: parsed.merchant || "رسید"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-[22px] font-extrabold tabular",
					children: formatAmountWithUnit(parsed.total, parsed.currency)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "mt-3 space-y-2",
					children: parsed.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "flex justify-between text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: it.name }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "tabular font-semibold",
							children: formatAmountWithUnit(it.amount, parsed.currency)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 19
						}, this)]
					}, i, true, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 44
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 108,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						variant: "ghost",
						onClick: () => setParsed(null),
						children: "دوباره"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						onClick: confirm,
						children: "تایید و ادامه"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 17
	}, this) : null] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 10
	}, this);
}
async function compress(file) {
	const img = await createImageBitmap(file);
	const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(img.width * scale);
	canvas.height = Math.round(img.height * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) return {
		b64: "",
		mime: "image/jpeg"
	};
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	return {
		b64: canvas.toDataURL("image/jpeg", .72).split(",")[1] ?? "",
		mime: "image/jpeg"
	};
}
//#endregion
export { ScanPage as component };

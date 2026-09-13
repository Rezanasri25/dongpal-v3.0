import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, a as Share2, b as Copy, l as QrCode, m as Link2 } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Scroll, f as formatAmountWithUnit, h as toPersianDigits, i as Phone, o as TopBar, t as Avatar } from "./money-BI8SPXPF.mjs";
import { n as Confetti, t as Btn } from "./ui-D7unGhWs.mjs";
import { i as useDangStore, r as settle } from "./store-ATsZWpAn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as shareText, o as shareUrl, r as nativeShare, t as copyText } from "./share-DYFYe-Pd.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
import { t as toPng } from "../_libs/html-to-image.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result-CfxXyRIz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var _jsxFileName = "/app/applet/src/routes/result.tsx?tsr-split=component";
function ResultPage() {
	const nav = useNavigate();
	const entry = useDangStore((s) => s.lastResult);
	const setPaidBy = useDangStore((s) => s.setPaidBy);
	const setRemindPerson = useDangStore((s) => s.setRemindPerson);
	const [qr, setQr] = (0, import_react.useState)(null);
	const [showQr, setShowQr] = (0, import_react.useState)(false);
	const cardRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!entry) nav({
			to: "/home",
			replace: true
		});
	}, [entry, nav]);
	const url = (0, import_react.useMemo)(() => entry ? shareUrl(entry) : "", [entry]);
	(0, import_react.useEffect)(() => {
		if (!url) return;
		import_lib.toDataURL(url, {
			margin: 1,
			width: 280,
			color: {
				dark: "#1C2033",
				light: "#FFFFFF"
			}
		}).then(setQr);
	}, [url]);
	if (!entry) return null;
	const debts = settle(entry.shares, entry.paidBy);
	async function copyOne(label, text) {
		const ok = await copyText(text);
		toast(ok ? `${label} کپی شد` : "کپی نشد");
	}
	async function shareAll() {
		const text = shareText(entry);
		if (!await nativeShare({
			title: entry.title,
			text,
			url
		})) await copyOne("متن تقسیم", `${text}\n${url}`);
	}
	async function shareImage() {
		if (!cardRef.current) return;
		try {
			const dataUrl = await toPng(cardRef.current, {
				pixelRatio: 2,
				cacheBust: true,
				backgroundColor: "#F5F6FB"
			});
			const blob = await (await fetch(dataUrl)).blob();
			const file = new File([blob], "dangpal.png", { type: "image/png" });
			if (navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: entry.title
				});
				return;
			}
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = "dangpal.png";
			a.click();
			toast("تصویر ذخیره شد");
		} catch {
			toast("نتونستم تصویر بسازم");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Confetti, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TopBar, {
				title: "نتیجه تقسیم",
				subtitle: "همه‌چیز آماده‌ست!",
				onBack: () => nav({ to: "/home" })
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scroll, {
			nav: false,
			className: "px-5 pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "stagger space-y-3 pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 rounded-[22px] bg-success-soft px-4 py-3.5 border border-primary/10",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid size-9 place-items-center rounded-full bg-primary text-white shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
								size: 18,
								strokeWidth: 3
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[14px] font-extrabold text-primary",
							children: "تقسیم با موفقیت انجام شد"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "flex items-center gap-1 text-[12px] font-medium text-muted",
							children: ["در کنار هم، همیشه بهتره", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-heart",
								children: "💜"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "card divide-y divide-line overflow-hidden",
						children: entry.shares.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
									src: s.avatar,
									name: s.name,
									size: 44
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 110,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[14px] font-bold",
										children: s.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 112,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[11px] text-muted",
										children: [toPersianDigits(s.percent), "٪"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 113,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[14px] font-extrabold tabular",
									children: formatAmountWithUnit(s.amount, entry.currency)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									"aria-label": "کپی",
									className: "grid size-9 place-items-center rounded-xl bg-bg text-muted active:scale-[0.96]",
									onClick: () => copyOne("مبلغ", formatAmountWithUnit(s.amount, entry.currency)),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { size: 15 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 117,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 17
								}, this)
							]
						}, s.id, true, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 36
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "card px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mb-2 text-[12px] font-semibold text-muted",
								children: "کی پرداخت کرد؟"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-2 overflow-x-auto pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setPaidBy(null),
									className: `chip shrink-0 ${!entry.paidBy ? "active" : ""}`,
									children: "هنوز مشخص نیست"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 15
								}, this), entry.people.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setPaidBy(p.id),
									className: `chip shrink-0 ${entry.paidBy === p.id ? "active" : ""}`,
									children: p.name
								}, p.id, false, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 38
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 13
							}, this),
							debts.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 space-y-1.5",
								children: debts.map((d) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[12.5px] text-ink",
									children: [
										d.from.name,
										" → ",
										d.to.name,
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold",
											children: formatAmountWithUnit(d.amount, entry.currency)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 135,
											columnNumber: 21
										}, this)
									]
								}, d.from.id, true, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 33
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 29
							}, this) : null
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						variant: "accent",
						onClick: shareAll,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, { size: 18 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 13
						}, this), "اشتراک‌گذاری نتیجه"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
							variant: "lavender",
							className: "h-12 text-[13.5px]",
							onClick: () => copyOne("لینک دعوت", url),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link2, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 15
							}, this), "لینک دعوت"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
							variant: "lavender",
							className: "h-12 text-[13.5px]",
							onClick: () => setShowQr(true),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 15
							}, this), "QR کد"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
							variant: "ghost",
							className: "h-12 text-[13.5px]",
							onClick: () => {
								setRemindPerson(entry.shares[0]?.id ?? null);
								nav({ to: "/remind" });
							},
							children: "یادآوری دوستانه"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
							variant: "ghost",
							className: "h-12 text-[13.5px]",
							onClick: shareImage,
							children: "ذخیره کارت"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pointer-events-none absolute -left-[9999px] top-0",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					ref: cardRef,
					className: "w-[390px] bg-[#FAF6EF] p-6 rounded-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-center text-[24px] font-black text-primary",
							children: "تقسیمینو"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mb-4 text-center text-[13px] font-medium text-muted",
							children: entry.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-[24px] bg-white p-4 shadow-sm space-y-2",
							children: entry.shares.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between py-2 border-b border-line last:border-b-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-bold text-[14px] text-ink",
									children: s.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 175,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-extrabold text-[15px] tabular text-primary",
									children: formatAmountWithUnit(s.amount, entry.currency)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 19
								}, this)]
							}, s.id, true, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 38
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-center text-[12px] font-bold text-muted",
							children: "خرجهامون با هم، دوستی‌هامون همیشگی 💜"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 170,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 7
		}, this),
		showQr ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "sheet",
			onClick: () => setShowQr(false),
			role: "presentation",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sheet-panel text-center",
				onClick: (e) => e.stopPropagation(),
				role: "dialog",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mb-3 text-[16px] font-bold",
						children: "کد دعوت"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 13
					}, this),
					qr ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: qr,
						alt: "QR",
						className: "mx-auto size-52 rounded-2xl"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 190,
						columnNumber: 19
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-[12px] text-muted",
						children: "با اسکن، نتیجه تقسیم باز می‌شه"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Btn, {
						className: "mt-4",
						onClick: () => setShowQr(false),
						children: "باشه"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 187,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 186,
			columnNumber: 17
		}, this) : null
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 10
	}, this);
}
//#endregion
export { ResultPage as component };

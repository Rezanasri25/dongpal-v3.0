import { f as formatAmountWithUnit } from "./money-BI8SPXPF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-DYFYe-Pd.js
function toPayload(entry) {
	return {
		v: 1,
		t: entry.title,
		c: entry.currency,
		g: entry.grand,
		d: entry.createdAt,
		p: entry.shares.map((s) => ({
			n: s.name,
			a: s.avatar,
			s: s.amount,
			c: s.color
		})),
		pay: entry.paidBy
	};
}
function encodePayload(p) {
	const json = JSON.stringify(p);
	return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function decodePayload(raw) {
	try {
		let b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
		while (b64.length % 4) b64 += "=";
		const json = decodeURIComponent(escape(atob(b64)));
		const p = JSON.parse(json);
		if (p?.v !== 1 || !Array.isArray(p.p)) return null;
		return p;
	} catch {
		return null;
	}
}
function shareUrl(entry) {
	return `${typeof window !== "undefined" ? window.location.origin : ""}/s?d=${encodePayload(toPayload(entry))}`;
}
function shareText(entry, personName) {
	const lines = [
		`تقسیمینو · ${entry.title}`,
		`مبلغ کل: ${formatAmountWithUnit(entry.grand, entry.currency)}`,
		"",
		...entry.shares.map((s) => `• ${s.name}: ${formatAmountWithUnit(s.amount, entry.currency)}`)
	];
	if (personName) {
		const row = entry.shares.find((s) => s.name === personName);
		if (row) return [
			`سلام ${personName}!`,
			`سهم شما از «${entry.title}» ${formatAmountWithUnit(row.amount, entry.currency)} است.`,
			"ممنون که همیشه همراهی 🙏",
			"",
			"تقسیمینو 💜"
		].join("\n");
	}
	return lines.join("\n");
}
function remindText(entry, name, amount) {
	return [
		`سلام!`,
		`سهم شما از هزینه امروز`,
		`${formatAmountWithUnit(amount, entry.currency)}`,
		`است.`,
		`ممنون که همیشه همراهی 🙏`
	].join("\n");
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		try {
			const ta = document.createElement("textarea");
			ta.value = text;
			ta.style.position = "fixed";
			ta.style.left = "-9999px";
			document.body.appendChild(ta);
			ta.select();
			const ok = document.execCommand("copy");
			document.body.removeChild(ta);
			return ok;
		} catch {
			return false;
		}
	}
}
async function nativeShare(opts) {
	try {
		if (navigator.share) {
			await navigator.share(opts);
			return true;
		}
	} catch {
		return false;
	}
	return false;
}
function waLink(text) {
	return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
function tgLink(text, url) {
	const u = url ? `&url=${encodeURIComponent(url)}` : "";
	return `https://t.me/share/url?text=${encodeURIComponent(text)}${u}`;
}
function smsLink(text) {
	return `sms:?&body=${encodeURIComponent(text)}`;
}
//#endregion
export { shareText as a, tgLink as c, remindText as i, waLink as l, decodePayload as n, shareUrl as o, nativeShare as r, smsLink as s, copyText as t };

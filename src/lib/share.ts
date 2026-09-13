import type { HistoryEntry, SharePayload } from "./types";
import { formatAmountWithUnit } from "./money";

export function toPayload(entry: HistoryEntry): SharePayload {
  return {
    v: 1,
    t: entry.title,
    c: entry.currency,
    g: entry.grand,
    d: entry.createdAt,
    p: entry.shares.map((s) => ({ n: s.name, a: s.avatar, s: s.amount, c: s.color })),
    pay: entry.paidBy,
  };
}

export function encodePayload(p: SharePayload): string {
  const json = JSON.stringify(p);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodePayload(raw: string): SharePayload | null {
  try {
    let b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const json = decodeURIComponent(escape(atob(b64)));
    const p = JSON.parse(json) as SharePayload;
    if (p?.v !== 1 || !Array.isArray(p.p)) return null;
    return p;
  } catch {
    return null;
  }
}

export function shareUrl(entry: HistoryEntry): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/s?d=${encodePayload(toPayload(entry))}`;
}

export function shareText(entry: HistoryEntry, personName?: string): string {
  const lines = [
    `تقسیمینو · ${entry.title}`,
    `مبلغ کل: ${formatAmountWithUnit(entry.grand, entry.currency)}`,
    "",
    ...entry.shares.map((s) => `• ${s.name}: ${formatAmountWithUnit(s.amount, entry.currency)}`),
  ];
  if (personName) {
    const row = entry.shares.find((s) => s.name === personName);
    if (row) {
      return [
        `سلام ${personName}!`,
        `سهم شما از «${entry.title}» ${formatAmountWithUnit(row.amount, entry.currency)} است.`,
        "ممنون که همیشه همراهی 🙏",
        "",
        "تقسیمینو 💜",
      ].join("\n");
    }
  }
  return lines.join("\n");
}

export function remindText(entry: HistoryEntry, name: string, amount: number): string {
  return [
    `سلام!`,
    `سهم شما از هزینه امروز`,
    `${formatAmountWithUnit(amount, entry.currency)}`,
    `است.`,
    `ممنون که همیشه همراهی 🙏`,
  ].join("\n");
}

export async function copyText(text: string): Promise<boolean> {
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

export async function nativeShare(opts: { title: string; text: string; url?: string }): Promise<boolean> {
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

export function waLink(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function tgLink(text: string, url?: string) {
  const u = url ? `&url=${encodeURIComponent(url)}` : "";
  return `https://t.me/share/url?text=${encodeURIComponent(text)}${u}`;
}

export function smsLink(text: string) {
  return `sms:?&body=${encodeURIComponent(text)}`;
}

import { t as SAMPLE_RECEIPT } from "./sample-BEk908eW.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parse-receipt-iVeE4vi4.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var PROMPT = `You extract data from a restaurant/shop receipt photo.
Return ONLY a JSON object with this shape:
{
  "merchant": string,
  "date": string | null,
  "currency": "IRR" | "IRT" | "USD" | "EUR" | "AED" | "TRY" | "GBP",
  "items": [{"name": string, "amount": number}],
  "subtotal": number | null,
  "tax": number | null,
  "tip": number | null,
  "total": number
}
Rules:
- amounts are numbers, no thousand separators
- if the receipt is Iranian, prefer IRR (rial). If amounts look like toman, still return IRR = toman * 10 when the heading says rial, otherwise IRT
- ignore QR codes and ads
- if a field is unreadable, use null (except total and items)
- Persian item names should stay in Persian
JSON only, no markdown.`;
var parseReceipt_createServerFn_handler = createServerRpc({
	id: "fcec610c2504bb1f8ffac937c32fa6d3f102d046a73ae3fed34c95260613cb39",
	name: "parseReceipt",
	filename: "src/lib/parse-receipt.ts"
}, (opts) => parseReceipt.__executeServer(opts));
var parseReceipt = createServerFn({ method: "POST" }).validator((input) => input).handler(parseReceipt_createServerFn_handler, async ({ data }) => {
	if (data.demo) return {
		ok: true,
		receipt: {
			merchant: SAMPLE_RECEIPT.merchant,
			date: SAMPLE_RECEIPT.date,
			currency: SAMPLE_RECEIPT.currency,
			items: SAMPLE_RECEIPT.items,
			subtotal: SAMPLE_RECEIPT.subtotal,
			tax: SAMPLE_RECEIPT.tax,
			tip: SAMPLE_RECEIPT.tip,
			total: SAMPLE_RECEIPT.total
		}
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 900,
				temperature: 0,
				messages: [{
					role: "user",
					content: [{
						type: "image_url",
						image_url: { url: `data:${data.mime};base64,${data.imageBase64}` }
					}, {
						type: "text",
						text: PROMPT
					}]
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `xAI API error ${res.status}`
		};
		const jsonText = ((await res.json()).choices?.[0]?.message?.content ?? "").replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
		const start = jsonText.indexOf("{");
		const end = jsonText.lastIndexOf("}");
		if (start < 0 || end < 0) return {
			ok: false,
			error: "parse-failed"
		};
		const parsed = JSON.parse(jsonText.slice(start, end + 1));
		if (!parsed.total || !Array.isArray(parsed.items)) return {
			ok: false,
			error: "parse-failed"
		};
		return {
			ok: true,
			receipt: parsed
		};
	} catch {
		return {
			ok: false,
			error: "network"
		};
	}
});
//#endregion
export { parseReceipt_createServerFn_handler };

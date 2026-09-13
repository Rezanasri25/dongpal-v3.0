import { createServerFn } from "@tanstack/react-start";
import { SAMPLE_RECEIPT } from "./sample";

export type ParsedReceipt = {
  merchant: string;
  date: string | null;
  currency: "IRR" | "IRT" | "USD" | "EUR" | "AED" | "TRY" | "GBP";
  items: { name: string; amount: number }[];
  subtotal: number | null;
  tax: number | null;
  tip: number | null;
  total: number;
};

const PROMPT = `You extract data from a restaurant/shop receipt photo.
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

export const parseReceipt = createServerFn({ method: "POST" })
  .validator((input: { imageBase64: string; mime: string; demo?: boolean }) => input)
  .handler(async ({ data }): Promise<{ ok: true; receipt: ParsedReceipt } | { ok: false; error: string }> => {
    if (data.demo) {
      return {
        ok: true,
        receipt: {
          merchant: SAMPLE_RECEIPT.merchant,
          date: SAMPLE_RECEIPT.date,
          currency: SAMPLE_RECEIPT.currency,
          items: SAMPLE_RECEIPT.items,
          subtotal: SAMPLE_RECEIPT.subtotal,
          tax: SAMPLE_RECEIPT.tax,
          tip: SAMPLE_RECEIPT.tip,
          total: SAMPLE_RECEIPT.total,
        },
      };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "AI is not available" };
    }

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 900,
          temperature: 0,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${data.mime};base64,${data.imageBase64}`,
                  },
                },
                { type: "text", text: PROMPT },
              ],
            },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: false, error: `xAI API error ${res.status}` };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content ?? "";
      const jsonText = text.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
      const start = jsonText.indexOf("{");
      const end = jsonText.lastIndexOf("}");
      if (start < 0 || end < 0) return { ok: false, error: "parse-failed" };
      const parsed = JSON.parse(jsonText.slice(start, end + 1)) as ParsedReceipt;
      if (!parsed.total || !Array.isArray(parsed.items)) {
        return { ok: false, error: "parse-failed" };
      }
      return { ok: true, receipt: parsed };
    } catch {
      return { ok: false, error: "network" };
    }
  });

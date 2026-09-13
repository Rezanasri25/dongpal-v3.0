import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImageIcon, Loader2, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Phone, TopBar } from "@/components/shell";
import { Btn } from "@/components/ui";
import { parseReceipt, type ParsedReceipt } from "@/lib/parse-receipt";
import { formatAmountWithUnit } from "@/lib/money";
import { useDangStore } from "@/lib/store";

export const Route = createFileRoute("/scan")({ component: ScanPage });

function ScanPage() {
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const applyReceipt = useDangStore((s) => s.applyReceipt);
  const [busy, setBusy] = useState(false);
  const [parsed, setParsed] = useState<ParsedReceipt | null>(null);
  const [preview, setPreview] = useState("/art/receipt.jpg");
  const [flash, setFlash] = useState(false);

  async function run(blob: Blob | null, demo: boolean) {
    setBusy(true);
    try {
      let imageBase64 = "";
      let mime = "image/jpeg";
      if (blob && !demo) {
        const packed = await compress(blob);
        imageBase64 = packed.b64;
        mime = packed.mime;
      }
      const res = await parseReceipt({ data: { imageBase64, mime, demo } });
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
      currency: parsed.currency,
    });
    toast("رسید اعمال شد");
    nav({ to: parsed.items.length ? "/items" : "/home" });
  }

  return (
    <Phone>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-ink">
        <div className="text-white">
          <TopBar
            title="اسکن رسید"
            subtitle="با یک عکس، همه‌چیز ساده‌تر"
            onBack={() => nav({ to: "/home" })}
            light
          />
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#2a2d36]">
          <img src={preview} alt="رسید" className="h-full w-full object-cover opacity-90" />
          <div className="viewfinder">
            <span className="tl" />
            <span className="tr" />
            <span className="bl" />
            <span className="br" />
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-[13px] font-semibold text-white">
            رسید را در کادر قرار دهید
          </p>
          {busy ? (
            <div className="absolute inset-0 grid place-items-center bg-black/40">
              <Loader2 className="size-10 animate-spin text-white" />
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between px-8 pb-[calc(18px+env(safe-area-inset-bottom))] pt-4 bg-[#1c2033]">
          <button
            type="button"
            aria-label="گالری"
            className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white"
            onClick={() => fileRef.current?.click()}
          >
            <ImageIcon size={22} />
          </button>
          <button
            type="button"
            aria-label="شutter"
            disabled={busy}
            onClick={() => run(null, true)}
            className="grid size-[74px] place-items-center rounded-full border-4 border-white/70 bg-primary shadow-[0_8px_24px_rgba(10,155,130,0.45)] active:scale-[0.96]"
          >
            <span className="size-14 rounded-full bg-white/20" />
          </button>
          <button
            type="button"
            aria-label="فلاش"
            onClick={() => setFlash((v) => !v)}
            className={`grid size-12 place-items-center rounded-2xl ${flash ? "bg-primary text-white" : "bg-white/10 text-white"}`}
          >
            <Zap size={22} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setPreview(URL.createObjectURL(f));
              await run(f, false);
            }}
          />
        </div>
      </div>

      {parsed ? (
        <div className="sheet" role="presentation">
          <div className="sheet-panel max-h-[78%] overflow-y-auto">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
            <h3 className="text-[16px] font-bold">{parsed.merchant || "رسید"}</h3>
            <p className="mt-1 text-[22px] font-extrabold tabular">
              {formatAmountWithUnit(parsed.total, parsed.currency)}
            </p>
            <ul className="mt-3 space-y-2">
              {parsed.items.map((it, i) => (
                <li key={i} className="flex justify-between text-[13px]">
                  <span>{it.name}</span>
                  <span className="tabular font-semibold">
                    {formatAmountWithUnit(it.amount, parsed.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Btn variant="ghost" onClick={() => setParsed(null)}>
                دوباره
              </Btn>
              <Btn onClick={confirm}>تایید و ادامه</Btn>
            </div>
          </div>
        </div>
      ) : null}
    </Phone>
  );
}

async function compress(file: Blob): Promise<{ b64: string; mime: string }> {
  const img = await createImageBitmap(file);
  const max = 1024;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return { b64: "", mime: "image/jpeg" };
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
  return { b64: dataUrl.split(",")[1] ?? "", mime: "image/jpeg" };
}



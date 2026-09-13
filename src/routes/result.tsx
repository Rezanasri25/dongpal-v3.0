import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Copy, Link2, QrCode, Share2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll, TopBar } from "@/components/shell";
import { Btn, Confetti } from "@/components/ui";
import { copyText, nativeShare, shareText, shareUrl } from "@/lib/share";
import { formatAmountWithUnit, toPersianDigits } from "@/lib/money";
import { settle } from "@/lib/split";
import { useDangStore } from "@/lib/store";
import QRCode from "qrcode";
import { toPng } from "html-to-image";

export const Route = createFileRoute("/result")({ component: ResultPage });

function ResultPage() {
  const nav = useNavigate();
  const entry = useDangStore((s) => s.lastResult);
  const setPaidBy = useDangStore((s) => s.setPaidBy);
  const setRemindPerson = useDangStore((s) => s.setRemindPerson);
  const [qr, setQr] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!entry) nav({ to: "/home", replace: true });
  }, [entry, nav]);

  const url = useMemo(() => (entry ? shareUrl(entry) : ""), [entry]);

  useEffect(() => {
    if (!url) return;
    QRCode.toDataURL(url, { margin: 1, width: 280, color: { dark: "#1C2033", light: "#FFFFFF" } }).then(
      setQr,
    );
  }, [url]);

  if (!entry) return null;

  const debts = settle(entry.shares, entry.paidBy);

  async function copyOne(label: string, text: string) {
    const ok = await copyText(text);
    toast(ok ? `${label} کپی شد` : "کپی نشد");
  }

  async function shareAll() {
    const text = shareText(entry!);
    const did = await nativeShare({ title: entry!.title, text, url });
    if (!did) {
      await copyOne("متن تقسیم", `${text}\n${url}`);
    }
  }

  async function shareImage() {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#F5F6FB",
      });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "dangpal.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: entry!.title });
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

  return (
    <Phone>
      <div className="relative">
        <Confetti />
        <TopBar title="نتیجه تقسیم" subtitle="همه‌چیز آماده‌ست!" onBack={() => nav({ to: "/home" })} />
      </div>
      <Scroll nav={false} className="px-5 pb-8">
        <div className="stagger space-y-3 pt-1">
          <div className="flex items-center gap-3 rounded-[22px] bg-success-soft px-4 py-3.5 border border-primary/10">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-white shadow-sm">
              <Check size={18} strokeWidth={3} />
            </span>
            <div>
              <p className="text-[14px] font-extrabold text-primary">تقسیم با موفقیت انجام شد</p>
              <p className="flex items-center gap-1 text-[12px] font-medium text-muted">
                در کنار هم، همیشه بهتره
                <span className="text-heart">💜</span>
              </p>
            </div>
          </div>

          <div className="card divide-y divide-line overflow-hidden">
            {entry.shares.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar src={s.avatar} name={s.name} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold">{s.name}</p>
                  <p className="text-[11px] text-muted">{toPersianDigits(s.percent)}٪</p>
                </div>
                <p className="text-[14px] font-extrabold tabular">{formatAmountWithUnit(s.amount, entry.currency)}</p>
                <button
                  type="button"
                  aria-label="کپی"
                  className="grid size-9 place-items-center rounded-xl bg-bg text-muted active:scale-[0.96]"
                  onClick={() => copyOne("مبلغ", formatAmountWithUnit(s.amount, entry.currency))}
                >
                  <Copy size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="card px-4 py-3">
            <p className="mb-2 text-[12px] font-semibold text-muted">کی پرداخت کرد؟</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setPaidBy(null)}
                className={`chip shrink-0 ${!entry.paidBy ? "active" : ""}`}
              >
                هنوز مشخص نیست
              </button>
              {entry.people.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaidBy(p.id)}
                  className={`chip shrink-0 ${entry.paidBy === p.id ? "active" : ""}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            {debts.length ? (
              <div className="mt-3 space-y-1.5">
                {debts.map((d) => (
                  <p key={d.from.id} className="text-[12.5px] text-ink">
                    {d.from.name} → {d.to.name}{" "}
                    <span className="font-bold">{formatAmountWithUnit(d.amount, entry.currency)}</span>
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          <Btn variant="accent" onClick={shareAll}>
            <Share2 size={18} />
            اشتراک‌گذاری نتیجه
          </Btn>
          <div className="grid grid-cols-2 gap-2">
            <Btn
              variant="lavender"
              className="h-12 text-[13.5px]"
              onClick={() => copyOne("لینک دعوت", url)}
            >
              <Link2 size={16} />
              لینک دعوت
            </Btn>
            <Btn variant="lavender" className="h-12 text-[13.5px]" onClick={() => setShowQr(true)}>
              <QrCode size={16} />
              QR کد
            </Btn>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Btn
              variant="ghost"
              className="h-12 text-[13.5px]"
              onClick={() => {
                setRemindPerson(entry.shares[0]?.id ?? null);
                nav({ to: "/remind" });
              }}
            >
              یادآوری دوستانه
            </Btn>
            <Btn variant="ghost" className="h-12 text-[13.5px]" onClick={shareImage}>
              ذخیره کارت
            </Btn>
          </div>
        </div>

        <div className="pointer-events-none absolute -left-[9999px] top-0">
          <div ref={cardRef} className="w-[390px] bg-[#FAF6EF] p-6 rounded-3xl">
            <p className="text-center text-[24px] font-black text-primary">تقسیمینو</p>
            <p className="mb-4 text-center text-[13px] font-medium text-muted">{entry.title}</p>
            <div className="rounded-[24px] bg-white p-4 shadow-sm space-y-2">
              {entry.shares.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-line last:border-b-0">
                  <span className="font-bold text-[14px] text-ink">{s.name}</span>
                  <span className="font-extrabold text-[15px] tabular text-primary">{formatAmountWithUnit(s.amount, entry.currency)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[12px] font-bold text-muted">
              خرجهامون با هم، دوستی‌هامون همیشگی 💜
            </p>
          </div>
        </div>
      </Scroll>

      {showQr ? (
        <div className="sheet" onClick={() => setShowQr(false)} role="presentation">
          <div className="sheet-panel text-center" onClick={(e) => e.stopPropagation()} role="dialog">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
            <h3 className="mb-3 text-[16px] font-bold">کد دعوت</h3>
            {qr ? <img src={qr} alt="QR" className="mx-auto size-52 rounded-2xl" /> : null}
            <p className="mt-3 text-[12px] text-muted">با اسکن، نتیجه تقسیم باز می‌شه</p>
            <Btn className="mt-4" onClick={() => setShowQr(false)}>
              باشه
            </Btn>
          </div>
        </div>
      ) : null}
    </Phone>
  );
}

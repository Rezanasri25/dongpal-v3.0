import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll, TopBar } from "@/components/shell";
import { Btn } from "@/components/ui";
import { copyText, nativeShare, remindText, smsLink, tgLink, waLink } from "@/lib/share";
import { formatAmountWithUnit } from "@/lib/money";
import { useDangStore } from "@/lib/store";

export const Route = createFileRoute("/remind")({ component: RemindPage });

function RemindPage() {
  const nav = useNavigate();
  const entry = useDangStore((s) => s.lastResult);
  const remindId = useDangStore((s) => s.remindPersonId);
  const setRemind = useDangStore((s) => s.setRemindPerson);
  const person = entry?.shares.find((s) => s.id === remindId) ?? entry?.shares[0];
  const [text, setText] = useState("");

  const message = useMemo(() => {
    if (text) return text;
    if (!entry || !person) return "";
    return remindText(entry, person.name, person.amount);
  }, [text, entry, person]);

  if (!entry || !person) {
    return (
      <Phone>
        <TopBar title="یادآوری دوستانه" onBack={() => nav({ to: "/home" })} />
        <p className="px-6 pt-10 text-center text-muted">اول یک تقسیم انجام بده</p>
      </Phone>
    );
  }

  async function send() {
    const did = await nativeShare({ title: "یادآوری تقسیمینو", text: message });
    if (!did) {
      await copyText(message);
      toast("پیام کپی شد");
    }
  }

  return (
    <Phone>
      <TopBar
        title="یادآوری دوستانه"
        subtitle="با یک پیام، حساب‌وکتاب رو راحت کن"
        onBack={() => nav({ to: "/result" })}
      />
      <Scroll nav={false} className="px-5 pb-8">
        <div className="stagger">
          <div className="relative mx-auto h-[210px] w-full flex items-center justify-center">
            <img
              src="/art/plane_clean.png"
              alt="هواپیمای یادآوری"
              className="plane-bob mx-auto h-[190px] w-auto object-contain drop-shadow-sm select-none pointer-events-none"
            />
            <div className="absolute top-3 left-4 rounded-2xl bg-accent-soft px-3.5 py-2 text-[12.5px] font-extrabold text-accent shadow-[0_8px_20px_rgba(123,108,246,0.16)] flex items-center gap-1">
              <span>یه یادآوری دوستانه!</span>
              <span className="text-heart">💜</span>
            </div>
          </div>

          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {entry.shares.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setRemind(s.id);
                  setText("");
                }}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-150 ${s.id === person.id ? "bg-primary-soft text-primary font-bold shadow-sm" : "bg-white text-muted font-medium"}`}
              >
                <Avatar src={s.avatar} name={s.name} size={28} />
                <span className="pl-1 text-[12.5px]">{s.name}</span>
              </button>
            ))}
          </div>

          <div className="card px-5 py-4 border border-line">
            <p className="mb-2 text-[13px] font-bold text-ink">سلام!</p>
            <textarea
              value={message}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full resize-none bg-transparent text-[14.5px] leading-7 text-ink outline-none"
            />
            <div className="mt-3 pt-2 border-t border-line flex items-center justify-between">
              <span className="text-[12px] text-muted">مبلغ سهم:</span>
              <span className="text-[15px] font-black tabular text-primary">
                {formatAmountWithUnit(person.amount, entry.currency)}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            <a
              className="card flex flex-col items-center gap-1.5 py-3 text-[11.5px] font-bold text-ink hover:bg-line/40 transition-colors"
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#E7F8EF] text-[#25D366]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.83-3.05-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.25-8.19 8.25z"/>
                </svg>
              </span>
              واتساپ
            </a>
            <a
              className="card flex flex-col items-center gap-1.5 py-3 text-[11.5px] font-bold text-ink hover:bg-line/40 transition-colors"
              href={tgLink(message)}
              target="_blank"
              rel="noreferrer"
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#E6F4FB] text-[#229ED9]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </span>
              تلگرام
            </a>
            <a
              className="card flex flex-col items-center gap-1.5 py-3 text-[11.5px] font-bold text-ink hover:bg-line/40 transition-colors"
              href={smsLink(message)}
            >
              <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              پیامک
            </a>
            <button
              type="button"
              className="card flex flex-col items-center gap-1.5 py-3 text-[11.5px] font-bold text-ink hover:bg-line/40 transition-colors"
              onClick={send}
            >
              <span className="grid size-10 place-items-center rounded-full bg-bg text-muted">
                •••
              </span>
              بیشتر
            </button>
          </div>

          <Btn className="mt-4 h-14 text-[16px]" onClick={send}>
            ارسال یادآوری
            <Send size={18} />
          </Btn>
        </div>
      </Scroll>
    </Phone>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, Gift, Pencil, Settings2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll } from "@/components/shell";
import { Btn, Sparkle, Stepper } from "@/components/ui";
import { cn } from "@/lib/cn";
import { hapticSelect } from "@/lib/haptics";
import {
  CURRENCIES,
  formatAmount,
  formatGrouped,
  parseAmountInput,
  toPersianDigits,
  type CurrencyCode,
} from "@/lib/money";
import { TEMPLATES } from "@/lib/sample";
import { computeTotals } from "@/lib/split";
import { useDangStore, useSelectedPeople } from "@/lib/store";

export const Route = createFileRoute("/home")({ component: HomePage });

const MAIN_CURRENCIES: CurrencyCode[] = ["IRR", "IRT", "USD", "EUR"];

function HomePage() {
  const nav = useNavigate();
  const profile = useDangStore((s) => s.profile);
  const title = useDangStore((s) => s.title);
  const base = useDangStore((s) => s.base);
  const currency = useDangStore((s) => s.currency);
  const tip = useDangStore((s) => s.tipPercent);
  const tax = useDangStore((s) => s.taxPercent);
  const taxIncluded = useDangStore((s) => s.taxIncluded);
  const people = useSelectedPeople();
  const setBase = useDangStore((s) => s.setBase);
  const setCurrency = useDangStore((s) => s.setCurrency);
  const setTip = useDangStore((s) => s.setTip);
  const setTax = useDangStore((s) => s.setTax);
  const setPeopleCount = useDangStore((s) => s.setPeopleCount);
  const applyTemplate = useDangStore((s) => s.applyTemplate);
  const equalize = useDangStore((s) => s.equalize);
  const commitSplit = useDangStore((s) => s.commitSplit);
  const setTaxIncluded = useDangStore((s) => s.setTaxIncluded);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const totals = useMemo(
    () => computeTotals(base, tip, tax, taxIncluded, false),
    [base, tip, tax, taxIncluded],
  );

  const unit = CURRENCIES[currency];

  function startEdit() {
    setDraft(base ? String(Math.round(base)) : "");
    setEditing(true);
  }

  function commitEdit(raw?: string) {
    const n = parseAmountInput(raw ?? draft);
    setBase(n);
    setEditing(false);
  }

  function appendDigit(d: string) {
    hapticSelect();
    if (d === "back") {
      setDraft((s) => s.slice(0, -1));
      return;
    }
    if (d === "000") {
      setDraft((s) => (s ? s + "000" : s));
      return;
    }
    setDraft((s) => {
      const next = (s + d).replace(/^0+(?=\d)/, "");
      return next.slice(0, 12);
    });
  }

  function doSplit(mode: "equal" | "unequal" | "items") {
    if (base <= 0) {
      toast("اول مبلغ کل رو وارد کن");
      startEdit();
      return;
    }
    if (people.length < 2) {
      toast("حداقل دو نفر لازم داریم");
      return;
    }
    if (mode === "unequal") {
      nav({ to: "/unequal" });
      return;
    }
    if (mode === "items") {
      nav({ to: "/items" });
      return;
    }
    equalize();
    const entry = commitSplit();
    if (entry) nav({ to: "/result" });
  }

  return (
    <Phone nav>
      <Scroll>
        <header className="flex items-center gap-3 px-5 pt-6">
          <button type="button" onClick={() => nav({ to: "/profile" })} aria-label="پروفایل">
            <Avatar src={profile.avatar} name={profile.name} size={46} />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <h1 className="text-[23px] font-black text-primary">تقسیمینو</h1>
            <p className="text-[12px] font-bold text-muted flex items-center justify-center gap-1">
              <span>ساده، سریع، منصفانه</span>
              <span className="text-heart">💜</span>
            </p>
          </div>
          <button
            type="button"
            aria-label="تنظیمات"
            onClick={() => nav({ to: "/more" })}
            className="grid size-10 place-items-center rounded-full bg-white text-muted shadow-[0_6px_18px_rgba(28,32,51,0.06)]"
          >
            <Settings2 size={18} />
          </button>
        </header>

        <div className="stagger px-5 pt-4 pb-4 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={cn("chip shrink-0", title === t.title && "active")}
                onClick={() => {
                  hapticSelect();
                  applyTemplate(t.title, t.tax, t.tip);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="card relative px-5 py-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-medium text-muted">مبلغ کل</p>
                {editing ? (
                  <input
                    autoFocus
                    inputMode="numeric"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ""))}
                    onBlur={() => commitEdit()}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                    className="mt-1 w-[220px] bg-transparent text-[34px] font-extrabold tabular tracking-tight text-ink outline-none"
                  />
                ) : (
                  <button type="button" onClick={startEdit} className="mt-1 text-right">
                    <div className="text-[34px] font-extrabold leading-none tabular tracking-tight text-ink">
                      {formatAmount(base, currency)}
                    </div>
                  </button>
                )}
                <p className="mt-1 text-[13px] font-semibold text-muted">{unit.label}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => nav({ to: "/scan" })}
                  className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary"
                  aria-label="اسکن رسید"
                >
                  <FileText size={20} />
                </button>
                <button
                  type="button"
                  onClick={startEdit}
                  className="grid size-8 place-items-center text-muted"
                  aria-label="ویرایش مبلغ"
                >
                  <Pencil size={15} />
                </button>
              </div>
            </div>

            {editing ? (
              <div className="keypad mt-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "back"].map((k) => (
                  <button key={k} type="button" className="key" onClick={() => appendDigit(k)}>
                    {k === "back" ? "⌫" : toPersianDigits(k)}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex gap-2">
              {MAIN_CURRENCIES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    hapticSelect();
                    setCurrency(code);
                  }}
                  className={cn(
                    "h-10 flex-1 rounded-full text-[13px] font-bold transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
                    currency === code
                      ? "bg-primary text-white"
                      : "bg-bg text-muted",
                  )}
                >
                  {code === "IRR" ? "ریال" : code === "IRT" ? "تومان" : CURRENCIES[code].symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="card flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-muted">
              <Users size={16} />
              تعداد نفرات
            </div>
            <Stepper value={people.length} min={2} max={12} onChange={setPeopleCount} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="card px-4 py-4">
              <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-muted">
                <Gift size={14} />
                انعام (اختیاری)
              </div>
              <Stepper value={tip} min={0} max={30} suffix="٪" onChange={setTip} />
            </div>
            <div className="card px-4 py-4">
              <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-muted">
                <FileText size={14} />
                مالیات (اختیاری)
              </div>
              <Stepper value={tax} min={0} max={20} suffix="٪" onChange={setTax} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTaxIncluded(!taxIncluded)}
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-[12.5px] font-medium text-muted"
          >
            <span>مالیات داخل مبلغ کل است</span>
            <span
              className={cn(
                "h-6 w-11 rounded-full p-0.5 transition-[background-color] duration-200",
                taxIncluded ? "bg-primary" : "bg-line",
              )}
            >
              <span
                className={cn(
                  "block size-5 rounded-full bg-white transition-transform duration-200",
                  taxIncluded ? "-translate-x-5" : "translate-x-0",
                )}
              />
            </span>
          </button>

          <div className="card flex items-center justify-between px-5 py-3 text-[13px]">
            <span className="text-muted">قابل تقسیم</span>
            <span className="font-bold tabular text-ink">
              {formatGrouped(totals.grand, unit.decimals)} {unit.symbol}
            </span>
          </div>

          <Btn onClick={() => doSplit("equal")}>
            <Sparkle />
            تقسیم کن
          </Btn>
          <div className="grid grid-cols-2 gap-2">
            <Btn variant="lavender" className="h-12 text-[13.5px]" onClick={() => doSplit("unequal")}>
              تقسیم نابرابر
            </Btn>
            <Btn variant="ghost" className="h-12 text-[13.5px]" onClick={() => doSplit("items")}>
              تقسیم آیتمی
            </Btn>
          </div>
        </div>
      </Scroll>
    </Phone>
  );
}

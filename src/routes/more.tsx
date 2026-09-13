import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll } from "@/components/shell";
import { CURRENCY_LIST } from "@/lib/money";
import { cn } from "@/lib/cn";
import { useDangStore } from "@/lib/store";

export const Route = createFileRoute("/more")({ component: MorePage });

function MorePage() {
  const nav = useNavigate();
  const profile = useDangStore((s) => s.profile);
  const currency = useDangStore((s) => s.currency);
  const cashRound = useDangStore((s) => s.cashRound);
  const haptics = useDangStore((s) => s.haptics);
  const tipOnTax = useDangStore((s) => s.tipOnTax);
  const setCurrency = useDangStore((s) => s.setCurrency);
  const setCashRound = useDangStore((s) => s.setCashRound);
  const setHaptics = useDangStore((s) => s.setHaptics);
  const setTipOnTax = useDangStore((s) => s.setTipOnTax);
  const resetDraft = useDangStore((s) => s.resetDraft);
  const clearAll = useDangStore((s) => s.clearAll);

  return (
    <Phone nav>
      <Scroll>
        <header className="px-5 pt-6 pb-4">
          <h1 className="text-[22px] font-extrabold">بیشتر</h1>
        </header>
        <div className="px-5 space-y-3">
          <button
            type="button"
            onClick={() => nav({ to: "/profile" })}
            className="card flex w-full items-center gap-3 px-4 py-3"
          >
            <Avatar src={profile.avatar} name={profile.name} size={52} />
            <div className="flex-1 text-right">
              <p className="text-[16px] font-bold">{profile.name}</p>
              <p className="text-[12px] text-muted">ویرایش پروفایل</p>
            </div>
            <ChevronLeft size={18} className="text-faint" />
          </button>

          <section className="card overflow-hidden">
            <p className="px-4 pt-3 text-[12px] font-bold text-muted">ارز پیش‌فرض</p>
            <div className="flex flex-wrap gap-2 p-4">
              {CURRENCY_LIST.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={cn("chip", currency === c.code && "active")}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>

          <ToggleRow label="گرد کردن به واحد نقدی" on={cashRound} onChange={setCashRound} />
          <ToggleRow label="انعام روی مبلغ+مالیات" on={tipOnTax} onChange={setTipOnTax} />
          <ToggleRow label="لرزش لمسی" on={haptics} onChange={setHaptics} />

          <button
            type="button"
            className="card w-full px-4 py-4 text-right text-[14px] font-semibold"
            onClick={() => {
              resetDraft();
              toast("پیش‌نویس پاک شد");
            }}
          >
            شروع تقسیم جدید
          </button>
          <button
            type="button"
            className="card w-full px-4 py-4 text-right text-[14px] font-semibold text-red-500"
            onClick={() => {
              clearAll();
              toast("تاریخچه پاک شد");
            }}
          >
            پاک کردن تاریخچه
          </button>

          <p className="px-2 pb-6 pt-4 text-center text-[12px] leading-6 text-muted">
            تقسیمینو · خرجهامون با هم، دوستی‌هامون همیشگی 💜
            <br />
            نرخ ارز تقریبی است و فقط برای تبدیل سریع استفاده می‌شود.
          </p>
        </div>
      </Scroll>
    </Phone>
  );
}

function ToggleRow({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="card flex w-full items-center justify-between px-4 py-4"
    >
      <span className="text-[14px] font-semibold">{label}</span>
      <span className={cn("h-6 w-11 rounded-full p-0.5", on ? "bg-primary" : "bg-line")}>
        <span className={cn("block size-5 rounded-full bg-white transition-transform duration-200", on ? "-translate-x-5" : "translate-x-0")} />
      </span>
    </button>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll, TopBar } from "@/components/shell";
import { Btn, Donut } from "@/components/ui";
import { formatAmount, formatGrouped } from "@/lib/money";
import { computeTotals } from "@/lib/split";
import { useDangStore, useSelectedPeople } from "@/lib/store";

export const Route = createFileRoute("/unequal")({ component: UnequalPage });

function UnequalPage() {
  const nav = useNavigate();
  const people = useSelectedPeople();
  const percents = useDangStore((s) => s.percents);
  const setPercent = useDangStore((s) => s.setPercent);
  const equalize = useDangStore((s) => s.equalize);
  const commitSplit = useDangStore((s) => s.commitSplit);
  const base = useDangStore((s) => s.base);
  const currency = useDangStore((s) => s.currency);
  const tip = useDangStore((s) => s.tipPercent);
  const tax = useDangStore((s) => s.taxPercent);
  const taxIncluded = useDangStore((s) => s.taxIncluded);
  const tipOnTax = useDangStore((s) => s.tipOnTax);

  const { grand } = useMemo(
    () => computeTotals(base, tip, tax, taxIncluded, tipOnTax),
    [base, tip, tax, taxIncluded, tipOnTax],
  );

  const totalPct = people.reduce((a, p) => a + (percents[p.id] ?? 0), 0);

  function confirm() {
    const entry = commitSplit();
    if (!entry) {
      toast("مبلغ رو وارد کن");
      nav({ to: "/home" });
      return;
    }
    nav({ to: "/result" });
  }

  return (
    <Phone>
      <TopBar
        title="تقسیم نابرابر"
        subtitle="سهم هر نفر را مشخص کن"
        onBack={() => nav({ to: "/home" })}
      />
      <Scroll nav={false} className="px-5 pb-8">
        <div className="stagger space-y-3 pt-2">
          {people.map((p) => {
            const pct = percents[p.id] ?? 0;
            const amount = (grand * pct) / 100;
            return (
              <div key={p.id} className="card px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar src={p.avatar} name={p.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold">{p.name}</span>
                      <span className="text-[15px] font-extrabold tabular" style={{ color: p.color }}>
                        {formatGrouped(pct)}٪
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={pct}
                      onChange={(e) => setPercent(p.id, Number(e.target.value))}
                      className="person-slider mt-2"
                      style={
                        {
                          "--thumb": p.color,
                          background: `linear-gradient(to left, ${p.color} ${pct}%, #ECEFF5 ${pct}%)`,
                        } as React.CSSProperties
                      }
                    />
                    <p className="mt-1 text-left text-[11px] tabular text-muted">
                      {formatAmount(amount, currency)} {currency === "IRR" ? "ریال" : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="card flex items-center gap-3 px-4 py-4">
            <Donut slices={people.map((p) => ({ value: percents[p.id] ?? 0, color: p.color }))} />
            <div className="flex-1">
              <p className="text-[12px] text-muted">مجموع</p>
              <p className="text-[16px] font-extrabold tabular">{formatGrouped(totalPct)}٪</p>
            </div>
            <div className="text-left">
              <p className="text-[12px] text-muted">ریال</p>
              <p className="text-[16px] font-extrabold tabular text-ink">{formatAmount(grand, currency)}</p>
            </div>
          </div>

          <Btn onClick={confirm}>ثبت سهم‌ها</Btn>
          <Btn
            variant="lavender"
            onClick={() => {
              equalize();
              confirm();
            }}
          >
            به طور مساوی تقسیم کن
          </Btn>
        </div>
      </Scroll>
    </Phone>
  );
}

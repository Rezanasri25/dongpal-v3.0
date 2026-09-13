import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Phone, Scroll, TopBar } from "@/components/shell";
import { Btn } from "@/components/ui";
import { decodePayload } from "@/lib/share";
import { formatAmountWithUnit } from "@/lib/money";
import { faDateLong } from "@/lib/money";

type Search = { d?: string };

export const Route = createFileRoute("/s")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    d: typeof s.d === "string" ? s.d : undefined,
  }),
  component: SharedPage,
});

function SharedPage() {
  const { d } = Route.useSearch();
  const nav = useNavigate();
  const payload = useMemo(() => (d ? decodePayload(d) : null), [d]);

  if (!payload) {
    return (
      <Phone>
        <TopBar title="لینک نامعتبر" onBack={() => nav({ to: "/" })} />
        <p className="px-6 pt-8 text-center text-muted">این دعوت پیدا نشد یا خراب شده.</p>
      </Phone>
    );
  }

  return (
    <Phone>
      <TopBar title={payload.t} subtitle={faDateLong(payload.d)} onBack={() => nav({ to: "/" })} />
      <Scroll nav={false} className="px-5 pb-8">
        <div className="card mb-4 px-5 py-4 text-center">
          <p className="text-[13px] text-muted">مبلغ کل</p>
          <p className="text-[28px] font-extrabold tabular">{formatAmountWithUnit(payload.g, payload.c)}</p>
        </div>
        <div className="card divide-y divide-line overflow-hidden">
          {payload.p.map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <img src={p.a} alt="" className="size-11 rounded-full object-cover" />
              <p className="flex-1 font-bold">{p.n}</p>
              <p className="font-extrabold tabular">{formatAmountWithUnit(p.s, payload.c)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center justify-center gap-1 text-[13px] font-medium text-muted">
          ساخته‌شده با تقسیمینو
          <span className="text-heart">💜</span>
        </p>
        <Btn className="mt-5" onClick={() => nav({ to: "/home" })}>
          خودت هم تقسیم کن
        </Btn>
      </Scroll>
    </Phone>
  );
}

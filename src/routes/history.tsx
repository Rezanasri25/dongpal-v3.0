import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Avatar, Phone, Scroll } from "@/components/shell";
import { faDate, formatAmountWithUnit } from "@/lib/money";
import { useDangStore } from "@/lib/store";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  const nav = useNavigate();
  const history = useDangStore((s) => s.history);
  const load = useDangStore((s) => s.loadHistory);
  const del = useDangStore((s) => s.deleteHistory);

  return (
    <Phone nav>
      <Scroll>
        <header className="px-5 pt-6 pb-3">
          <h1 className="text-[22px] font-extrabold">تاریخچه</h1>
          <p className="text-[13px] text-muted">دنگ‌های قبلی‌ت اینجان</p>
        </header>
        <div className="px-5 space-y-2">
          {history.length === 0 ? (
            <div className="card px-6 py-12 text-center">
              <img src="/art/plane.jpg" alt="" className="mx-auto h-28 w-28 object-contain" />
              <p className="mt-3 font-bold">هنوز دنگی نداری</p>
              <p className="mt-1 text-[13px] text-muted">اولین خرج گروهی رو تقسیم کن</p>
            </div>
          ) : (
            history.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => {
                  load(h.id);
                  nav({ to: "/result" });
                }}
                className="card flex w-full items-center gap-3 px-4 py-3 text-right"
              >
                <div className="flex -space-x-2 space-x-reverse">
                  {h.people.slice(0, 3).map((p) => (
                    <Avatar key={p.id} src={p.avatar} name={p.name} size={32} className="ring-2 ring-white" />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold">{h.title}</p>
                  <p className="text-[11px] text-muted">{faDate(h.createdAt)}</p>
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-extrabold tabular">{formatAmountWithUnit(h.grand, h.currency)}</p>
                  <p className="text-[11px] text-muted">{h.people.length} نفر</p>
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  className="grid size-8 place-items-center text-faint"
                  onClick={(e) => {
                    e.stopPropagation();
                    del(h.id);
                  }}
                >
                  <Trash2 size={15} />
                </span>
              </button>
            ))
          )}
        </div>
      </Scroll>
    </Phone>
  );
}

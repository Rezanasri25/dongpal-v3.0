import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll, TopBar } from "@/components/shell";
import { Btn } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatAmount, parseAmountInput } from "@/lib/money";
import { useDangStore, useSelectedPeople } from "@/lib/store";

export const Route = createFileRoute("/items")({ component: ItemsPage });

function ItemsPage() {
  const nav = useNavigate();
  const items = useDangStore((s) => s.items);
  const addItem = useDangStore((s) => s.addItem);
  const updateItem = useDangStore((s) => s.updateItem);
  const removeItem = useDangStore((s) => s.removeItem);
  const commitSplit = useDangStore((s) => s.commitSplit);
  const setMode = useDangStore((s) => s.setMode);
  const currency = useDangStore((s) => s.currency);
  const people = useSelectedPeople();

  function confirm() {
    if (!items.length) {
      toast("حداقل یک آیتم اضافه کن");
      return;
    }
    setMode("items");
    const entry = commitSplit();
    if (entry) nav({ to: "/result" });
  }

  return (
    <Phone>
      <TopBar
        title="تقسیم آیتمی"
        subtitle="هر کی چی خورده؟"
        onBack={() => nav({ to: "/home" })}
      />
      <Scroll nav={false} className="px-5 pb-8">
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="card px-5 py-8 text-center text-[13px] text-muted">
              آیتم‌های رسید یا سفارش رو اضافه کن، بعد مشخص کن کی‌ها سهیم‌ان.
            </div>
          ) : null}
          {items.map((it) => (
            <div key={it.id} className="card px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  value={it.name}
                  onChange={(e) => updateItem(it.id, { name: e.target.value })}
                  className="min-w-0 flex-1 bg-transparent text-[14px] font-bold outline-none"
                />
                <input
                  inputMode="numeric"
                  value={it.amount ? String(Math.round(it.amount)) : ""}
                  onChange={(e) => updateItem(it.id, { amount: parseAmountInput(e.target.value) })}
                  className="w-28 bg-transparent text-left text-[14px] font-extrabold tabular outline-none"
                />
                <button type="button" onClick={() => removeItem(it.id)} className="text-faint">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="mb-2 text-left text-[11px] text-muted">{formatAmount(it.amount, currency)}</p>
              <div className="flex flex-wrap gap-2">
                {people.map((p) => {
                  const on = it.assignedTo.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        const assignedTo = on
                          ? it.assignedTo.filter((id) => id !== p.id)
                          : [...it.assignedTo, p.id];
                        updateItem(it.id, { assignedTo });
                      }}
                      className={cn(
                        "flex items-center gap-1 rounded-full py-1 pl-2 pr-1 text-[11px] font-semibold",
                        on ? "bg-primary text-white" : "bg-bg text-muted",
                      )}
                    >
                      <Avatar src={p.avatar} name={p.name} size={22} />
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <Btn variant="lavender" onClick={() => addItem({ name: "آیتم جدید", amount: 0 })}>
            <Plus size={16} />
            آیتم جدید
          </Btn>
          <Btn onClick={confirm}>تقسیم کن</Btn>
        </div>
      </Scroll>
    </Phone>
  );
}

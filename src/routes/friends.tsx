import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, Phone, Scroll } from "@/components/shell";
import { Btn } from "@/components/ui";
import { AVATARS, useDangStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/friends")({ component: FriendsPage });

function FriendsPage() {
  const friends = useDangStore((s) => s.friends);
  const selected = useDangStore((s) => s.selectedIds);
  const toggle = useDangStore((s) => s.toggleSelected);
  const addFriend = useDangStore((s) => s.addFriend);
  const updateFriend = useDangStore((s) => s.updateFriend);
  const removeFriend = useDangStore((s) => s.removeFriend);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);

  function save() {
    const n = name.trim();
    if (!n) {
      toast("اسم دوستت چیه؟");
      return;
    }
    addFriend({ name: n, avatar: avatar.src, color: avatar.color });
    setName("");
    setOpen(false);
  }

  return (
    <Phone nav>
      <Scroll>
        <header className="px-5 pt-6 pb-3">
          <h1 className="text-[22px] font-extrabold text-ink">دوستان</h1>
          <p className="text-[13px] text-muted">برای این دنگ انتخاب‌شون کن</p>
        </header>
        <div className="px-5 space-y-2">
          {friends.map((f) => {
            const on = selected.includes(f.id);
            return (
              <div key={f.id} className="card flex items-center gap-3 px-3 py-3">
                <button type="button" onClick={() => toggle(f.id)} className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar src={f.avatar} name={f.name} size={48} ring={on ? f.color : undefined} />
                  <div className="min-w-0 text-right">
                    <input
                      defaultValue={f.name}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={(e) => updateFriend(f.id, { name: e.target.value.trim() || f.name })}
                      className="w-full bg-transparent text-[15px] font-bold outline-none"
                    />
                    <p className="text-[11px] text-muted">{on ? "در این دنگ هست" : "خارج از دنگ"}</p>
                  </div>
                </button>
                <button
                  type="button"
                  aria-label="حذف"
                  className="grid size-9 place-items-center text-faint"
                  onClick={() => removeFriend(f.id)}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(f.id)}
                  className={cn(
                    "h-7 rounded-full px-3 text-[11px] font-bold",
                    on ? "bg-primary text-white" : "bg-bg text-muted",
                  )}
                >
                  {on ? "هست" : "نیست"}
                </button>
              </div>
            );
          })}
          <Btn variant="lavender" className="mt-3" onClick={() => setOpen(true)}>
            <Plus size={16} />
            دوست جدید
          </Btn>
        </div>
      </Scroll>
      {open ? (
        <div className="sheet" onClick={() => setOpen(false)} role="presentation">
          <div className="sheet-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-3 text-[16px] font-bold">دوست جدید</h3>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم"
              className="mb-3 h-12 w-full rounded-2xl bg-bg px-4 text-[15px] outline-none"
            />
            <div className="mb-4 flex gap-2 overflow-x-auto">
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAvatar(a)}
                  className={cn("rounded-full", avatar.id === a.id && "ring-2 ring-primary ring-offset-2")}
                >
                  <img src={a.src} alt="" className="size-12 rounded-full object-cover" />
                </button>
              ))}
            </div>
            <Btn onClick={save}>اضافه کن</Btn>
          </div>
        </div>
      ) : null}
    </Phone>
  );
}

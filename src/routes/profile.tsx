import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Phone, Scroll, TopBar } from "@/components/shell";
import { Btn } from "@/components/ui";
import { cn } from "@/lib/cn";
import { AVATARS, useDangStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const nav = useNavigate();
  const profile = useDangStore((s) => s.profile);
  const setProfile = useDangStore((s) => s.setProfile);
  const setOnboarded = useDangStore((s) => s.setOnboarded);
  const addFriend = useDangStore((s) => s.addFriend);
  const friends = useDangStore((s) => s.friends);

  return (
    <Phone>
      <TopBar title="حساب کاربری" subtitle="همین‌جا روی این دستگاه ذخیره می‌شه" onBack={() => nav({ to: "/home" })} />
      <Scroll nav={false} className="px-5 pb-8">
        <div className="stagger text-center">
          <img
            src={profile.avatar}
            alt=""
            className="mx-auto size-28 rounded-full object-cover shadow-[0_12px_30px_rgba(28,32,51,0.12)]"
          />
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setProfile({ avatar: a.src, color: a.color })}
                className={cn("rounded-full", profile.avatar === a.src && "ring-2 ring-primary ring-offset-2")}
              >
                <img src={a.src} alt="" className="size-12 rounded-full object-cover" />
              </button>
            ))}
          </div>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
            className="mt-4 h-14 w-full rounded-2xl bg-white px-4 text-center text-[18px] font-bold shadow-[0_10px_32px_rgba(28,32,51,0.06)] outline-none"
            placeholder="اسمت چیه؟"
          />
          <Btn
            className="mt-6"
            onClick={() => {
              setOnboarded();
              if (!friends.some((f) => f.id === "me")) {
                addFriend({ id: "me", name: profile.name, avatar: profile.avatar, color: profile.color });
              }
              nav({ to: "/home" });
            }}
          >
            ذخیره و ادامه
          </Btn>
          <p className="mt-3 text-[12px] text-muted">بدون اینترنت و بدون ثبت‌نام. داده‌ها روی خودت می‌مونه.</p>
        </div>
      </Scroll>
    </Phone>
  );
}

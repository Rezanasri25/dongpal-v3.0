import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Phone } from "@/components/shell";
import { Btn, Heart } from "@/components/ui";
import { useDangStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: WelcomePage });

function WelcomePage() {
  const nav = useNavigate();
  const onboarded = useDangStore((s) => s.onboarded);
  const setOnboarded = useDangStore((s) => s.setOnboarded);

  useEffect(() => {
    if (onboarded) nav({ to: "/home", replace: true });
  }, [onboarded, nav]);

  return (
    <Phone className="bg-[#FAF6EF]">
      <div className="relative flex h-full flex-col justify-between overflow-hidden">
        {/* Header section */}
        <div className="pt-8 px-6 text-center z-10">
          <h1 className="text-[44px] font-black leading-none tracking-tight text-primary">
            تقسیمینو
          </h1>
          <p className="mt-3 text-[17px] font-bold leading-7 text-ink">
            خرجهامون با هم،
            <br />
            <span className="inline-flex items-center gap-1.5">
              دوستی‌هامون همیشگی
              <Heart className="size-4 text-heart fill-heart" />
            </span>
          </p>
        </div>

        {/* Hero Character Illustration + Doodles */}
        <div className="relative mx-auto flex flex-1 items-end justify-center w-full max-w-[360px] px-4 -mb-3 z-0">
          {/* Crown doodle over the girl with purple beanie on top-left */}
          <div className="absolute top-2 right-12 z-10 rotate-[-10deg] animate-pulse">
            <svg
              width="38"
              height="28"
              viewBox="0 0 38 28"
              fill="none"
              stroke="#0A9B82"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22h30l-4-15-7 8-4-11-4 11-7-8-4 15z" />
              <circle cx="4" cy="7" r="1.5" fill="#0A9B82" />
              <circle cx="19" cy="4" r="1.5" fill="#0A9B82" />
              <circle cx="34" cy="7" r="1.5" fill="#0A9B82" />
            </svg>
          </div>

          {/* Sparkle doodle on top-right */}
          <div className="absolute top-4 left-14 z-10 text-primary text-[20px] font-bold select-none rotate-12">
            ✦
          </div>

          {/* Playful Gen-Z doodle "با هم سبک‌تر! :)" on the right */}
          <div className="absolute top-14 left-3 z-10 rotate-[8deg] select-none text-primary font-bold text-[13px] leading-tight">
            <div className="flex items-center gap-1">
              <span>با هم</span>
            </div>
            <div className="flex items-center gap-1">
              <span>سبک‌تر!</span>
              <span className="inline-grid size-5 place-items-center rounded-full border-[1.8px] border-primary text-[11px] font-extrabold">
                :)
              </span>
            </div>
          </div>

          {/* Transparent cutout of the 4 friends taking a selfie */}
          <img
            src="/art/hero_clean.png"
            alt="دوستان تقسیمینو"
            className="w-full max-h-[min(54vh,440px)] object-contain object-bottom pointer-events-none select-none drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Bottom Card matching mockup Screen 1 */}
        <div className="relative z-10 bg-white rounded-t-[36px] px-6 pt-6 pb-6 shadow-[0_-12px_32px_rgba(28,32,51,0.06)]">
          <Btn
            onClick={() => {
              setOnboarded();
              nav({ to: "/home" });
            }}
            className="h-14 text-[16px] font-extrabold shadow-[0_10px_24px_rgba(10,155,130,0.28)]"
          >
            شروع کنیم
            <span className="grid size-7 place-items-center rounded-full bg-white/20 mr-1">
              <ArrowLeft size={16} strokeWidth={2.6} />
            </span>
          </Btn>

          <Btn
            variant="lavender"
            onClick={() => nav({ to: "/profile" })}
            className="mt-3 h-14 text-[15.5px] font-extrabold"
          >
            ورود به حساب کاربری
          </Btn>

          <p className="mt-3 text-center text-[12px] font-semibold text-muted">
            بدون ثبت‌نام هم می‌تونی استفاده کنی
          </p>

          {/* Home indicator bar */}
          <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-[#1C2033]/15" />
        </div>
      </div>
    </Phone>
  );
}

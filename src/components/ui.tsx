import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { hapticSelect } from "@/lib/haptics";
import { toPersianDigits } from "@/lib/money";

export function Btn({
  variant = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "lavender" | "ghost" | "soft";
}) {
  return (
    <button type="button" className={cn("btn", `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  suffix,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
  label?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      {label ? <span className="sr-only">{label}</span> : null}
      <button
        type="button"
        aria-label="کم کردن"
        className="grid size-11 place-items-center rounded-full bg-bg text-muted active:scale-[0.96]"
        onClick={() => {
          hapticSelect();
          onChange(Math.max(min, value - 1));
        }}
      >
        <Minus size={16} />
      </button>
      <div className="min-w-12 text-center text-[22px] font-bold tabular text-ink">
        {toPersianDigits(value)}
        {suffix ? <span className="mr-0.5 text-[15px] font-semibold text-muted">{suffix}</span> : null}
      </div>
      <button
        type="button"
        aria-label="زیاد کردن"
        className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary active:scale-[0.96]"
        onClick={() => {
          hapticSelect();
          onChange(Math.min(max, value + 1));
        }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export function IconBtn({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "grid size-10 place-items-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(28,32,51,0.06)] active:scale-[0.96] transition-[transform] duration-150",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("inline-block", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M12 21s-6.7-4.35-9.33-8.22C.7 9.9 1.4 6.2 4.4 4.86 6.3 4 8.4 4.5 12 8c3.6-3.5 5.7-4 7.6-3.14 3 1.34 3.7 5.04 1.73 7.92C18.7 16.65 12 21 12 21z"
      />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path
        d="M12 3l1.2 6.3L19 12l-5.8 2.7L12 21l-1.2-6.3L5 12l5.8-2.7L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Confetti() {
  const bits = [
    ["#0A9B82", "-18px", "40px", "120deg"],
    ["#7B6CF6", "12px", "-30px", "-80deg"],
    ["#F59E0B", "40px", "10px", "200deg"],
    ["#FB7185", "-40px", "-10px", "60deg"],
    ["#38BDF8", "8px", "55px", "-40deg"],
    ["#0A9B82", "28px", "-50px", "90deg"],
    ["#C084FC", "-8px", "70px", "160deg"],
    ["#FBBF24", "55px", "30px", "-120deg"],
    ["#14B8A6", "-55px", "20px", "30deg"],
    ["#7B6CF6", "0px", "-70px", "210deg"],
    ["#FB7185", "70px", "-20px", "-15deg"],
    ["#0A9B82", "-70px", "-40px", "75deg"],
  ] as const;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map(([color, x, _delay, rot], i) => (
        <span
          key={i}
          className="confetti-bit"
          style={
            {
              left: `${8 + ((i * 7) % 84)}%`,
              background: color,
              animationDelay: `${i * 30}ms`,
              "--x": x,
              "--r": rot,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Donut({
  slices,
  size = 56,
}: {
  slices: { value: number; color: string }[];
  size?: number;
}) {
  const r = 16;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const sum = slices.reduce((a, s) => a + s.value, 0) || 1;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" className="-rotate-90">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#ECEFF5" strokeWidth="8" />
      {slices.map((s, i) => {
        const len = (s.value / sum) * c;
        const dash = `${len} ${c - len}`;
        const el = (
          <circle
            key={i}
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="8"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { Clock3, Grip, House, ScanLine, Users } from "lucide-react";
import { cn } from "@/lib/cn";

export function Phone({
  children,
  nav = false,
  className,
}: {
  children: React.ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <div className="app-root">
      <div className={cn("phone", className)}>
        {children}
        {nav ? <BottomNav /> : null}
      </div>
    </div>
  );
}

export function Scroll({
  children,
  nav = true,
  className,
}: {
  children: React.ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("phone-scroll", !nav && "no-nav", className)}>{children}</div>
  );
}

const TABS = [
  { to: "/home", label: "خانه", icon: House },
  { to: "/friends", label: "دوستان", icon: Users },
  { to: "/scan", label: "اسکن", icon: ScanLine, scan: true },
  { to: "/history", label: "تاریخچه", icon: Clock3 },
  { to: "/more", label: "بیشتر", icon: Grip },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="bottom-nav" aria-label="منوی اصلی">
      {TABS.map((tab) => {
        const active = pathname === tab.to || (tab.to === "/home" && pathname === "/");
        if ("scan" in tab && tab.scan) {
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-label={tab.label}
              className={cn("nav-scan", active && "active")}
            >
              <ScanLine size={22} strokeWidth={2.2} />
            </Link>
          );
        }
        const Icon = tab.icon;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={cn("nav-item", active && "active")}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function TopBar({
  title,
  subtitle,
  onBack,
  right,
  light = false,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <header className="flex items-center gap-3 px-5 pt-5 pb-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="بازگشت"
          className={
            light
              ? "grid size-10 place-items-center rounded-full bg-white/10 text-white active:scale-[0.96]"
              : "grid size-10 place-items-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(28,32,51,0.06)] active:scale-[0.96]"
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <span className="size-10" />
      )}
      <div className="min-w-0 flex-1 text-center">
        <h1 className={light ? "text-[17px] font-bold text-white" : "text-[17px] font-bold text-ink"}>{title}</h1>
        {subtitle ? (
          <p className={light ? "mt-0.5 text-[12px] text-white/70" : "mt-0.5 text-[12px] text-muted"}>{subtitle}</p>
        ) : null}
      </div>
      {right ?? <span className="size-10" />}
    </header>
  );
}

export function Avatar({
  src,
  name,
  size = 44,
  className,
  ring,
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
  ring?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn("rounded-full object-cover bg-primary-soft", className)}
      style={{
        width: size,
        height: size,
        boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
      }}
    />
  );
}

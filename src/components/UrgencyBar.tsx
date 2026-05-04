import { useEffect, useState } from "react";

const computeTimeLeft = () => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  let diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3.6e6); diff -= h * 3.6e6;
  const m = Math.floor(diff / 6e4); diff -= m * 6e4;
  const s = Math.floor(diff / 1000);
  return { h, m, s };
};

export const UrgencyBar = () => {
  const [t, setT] = useState(computeTimeLeft());
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setT(computeTimeLeft()), 1000);
    return () => clearInterval(i);
  }, []);

  if (hidden) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className="relative z-[60] w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, hsl(0 0% 4%) 0%, hsl(38 70% 18%) 50%, hsl(0 0% 4%) 100%)",
        borderBottom: "1px solid hsl(var(--gold) / 0.25)",
      }}
    >
      <div className="container flex items-center justify-between gap-3 py-2 md:py-2.5">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
          </span>
          <p className="font-eyebrow text-[9px] md:text-[10px] text-foreground/85 truncate">
            <span className="text-gold">Tonight only</span>
            <span className="hidden sm:inline"> · Priority seating closes in </span>
            <span className="sm:hidden"> · Closes in </span>
            <span className="gold-text font-bold tabular-nums">
              {pad(t.h)}:{pad(t.m)}:{pad(t.s)}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#reserve"
            className="font-eyebrow text-[9px] md:text-[10px] text-noir bg-gradient-gold px-3 md:px-4 py-1.5 rounded-full hover:scale-[1.03] transition-transform"
          >
            Claim Table
          </a>
          <button
            onClick={() => setHidden(true)}
            aria-label="Dismiss"
            className="text-foreground/50 hover:text-gold text-sm leading-none px-1"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

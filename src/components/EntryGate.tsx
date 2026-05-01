import { useEffect, useState } from "react";

const STORAGE_KEY = "lounge_entered";

export const EntryGate = () => {
  const [mounted, setMounted] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Show on every fresh tab, but skip if already entered this session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setDone(true);
      return;
    }
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const enter = () => {
    if (revealing) return;
    setRevealing(true);
    // Match the wipe duration (1.1s) then unmount
    window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      document.body.style.overflow = "";
      setDone(true);
    }, 1150);
  };

  if (done || !mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      role="dialog"
      aria-label="The Lounge — Access"
      aria-modal="true"
    >
      {/* Base black */}
      <div className="absolute inset-0 bg-noir" />

      {/* Soft radial gold ambience */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(42 75% 58% / 0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, hsl(18 90% 55% / 0.10), transparent 70%)",
        }}
      />

      {/* Slow drifting orbs */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-40 animate-drift"
        style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.35), transparent 60%)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full opacity-30 animate-drift"
        style={{
          background: "radial-gradient(circle, hsl(var(--ember) / 0.4), transparent 60%)",
          animationDelay: "-8s",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ${
          revealing ? "opacity-0 scale-[1.04] blur-sm" : "opacity-100 scale-100"
        }`}
      >
        {/* Top hairline */}
        <div className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/60" />
          <span className="font-eyebrow text-[10px] text-gold/90">EST · Noida</span>
          <span className="h-px w-10 bg-gold/60" />
        </div>

        {/* Mark */}
        <div
          className="mb-7 md:mb-9 opacity-0"
          style={{ animation: "gate-fade 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s forwards" }}
        >
          <div className="relative h-16 w-16 md:h-20 md:w-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-60 blur-xl" />
            <div className="relative h-full w-full rounded-full border border-gold/60 bg-noir/80 flex items-center justify-center font-display text-gold text-3xl md:text-4xl italic font-black">
              L
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <h1
          className="font-display font-black tracking-[0.25em] text-[2rem] md:text-[4.5rem] leading-none gold-text opacity-0"
          style={{ animation: "gate-fade 1s cubic-bezier(0.22,1,0.36,1) 0.35s forwards" }}
        >
          THE LOUNGE
        </h1>

        <div
          className="mt-6 md:mt-8 flex items-center gap-4 opacity-0"
          style={{ animation: "gate-fade 1s cubic-bezier(0.22,1,0.36,1) 0.6s forwards" }}
        >
          <span className="h-px w-8 bg-gold/50" />
          <span className="font-eyebrow text-[11px] md:text-xs text-foreground/80">Access Restricted</span>
          <span className="h-px w-8 bg-gold/50" />
        </div>

        <p
          className="mt-6 md:mt-8 max-w-md text-base md:text-lg text-foreground/70 leading-relaxed opacity-0 px-2"
          style={{ animation: "gate-fade 1s cubic-bezier(0.22,1,0.36,1) 0.85s forwards" }}
        >
          Curated for those who know.
          <br className="hidden sm:block" />
          Reserved. Limited. Intentional.
        </p>

        <button
          onClick={enter}
          className="mt-10 md:mt-12 gold-button opacity-0 active:scale-[0.98]"
          style={{ animation: "gate-fade 1s cubic-bezier(0.22,1,0.36,1) 1.1s forwards" }}
        >
          Request Entry
        </button>

        <p
          className="mt-6 font-eyebrow text-[10px] text-foreground/45 opacity-0"
          style={{ animation: "gate-fade 1s cubic-bezier(0.22,1,0.36,1) 1.35s forwards" }}
        >
          By entering you accept the house code
        </p>
      </div>

      {/* Liquid gold wipe (top → bottom) */}
      <div
        className="absolute inset-0 pointer-events-none z-20 origin-top"
        style={{
          background:
            "linear-gradient(180deg, hsl(46 95% 68%) 0%, hsl(42 75% 58%) 35%, hsl(38 70% 42%) 65%, hsl(0 0% 4%) 100%)",
          transform: revealing ? "scaleY(1)" : "scaleY(0)",
          transition: "transform 1.1s cubic-bezier(0.85, 0, 0.15, 1)",
          boxShadow: revealing ? "0 0 80px hsl(var(--gold) / 0.6)" : "none",
        }}
      />
      {/* Wipe shimmer streak */}
      <div
        className="absolute inset-x-0 h-24 pointer-events-none z-30"
        style={{
          top: revealing ? "100%" : "-10%",
          background:
            "linear-gradient(180deg, transparent, hsl(46 95% 78% / 0.9), transparent)",
          filter: "blur(8px)",
          transition: "top 1.1s cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />
    </div>
  );
};

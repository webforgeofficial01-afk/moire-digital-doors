import { useEffect, useState } from "react";
import { useScrollY } from "@/hooks/use-reveal";
import heroImg from "@/assets/hero-champagne.jpg";

export const Hero = () => {
  const y = useScrollY();
  const [count, setCount] = useState(42);

  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + (Math.random() > 0.6 ? 1 : 0)), 4500);
    return () => clearInterval(t);
  }, []);

  // Parallax
  const bgTransform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0005})`;
  const midTransform = `translate3d(0, ${y * 0.18}px, 0)`;
  const fgTransform = `translate3d(0, ${y * -0.08}px, 0)`;
  const fadeOpacity = Math.max(0, 1 - y / 700);

  return (
    <section id="top" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      {/* Cinematic background */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: bgTransform }}
      >
        <img
          src={heroImg}
          alt="The Lounge — premium evening dining and cocktails in Noida"
          className="h-full w-full object-cover animate-hero-zoom"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        {/* Vignette + noir gradient */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 0% / 0.85) 100%)" }} />
        <div className="absolute inset-0 bg-gradient-noir" />
        <div className="absolute inset-0 bg-gradient-noir-top opacity-80" />
      </div>

      {/* Floating embers (mid layer) — fewer on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block" style={{ transform: midTransform }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              left: `${(i * 73) % 100}%`,
              bottom: `-${10 + (i % 5) * 10}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 2 ? "hsl(var(--gold-bright))" : "hsl(var(--ember))",
              boxShadow: "0 0 12px hsl(var(--gold) / 0.8)",
              animation: `ember-rise ${10 + (i % 6) * 2}s linear ${i * -1.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content (foreground) */}
      <div
        className="relative z-10 h-full container flex flex-col justify-end pb-16 md:pb-28 will-change-transform"
        style={{ transform: fgTransform, opacity: fadeOpacity }}
      >
        {/* Top status row — pushed below nav, contained on mobile */}
        <div className="absolute top-20 md:top-36 right-4 md:right-12 max-w-[220px] md:max-w-xs">
          <div className="glass rounded-2xl p-3 md:p-4 animate-fade-in" style={{ animationDelay: "1.4s" }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
              </span>
              <span className="font-eyebrow text-[9px] md:text-[10px] text-gold">Live · Tonight</span>
            </div>
            <p className="text-xs md:text-sm text-foreground/90 font-light leading-snug">
              <span className="text-gold font-semibold">🔥 {count} bookings</span> in the last hour
            </p>
            <p className="hidden md:block text-[11px] text-foreground/50 mt-1">Members & reservations prioritized</p>
          </div>
        </div>

        {/* Eyebrow */}
        <div className="overflow-hidden mb-5 md:mb-6">
          <p
            className="font-eyebrow text-[10px] md:text-xs text-gold animate-fade-in flex items-center gap-3 md:gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="h-px w-10 md:w-12 bg-gold/60" />
            The Lounge · Noida
          </p>
        </div>

        {/* Headline — tighter mobile clamp to prevent overflow at 360px */}
        <h1 className="font-display text-[clamp(2.1rem,8vw,8rem)] leading-[0.98] tracking-tight text-foreground max-w-5xl font-black">
          <span className="block overflow-hidden pb-1">
            <span className="block animate-fade-in" style={{ animationDelay: "0.6s" }}>Where Evenings</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="block animate-fade-in italic" style={{ animationDelay: "0.85s" }}>
              Turn Into <span className="gold-text not-italic font-semibold">Experiences</span>
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="mt-5 md:mt-8 max-w-xl text-sm md:text-lg text-foreground/80 font-light leading-relaxed animate-fade-in"
          style={{ animationDelay: "1.1s" }}
        >
          Crafted ambience, signature cocktails, and unforgettable nights.
        </p>

        {/* CTAs */}
        <div className="mt-7 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4 animate-fade-in" style={{ animationDelay: "1.3s" }}>
          <a href="#reserve" className="gold-button">
            Reserve a Table
          </a>
          <a href="#menu" className="ghost-button">
            View Menu
          </a>
        </div>

        {/* Urgency */}
        <p
          className="mt-5 md:mt-6 font-eyebrow text-[10px] text-ember/90 animate-fade-in flex items-center gap-2"
          style={{ animationDelay: "1.5s" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ember" />
          </span>
          Limited seating available tonight
        </p>

        {/* Bottom marker */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
          <span className="font-eyebrow text-[9px] text-foreground/60">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

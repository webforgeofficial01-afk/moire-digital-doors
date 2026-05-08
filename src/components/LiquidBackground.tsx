import { useMemo } from "react";

/**
 * Liquid Luxury background — pure CSS, GPU-only.
 * - Large asymmetric soft orbs (ambient color)
 * - Small drifting gold orbs (premium "fireflies")
 * - Soft vignette to keep edges premium
 * No SVG filters, no canvas, no JS animation loop → buttery smooth.
 */
export const LiquidBackground = () => {
  // Pre-compute small orb positions/timings once (stable across renders)
  const smallOrbs = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 10 : 18;
    // deterministic-ish pseudo-random for stable layout
    const rng = (i: number, salt: number) => {
      const x = Math.sin(i * 9301 + salt * 49297) * 233280;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => {
      const size = 4 + rng(i, 1) * 8;            // 4–12 px
      const left = rng(i, 2) * 100;              // %
      const top = rng(i, 3) * 100;               // %
      const dur = 14 + rng(i, 4) * 18;           // 14–32s
      const delay = -rng(i, 5) * dur;            // negative for staggered start
      const drift = (rng(i, 6) - 0.5) * 30;      // -15..15 vw
      const rise = 30 + rng(i, 7) * 50;          // vh
      const hue = rng(i, 8) > 0.5 ? 46 : 38;     // bright vs deep gold
      return { size, left, top, dur, delay, drift, rise, hue, key: i };
    });
  }, []);

  return (
    <div aria-hidden="true" className="liquid-bg">
      {/* Large ambient orbs — asymmetric */}
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
      <span className="orb orb-4" />

      {/* Small drifting gold orbs */}
      <div className="gold-orbs">
        {smallOrbs.map((o) => (
          <span
            key={o.key}
            className="g-orb"
            style={{
              width: `${o.size}px`,
              height: `${o.size}px`,
              left: `${o.left}%`,
              top: `${o.top}%`,
              ["--dur" as any]: `${o.dur}s`,
              ["--delay" as any]: `${o.delay}s`,
              ["--drift" as any]: `${o.drift}vw`,
              ["--rise" as any]: `-${o.rise}vh`,
              ["--hue" as any]: `${o.hue}`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="liquid-vignette" />
    </div>
  );
};

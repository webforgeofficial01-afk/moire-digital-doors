import { useEffect, useRef } from "react";

/**
 * Cinematic Noir — luxury background with scroll-driven scenes.
 *
 * Layers (back → front):
 *  1. Graphite base + scene tint (changes with scroll)
 *  2. Aurora gold curtains (slow drift)
 *  3. Architectural fine grid (mask-faded, parallax)
 *  4. Twin gold/graphite spotlights (mouse + scroll parallax)
 *  5. Slow chrome light sweep
 *  6. Drifting gold motes (CSS only, GPU)
 *  7. Razor-thin metallic horizon
 *  8. Cinematic vignette + scanline veil
 */
export const LiquidBackground = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let sy = 0, csy = 0;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 2;
      ty = (e.clientY / h - 0.5) * 2;
      schedule();
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sy = Math.min(1, Math.max(0, window.scrollY / max));
      schedule();
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      csy += (sy - csy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      el.style.setProperty("--sy", csy.toFixed(4));
      // Scene hue shift across the page
      const hue = 38 + csy * 18; // amber → ember
      el.style.setProperty("--scene-hue", hue.toFixed(1));
      const moving =
        Math.abs(tx - cx) > 0.001 ||
        Math.abs(ty - cy) > 0.001 ||
        Math.abs(sy - csy) > 0.0005;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
      onScroll();
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="noir-bg">
      <div className="noir-base" />
      <div className="noir-aurora" />
      <div className="noir-grid" />
      <div className="noir-sweep" />
      <div className="noir-spot noir-spot-a" />
      <div className="noir-spot noir-spot-b" />
      <div className="noir-spot noir-spot-c" />
      <div className="noir-motes">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="mote"
            style={{
              ['--i' as string]: i,
              left: `${(i * 73) % 100}%`,
              animationDelay: `${(i * 1.7) % 14}s`,
              animationDuration: `${18 + (i % 7) * 3}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="noir-horizon" />
      <div className="noir-scanlines" />
      <div className="noir-vignette" />
    </div>
  );
};

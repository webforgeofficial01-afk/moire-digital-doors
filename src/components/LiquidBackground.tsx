import { useEffect, useRef } from "react";

/**
 * Dark Chrome Noir — cinematic luxury background.
 * Pure CSS + a single rAF for mouse parallax. GPU-only transforms.
 *
 * Layers (back → front):
 *  1. Deep graphite gradient base
 *  2. Architectural fine grid (mask-faded)
 *  3. Slow chrome light sweep
 *  4. Two large soft graphite "spotlights" with mouse parallax
 *  5. Razor-thin metallic horizon line
 *  6. Cinematic vignette
 */
export const LiquidBackground = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 2; // -1..1
      ty = (e.clientY / h - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="noir-bg">
      <div className="noir-base" />
      <div className="noir-grid" />
      <div className="noir-sweep" />
      <div className="noir-spot noir-spot-a" />
      <div className="noir-spot noir-spot-b" />
      <div className="noir-horizon" />
      <div className="noir-vignette" />
    </div>
  );
};

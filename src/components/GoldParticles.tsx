import { useEffect, useRef } from "react";

/**
 * Lightweight gold particles canvas.
 * - Fixed full-viewport, behind content (z-0), pointer-events none
 * - Capped DPR, capped count on mobile, pauses when tab hidden
 */
export const GoldParticles = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 28 : 70;

    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.4, 1.8),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.25, -0.05),
      a: rand(0.25, 0.85),
      tw: rand(0.005, 0.02),
    }));

    let raf = 0;
    let running = true;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += Math.sin(performance.now() * p.tw) * 0.003;
        if (p.y < -10) { p.y = h + 10; p.x = rand(0, w); }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `hsla(46, 95%, 70%, ${Math.min(0.9, Math.max(0.15, p.a))})`);
        grd.addColorStop(1, "hsla(42, 75%, 50%, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(46, 95%, 78%, ${Math.min(0.9, p.a)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[40]"
      style={{ mixBlendMode: "screen", opacity: 0.85 }}
    />
  );
};

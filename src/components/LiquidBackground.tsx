import { useEffect, useRef } from "react";

/**
 * Liquid Luxury background:
 * - Asymmetric drifting gold/ember orbs (CSS, GPU-only transforms)
 * - SVG liquid glass waves with displacement (refraction feel)
 * - Subtle gold particles (capped, pauses when hidden)
 * Sits behind content (z-0), pointer-events none, never overlays UI.
 */
export const LiquidBackground = () => {
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 18 : 42;
    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number };
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: rand(0, w), y: rand(0, h),
      r: rand(0.3, 1.4),
      vx: rand(-0.05, 0.05),
      vy: rand(-0.18, -0.04),
      a: rand(0.18, 0.5),
      tw: rand(0.004, 0.014),
    }));

    let raf = 0; let running = true;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const t = performance.now();
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        const a = Math.max(0.08, Math.min(0.55, p.a + Math.sin(t * p.tw) * 0.1));
        if (p.y < -10) { p.y = h + 10; p.x = rand(0, w); }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.fillStyle = `hsla(46, 90%, 72%, ${a})`;
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
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-noir">
      {/* Asymmetric drifting orbs */}
      <span className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px] animate-pulse" />
      <span className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-ember/5 blur-[140px] animate-pulse delay-1000" />
      <span className="absolute top-[20%] right-[10%] w-[20vw] h-[20vw] rounded-full bg-gold/3 blur-[80px]" />

      {/* Liquid glass SVG waves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <filter id="liquidTurb" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="7">
              <animate attributeName="baseFrequency" dur="28s" values="0.006 0.012;0.010 0.018;0.006 0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="80" />
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(42 75% 58%)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="hsl(28 90% 55%)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lg2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(46 95% 68%)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter="url(#liquidTurb)">
          <path fill="url(#lg1)"
                d="M0,520 C260,420 520,640 820,520 C1080,420 1280,600 1440,500 L1440,900 L0,900 Z" />
          <path fill="url(#lg2)"
                d="M0,260 C300,180 600,340 900,240 C1200,160 1340,300 1440,240 L1440,0 L0,0 Z" />
        </g>
      </svg>

      {/* Gold particles canvas */}
      <canvas ref={cv} className="absolute inset-0 w-full h-full" />

      {/* Vignette to keep edges premium */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,hsl(0_0%_4%_/_0.8)_100%)]" />
    </div>
  );
};

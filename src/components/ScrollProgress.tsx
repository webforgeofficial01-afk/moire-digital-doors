import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    calc();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[120] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          width: `${p}%`,
          background: "linear-gradient(90deg, hsl(var(--gold-deep)), hsl(var(--gold-bright)), hsl(var(--gold-deep)))",
          boxShadow: "0 0 12px hsl(var(--gold) / 0.7)",
          transition: "width 120ms linear",
        }}
      />
    </div>
  );
};

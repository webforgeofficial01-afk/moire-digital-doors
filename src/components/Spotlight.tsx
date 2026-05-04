import { useEffect, useRef } from "react";

/** Premium gold spotlight that follows cursor — desktop only. */
export const Spotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx, cy = ty;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[5] mix-blend-screen will-change-transform"
      style={{
        width: 640, height: 640,
        background: "radial-gradient(circle, hsl(42 75% 58% / 0.18) 0%, hsl(42 75% 58% / 0.06) 30%, transparent 60%)",
        filter: "blur(20px)",
      }}
    />
  );
};

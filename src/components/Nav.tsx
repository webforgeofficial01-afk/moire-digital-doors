import { useEffect, useState } from "react";
import { useScrollY } from "@/hooks/use-reveal";

const links = [
  { label: "Experience", href: "#signature" },
  { label: "Indulgences", href: "#bestsellers" },
  { label: "Lineup", href: "#events" },
  { label: "Seen At", href: "#social" },
];

export const Nav = () => {
  const y = useScrollY();
  const scrolled = y > 40;
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-2.5 md:py-3" : "py-4 md:py-6"
      }`}
      style={{
        background: scrolled ? "linear-gradient(180deg, hsl(0 0% 4% / 0.85), hsl(0 0% 4% / 0.5))" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--gold) / 0.15)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-90 blur-md group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full w-full rounded-full border border-gold/60 bg-noir flex items-center justify-center font-display text-gold text-lg italic">
              M
            </div>
          </div>
          <div className="leading-none">
            <div className="font-display text-xl tracking-tight text-foreground">Moire</div>
            <div className="font-eyebrow text-[9px] text-gold/80 mt-0.5">Cafe · Noida</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-eyebrow text-[11px] text-foreground/70 hover:text-gold transition-colors duration-500 relative group"
            >
              {l.label}
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#reserve" className="hidden sm:inline-flex gold-button !py-3 !px-6 !text-[10px]">
            Reserve
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-10 w-10 rounded-full border border-gold/40 grid place-items-center"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-gold" />
              <span className="block h-px w-5 bg-gold" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-4 glass-strong rounded-2xl p-6 animate-fade-in">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-eyebrow text-xs text-foreground/80 hover:text-gold border-b border-gold/10 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

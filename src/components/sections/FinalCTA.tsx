import { useReveal } from "@/hooks/use-reveal";
import lounge from "@/assets/lounge-scene.jpg";

export const FinalCTA = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <section id="reserve" className="relative py-24 md:py-56 overflow-hidden">
      <div className="absolute inset-0">
        <img src={lounge} alt="" loading="lazy" width={1920} height={1080} className="h-full w-full object-cover scale-110 opacity-40" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(0 0% 0% / 0.5), hsl(0 0% 4%) 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full opacity-50 animate-pulse-glow" style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.35), transparent 65%)" }} />
      </div>

      <div className="container relative z-10 text-center" ref={ref}>
        <p className={`font-eyebrow text-[10px] md:text-[11px] text-gold mb-6 md:mb-8 reveal-up ${visible ? "in" : ""}`}>
          <span className="inline-block h-px w-6 md:w-8 bg-gold/60 align-middle mr-3" />
          The Final Word
          <span className="inline-block h-px w-6 md:w-8 bg-gold/60 align-middle ml-3" />
        </p>

        <h2 className={`font-display font-black text-[clamp(2.4rem,9vw,8.5rem)] leading-[0.95] tracking-tight reveal-blur ${visible ? "in" : ""}`}>
          <span className="block">Your Table</span>
          <span className="block italic gold-text">Awaits.</span>
        </h2>

        <p className={`mt-7 md:mt-10 max-w-md mx-auto text-sm md:text-base text-foreground/70 px-4 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.3s" }}>
          Reservations recommended after 7 PM. Walk-ins welcome only when capacity allows.
        </p>

        <div className={`mt-10 md:mt-14 flex flex-wrap justify-center items-center gap-3 md:gap-4 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.5s" }}>
          <a href="#reserve" className="gold-button">🔥 Reserve Now</a>
          <a href="#menu" className="ghost-button">View Menu</a>
        </div>

        <div className={`mt-12 md:mt-20 inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.7s" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
          </span>
          <span className="font-eyebrow text-[10px] text-foreground/80">Now seating · Sector 18, Noida</span>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="border-t border-gold/15 py-12 md:py-16">
    <div className="container">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-full border border-gold/60 bg-noir flex items-center justify-center font-display text-gold text-lg italic">L</div>
            <div>
              <div className="font-display text-xl">The Lounge</div>
              <div className="font-eyebrow text-[9px] text-gold/80">Noida</div>
            </div>
          </div>
          <p className="text-sm text-foreground/55 max-w-xs">Where evenings turn into experiences.</p>
        </div>
        <div>
          <p className="font-eyebrow text-[10px] text-gold mb-5">Visit</p>
          <p className="text-sm text-foreground/70 leading-relaxed">Sector 18<br />Noida, Uttar Pradesh<br />Open 11 AM — 1 AM</p>
        </div>
        <div>
          <p className="font-eyebrow text-[10px] text-gold mb-5">Reserve</p>
          <p className="text-sm text-foreground/70 leading-relaxed">+91 98XXX XXXXX<br />reserve@theloungenoida.in</p>
        </div>
        <div>
          <p className="font-eyebrow text-[10px] text-gold mb-5">Follow</p>
          <div className="flex gap-3">
            {["IG", "FB", "X"].map((s) => (
              <a key={s} href="#" className="h-10 w-10 rounded-full border border-gold/30 grid place-items-center text-xs hover:border-gold hover:bg-gold/10 transition-all">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="hairline mb-6" />
      <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-foreground/45 font-eyebrow">
        <span>© {new Date().getFullYear()} The Lounge, Noida. All rights reserved.</span>
        <span>Crafted with intent.</span>
      </div>
      <div className="mt-8 pt-6 border-t border-gold/10 text-center">
        <p className="font-eyebrow text-[10px] md:text-[11px] tracking-[0.32em] text-foreground/55">
          Demo Made By <span className="gold-text font-bold">Velora Studio</span>
        </p>
      </div>
    </div>
  </footer>
);

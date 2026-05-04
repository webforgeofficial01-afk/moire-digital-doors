import { useReveal } from "@/hooks/use-reveal";

const press = [
  "Condé Nast Traveller",
  "GQ India",
  "Vogue Living",
  "Times Food Guide",
  "Lifestyle Asia",
  "Forbes Life",
];

const stats = [
  { v: "4.8★", k: "2,000+ guest reviews" },
  { v: "92%", k: "Repeat visits within 30 days" },
  { v: "11 PM", k: "Reservations close nightly" },
  { v: "#1", k: "Late-night lounge · Sector 18" },
];

export const Press = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <section className="relative py-14 md:py-24 border-y border-gold/10 bg-noir-soft/40">
      <div className="container" ref={ref}>
        <p className={`font-eyebrow text-[10px] md:text-[11px] text-gold/80 mb-7 md:mb-9 text-center reveal-up ${visible ? "in" : ""}`}>
          As featured in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-14 gap-y-4 md:gap-y-5 mb-12 md:mb-16">
          {press.map((p, i) => (
            <span
              key={p}
              className={`font-display italic text-base md:text-xl text-foreground/55 hover:text-gold transition-colors duration-500 reveal-up ${visible ? "in" : ""}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {p}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={`glass rounded-2xl p-5 md:p-6 text-center reveal-up ${visible ? "in" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className="font-display font-black text-3xl md:text-5xl gold-text leading-none">{s.v}</div>
              <div className="mt-2 md:mt-3 font-eyebrow text-[9px] md:text-[10px] text-foreground/60 leading-snug">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

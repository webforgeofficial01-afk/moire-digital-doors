import { useReveal } from "@/hooks/use-reveal";

const pillars = [
  {
    icon: "✦",
    title: "Curated Dining",
    desc: "Every dish, every pour, every detail — selected, never assembled.",
  },
  {
    icon: "❖",
    title: "Premium Ingredients",
    desc: "Single-estate spices, line-caught fish, slow-aged everything.",
  },
  {
    icon: "✧",
    title: "Elegant Ambiance",
    desc: "Velvet, brass and candlelight. Engineered for the after-hours mood.",
  },
  {
    icon: "✺",
    title: "Exceptional Service",
    desc: "Your name remembered. Your usual ready before you ask.",
  },
];

export const WhyUs = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="why" className="relative py-20 md:py-32">
      <div className="container" ref={ref}>
        <div className="text-center mb-12 md:mb-16">
          <p className={`font-eyebrow text-[10px] md:text-[11px] text-gold mb-4 md:mb-6 inline-flex items-center gap-3 reveal-up ${visible ? "in" : ""}`}>
            <span className="h-px w-8 bg-gold/60" />
            Why The Lounge
            <span className="h-px w-8 bg-gold/60" />
          </p>
          <h2 className={`font-display font-black text-[clamp(2rem,6vw,4.5rem)] leading-[1.02] tracking-tight reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            Built on <span className="italic gold-text">Four Promises</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`group relative glass rounded-2xl p-6 md:p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 reveal-up ${visible ? "in" : ""}`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="font-display text-4xl md:text-5xl gold-text mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl mb-3">{p.title}</h3>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

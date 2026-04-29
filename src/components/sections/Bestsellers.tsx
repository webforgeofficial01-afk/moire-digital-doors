import { useRef } from "react";
import { useReveal } from "@/hooks/use-reveal";
import cocktail from "@/assets/dish-cocktail.jpg";
import wagyu from "@/assets/dish-wagyu.jpg";
import pasta from "@/assets/dish-pasta.jpg";

const items = [
  {
    img: cocktail,
    tag: "Reserved Selection",
    name: "Aurum 24K",
    sub: "Smoked bourbon · gold leaf · bitters",
    price: "₹ 1,450",
  },
  {
    img: wagyu,
    tag: "Chef's Pick",
    name: "Wagyu Ember",
    sub: "A5 wagyu · ash salt · gold flake",
    price: "₹ 3,200",
  },
  {
    img: pasta,
    tag: "House Signature",
    name: "Tartufo Nero",
    sub: "Hand-cut tagliolini · black truffle",
    price: "₹ 1,890",
  },
];

const TiltCard = ({ item, idx, visible }: { item: typeof items[number]; idx: number; visible: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-10px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative rounded-3xl overflow-hidden glass transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] reveal-up ${visible ? "in" : ""}`}
      style={{
        transitionDelay: `${idx * 0.12}s`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Shine spot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(var(--gold) / 0.25), transparent 40%)",
        }}
      />
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={900}
          height={1100}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        <div className="absolute top-5 left-5">
          <span className="px-3 py-1.5 rounded-full glass-strong font-eyebrow text-[9px] text-gold">
            {item.tag}
          </span>
        </div>
        {/* Price badge appears on hover */}
        <div className="absolute top-5 right-5 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="px-4 py-2 rounded-full bg-gradient-gold text-noir font-semibold text-sm shadow-glow-gold">
            {item.price}
          </div>
        </div>
      </div>

      <div className="relative p-7 z-20">
        <h3 className="font-display text-3xl tracking-tight text-foreground">{item.name}</h3>
        <p className="text-sm text-foreground/55 mt-2">{item.sub}</p>
        <div className="hairline my-5" />
        <div className="flex items-center justify-between">
          <span className="font-eyebrow text-[10px] text-gold">Available Tonight</span>
          <a href="#reserve" className="font-eyebrow text-[10px] text-foreground/70 hover:text-gold transition-colors flex items-center gap-2 group/link">
            Quick Order
            <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const Bestsellers = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <section id="bestsellers" className="relative py-32 md:py-44">
      <div className="container" ref={ref}>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className={`font-eyebrow text-[11px] text-gold mb-6 flex items-center gap-4 reveal-up ${visible ? "in" : ""}`}>
              <span className="h-px w-10 bg-gold/60" />
              The Menu
            </p>
            <h2 className={`font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-tight reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
              Signature <span className="italic gold-text">Indulgences</span>
            </h2>
          </div>
          <p className={`max-w-sm text-sm text-foreground/55 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            A short list of dishes and pours our regulars never stop ordering. Crafted in small numbers, served with intent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => (
            <TiltCard key={it.name} item={it} idx={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

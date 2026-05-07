import { useState, useRef } from "react";
import { useReveal } from "@/hooks/use-reveal";

type Tag = "chef" | "bestseller" | "bartender" | "new" | "spicy" | "signature";
type Item = { name: string; sub: string; price: string; tags?: Tag[]; emoji?: string };
type Category = { id: string; label: string; items: Item[] };

const TAG_META: Record<Tag, { label: string; cls: string }> = {
  chef:       { label: "Chef's Pick",        cls: "bg-gradient-gold text-noir" },
  bestseller: { label: "★ Bestseller",       cls: "bg-ember/90 text-noir" },
  bartender:  { label: "Bartender's Special",cls: "bg-foreground/90 text-noir" },
  signature:  { label: "Signature",          cls: "bg-gold/20 text-gold border border-gold/40" },
  new:        { label: "New",                cls: "bg-foreground/10 text-foreground border border-foreground/30" },
  spicy:      { label: "🌶 Spicy",           cls: "bg-ember/15 text-ember border border-ember/40" },
};

const categories: Category[] = [
  {
    id: "starters",
    label: "Starters",
    items: [
      { name: "Paneer Tikka Supreme", sub: "Clay-oven paneer · charred peppers · mint", price: "₹ 445", tags: ["chef", "bestseller"], emoji: "🔥" },
      { name: "Tandoori Mushroom Delight", sub: "Smoked button mushrooms · garlic · cream", price: "₹ 395", tags: ["new"], emoji: "🍄" },
      { name: "Dahi Ke Kebab", sub: "Hung curd · cashew · soft-spice crust", price: "₹ 425", emoji: "✨" },
      { name: "Chicken Malai Tikka", sub: "Cream cheese · cardamom · saffron", price: "₹ 525", tags: ["chef"], emoji: "👑" },
      { name: "Amritsari Fish Bites", sub: "Ajwain batter · lemon · house chutney", price: "₹ 565", tags: ["spicy"], emoji: "🐟" },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      { name: "Butter Chicken Royale", sub: "Slow-cooked tomato · cream · charred butter", price: "₹ 595", tags: ["bestseller", "signature"], emoji: "👑" },
      { name: "Dal Makhani Slow Cooked", sub: "24-hour simmered black lentils · butter", price: "₹ 445", tags: ["chef"], emoji: "🥘" },
      { name: "Paneer Lababdar", sub: "Cottage cheese · onion-cashew gravy", price: "₹ 495", emoji: "✨" },
      { name: "Mutton Rogan Josh", sub: "Kashmiri spices · slow-cooked lamb", price: "₹ 695", tags: ["spicy", "signature"], emoji: "🔥" },
      { name: "Veg Biryani Dum Style", sub: "Aged basmati · saffron · house masala", price: "₹ 465", emoji: "🍚" },
      { name: "Chicken Biryani Classic", sub: "Sealed pot · saffron · slow-roasted onions", price: "₹ 545", tags: ["bestseller"], emoji: "🍚" },
      { name: "Kadhai Paneer", sub: "Bell peppers · roasted spices · tomato", price: "₹ 475", emoji: "🫕" },
      { name: "Garlic Butter Naan Basket", sub: "Assorted breads · cultured butter", price: "₹ 295", emoji: "🥖" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Gulab Jamun with Rabri", sub: "Warm dumplings · saffron rabri", price: "₹ 295", tags: ["bestseller"], emoji: "🍯" },
      { name: "Rasmalai Saffron Infused", sub: "Soft cheese discs · cardamom milk", price: "₹ 325", tags: ["chef"], emoji: "✨" },
      { name: "Chocolate Lava Fusion", sub: "Molten valrhona · vanilla bean", price: "₹ 365", tags: ["signature"], emoji: "🍫" },
    ],
  },
  {
    id: "beverages",
    label: "Bar & Beverages",
    items: [
      { name: "Smoked Old Fashioned", sub: "House bourbon · oak smoke · orange peel", price: "₹ 595", tags: ["bartender", "signature"], emoji: "🥃" },
      { name: "Saffron Negroni", sub: "Gin · campari · saffron-infused vermouth", price: "₹ 575", tags: ["bartender"], emoji: "🍸" },
      { name: "Gold Leaf Espresso Martini", sub: "Single-origin · vanilla cream · 24k flake", price: "₹ 645", tags: ["bartender", "signature"], emoji: "✨" },
      { name: "Classic Masala Chai", sub: "Single estate · house spice blend", price: "₹ 145", emoji: "🍵" },
      { name: "Cold Coffee Velvet", sub: "Double shot · slow-churned cream", price: "₹ 245", tags: ["bestseller"], emoji: "☕" },
      { name: "Mango Lassi Premium", sub: "Alphonso · saffron · pistachio", price: "₹ 265", emoji: "🥭" },
    ],
  },
];

const Card = ({ it, i }: { it: Item; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const rx = ((y - 50) / 50) * -4;
    const ry = ((x - 50) / 50) * 6;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="dish-card group relative rounded-2xl p-5 md:p-6"
      style={{
        animation: `word-in 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s both`,
      }}
    >
      {/* Tag chips - inline, never clipped */}
      {it.tags && it.tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-1.5 mb-3">
          {it.tags.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 rounded-full font-eyebrow text-[8.5px] md:text-[9.5px] tracking-[0.18em] leading-none shadow-md ${TAG_META[t].cls}`}
            >
              {TAG_META[t].label}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between gap-3 md:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-[17px] md:text-xl text-foreground leading-snug flex items-start gap-2">
            <span className="dish-emoji emoji text-xl md:text-2xl shrink-0 leading-none">{it.emoji}</span>
            <span className="flex-1 break-words">{it.name}</span>
          </h3>
          <p className="text-[13px] md:text-sm text-foreground/65 mt-2 leading-relaxed">{it.sub}</p>
        </div>
        <div className="font-display font-black text-base md:text-xl gold-text whitespace-nowrap shrink-0">
          {it.price}
        </div>
      </div>

      {/* Shine sweep */}
      <span className="dish-shine" aria-hidden />
      {/* Spotlight follow */}
      <span className="dish-spot" aria-hidden />
      {/* Gold rim */}
      <span className="dish-rim" aria-hidden />
    </div>
  );
};

export const Menu = () => {
  const [active, setActive] = useState("starters");
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  const cat = categories.find((c) => c.id === active)!;

  return (
    <section id="menu" className="relative py-20 md:py-44">
      <div className="container" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <p className={`font-eyebrow text-[10px] md:text-[11px] text-gold mb-4 md:mb-6 inline-flex items-center gap-3 reveal-up ${visible ? "in" : ""}`}>
            <span className="h-px w-8 bg-gold/60" />
            The Menu
            <span className="h-px w-8 bg-gold/60" />
          </p>
          <h2 className={`font-display font-black text-[clamp(2rem,6vw,5rem)] leading-[1.02] tracking-tight reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            Crafted, Course <span className="italic gold-text">by Course</span>
          </h2>
          <p className={`mt-4 md:mt-6 max-w-xl mx-auto text-sm md:text-base text-foreground/65 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            Indian classics, signature cocktails, and bartender exclusives — reimagined with restraint and patience.
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.3s" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`font-eyebrow text-[10px] md:text-[11px] px-4 md:px-5 py-2.5 md:py-3 rounded-full border transition-all duration-500 ${
                active === c.id
                  ? "bg-gradient-gold text-noir border-transparent shadow-glow-gold"
                  : "border-gold/30 text-foreground/70 hover:border-gold hover:text-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div key={cat.id} className="grid md:grid-cols-2 gap-5 md:gap-7 max-w-5xl mx-auto">
          {cat.items.map((it, i) => (
            <Card key={it.name} it={it} i={i} />
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <a href="#reserve" className="gold-button">Reserve Your Table</a>
          <p className="mt-4 font-eyebrow text-[10px] text-foreground/50">Limited seating · Weekends fill fast</p>
        </div>
      </div>
    </section>
  );
};

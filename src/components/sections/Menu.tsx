import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

type Item = { name: string; sub: string; price: string; chef?: boolean };
type Category = { id: string; label: string; items: Item[] };

const categories: Category[] = [
  {
    id: "starters",
    label: "Starters",
    items: [
      { name: "Paneer Tikka Supreme", sub: "Clay-oven paneer · charred peppers · mint", price: "₹ 445", chef: true },
      { name: "Tandoori Mushroom Delight", sub: "Smoked button mushrooms · garlic · cream", price: "₹ 395" },
      { name: "Dahi Ke Kebab", sub: "Hung curd · cashew · soft-spice crust", price: "₹ 425" },
      { name: "Chicken Malai Tikka", sub: "Cream cheese · cardamom · saffron", price: "₹ 525", chef: true },
      { name: "Amritsari Fish Bites", sub: "Ajwain batter · lemon · house chutney", price: "₹ 565" },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      { name: "Butter Chicken Royale", sub: "Slow-cooked tomato · cream · charred butter", price: "₹ 595", chef: true },
      { name: "Dal Makhani Slow Cooked", sub: "24-hour simmered black lentils · butter", price: "₹ 445" },
      { name: "Paneer Lababdar", sub: "Cottage cheese · onion-cashew gravy", price: "₹ 495" },
      { name: "Mutton Rogan Josh", sub: "Kashmiri spices · slow-cooked lamb", price: "₹ 695" },
      { name: "Veg Biryani Dum Style", sub: "Aged basmati · saffron · house masala", price: "₹ 465" },
      { name: "Chicken Biryani Classic", sub: "Sealed pot · saffron · slow-roasted onions", price: "₹ 545" },
      { name: "Kadhai Paneer", sub: "Bell peppers · roasted spices · tomato", price: "₹ 475" },
      { name: "Garlic Butter Naan Basket", sub: "Assorted breads · cultured butter", price: "₹ 295" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Gulab Jamun with Rabri", sub: "Warm dumplings · saffron rabri", price: "₹ 295" },
      { name: "Rasmalai Saffron Infused", sub: "Soft cheese discs · cardamom milk", price: "₹ 325" },
      { name: "Chocolate Lava Fusion", sub: "Molten valrhona · vanilla bean", price: "₹ 365" },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    items: [
      { name: "Classic Masala Chai", sub: "Single estate · house spice blend", price: "₹ 145" },
      { name: "Cold Coffee Velvet", sub: "Double shot · slow-churned cream", price: "₹ 245" },
      { name: "Mango Lassi Premium", sub: "Alphonso · saffron · pistachio", price: "₹ 265" },
      { name: "Signature Mocktails", sub: "Curated by our bar — ask the host", price: "₹ 295" },
    ],
  },
];

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
            A familiar table, elevated. Indian classics reimagined with restraint, premium produce, and patience.
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.3s" }}>
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
        <div key={cat.id} className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {cat.items.map((it, i) => (
            <div
              key={it.name}
              className="group relative glass rounded-2xl p-5 md:p-6 transition-all duration-500 hover:border-gold/50 hover:-translate-y-1"
              style={{
                animation: `word-in 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s both`,
              }}
            >
              {it.chef && (
                <span className="absolute -top-2.5 left-5 px-2.5 py-1 rounded-full bg-gradient-gold text-noir font-eyebrow text-[8px] md:text-[9px] shadow-glow-gold">
                  Chef's Special
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-lg md:text-xl text-foreground leading-tight">
                    {it.name}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/60 mt-2 leading-relaxed">{it.sub}</p>
                </div>
                <div className="font-display font-black text-lg md:text-xl gold-text whitespace-nowrap">
                  {it.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <a href="#reserve" className="gold-button">Reserve Your Table</a>
          <p className="mt-4 font-eyebrow text-[10px] text-foreground/50">Limited seating · Weekends fill fast</p>
        </div>
      </div>
    </section>
  );
};

const items = [
  "⚡ Tonight: 91% of tables already booked",
  "🔥 Live Saturday: Saxx & Soul · Doors 8 PM",
  "✦ Members & reservations seated first",
  "● 47 reservations confirmed in the last hour",
  "⛔ Walk-ins paused after 9 PM — book ahead",
  "🥂 Bottle service · Reserved booths · By request only",
  "★ Rated 4.8 by 2,000+ guests in Noida",
];

export const Ticker = () => {
  return (
    <section className="relative border-y border-gold/15 bg-noir-soft/60 backdrop-blur-md overflow-hidden py-3.5 md:py-5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, hsl(var(--noir)) 0%, transparent 8%, transparent 92%, hsl(var(--noir)) 100%)", zIndex: 2 }} />
      <div className="marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="font-eyebrow text-[10px] md:text-[11px] text-gold/90 inline-flex items-center shrink-0 px-6 md:px-10">
            <span className="whitespace-nowrap">{it}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold/60 ml-6 md:ml-10" />
          </span>
        ))}
      </div>
    </section>
  );
};

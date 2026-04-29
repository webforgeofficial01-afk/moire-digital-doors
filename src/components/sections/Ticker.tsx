const items = [
  "⚡ Tonight: 87% tables booked",
  "🔥 Live: Saxx & Soul · Saturday",
  "✦ Members entry until 11 PM",
  "● 42 reservations in the last hour",
  "⚡ Limited walk-ins after 9 PM",
  "🥂 Bottle service · Reserved booths",
];

export const Ticker = () => {
  return (
    <section className="relative border-y border-gold/15 bg-noir-soft/60 backdrop-blur-md overflow-hidden py-4 md:py-5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, hsl(var(--noir)) 0%, transparent 10%, transparent 90%, hsl(var(--noir)) 100%)", zIndex: 2 }} />
      <div className="marquee gap-8 md:gap-12">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="font-eyebrow text-[10px] md:text-[11px] text-gold/90 flex items-center gap-8 md:gap-12 shrink-0">
            {it}
            <span className="inline-block h-1 w-1 rounded-full bg-gold/60" />
          </span>
        ))}
      </div>
    </section>
  );
};

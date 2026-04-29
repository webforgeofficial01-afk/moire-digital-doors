import { useReveal } from "@/hooks/use-reveal";
import dj from "@/assets/event-dj.jpg";
import ladies from "@/assets/event-ladies.jpg";
import live from "@/assets/event-live.jpg";

const lineup = [
  {
    img: dj,
    day: "Friday",
    name: "DJ Karan · Ember Set",
    desc: "Afro-house till sunrise. Bottle service from 10 PM.",
    badge: "Limited Entry",
  },
  {
    img: ladies,
    day: "Wednesday",
    name: "Ladies Night",
    desc: "Complimentary signature pour for ladies until midnight.",
    badge: "Guest list closing soon",
  },
  {
    img: live,
    day: "Saturday",
    name: "Live: Saxx & Soul",
    desc: "An intimate live set. Seating by reservation only.",
    badge: "85% Booked",
  },
];

export const Events = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="events" className="relative py-32 md:py-44 overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-30 animate-drift" style={{ background: "radial-gradient(circle, hsl(var(--ember) / 0.4), transparent 60%)" }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 animate-drift" style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.35), transparent 60%)", animationDelay: "-10s" }} />
      </div>

      <div className="container relative z-10" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className={`font-eyebrow text-[11px] text-gold mb-6 reveal-up ${visible ? "in" : ""}`}>
            <span className="inline-block h-px w-8 bg-gold/60 align-middle mr-3" />
            This Week's Lineup
            <span className="inline-block h-px w-8 bg-gold/60 align-middle ml-3" />
          </p>
          <h2 className={`font-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[1.02] reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            Tonight, the city <br />
            <span className="italic gold-text">comes to us.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {lineup.map((ev, i) => (
            <article
              key={ev.name}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer reveal-blur ${visible ? "in" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s`, minHeight: "560px" }}
            >
              {/* Image full bleed */}
              <img
                src={ev.img}
                alt={ev.name}
                loading="lazy"
                width={1200}
                height={1400}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-1"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/10 transition-opacity duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 80%, hsl(var(--gold) / 0.35), transparent 60%)" }} />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-3xl border border-gold/15 group-hover:border-gold/60 group-hover:shadow-glow-gold transition-all duration-700" />

              {/* Top badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="px-3 py-1.5 rounded-full glass-strong font-eyebrow text-[9px] text-gold">
                  {ev.day}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-ember/20 border border-ember/40 font-eyebrow text-[9px] text-ember animate-ticker-pulse">
                  ● {ev.badge}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3 transition-transform duration-700 group-hover:-translate-y-1">
                  {ev.name}
                </h3>
                <p className="text-sm text-foreground/65 mb-6 max-w-xs">{ev.desc}</p>
                <div className="overflow-hidden">
                  <a
                    href="#reserve"
                    className="inline-flex items-center gap-3 font-eyebrow text-[10px] text-gold border-b border-gold/40 pb-1.5 translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    Join Guest List
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

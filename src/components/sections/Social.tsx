import { useReveal } from "@/hooks/use-reveal";
import s1 from "@/assets/social-1.jpg";
import s2 from "@/assets/social-2.jpg";
import s3 from "@/assets/social-3.jpg";
import s4 from "@/assets/social-4.jpg";

const tiles = [
  { img: s1, handle: "@aanya.k", tag: "Wednesday Nights" },
  { img: s2, handle: "@thecrew", tag: "Bottle Service" },
  { img: s3, handle: "@nights.in", tag: "Saturday DJ Set" },
  { img: s4, handle: "@moire.bar", tag: "House Mixology" },
];

export const Social = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  return (
    <section id="social" className="relative py-20 md:py-44">
      <div className="container" ref={ref}>
        <div className="flex items-end justify-between flex-wrap gap-5 mb-10 md:mb-14">
          <div>
            <p className={`font-eyebrow text-[10px] md:text-[11px] text-gold mb-4 md:mb-6 flex items-center gap-3 md:gap-4 reveal-up ${visible ? "in" : ""}`}>
              <span className="h-px w-8 md:w-10 bg-gold/60" />
              Seen at Moire
            </p>
            <h2 className={`font-display font-black text-[clamp(1.85rem,6vw,5rem)] leading-[1.08] reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
              The room is <span className="italic gold-text">always</span> the story.
            </h2>
          </div>
          <a href="#" className={`ghost-button reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            Follow on Instagram
          </a>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {tiles.map((t, i) => (
            <a
              href="#"
              key={t.handle + i}
              className={`group relative block overflow-hidden rounded-2xl reveal-up ${visible ? "in" : ""}`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                aspectRatio: i === 0 || i === 3 ? "3/4" : "3/4",
                gridRow: i === 1 ? "span 1" : "auto",
              }}
            >
              <img
                src={t.img}
                alt={t.tag}
                loading="lazy"
                width={800}
                height={1000}
                className="h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/95 via-noir/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />

              {/* IG-style top */}
              <div className="absolute top-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-7 w-7 rounded-full bg-gradient-gold p-[1.5px]">
                  <div className="h-full w-full rounded-full bg-noir" />
                </div>
                <span className="font-eyebrow text-[10px] text-foreground">{t.handle}</span>
              </div>

              {/* Bottom tag */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-eyebrow text-[10px] text-gold">{t.tag}</span>
                <div className="h-px w-8 bg-gold/60 mt-2 group-hover:w-16 transition-all duration-500" />
              </div>
            </a>
          ))}
        </div>

        {/* Reviews row */}
        <Reviews />
      </div>
    </section>
  );
};

const reviews = [
  { name: "Ishaan M.", text: "Walked in expecting a cafe. Walked out planning my next visit. The vibe is unmatched in Noida." },
  { name: "Riya & Aanya", text: "Wednesday Ladies Night is our weekly ritual now. The cocktails are art." },
  { name: "Karan S.", text: "Finally a place that takes service seriously. The staff remembered my drink on the second visit." },
  { name: "Devika R.", text: "Booked for a birthday. They made it feel like a private event. Worth every rupee." },
  { name: "Arjun T.", text: "The Wagyu Ember is the best thing I've eaten this year. Period." },
];

const Reviews = () => {
  return (
    <div className="mt-20 md:mt-28">
      <div className="flex items-end justify-between flex-wrap gap-5 mb-8 md:mb-12">
        <div>
          <p className="font-eyebrow text-[11px] text-gold mb-3 md:mb-4">★ ★ ★ ★ ★</p>
          <h3 className="font-display font-black text-3xl md:text-5xl leading-tight">
            Rated <span className="gold-text">4.6</span> by 2,000+ guests
          </h3>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
        <div className="marquee gap-5 md:gap-6">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="shrink-0 w-[280px] md:w-[420px] glass rounded-2xl p-6 md:p-7">
              <div className="text-gold mb-3 md:mb-4 text-sm tracking-widest">★ ★ ★ ★ ★</div>
              <p className="font-display italic font-bold text-base md:text-xl leading-snug text-foreground/90 whitespace-normal">
                "{r.text}"
              </p>
              <div className="hairline my-4 md:my-5" />
              <p className="font-eyebrow text-[10px] text-foreground/60">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

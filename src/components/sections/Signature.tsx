import { useReveal } from "@/hooks/use-reveal";
import lounge from "@/assets/lounge-scene.jpg";

const headline = "Not everyone gets in. And that's the point.";

export const Signature = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const words = headline.split(" ");

  return (
    <section id="signature" className="relative py-32 md:py-48 overflow-hidden">
      {/* BG with parallax-style fixed feel */}
      <div className="absolute inset-0">
        <img
          src={lounge}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover scale-110 opacity-50"
          style={{ filter: "blur(2px) saturate(120%)" }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(0 0% 0% / 0.4), hsl(0 0% 4% / 0.95))" }} />
        {/* Light reflections */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-40 animate-drift" style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.3), transparent 60%)" }} />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-30 animate-drift" style={{ background: "radial-gradient(circle, hsl(var(--ember) / 0.4), transparent 60%)", animationDelay: "-7s" }} />
      </div>

      <div className="container relative z-10" ref={ref}>
        <p className={`font-eyebrow text-[11px] text-gold mb-10 flex items-center gap-4 reveal-up ${visible ? "in" : ""}`}>
          <span className="h-px w-10 bg-gold/60" />
          The Signature Experience
        </p>

        <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <span
                className="inline-block"
                style={{
                  animation: visible ? `word-in 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` : "none",
                }}
              >
                {w === "And" || w === "that's" || w === "the" || w === "point." ? (
                  <span className="italic gold-text">{w}</span>
                ) : (
                  w
                )}
              </span>
            </span>
          ))}
        </h2>

        <div className={`mt-16 grid md:grid-cols-3 gap-8 reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.5s" }}>
          {[
            { k: "01", t: "Curated Crowd", d: "A guest list shaped by taste, not chance." },
            { k: "02", t: "Cinematic Setting", d: "Velvet, brass and candlelight engineered for atmosphere." },
            { k: "03", t: "Bespoke Service", d: "Your table remembered. Your order anticipated." },
          ].map((it) => (
            <div key={it.k} className="group">
              <div className="font-display text-5xl gold-text mb-4">{it.k}</div>
              <div className="hairline mb-5 group-hover:opacity-100 opacity-60 transition-opacity" />
              <h3 className="font-display text-2xl mb-2">{it.t}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

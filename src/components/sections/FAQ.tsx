import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const faqs = [
  {
    q: "How do I reserve a table at The Lounge, Noida?",
    a: "Tap any 'Reserve' button on this page to open our 30-second booking flow. You'll choose guests, time, and tier. We text you instantly to confirm.",
  },
  {
    q: "What are your hours?",
    a: "We're open daily from 11 AM to 1 AM. The lounge experience activates after 7 PM — that's when ambience, music, and bar service peak.",
  },
  {
    q: "Is there a dress code?",
    a: "Smart-casual or better. Think tailored, refined, intentional. Athleisure and beachwear are not seated.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes — when capacity allows. Walk-ins pause after 9 PM on weekends. Reservations and members are seated first.",
  },
  {
    q: "Where exactly are you located?",
    a: "Sector 18, Noida — the heart of the city's nightlife district. Valet parking available after 7 PM.",
  },
  {
    q: "Can I book for a private event or birthday?",
    a: "Absolutely. We curate birthdays, anniversaries, and intimate gatherings. Mention it in the booking notes or WhatsApp us — we handle the rest.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="faq" className="relative py-20 md:py-32">
      <div className="container max-w-3xl" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <p className={`font-eyebrow text-[10px] md:text-[11px] text-gold mb-4 md:mb-6 inline-flex items-center gap-3 reveal-up ${visible ? "in" : ""}`}>
            <span className="h-px w-8 bg-gold/60" />
            Frequently Asked
            <span className="h-px w-8 bg-gold/60" />
          </p>
          <h2 className={`font-display font-black text-[clamp(2rem,6vw,4.5rem)] leading-[1.02] tracking-tight reveal-up ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            Before you <span className="italic gold-text">arrive</span>
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <div
                key={f.q}
                className={`glass rounded-2xl overflow-hidden transition-all duration-500 reveal-up ${visible ? "in" : ""} ${
                  active ? "border-gold/50" : ""
                }`}
                style={{ transitionDelay: `${0.15 + i * 0.05}s` }}
              >
                <button
                  onClick={() => setOpen(active ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={active}
                >
                  <span className="font-display font-bold text-base md:text-lg text-foreground leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`h-8 w-8 shrink-0 rounded-full border border-gold/40 grid place-items-center text-gold transition-transform duration-500 ${
                      active ? "rotate-45 bg-gold/10" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ maxHeight: active ? 240 : 0, opacity: active ? 1 : 0 }}
                >
                  <p className="px-5 md:px-6 pb-6 text-sm md:text-base text-foreground/70 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

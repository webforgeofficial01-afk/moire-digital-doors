import { useEffect, useState } from "react";
import { openReservation } from "@/lib/reservation";

export const MobileStickyCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Sticky bottom bar — mobile only */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 4% / 0.95) 35%)",
        }}
      >
        <div className="px-4 pt-6 pb-2 flex items-center gap-3">
          <button
            onClick={() => openReservation(false)}
            className="flex-1 gold-button !py-3.5 !text-[11px]"
          >
            🔥 Reserve Now
          </button>
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20The%20Lounge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="h-12 w-12 rounded-full grid place-items-center text-xl shrink-0"
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              boxShadow: "0 8px 24px -6px rgba(37, 211, 102, 0.5)",
            }}
          >
            <span aria-hidden>💬</span>
          </a>
        </div>
      </div>

      {/* Floating WhatsApp — desktop */}
      <a
        href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20The%20Lounge"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:grid fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full place-items-center text-2xl hover:scale-110 transition-transform duration-300"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 12px 32px -8px rgba(37, 211, 102, 0.6)",
        }}
      >
        <span aria-hidden>💬</span>
      </a>
    </>
  );
};

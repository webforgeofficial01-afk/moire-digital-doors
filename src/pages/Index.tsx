import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { Menu } from "@/components/sections/Menu";
import { WhyUs } from "@/components/sections/WhyUs";
import { Press } from "@/components/sections/Press";
import { FAQ } from "@/components/sections/FAQ";
import { Social } from "@/components/sections/Social";
import { Ticker } from "@/components/sections/Ticker";
import { FinalCTA, Footer } from "@/components/sections/FinalCTA";
import { EntryGate } from "@/components/EntryGate";
import { ReservationModal } from "@/components/ReservationModal";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { UrgencyBar } from "@/components/UrgencyBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AmbientToggle } from "@/components/AmbientToggle";
import { LiquidBackground } from "@/components/LiquidBackground";
import { onReservationOpen, openReservation } from "@/lib/reservation";

const Index = () => {
  const [resOpen, setResOpen] = useState(false);
  const [priority, setPriority] = useState(false);

  useEffect(() => {
    const off = onReservationOpen((p) => {
      setPriority(p);
      setResOpen(true);
    });
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href="#reserve"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      const text = (anchor.textContent || "").toLowerCase();
      openReservation(text.includes("priority") || text.includes("skip") || text.includes("claim"));
    };
    document.addEventListener("click", onClick);
    return () => {
      off();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <main className="relative bg-noir text-foreground overflow-x-hidden">
      <EntryGate />
      <LiquidBackground />
      <ScrollProgress />
      <UrgencyBar />
      {/* SEO H1 — visually hidden, single H1 for crawlers */}
      <h1 className="sr-only">The Lounge Noida — Premium Cafe & Late-Night Lounge in Sector 18</h1>
      <Nav />
      <Hero />
      <Press />
      <Signature />
      <Menu />
      <Ticker />
      <WhyUs />
      <Social />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileStickyCTA />
      <AmbientToggle />
      <ReservationModal open={resOpen} onClose={() => setResOpen(false)} defaultPriority={priority} />
    </main>
  );
};

export default Index;

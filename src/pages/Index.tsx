import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { Menu } from "@/components/sections/Menu";
import { WhyUs } from "@/components/sections/WhyUs";
import { Social } from "@/components/sections/Social";
import { Ticker } from "@/components/sections/Ticker";
import { FinalCTA, Footer } from "@/components/sections/FinalCTA";
import { EntryGate } from "@/components/EntryGate";
import { ReservationModal } from "@/components/ReservationModal";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
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
      openReservation(text.includes("priority") || text.includes("skip"));
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
      <Nav />
      <Hero />
      <Signature />
      <Menu />
      <Ticker />
      <WhyUs />
      <Social />
      <FinalCTA />
      <Footer />
      <MobileStickyCTA />
      <ReservationModal open={resOpen} onClose={() => setResOpen(false)} defaultPriority={priority} />
    </main>
  );
};

export default Index;

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { Events } from "@/components/sections/Events";
import { Social } from "@/components/sections/Social";
import { Ticker } from "@/components/sections/Ticker";
import { FinalCTA, Footer } from "@/components/sections/FinalCTA";

const Index = () => {
  return (
    <main className="relative bg-noir text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Signature />
      <Bestsellers />
      <Ticker />
      <Events />
      <Social />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;

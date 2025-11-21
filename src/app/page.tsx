import Hero from "@/components/Hero";
import StickyJourney from "@/components/StickyJourney";
import TechSections from "@/components/TechSections";
import Playground from "@/components/Playground";
import TechPoll from "@/components/TechPoll";
import Footer from "@/components/Footer";
import InfiniteScroll from "@/components/InfiniteScroll";

export default function Home() {
  return (
    <>
      <Hero />
      
      <InfiniteScroll 
        items={[
          "React 19", "Next.js 15", "Tailwind CSS 4", "Framer Motion", "Three.js", "WebGL", "TypeScript", "Shadcn UI",
          "React Bits", "Lucide Icons", "Vercel", "Postgres", "Drizzle ORM"
        ]}
        speed={35}
        className="border-y border-white/5 bg-slate-950/50 backdrop-blur-sm"
        itemClassName="text-slate-500 hover:text-slate-300 transition-colors"
      />

      <StickyJourney />
      <TechSections />
      <Playground />
      <TechPoll />
      <Footer />
    </>
  );
}

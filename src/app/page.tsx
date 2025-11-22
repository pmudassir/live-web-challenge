import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import StickyJourney from "@/components/StickyJourney";
import TechSections from "@/components/TechSections";
import { PromptingIsAllYouNeed } from "@/components/ui/animated-hero-section";
import TechPoll from "@/components/TechPoll";
import Footer from "@/components/Footer";
import InfiniteScroll from "@/components/InfiniteScroll";

export default function Home() {
  return (
    <>
      <HeroGeometric 
        badge="Mudassir Mohammed"
        title1="Crafting Digital"
        title2="Masterpieces"
        description="Lead Frontend Developer crafting scalable solutions and immersive web applications. Transforming ideas into reality through code."
      />
      <InfiniteScroll
        items={[
          "ReactJS",
          "NextJS",
          "React Native",
          "TypeScript",
          "Redux",
          "ThreeJS",
          "NodeJS",
          "NestJS",
          "PostgreSQL",
          "MongoDB",
          "AWS",
          "Docker",
          "Kubernetes",
          "Tailwind CSS",
          "Shadcn UI",
        ]}
        speed={35}
        className="border-y border-white/5 bg-slate-950/50 backdrop-blur-sm"
        itemClassName="text-slate-500 hover:text-slate-300 transition-colors"
      />

      <StickyJourney />
      <TechSections />
      
      <section className="relative w-full h-[600px] border-y border-white/5 my-20">
        <PromptingIsAllYouNeed />
        <div className="absolute bottom-4 right-4 text-xs text-white/20 pointer-events-none font-mono">
          INTERACTIVE PONG
        </div>
      </section>

      <TechPoll />
      <Footer />
    </>
  );
}

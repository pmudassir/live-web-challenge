"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import type { TechSectionConfig } from "@/types";
import AnimatedCard from "./AnimatedCard";
import TiltedCard from "./TiltedCard";
import FactCard from "./FactCard";
import SplitText from "./SplitText";
import ParallaxElement from "./ParallaxElement";

interface TechSectionProps {
  config: TechSectionConfig;
  index: number;
}

function getSectionColor(id: string) {
  switch (id) {
    case "ai": return "rgba(56, 189, 248, 0.4)"; // Cyan
    case "data": return "rgba(99, 102, 241, 0.4)"; // Indigo
    case "robotics": return "rgba(245, 158, 11, 0.4)"; // Amber
    case "mobile": return "rgba(16, 185, 129, 0.4)"; // Emerald
    case "web": return "rgba(236, 72, 153, 0.4)"; // Pink
    case "emerging": return "rgba(139, 92, 246, 0.4)"; // Violet
    default: return "rgba(255, 255, 255, 0.2)";
  }
}

export default function TechSection({ config, index }: TechSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const inView = useInView(sectionRef, {
    amount: 0.2,
    once: true,
  });

  const Icon = config.icon;
  const reversed = index % 2 === 1;
  const spotlightColor = getSectionColor(config.id);

  return (
    <section 
      id={config.id} 
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center py-24 overflow-hidden"
    >
      {/* Abstract Background Glow */}
      <div className={cn(
        "absolute inset-0 opacity-20 pointer-events-none",
        reversed ? "bg-gradient-to-bl" : "bg-gradient-to-br",
        "from-slate-900 via-slate-950 to-slate-950"
      )}>
         <div className={cn(
           "absolute w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen opacity-30",
           reversed ? "-right-40 top-0" : "-left-40 bottom-0",
           config.accentFrom.replace("from-", "bg-")
         )} />
      </div>

      <div className={cn(
        "relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 grid gap-16 lg:gap-24 items-center",
        reversed ? "lg:grid-cols-[1fr_0.8fr]" : "lg:grid-cols-[0.8fr_1fr]"
      )}>
        
        {/* Content Column */}
        <motion.div 
          className={cn("space-y-8 relative z-10", reversed && "lg:order-2")}
          initial={{ opacity: 0, x: reversed ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-4">
            <span className="text-6xl md:text-8xl font-bold text-white/5 tracking-tighter select-none">
              0{index + 1}
            </span>
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md",
              "text-slate-300"
            )}>
              <Icon className="h-3.5 w-3.5" />
              {config.label}
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            {config.title}
          </h2>

          <div className="max-w-lg">
            <SplitText 
              text={config.description} 
              className="text-lg text-slate-400 leading-relaxed"
              textAlign="left"
              delay={0.2}
            />
          </div>

          <div className="flex flex-wrap gap-3">
             <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/5 text-xs font-mono text-slate-400">
               # {config.id}
             </div>
             <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/5 text-xs font-mono text-slate-400">
               {config.highlight}
             </div>
          </div>
        </motion.div>

        {/* Visual Column */}
        <motion.div
          className={cn("relative z-10", reversed && "lg:order-1")}
          style={{ y, opacity }}
        >
          <div className="grid gap-6">
            <TiltedCard 
              className="min-h-[280px] p-8 flex flex-col justify-end bg-slate-900/80"
              containerClassName="w-full h-full"
              glareOpacity={0.1}
              tiltScale={1.02}
            >
               <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
               
               <div className="relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white/80" />
                 </div>
                 <h3 className="text-2xl font-semibold text-white mb-2">Interactive Lab</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">
                   {config.highlight}. Experience real-time simulations powered by next-gen frameworks.
                 </p>
               </div>
            </TiltedCard>

            <div className="pl-8 md:pl-16">
               <FactCard fact={config.didYouKnow} detail={config.factDetail} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

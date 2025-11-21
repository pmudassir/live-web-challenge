"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";
import MagnetLines from "./MagnetLines";

const STEPS = [
  {
    label: "Imagine",
    title: "Spot something that feels impossible.",
    body:
      "Start with a moment of wonderan interface, animation, or robot that makes you ask: how did they build that?",
  },
  {
    label: "Deconstruct",
    title: "Break the magic into tiny, learnable pieces.",
    body:
      "Behind every effect is just motion, data, and components wired together. You can learn each piece in isolation.",
  },
  {
    label: "Remix",
    title: "Combine patterns into your own experiments.",
    body:
      "Use libraries like Framer Motion, React Bits and shadcn/ui as building blocks, then remix them into new stories.",
  },
  {
    label: "Ship",
    title: "Share your work and inspire the next wave.",
    body:
      "The projects that feel unattainable today can become someone else&apos;s starting point tomorrowincluding this page.",
  },
] as const;

export default function StickyJourney() {
  return (
    <section id="journey" className="relative py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        
        {/* Sticky Left Column */}
        <motion.div
          className="relative hidden lg:flex items-start h-fit sticky top-32"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 -z-10 translate-x-10 scale-150 opacity-30">
             <MagnetLines 
               rows={9} 
               cols={9} 
               lineColor="rgba(56, 189, 248, 0.1)" 
               lineWidth="2px"
               lineHeight="20px"
               baseAngle={0}
             />
          </div>

          <AnimatedCard className="w-full bg-slate-900/80 p-8 border-cyan-500/30 backdrop-blur-xl">
            <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Live Learning
                  </div>
                  <span className="text-xs text-slate-500 font-mono">01 / 04</span>
               </div>
               
               <h3 className="text-3xl font-bold text-white leading-tight">
                 From Observer <br/> to Creator
               </h3>
               
               <p className="text-slate-400 leading-relaxed">
                 This page isn't just a demo; it's a roadmap. Scroll through the timeline to see how you go from "watching" to "building" interactive experiences like this one.
               </p>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Scrollable Timeline Right Column */}
        <div className="relative space-y-12 pl-8 lg:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-0 top-4 bottom-4 w-px bg-slate-800 lg:hidden" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Mobile Timeline Dot */}
              <span className="absolute -left-[36px] top-6 h-3 w-3 rounded-full border-2 border-slate-900 bg-slate-600 lg:hidden" />

              <AnimatedCard className="p-6 hover:border-cyan-500/30 transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-white border border-white/10">
                      0{index + 1}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      {step.label}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

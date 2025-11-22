"use client";

import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";
import MagnetLines from "./MagnetLines";

const STEPS = [
  {
    label: "Present",
    title: "Lead Frontend Developer @ BestDoc Technology",
    body:
      "Leading the frontend development of BestDoc Concierge using Vue, Nuxt, and Vuetify. Streamlined workflows, boosted efficiency by 35%, and reduced response times by 40%.",
  },
  {
    label: "2023 - 2024",
    title: "React Native Developer @ App Stone",
    body:
      "Engineered a cross-platform mobile app with 98% user satisfaction. Boosted user interaction and attendance by 30% through premium features and personalized profiles.",
  },
  {
    label: "2022 - 2023",
    title: "Full Stack Developer @ Eclidse Technologies",
    body:
      "Developed MERN stack applications with a 40% engagement boost. Led team discussions, reduced bug resolution time by 20%, and created detailed technical documentation.",
  },
  {
    label: "2020 - 2023",
    title: "BA English @ University of Calicut",
    body:
      "Completed Bachelor of Arts in English. Developed strong communication and analytical skills that complement technical expertise.",
  },
] as const;

export default function StickyJourney() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        
        {/* Sticky Left Column */}
        <motion.div
          className="hidden lg:flex items-start h-fit sticky top-32"
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

          <AnimatedCard className="w-full bg-white/[0.03] p-8 border-white/[0.08] backdrop-blur-xl">
            <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Career Path
                  </div>
                  <span className="text-xs text-white/40 font-mono">01 / 04</span>
               </div>
               
               <h3 className="text-3xl font-bold text-white leading-tight">
                 My Professional <br/> Journey
               </h3>
               
               <p className="text-white/40 leading-relaxed">
                 A timeline of my career growth, from humble beginnings to leading complex technical projects. Each role has been a stepping stone in mastering the craft of software engineering.
               </p>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Scrollable Timeline Right Column */}
        <div className="relative space-y-12 pl-8 lg:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-0 top-4 bottom-4 w-px bg-white/[0.08] lg:hidden" />

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
              <span className="absolute -left-[36px] top-6 h-3 w-3 rounded-full border-2 border-[#030303] bg-white/20 lg:hidden" />

              <AnimatedCard className="p-6 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-xs font-bold text-white border border-white/[0.08]">
                      0{index + 1}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                      {step.label}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-white/40 leading-relaxed">
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

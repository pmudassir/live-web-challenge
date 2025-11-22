"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Bot, Cpu, Sparkles } from "lucide-react";
import AnimatedWords from "./AnimatedWords";
import AnimatedCard from "./AnimatedCard";
import StarField from "./StarField";
import DecryptedText from "./DecryptedText";
import MovingBorderButton from "./MovingBorderButton";

const phrases = [
  "Frontend Developer",
  "React Native Developer",
  "Full Stack Engineer",
  "UI/UX Enthusiast",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const cursorXSpring = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.3 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.3 });

  useEffect(() => {
    const phrase = phrases[index];
    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      setDisplayText(phrase.slice(0, frame));
      if (frame >= phrase.length) {
        clearInterval(interval);
        const timeout = setTimeout(() => {
          setIndex((prev) => (prev + 1) % phrases.length);
          setDisplayText("");
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [index]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - left);
    cursorY.set(event.clientY - top);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[110vh] items-center justify-center overflow-hidden px-6 pt-32 pb-20 sm:px-8 lg:px-12"
      onPointerMove={handlePointerMove}
    >
      <StarField speed={0.4} starColor="#e2e8f0" />

      {/* Ambient Hero Glow - Reduced opacity for StarField visibility */}
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_60%)] blur-[120px] mix-blend-screen"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      <div className="relative z-10 grid w-full max-w-7xl gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        
        {/* Typography Column */}
        <div className="space-y-10">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200 backdrop-blur-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <DecryptedText text="Mudassir Mohammed" speed={60} />
          </motion.div>

          <motion.h1
            className="text-balance text-6xl font-bold leading-[0.9] tracking-tighter text-slate-50 sm:text-7xl md:text-8xl lg:text-[5.5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-slate-400/80">Crafting digital</span>
            <span className="mt-2 block bg-linear-to-r from-white via-cyan-100 to-slate-400 bg-clip-text text-transparent">
              <AnimatedWords text="masterpieces." />
            </span>
          </motion.h1>

          <motion.div
            className="max-w-lg space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
             <p className="text-lg leading-relaxed text-slate-400">
               Lead Frontend Developer specializing in React, Next.js, and modern web technologies. 
               Building scalable, high-performance applications with a focus on exceptional user experience.
             </p>

             <div className="flex items-center gap-2 text-sm text-cyan-100/90">
               <span className="text-[0.7rem] uppercase tracking-[0.22em] text-cyan-300/90">
                 Role
               </span>
               <span className="h-px w-8 bg-cyan-400/70" />
               <span className="inline-flex items-center text-sm font-medium text-cyan-50">
                 <DecryptedText text={displayText} speed={40} animateOn="view" />
                 <span className="ml-[3px] inline-block h-4 w-[2px] animate-pulse rounded-full bg-cyan-300" />
               </span>
             </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <MovingBorderButton
              borderRadius="1.75rem"
              className="bg-white text-slate-950 font-bold border-none"
              containerClassName="h-14 w-auto"
              borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]"
            >
               <span className="flex items-center gap-2 px-6">
                 <DecryptedText text="View Projects" speed={80} animateOn="hover" className="text-slate-950" />
                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </span>
            </MovingBorderButton>

            <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-8 font-medium text-slate-200 backdrop-blur-xl transition-colors hover:bg-white/5">
              <Bot className="h-4 w-4 text-cyan-300" />
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* 3D Visual Column */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: "2000px" }}
        >
           <AnimatedCard className="min-h-[450px] w-full origin-center bg-slate-900/60 p-8">
              <div className="flex h-full flex-col justify-between">
                 <div>
                    <div className="flex items-center justify-between">
                       <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          System Online
                       </span>
                       <Cpu className="h-5 w-5 text-slate-500" />
                    </div>
                    <h3 className="mt-6 text-3xl font-light leading-tight text-white">
                      Neural<br />Architecture
                    </h3>
                 </div>

                 <div className="space-y-4">
                    <div className="rounded-xl bg-white/5 p-4 backdrop-blur-md">
                       <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                          <span>Processing</span>
                          <span>98%</span>
                       </div>
                       <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[98%] rounded-full bg-cyan-400" />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
                          <div className="text-xs text-slate-500">Nodes</div>
                          <div className="mt-1 text-xl font-medium text-white">4.2k</div>
                       </div>
                       <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
                          <div className="text-xs text-slate-500">Latency</div>
                          <div className="mt-1 text-xl font-medium text-white">12ms</div>
                       </div>
                    </div>
                 </div>
              </div>
           </AnimatedCard>

           {/* Floating Elements */}
           <motion.div 
             className="absolute -right-12 top-24 w-48 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl"
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           >
              <div className="flex items-center gap-3">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                    <Bot className="h-5 w-5 text-cyan-300" />
                 </div>
                 <div>
                    <div className="text-xs font-medium text-white">AI Agent</div>
                    <div className="text-[10px] text-cyan-300">Active</div>
                 </div>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

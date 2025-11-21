"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";

function GlitchTitle({ text }: { text: string }) {
  const layers = useMemo(() => ["cyan", "pink"], []);

  return (
    <div className="relative inline-block text-xl font-bold sm:text-2xl">
      <motion.span
        className="relative z-10 text-white"
        animate={{ skewX: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
      {layers.map((layer) => (
        <motion.span
          key={layer}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 select-none blur-[1px]",
            layer === "cyan" && "text-cyan-400/60",
            layer === "pink" && "text-fuchsia-400/60",
          )}
          animate={{ x: layer === "cyan" ? [-1.5, 1.5, -1.5] : [1.5, -1.5, 1.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
}

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 300, damping: 26, mass: 0.6 });

  const handleMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <button
      type="button"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/40 bg-slate-950/80 px-6 py-3 text-sm font-medium text-cyan-50 shadow-[0_16px_60px_rgba(8,47,73,0.9)] outline-none backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-transform hover:scale-105"
    >
      <span className="relative z-10">Drag the future closer</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ x: springX, y: springY }}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_60%)]" />
      </motion.span>
    </button>
  );
}

function ReactiveGrid() {
  const cells = useMemo(() => Array.from({ length: 16 }), []);

  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map((_, index) => (
        <motion.div
          key={index}
          className="aspect-square rounded-md bg-slate-800/50 border border-white/5"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(56,189,248,0.8)", borderColor: "transparent" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.4,
            delay: index * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

export default function Playground() {
  return (
    <section id="playground" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-slate-800/0 via-slate-500/40 to-slate-800/0" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
             Interactive Lab
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Micro-Interactions
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            These micro-experiments show how far you can push motion, gradients, and
            interactionsall using the same tools powering this page.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedCard spotlightColor="rgba(236, 72, 153, 0.4)">
            <div className="flex flex-col h-full justify-between gap-8">
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Typography</p>
                 <GlitchTitle text="Glitch Effect" />
               </div>
               <p className="text-sm text-slate-400 leading-relaxed">
                 Layer text, color, and motion to turn simple headlines into mini animations that feel alive.
               </p>
            </div>
          </AnimatedCard>

          <AnimatedCard spotlightColor="rgba(56, 189, 248, 0.4)">
            <div className="flex flex-col h-full justify-between gap-8">
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Physics</p>
                 <p className="text-xl font-bold text-white mb-4">Magnetic Cursor</p>
                 <MagneticButton />
               </div>
               <p className="text-sm text-slate-400 leading-relaxed">
                 Buttons that subtly chase your cursor feel playful and responsive.
               </p>
            </div>
          </AnimatedCard>

          <AnimatedCard spotlightColor="rgba(16, 185, 129, 0.4)" className="sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col h-full justify-between gap-8">
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Layout</p>
                 <p className="text-xl font-bold text-white mb-4">Reactive Grid</p>
                 <ReactiveGrid />
               </div>
               <p className="text-sm text-slate-400 leading-relaxed">
                 Tiny interactions add up. Even a simple grid can feel like a responsive instrument.
               </p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}

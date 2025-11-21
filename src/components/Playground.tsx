"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";

function GlitchTitle({ text }: { text: string }) {
  const layers = useMemo(() => ["cyan", "pink"], []);

  return (
    <div className="relative inline-block text-base font-semibold sm:text-lg">
      <motion.span
        className="relative z-10"
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

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 26,
    mass: 0.6,
  });
  const springY = useSpring(y, {
    stiffness: 300,
    damping: 26,
    mass: 0.6,
  });

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
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/40 bg-slate-950/80 px-5 py-2.5 text-[0.8rem] font-medium text-cyan-50 shadow-[0_16px_60px_rgba(8,47,73,0.9)] outline-none backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
    <div className="grid grid-cols-4 gap-1.5">
      {cells.map((_, index) => (
        <motion.div
          key={index}
          className="aspect-square rounded-lg bg-slate-800/80"
          whileHover={{ scale: 1.3, backgroundColor: "rgb(56,189,248)" }}
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
    <section id="playground" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-slate-800/0 via-slate-500/40 to-slate-800/0" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl space-y-3">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.26em] text-cyan-300/90">
            Interactive Playground
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            Try a few wild UI ideas you can actually build.
          </h2>
          <p className="text-sm text-slate-300/85 sm:text-base">
            These micro-experiments show how far you can push motion, gradients, and
            interactionsall using the same tools powering this page.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedCard>
            <GlitchTitle text="Glitchy headlines" />
            <p className="mt-3 text-[0.78rem] leading-relaxed text-slate-300/90">
              Layer text, color, and motion to turn simple headlines into mini
              animations that feel alive.
            </p>
            <p className="mt-2 text-[0.72rem] text-slate-400">
              Try combining gradients, clip paths, and staggered transitions like
              a design lab.
            </p>
          </AnimatedCard>

          <AnimatedCard>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-sky-300">
              Magnetic buttons
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-200">
              Buttons that subtly chase your cursor feel playful and responsive,
              without being distracting.
            </p>
            <div className="mt-4">
              <MagneticButton />
            </div>
          </AnimatedCard>

          <AnimatedCard className="sm:col-span-2 lg:col-span-1">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Reactive grids
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-200">
              Tiny interactions add up. Even a simple grid can feel like a
              responsive instrument.
            </p>
            <div className="mt-4">
              <ReactiveGrid />
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}

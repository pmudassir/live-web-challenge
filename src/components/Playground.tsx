"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

import { BentoGrid, BentoGridItem } from "./BentoGrid";
import { PromptingIsAllYouNeed } from "@/components/ui/animated-hero-section";
import {
  Type,
  MousePointer2,
  LayoutGrid,
  Sparkles
} from "lucide-react";

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
          className="aspect-square rounded-md bg-white/[0.03] border border-white/[0.08]"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.8)", borderColor: "transparent" }}
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
  const items = [
    {
      title: "Glitch Typography",
      description: "Layer text, color, and motion to turn simple headlines into mini animations that feel alive.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white/[0.02] items-center justify-center border border-white/[0.08]"><GlitchTitle text="Glitch Effect" /></div>,
      icon: <Type className="h-4 w-4 text-white/60" />,
      className: "md:col-span-1",
    },
    {
      title: "Magnetic Physics",
      description: "Buttons that subtly chase your cursor feel playful and responsive.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white/[0.02] items-center justify-center border border-white/[0.08]"><MagneticButton /></div>,
      icon: <MousePointer2 className="h-4 w-4 text-white/60" />,
      className: "md:col-span-1",
    },
    {
      title: "Reactive Grids",
      description: "Tiny interactions add up. Even a simple grid can feel like a responsive instrument.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white/[0.02] items-center justify-center border border-white/[0.08] py-4"><ReactiveGrid /></div>,
      icon: <LayoutGrid className="h-4 w-4 text-white/60" />,
      className: "md:col-span-1",
    },
    {
      title: "Prompting Is All You Need",
      description: "A fully interactive Pong game. Sometimes the best way to move forward is to look back.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white/[0.02] border border-white/[0.08] overflow-hidden relative"><PromptingIsAllYouNeed /></div>,
      icon: <Sparkles className="h-4 w-4 text-white/60" />,
      className: "md:col-span-3",
    },
  ];

  return (
    <section id="playground" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
             Interactive Lab
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Micro-Interactions
          </h2>
          <p className="text-lg text-white/40 leading-relaxed">
            These micro-experiments show how far you can push motion, gradients, and
            interactionsall using the same tools powering this page.
          </p>
        </div>

        <BentoGrid className="max-w-4xl mx-0">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

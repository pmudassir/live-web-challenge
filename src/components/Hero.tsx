"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Bot, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedWords from "./AnimatedWords";

const phrases = [
  "AI & Machine Learning",
  "Data Science & Analytics",
  "Robotics & Automation",
  "Future of Mobile & Web",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const cursorXSpring = useSpring(cursorX, {
    stiffness: 120,
    damping: 18,
    mass: 0.3,
  });
  const cursorYSpring = useSpring(cursorY, {
    stiffness: 120,
    damping: 18,
    mass: 0.3,
  });

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
    const x = event.clientX - left;
    const y = event.clientY - top;

    cursorX.set(x);
    cursorY.set(y);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 sm:px-8 lg:px-12"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_60%)] blur-3xl mix-blend-screen"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      <motion.div
        className="pointer-events-none absolute -top-40 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.3),transparent_60%)] blur-3xl"
        animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.3),transparent_60%)] blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-8">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Future Tech Explorer
          </motion.div>

          <motion.h1
            className="text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-slate-300">Discover what&apos;s</span>
            <span className="mt-1 block bg-linear-to-r from-cyan-300 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
              <AnimatedWords text="possible with technology." />
            </span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-pretty text-sm text-slate-300/80 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Explore mind-bending experiences in AI, robotics, data science, and
            beyondbuilt to spark curiosity and show what you can create next.
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-sm text-cyan-100/90"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[0.7rem] uppercase tracking-[0.22em] text-cyan-300/90">
              Now exploring
            </span>
            <span className="h-px w-8 bg-cyan-400/70" />
            <span className="inline-flex items-center text-sm font-medium text-cyan-50">
              {displayText}
              <span className="ml-[3px] inline-block h-4 w-[2px] animate-pulse rounded-full bg-cyan-300" />
            </span>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className={cn(
                "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-slate-950",
                "bg-linear-to-r from-cyan-300 via-sky-400 to-fuchsia-500 shadow-[0_18px_60px_rgba(6,182,212,0.55)]"
              )}
            >
              <span className="relative z-10">Start exploring</span>
              <span className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/10 text-slate-950">
                <Cpu className="h-3.5 w-3.5" />
              </span>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.5),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-100 backdrop-blur-xl"
            >
              <span>How it works</span>
              <Bot className="h-4 w-4 text-cyan-300" />
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-4 flex items-center gap-3 text-xs text-slate-400 sm:text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex h-7 items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 text-[0.7rem] uppercase tracking-[0.18em] text-emerald-300">
              Live playground
            </span>
            <span className="h-px w-10 bg-linear-to-r from-slate-500/60 via-slate-400/80 to-transparent" />
            <span>Scroll to unlock interactive stories in every tech field.</span>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-6 flex flex-1 justify-center lg:mt-0"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/50 p-5 shadow-[0_24px_100px_rgba(15,23,42,0.95)] backdrop-blur-2xl"
            whileHover={{ rotateX: 6, rotateY: -6, y: -4 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.9 }}
          >
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Real-time simulation
              </span>
              <span className="rounded-full bg-slate-900/60 px-2 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-300">
                60fps animations
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-100 sm:text-sm">
              <motion.div
                className="rounded-2xl border border-cyan-400/40 bg-linear-to-br from-cyan-400/20 via-sky-500/10 to-slate-900/80 p-3 shadow-[0_16px_45px_rgba(8,47,73,0.85)]"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.7 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cyan-100">
                    <Cpu className="h-3 w-3" />
                    AI Labs
                  </span>
                  <span className="text-[0.65rem] text-cyan-100/80">Live</span>
                </div>
                <p className="text-[0.72rem] leading-relaxed text-cyan-50/90">
                  Visualize neural nets, generative art, and intelligent systems
                  in motion.
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-fuchsia-400/40 bg-linear-to-br from-fuchsia-500/20 via-rose-500/10 to-slate-900/80 p-3 shadow-[0_16px_45px_rgba(80,7,36,0.85)]"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.7 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-fuchsia-100">
                    <Bot className="h-3 w-3" />
                    Robotics
                  </span>
                  <span className="text-[0.65rem] text-fuchsia-100/80">Autonomy</span>
                </div>
                <p className="text-[0.72rem] leading-relaxed text-fuchsia-50/90">
                  Watch robots coordinate, adapt, and learn in beautifully
                  choreographed scenes.
                </p>
              </motion.div>

              <motion.div
                className="col-span-2 mt-1 rounded-2xl border border-slate-500/40 bg-linear-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 p-3 text-[0.72rem] text-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.9)]"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 160, damping: 18, mass: 0.8 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-200">
                    <span className="flex items-center gap-1">
                      <span className="inline-flex h-1.5 w-8 overflow-hidden rounded-full bg-slate-700/80">
                        <span className="inline-flex w-1/2 animate-pulse bg-linear-to-r from-cyan-400 via-sky-400 to-fuchsia-500" />
                      </span>
                      Simulation stream
                    </span>
                  </span>
                  <span className="text-[0.65rem] text-slate-400">AI, Data, Robotics, Web</span>
                </div>
                <p className="text-[0.72rem] leading-relaxed text-slate-300">
                  Every scroll unlocks a new interactive storyfrom predicting
                  the future with data to orchestrating swarms of intelligent
                  machines.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs text-slate-400"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-500">
            Scroll to explore
          </span>
          <motion.div
            className="flex h-9 w-5 items-center justify-center rounded-full border border-slate-500/50 bg-slate-950/60 p-1 backdrop-blur-xl"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-slate-200"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <ArrowDown className="h-3 w-3 text-slate-500" />
        </div>
      </motion.div>
    </section>
  );
}

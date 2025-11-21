"use client";

import { motion } from "framer-motion";

import AnimatedCard from "./AnimatedCard";

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
    <section id="journey" className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-slate-800/0 via-slate-500/40 to-slate-800/0" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:px-12">
        <motion.div
          className="relative flex items-center justify-center lg:sticky lg:top-32"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-cyan-400/40 bg-slate-950/70 p-5 text-sm text-slate-100 shadow-[0_26px_110px_rgba(8,47,73,0.95)] backdrop-blur-2xl"
            animate={{
              rotateX: [0, 5, 0],
              rotateY: [0, -6, 0],
              y: [0, -6, 0],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mb-4 flex items-center justify-between text-[0.72rem] text-cyan-100">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-1.5 w-8 overflow-hidden rounded-full bg-slate-800">
                  <span className="inline-flex w-1/2 animate-pulse bg-linear-to-r from-cyan-400 via-sky-400 to-fuchsia-500" />
                </span>
                Live learning journey
              </span>
              <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-cyan-100/90">
                Student mode
              </span>
            </div>

            <p className="text-[0.8rem] leading-relaxed text-slate-100">
              This entire page is a sandbox for the tools you&apos;re about to learn:
              React, Framer Motion, Tailwind, shadcn/ui, and more.
            </p>
            <p className="mt-3 text-[0.78rem] leading-relaxed text-slate-300/90">
              Scroll on the right and watch how the story steps sync with this
              interactive cardjust like a scrollytelling article.
            </p>
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <AnimatedCard key={step.label}>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-[0.75rem] font-semibold text-slate-100">
                  {index + 1}
                </div>
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {step.label}
                  </p>
                  <h3 className="mt-1 text-[0.95rem] font-semibold text-slate-50 sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-300/90">
                    {step.body}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

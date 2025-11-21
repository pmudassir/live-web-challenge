"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TechCategoryId } from "@/types";

const OPTIONS: { id: TechCategoryId; label: string; blurb: string }[] = [
  {
    id: "ai",
    label: "AI & ML",
    blurb: "Models that can see, speak, and generate anything you imagine.",
  },
  {
    id: "data",
    label: "Data Science",
    blurb: "Turn messy real-world data into decisions and predictions.",
  },
  {
    id: "robotics",
    label: "Robotics",
    blurb: "Smart machines that can move, sense, and collaborate.",
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    blurb: "Experiences that live in your pocket and reach millions.",
  },
  {
    id: "web",
    label: "Web Experiences",
    blurb: "Immersive interfaces that feel like playable stories.",
  },
  {
    id: "emerging",
    label: "Emerging Tech",
    blurb: "AR, XR, agents, and ideas that didn&apos;t exist last year.",
  },
];

export default function TechPoll() {
  const [choice, setChoice] = useState<TechCategoryId | null>(null);

  const active = OPTIONS.find((opt) => opt.id === choice);

  return (
    <section className="relative mx-auto mt-8 w-full max-w-6xl px-6 sm:px-8 lg:px-12">
      <motion.div
        className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/60 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Quick question
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
            Which tech excites you most right now?
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Pick one  we&apos;ll tailor what you explore next around it.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {OPTIONS.map((opt, index) => {
          const selected = choice === opt.id;

          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => setChoice(opt.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.8 }}
              aria-pressed={selected}
              className={cn(
                "flex h-full flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left text-sm outline-none backdrop-blur-xl",
                "border-white/10 bg-slate-950/70 text-slate-100 shadow-[0_16px_60px_rgba(15,23,42,0.9)]",
                "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                selected &&
                  "border-cyan-400/80 bg-linear-to-r from-cyan-500/15 via-sky-500/10 to-fuchsia-500/15",
              )}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-[0.7rem] font-semibold text-slate-200">
                  {index + 1}
                </span>
                <span className="text-[0.8rem] font-medium uppercase tracking-[0.16em] text-slate-200">
                  {opt.label}
                </span>
              </div>
              <p className="text-[0.78rem] leading-relaxed text-slate-300/90">
                {opt.blurb}
              </p>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-[0.8rem] text-emerald-100 backdrop-blur-xl"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <p>
              Love that. {active.label} is reshaping what&apos;s possible faster than
              ever  keep scrolling and imagine how you&apos;d use it.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TechCategoryId } from "@/types";
import TiltedCard from "./TiltedCard";

const OPTIONS: { id: TechCategoryId; label: string; blurb: string }[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Building beautiful and responsive user interfaces.",
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Designing robust APIs and scalable systems.",
  },
  {
    id: "cloud",
    label: "Cloud",
    blurb: "Deploying applications to the cloud with ease.",
  },
  {
    id: "design",
    label: "UI/UX Design",
    blurb: "Creating intuitive and accessible user experiences.",
  },
];

export default function TechPoll() {
  const [choice, setChoice] = useState<TechCategoryId | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (id: TechCategoryId) => {
    setChoice(id);
    setIsSubmitting(true);
    
    // Simulate "thinking" time
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const active = OPTIONS.find((opt) => opt.id === choice);

  return (
    <section className="relative mx-auto mt-8 w-full max-w-6xl px-6 sm:px-8 lg:px-12 py-24">
      <TiltedCard 
        className="bg-white/[0.03] border-white/[0.08]"
        containerClassName="w-full"
        tiltScale={1.01}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
      >
        <div className="p-4 md:p-8 space-y-10">
          <motion.div
            className="flex flex-col gap-4 md:items-center md:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              Quick Poll
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Which frontier calls to you?
            </h3>
            <p className="text-white/40 max-w-xl">
              Select the technology that sparks your curiosity the most. We&apos;ll personalize your journey based on your choice.
            </p>
          </motion.div>

          {!isSubmitted ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OPTIONS.map((opt, index) => {
                const isSelected = choice === opt.id;
                
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    disabled={isSubmitting}
                    className={cn(
                      "group relative flex flex-col items-start gap-3 rounded-2xl border px-5 py-5 text-left text-sm outline-none transition-all duration-300",
                      "hover:border-white/20 hover:bg-white/[0.05]",
                      isSelected 
                        ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50" 
                        : "border-white/[0.08] bg-white/[0.02] text-white/40"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-bold transition-colors",
                          isSelected ? "bg-indigo-500 text-white" : "bg-white/[0.05] text-white/40 group-hover:bg-white/10"
                        )}>
                          {index + 1}
                        </span>
                        <span className={cn(
                          "font-semibold uppercase tracking-wider transition-colors",
                          isSelected ? "text-indigo-300" : "text-white/60 group-hover:text-white"
                        )}>
                          {opt.label}
                        </span>
                      </div>
                      {isSelected && isSubmitting && (
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-white/40 group-hover:text-white/60">
                      {opt.blurb}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-white">Excellent Choice</h4>
              <p className="text-white/60">
                <span className="font-semibold text-emerald-300">{active?.label}</span> is reshaping our world. 
                Scroll down to access curated resources and start building.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-xs font-medium uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                Retake Poll
              </button>
            </motion.div>
          )}
        </div>
      </TiltedCard>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

import AnimatedCard from "./AnimatedCard";

interface FactCardProps {
  fact: string;
  detail: string;
}

export default function FactCard({ fact, detail }: FactCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      className="h-full w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <AnimatedCard className="h-full cursor-pointer">
        <div className="mb-2 flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-amber-200">
          <Lightbulb className="h-3.5 w-3.5" />
          Did you know?
        </div>
        <p className="text-[0.8rem] font-medium text-amber-50/95">{fact}</p>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              key="detail"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-3 text-[0.76rem] leading-relaxed text-amber-100/90"
            >
              {detail}
            </motion.p>
          )}
        </AnimatePresence>
        <span className="mt-3 inline-flex text-[0.7rem] text-amber-200/80">
          Tap to {open ? "fold" : "unfold"} insight
        </span>
      </AnimatedCard>
    </button>
  );
}

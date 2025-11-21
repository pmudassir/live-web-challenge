"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import type { TechSectionConfig } from "@/types";
import AnimatedCard from "./AnimatedCard";
import FactCard from "./FactCard";
import ParallaxElement from "./ParallaxElement";

interface TechSectionProps {
  config: TechSectionConfig;
  index: number;
}

export default function TechSection({ config, index }: TechSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1.04]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  const inView = useInView(sectionRef, {
    amount: 0.3,
    once: true,
  });

  const Icon = config.icon;
  const reversed = index % 2 === 1;

  return (
    <section id={config.id} className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-slate-800/0 via-slate-500/40 to-slate-800/0" />

      <div
        ref={sectionRef}
        className={cn(
          "relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:px-12",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        <ParallaxElement
          depth={reversed ? -80 : 80}
          className={cn(
            "pointer-events-none absolute hidden h-52 w-52 rounded-full blur-3xl lg:block",
            reversed ? "-left-20 top-10" : "-right-20 top-10",
            config.id === "ai" &&
              "bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_60%)]",
            config.id === "data" &&
              "bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.2),transparent_60%)]",
            config.id === "robotics" &&
              "bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.22),transparent_60%)]",
            config.id === "mobile" &&
              "bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.22),transparent_60%)]",
            config.id === "web" &&
              "bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.22),transparent_60%)]",
            config.id === "emerging" &&
              "bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.22),transparent_60%)]",
          )}
        >
          <motion.div
            aria-hidden
            className="absolute inset-[-14px] rounded-full border border-slate-500/30"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </ParallaxElement>

        <motion.div
          className="relative z-10 flex-1 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-200/90 backdrop-blur-xl">
            <span
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r text-slate-950",
                config.accentFrom,
                config.accentTo,
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span>{config.label}</span>
          </div>

          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            {config.title}
          </h2>

          <p className="max-w-xl text-sm text-slate-300/85 sm:text-base">
            {config.description}
          </p>

          <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
            {config.highlight}
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 flex-1"
          style={{ y, scale, opacity }}
        >
          <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
            <AnimatedCard>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                Interactive playground
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-200">
                {config.highlight}
              </p>
              <div className="mt-4 grid gap-2 text-[0.75rem] text-slate-300/90 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-6 overflow-hidden rounded-full bg-slate-700/80">
                    <span className="inline-flex w-1/2 animate-pulse bg-linear-to-r from-cyan-400 via-sky-400 to-fuchsia-500" />
                  </span>
                  <span>Scroll-linked animations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-6 overflow-hidden rounded-full bg-slate-700/80">
                    <span className="inline-flex w-1/2 animate-pulse bg-linear-to-r from-emerald-400 via-sky-400 to-cyan-400" />
                  </span>
                  <span>Micro-interactions on hover</span>
                </div>
              </div>
            </AnimatedCard>

            <FactCard fact={config.didYouKnow} detail={config.factDetail} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

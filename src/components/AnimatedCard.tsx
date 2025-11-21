"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedCard({ children, className }: AnimatedCardProps) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const rotateX = useTransform(tiltY, [-0.6, 0.6], [10, -10]);
  const rotateY = useTransform(tiltX, [-0.6, 0.6], [-10, 10]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const ratioX = x / rect.width;
    const ratioY = y / rect.height;

    tiltX.set(ratioX * 0.8);
    tiltY.set(ratioY * 0.8);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.8 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-100 shadow-[0_18px_70px_rgba(15,23,42,0.9)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.18),transparent_60%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

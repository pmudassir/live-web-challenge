"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function EnergyBeam() {
  const { scrollYProgress } = useScroll();
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-0 -translate-x-1/2 z-0 h-full w-px">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-700/20 to-transparent" />
      <motion.div 
        style={{ height, opacity }}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-cyan-400 to-fuchsia-500 blur-[1px]"
      />
    </div>
  );
}

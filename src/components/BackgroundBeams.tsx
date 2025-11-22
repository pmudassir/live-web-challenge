"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden bg-transparent">
        {/* Beam 1 */}
        <motion.div
          animate={{
            rotate: [0, 10, 0],
            translateY: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[10%] -top-[20%] h-[50vh] w-[50vw] rounded-full bg-purple-500/20 blur-[120px]"
        />

        {/* Beam 2 */}
        <motion.div
          animate={{
            rotate: [0, -15, 0],
            translateX: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[20%] top-[10%] h-[60vh] w-[60vw] rounded-full bg-cyan-500/20 blur-[120px]"
        />

        {/* Beam 3 - Central Glow */}
        <motion.div
          animate={{
             scale: [1, 1.1, 1],
             opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[40vh] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]"
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      </div>
    </div>
  );
};

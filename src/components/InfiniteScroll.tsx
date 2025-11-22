"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteScrollProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export default function InfiniteScroll({
  items,
  direction = "left",
  speed = 20,
  className,
  itemClassName,
}: InfiniteScrollProps) {
  return (
    <div className={cn("relative flex overflow-hidden bg-[#030303] py-8", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#030303] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#030303] to-transparent z-10" />
      
      <motion.div
        className="flex min-w-full shrink-0 gap-16 px-8"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className={cn(
              "whitespace-nowrap text-2xl font-bold uppercase tracking-widest text-white/20",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </motion.div>
      
      <motion.div
        className="absolute top-8 flex min-w-full shrink-0 gap-16 px-8"
        animate={{
          x: direction === "left" ? ["100%", "0%"] : ["0%", "100%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden
      >
         {[...items, ...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className={cn(
              "whitespace-nowrap text-2xl font-bold uppercase tracking-widest text-white/20",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface ParallaxElementProps {
  children?: ReactNode;
  className?: string;
  depth?: number;
}

export default function ParallaxElement({
  children,
  className,
  depth = 60,
}: ParallaxElementProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <motion.div className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}

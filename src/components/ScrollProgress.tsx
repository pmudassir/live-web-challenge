"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-linear-to-r from-cyan-400 via-sky-500 to-fuchsia-500 shadow-[0_0_30px_rgba(56,189,248,0.8)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const springX = useSpring(x, {
    stiffness: 220,
    damping: 26,
    mass: 0.6,
  });
  const springY = useSpring(y, {
    stiffness: 220,
    damping: 26,
    mass: 0.6,
  });

  useEffect(() => {
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-20 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_60%)] blur-3xl mix-blend-screen"
      style={{ x: springX, y: springY }}
    />
  );
}

"use client";

import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: Variant;
  animationTo?: Variant;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
};

export default function SplitText({
  text,
  className = "",
  delay = 0.1,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
}: SplitTextProps) {
  const words = text.split(" ");
  const controls = useAnimation();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { amount: threshold, once: true, margin: rootMargin as any });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <p
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: animationFrom,
            visible: (i: number) => ({
              ...animationTo,
              transition: {
                delay: i * 0.05 + delay,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
              },
            }),
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

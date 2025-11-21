"use client";

import { motion } from "framer-motion";

interface AnimatedWordsProps {
  text: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.05,
    },
  },
};

const wordVariant = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 420,
      damping: 30,
      mass: 0.6,
    },
  },
};

export default function AnimatedWords({ text }: AnimatedWordsProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className="inline-flex flex-wrap gap-x-1 gap-y-1"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariant}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

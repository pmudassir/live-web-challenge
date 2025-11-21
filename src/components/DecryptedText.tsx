"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  useOriginalCharsOnly?: boolean;
  className?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover"; 
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  className = "",
  parentClassName = "",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const revealedIndices = useRef(new Set<number>());
  const iterationCount = useRef(0);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+[]{}|;:,.<>?";

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isScrambling) {
      interval = setInterval(() => {
        setDisplayText((prevText) => {
          return prevText
            .split("")
            .map((char, i) => {
              if (revealedIndices.current.has(i) || char === " ") {
                return text[i];
              }

              if (Math.random() < 0.1) {
                revealedIndices.current.add(i);
                return text[i];
              }

              if (useOriginalCharsOnly) {
                const availableChars = text.replace(" ", ""); 
                return availableChars[Math.floor(Math.random() * availableChars.length)];
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
        });

        iterationCount.current++;

        if (revealedIndices.current.size === text.length || iterationCount.current >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text); 
        }
      }, speed);
    }

    return () => clearInterval(interval);
  }, [isScrambling, text, speed, maxIterations, useOriginalCharsOnly]);

  const startScramble = () => {
    setIsScrambling(true);
    revealedIndices.current.clear();
    iterationCount.current = 0;
  };

  const handleHoverStart = () => {
    if (animateOn === "hover") {
      startScramble();
    }
  };
  
  useEffect(() => {
    if (animateOn === "view") {
      const timeout = setTimeout(() => {
         startScramble();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [animateOn]);

  return (
    <span
      className={parentClassName}
      onMouseEnter={handleHoverStart}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}

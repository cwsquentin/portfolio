"use client";
import { motion, useReducedMotion } from "motion/react";

interface LetterStaggerProps {
  text: string;
  className?: string;
  delay?: number;
}

export function LetterStagger({ text, className, delay = 0 }: LetterStaggerProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            ease: [0.7, 0, 0.2, 1],
            delay: delay + i * 0.03,
          }}
          className="inline-block whitespace-pre"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

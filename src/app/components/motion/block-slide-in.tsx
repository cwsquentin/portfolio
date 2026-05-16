"use client";
import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface BlockSlideInProps {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  className?: string;
}

const offsetMap: Record<NonNullable<BlockSlideInProps["from"]>, { x: number | string; y: number | string }> = {
  left: { x: "-30%", y: 0 },
  right: { x: "30%", y: 0 },
  bottom: { x: 0, y: "30%" },
};

export function BlockSlideIn({ children, from = "left", className }: BlockSlideInProps) {
  const reducedMotion = useReducedMotion();
  const offset = offsetMap[from];
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { ...offset, opacity: 0 }}
      whileInView={reducedMotion ? { opacity: 1 } : { x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: [0.7, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

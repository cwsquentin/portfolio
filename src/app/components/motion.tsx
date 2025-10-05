'use client';

import { MotionConfig } from "motion/react";
import { ReactNode } from "react";

interface MotionProps {
  children: ReactNode;
}

export default function Motion({ children }: MotionProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
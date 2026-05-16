"use client";
import { ComponentPropsWithoutRef, ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

interface MechanicalPressOwnProps<E extends ElementType = "button"> {
  as?: E;
  offset?: 2 | 4 | 6;
}

type MechanicalPressProps<E extends ElementType = "button"> = MechanicalPressOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof MechanicalPressOwnProps<E>>;

const MotionLink = motion.create(Link);
const TAG_MAP = {
  button: motion.button,
  a: motion.a,
  span: motion.span,
  div: motion.div,
} as const;

export function MechanicalPress<E extends ElementType = "button">({
  as,
  offset = 4,
  className,
  children,
  ...props
}: MechanicalPressProps<E>) {
  const asUnknown = as as unknown;
  const MotionTag = (
    asUnknown === Link
      ? MotionLink
      : typeof asUnknown === "string" && asUnknown in TAG_MAP
      ? TAG_MAP[asUnknown as keyof typeof TAG_MAP]
      : motion.button
  );
  const reducedMotion = useReducedMotion();
  return (
    <MotionTag
      whileTap={
        reducedMotion
          ? { opacity: 0.7 }
          : { x: offset, y: offset, boxShadow: "0 0 0 0 var(--color-ink)" }
      }
      transition={{ duration: 0 }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

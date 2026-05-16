"use client";
import { ComponentPropsWithoutRef, ElementType } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type FloodColor = "cyan" | "magenta" | "yellow" | "ink";

interface ColorFloodOwnProps<E extends ElementType = "a"> {
  as?: E;
  floodColor?: FloodColor;
}

type ColorFloodProps<E extends ElementType = "a"> = ColorFloodOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ColorFloodOwnProps<E>>;


const floodMap: Record<FloodColor, { bg: string; bgEmpty: string; fg: string }> = {
  cyan:    { bg: "var(--color-cyan)",    bgEmpty: "rgba(63, 84, 102, 0)",  fg: "var(--color-ink)" },
  magenta: { bg: "var(--color-magenta)", bgEmpty: "rgba(168, 83, 58, 0)",  fg: "var(--color-paper)" },
  yellow:  { bg: "var(--color-yellow)",  bgEmpty: "rgba(210, 154, 59, 0)", fg: "var(--color-ink)" },
  ink:     { bg: "var(--color-ink)",     bgEmpty: "rgba(27, 24, 20, 0)",   fg: "var(--color-paper)" },
};

const MotionLink = motion.create(Link);
const TAG_MAP = {
  a: motion.a,
  button: motion.button,
  span: motion.span,
  div: motion.div,
} as const;

export function ColorFlood<E extends ElementType = "a">({
  as,
  floodColor = "cyan",
  className,
  children,
  ...props
}: ColorFloodProps<E>) {
  const asUnknown = as as unknown;
  const MotionTag = (
    asUnknown === Link
      ? MotionLink
      : typeof asUnknown === "string" && asUnknown in TAG_MAP
      ? TAG_MAP[asUnknown as keyof typeof TAG_MAP]
      : motion.a
  );
  const { bg, bgEmpty, fg } = floodMap[floodColor];
  return (
    <MotionTag
      initial={{ backgroundColor: bgEmpty, color: "var(--color-ink)" }}
      whileHover={{ backgroundColor: bg, color: fg }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

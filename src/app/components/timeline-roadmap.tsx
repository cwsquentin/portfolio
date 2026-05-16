"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { itemVariants } from "@/animation";

export type TimelineEntry = {
  year: string;
  title: string;
  institution: string;
  description: string;
  side: "left" | "right";
};

type TimelineRoadmapProps = {
  items: TimelineEntry[];
};

export default function TimelineRoadmap({ items }: TimelineRoadmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.2"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-0 h-full w-0.5 bg-ink/15 md:left-1/2 md:-translate-x-1/2"
      />
      <motion.div
        aria-hidden="true"
        style={{ height: progressHeight }}
        className="pointer-events-none absolute left-6 top-0 w-0.5 bg-magenta md:left-1/2 md:-translate-x-1/2"
      />

      <div className="space-y-12">
        {items.map((item, idx) => (
          <TimelineNode key={`${item.year}-${idx}`} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}

type TimelineNodeProps = {
  item: TimelineEntry;
  index: number;
};

function TimelineNode({ item, index }: TimelineNodeProps) {
  const reducedMotion = useReducedMotion();
  const isLeft = item.side === "left";

  const containerVariant = reducedMotion
    ? itemVariants.fromBottom
    : isLeft
      ? itemVariants.fromLeft
      : itemVariants.fromRight;

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "relative flex flex-col gap-6 pl-16 md:pl-0 md:flex-row md:items-center md:gap-10",
        isLeft && "md:flex-row-reverse",
      )}
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="pointer-events-none absolute left-5 top-5 z-10 flex size-7 items-center justify-center rounded-full border-2 border-ink bg-paper md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        aria-hidden="true"
      >
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, delay: 0.1 + index * 0.05 }}
          className="block size-2.5 rounded-full bg-magenta"
        />
      </motion.span>

      <div
        className={cn(
          "w-full md:w-1/2",
          isLeft ? "md:pl-10 md:text-right" : "md:pr-10",
        )}
      >
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0.25, y: 24 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.6,
            delay: 0.1 + index * 0.08,
            ease: [0.7, 0, 0.2, 1],
          }}
          className="rounded-none border-2 border-ink bg-paper p-6 shadow-block-sm"
        >
          <div className="mb-2 text-mono-label text-magenta">{item.year}</div>
          <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
            {item.title}
          </h3>
          <div className="mt-2 text-mono-label text-cyan">{item.institution}</div>
          <p className="mt-3 font-body text-base leading-relaxed text-ink/80">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

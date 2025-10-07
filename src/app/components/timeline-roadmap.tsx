'use client';

import { useRef } from "react";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
import clsx from "clsx";
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
    <div ref={containerRef} className="relative mt-20">
      <div className="pointer-events-none absolute left-6 top-0 h-full w-px rounded-full bg-slate-700/40 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ height: progressHeight }}
        className="pointer-events-none absolute left-6 top-0 w-px rounded-full bg-teal-500 md:left-1/2 md:-translate-x-1/2"
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
  const isLeft = item.side === "left";

  return (
    <motion.div
      variants={isLeft ? itemVariants.fromLeft : itemVariants.fromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={clsx(
        "relative flex flex-col gap-6 pl-16 md:pl-0 md:flex-row md:items-center md:gap-10",
        isLeft && "md:flex-row-reverse"
      )}
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="pointer-events-none absolute left-5 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-teal-500/50 bg-slate-950/90 shadow-inner md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        aria-hidden="true"
      >
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, delay: 0.1 + index * 0.05 }}
          className="block h-2.5 w-2.5 rounded-full bg-teal-400"
        />
      </motion.span>

      <div className={clsx("w-full md:w-1/2", isLeft ? "md:pl-10 md:text-right" : "md:pr-10")}>        
        <motion.div
          initial={{ opacity: 0.25, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-xl ring-1 ring-white/10 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-teal-400 sm:text-sm"
          >
            {item.year}
          </motion.div>
          <h3 className="mb-2 text-lg font-bold sm:text-xl">{item.title}</h3>
          <div className="mb-3 text-sm font-medium text-teal-300 sm:text-base">{item.institution}</div>
          <p className="text-sm leading-relaxed text-slate-200 sm:text-base">{item.description}</p>
        </motion.div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}

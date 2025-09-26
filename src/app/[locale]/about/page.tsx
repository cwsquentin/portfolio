"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Github, Linkedin } from "lucide-react";

type TimelineItem = {
  year: string;
  title: string;
  institution: string;
  description: string;
  side: "left" | "right";
};

export default function AboutPage() {
  const t = useTranslations("about");
  const experience = t.raw("experience") as TimelineItem[];
  const education = t.raw("education") as TimelineItem[];

  return (
    <section className="py-40">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-base font-medium">
            {t("hero.intro")}
          </p>

          <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-teal-400">
            {t("hero.name")}
          </h1>
          <p className="text-lg text-grey-300">
            {t("hero.subtitle")}
          </p>

          <div className="mt-4 flex items-center gap-1">
            <a
              href="https://github.com/cwsquentin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/90 transition hover:bg-white/10"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/quentin-petiteville/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/90 transition hover:bg-white/10"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
            <p>{t("hero.p1")}</p>
            <p>{t("hero.p2")}</p>
            <p>{t("hero.p3")}</p>
          </div>

          <div className="mt-7">
            <p className="mb-3 font-medium text-teal-400/90">
              {t("hero.ctaLead")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
            >
              {t("hero.ctaBtn")}
            </Link>
          </div>
        </motion.div>

        <div className="relative mt-20">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-1/2 -translate-x-1/2 transform bg-teal-600/30"
            style={{ width: 2 }}
          />
          <div className="space-y-12">
            {experience.map((item, idx) => (
              <ItemRow key={`exp-${idx}`} item={item} idx={idx} />
            ))}
            {education.map((item, idx) => (
              <ItemRow key={`edu-${idx}`} item={item} idx={idx} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href={t("resume.href")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293L18.707 8.414A1 1 0 0119 9.121V19a2 2 0 01-2 2z" />
            </svg>
            {t("resume.button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ItemRow({ item, idx }: { item: TimelineItem; idx: number }) {
  const isLeft = item.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      viewport={{ once: true }}
      className={`flex items-center ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div className={`w-1/2 ${isLeft ? "pl-8 text-right" : "pr-8"}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg border border-white/10 bg-black/30 p-6 shadow-lg hover:shadow-xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.25 + idx * 0.15 }}
            className="mb-2 text-sm font-semibold text-teal-400"
          >
            {item.year}
          </motion.div>
          <h3 className="mb-2 text-xl font-bold text-foreground">{item.title}</h3>
          <div className="mb-3 font-medium text-teal-400">{item.institution}</div>
          <p className="text-sm leading-relaxed text-foreground/70">{item.description}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="h-4 w-4 cursor-pointer rounded-full border-4 border-background bg-teal-500"
        />
      </motion.div>

      <div className="w-1/2" />
    </motion.div>
  );
}

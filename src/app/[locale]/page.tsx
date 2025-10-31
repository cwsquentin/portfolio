import { Button } from "@/app/components/button";
import { SnakeBackground } from "@/app/components/snake-background";
import * as motion from "motion/react-client";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { containerVariants, itemVariants } from "@/animation";
import { projectsData } from "@/data/projects";
import type { Variants } from "framer-motion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: `Quentin Petiteville - ${t("page.title")}`,
  };
}

export default function Home() {
  const t = useTranslations("home");
  const projectsT = useTranslations("projects");

  type SkillCategory = { title: string; items: string[] };
  type ExperienceItem = {
    period: string;
    role: string;
    company: string;
    summary: string;
  };

  const skillCategories = (t.raw("skills.categories") as SkillCategory[]) ?? [];
  const experienceItems = (t.raw("experience.items") as ExperienceItem[]) ?? [];

  const featuredProjects = projectsData.slice(0, 3);
  const heroReveal: Variants = {
    hidden: {
      opacity: 0,
      clipPath: "inset(0 100% 0 0)",
      filter: "blur(12px)"
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.42, 0, 0.58, 1] }
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative isolate flex min-h-[52svh] flex-col justify-center overflow-hidden px-4 pb-8 pt-28 sm:min-h-[56svh] sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[85svh]">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.25),transparent_65%)]" />
        <div className="absolute inset-0 z-20">
          <SnakeBackground
            className="mix-blend-screen opacity-90"
            gridSize={32}
            tickMs={320}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-72 bg-gradient-to-b from-teal-500/25 via-transparent to-transparent blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-40 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center"
        >
          <motion.h1
            variants={heroReveal}
            className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            variants={heroReveal}
            className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-2xl"
          >
            {t("hero.subheadline")}
          </motion.p>

          <motion.div
            variants={heroReveal}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-100 shadow-sm backdrop-blur-sm sm:text-base">
              <Icon icon="mdi:calendar-star" className="size-5 text-teal-300" />
              {t("hero.availability")}
            </span>
          </motion.div>

          <motion.div
            variants={heroReveal}
            className="flex flex-col items-center gap-4"
          >
            <Button
              href="/about"
              background="glass"
              border="whiteSoft"
              size="mdTall"
              className="group justify-center px-6"
            >
              <span className="flex items-center gap-3">
                <span className="h-5 w-5 opacity-0" aria-hidden="true" />
                <span>{t("hero.cta")}</span>
                <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
                  <Icon
                    icon="mdi:arrow-right"
                    className="absolute translate-x-2 text-slate-100 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>
              </span>
            </Button>
          </motion.div>

          <motion.div
            variants={heroReveal}
            className="flex items-center gap-4 text-slate-300"
          >
            <motion.a
              href="https://github.com/cwsquentin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white transition hover:border-white/30 hover:text-teal-300"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" className="size-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/quentin-petiteville/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white transition hover:border-white/30 hover:text-teal-300"
              aria-label="LinkedIn"
            >
              <Icon icon="mdi:linkedin" className="size-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 text-left md:flex-row md:items-end">
            <div className="max-w-2xl">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.01,
                  margin: "0px 0px 240px 0px",
                }}
              >
                <motion.p
                  variants={itemVariants.fromBottom}
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80"
                >
                  {t("projectsPreview.eyebrow")}
                </motion.p>

                <motion.h2
                  variants={itemVariants.fromBottom}
                  className="mt-3 text-3xl font-bold sm:text-4xl"
                >
                  {t("projectsPreview.title")}
                </motion.h2>
              </motion.div>

              <motion.p
                variants={itemVariants.fromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="mt-4 text-base text-slate-300 sm:text-lg"
              >
                {t("projectsPreview.description")}
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants.fromBottom}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <Button
                href="/projects"
                background="transparentSoft"
                border="whiteSoft"
              >
                {t("projectsPreview.viewAll")}
                <Icon icon="mdi:arrow-right" className="size-5" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {featuredProjects.map((project, index) => {
              const title = projectsT(`items.${project.id}.title`);
              const description = projectsT(`items.${project.id}.description`);
              const tech = project.technologies.slice(0, 5);
              const isConfidential = Boolean(project.confidential);
              const primaryHref = !isConfidential
                ? project.demo ?? project.github ?? "/projects"
                : "/projects";
              const primaryLabel = !isConfidential
                ? t("projectsPreview.viewProject")
                : projectsT("confidential");
              const isExternal = primaryHref.startsWith("http");

              return (
                <motion.article
                  key={project.id}
                  variants={itemVariants.fromBottom}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-teal-500/40"
                >
                  <span className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-widest text-teal-300/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-100">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tech.map((item) => (
                      <span
                        key={`${project.id}-${item}`}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      href={primaryHref}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      background={isConfidential ? "none" : "teal"}
                      border={isConfidential ? "whiteSoft" : "none"}
                      size="sm"
                      className={
                        isConfidential
                          ? "text-slate-200 hover:bg-white/5"
                          : undefined
                      }
                    >
                      {isConfidential ? (
                        <Icon icon="uis:lock" className="size-4" />
                      ) : (
                        <Icon icon="mdi:arrow-right" className="size-4" />
                      )}
                      {primaryLabel}
                    </Button>

                    <div className="flex gap-3">
                      {project.github && !isConfidential && (
                        <Button
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          background="transparentSoft"
                          border="whiteSoft"
                          size="sm"
                        >
                          <Icon icon="mdi:github" className="size-4" />
                          {t("projectsPreview.github")}
                        </Button>
                      )}
                      {project.demo && !isConfidential && (
                        <Button
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          background="transparentSoft"
                          border="whiteSoft"
                          size="sm"
                        >
                          <Icon icon="ph:arrow-square-out" className="size-4" />
                          {t("projectsPreview.demo")}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl"
        >
          <motion.div
            variants={itemVariants.fromBottom}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
              {t("experience.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("experience.title")}
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {experienceItems.map((item, idx) => (
              <motion.article
                key={`${item.role}-${idx}`}
                variants={itemVariants.fromBottom}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-300/80">
                  {item.period}
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-slate-100">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-teal-300">
                  {item.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {item.summary}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={itemVariants.fromBottom}
            className="mt-10 text-center"
          >
            <Button
              href="/about"
              background="transparentSoft"
              border="whiteSoft"
            >
              {t("experience.cta")}
              <Icon icon="mdi:arrow-right" className="size-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900/40 p-8 sm:p-10"
        >
          <motion.div
            variants={itemVariants.fromBottom}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
              {t("skills.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("skills.title")}
            </h2>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              {t("skills.description")}
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={`${category.title}-${idx}`}
                variants={itemVariants.fromBottom}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-100">
                  {category.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-teal-500/20 via-slate-900 to-slate-950 p-10 sm:p-14"
        >
          <motion.div
            variants={itemVariants.fromBottom}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
                {t("ctaBanner.eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {t("ctaBanner.title")}
              </h2>
              <p className="mt-4 text-base text-slate-200 sm:text-lg">
                {t("ctaBanner.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" background="teal" size="lg">
                {t("ctaBanner.primary")}
              </Button>
              <Button
                href={t("ctaBanner.secondaryHref")}
                target="_blank"
                rel="noopener noreferrer"
                background="transparentStrong"
                border="whiteStrong"
                size="lg"
                external
              >
                {t("ctaBanner.secondary")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}


import { SnakeBackground } from "@/app/components/snake-background";
import * as motion from "motion/react-client";
import GithubIcon from "~icons/mdi/github";
import LinkedinIcon from "~icons/mdi/linkedin";
import DesignIcon from "~icons/mdi/palette";
import PerformanceIcon from "~icons/mdi/lightning-bolt";
import CollaborationIcon from "~icons/mdi/account-group";
import SkillIcon from "~icons/mdi/toolbox-outline";
import ArrowRightIcon from "~icons/mdi/arrow-right";
import LockIcon from "~icons/uis/lock";
import ExternalLinkIcon from "~icons/ph/arrow-square-out";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { containerVariants, itemVariants } from "@/animation";
import { projectsData } from "@/data/projects";
import type { ComponentType, SVGProps } from "react";
import clsx from "clsx";

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

  const highlights: Array<{
    key: "craft" | "performance" | "collaboration" | "delivery";
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }> = [
    { key: "craft", Icon: DesignIcon },
    { key: "performance", Icon: PerformanceIcon },
    { key: "collaboration", Icon: CollaborationIcon },
    { key: "delivery", Icon: SkillIcon }
  ];

  const featuredProjects = projectsData.slice(0, 3);
  const heroFocus = (t.raw("hero.focus") as string[]) ?? [];
  const heroStats =
    (t.raw("hero.stats") as Array<{ label: string; value: string }>) ?? [];

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-[65svh] flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:min-h-220 lg:py-28">
        <div className="relative w-full max-w-6xl">
          <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-56 w-[80%] rounded-full bg-teal-500/20 blur-3xl" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_30px_80px_-40px_rgba(15,118,110,0.65)] backdrop-blur-xl"
          >
            <SnakeBackground gridSize={28} tickMs={260} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/30 to-teal-500/15" />
            <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_top,white,transparent_65%)]">
              <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-teal-500/30 blur-3xl" />
              <div className="absolute bottom-10 -right-10 h-40 w-40 rounded-full bg-sky-500/30 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col gap-10 p-8 sm:p-12 lg:flex-row lg:items-center lg:gap-14">
              <div className="flex-1 text-left">
                <motion.p
                  variants={itemVariants.fromBottom}
                  className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-300/80 sm:text-sm"
                >
                  {t("greeting")}
                </motion.p>

                <motion.h1
                  variants={itemVariants.fromBottom}
                  className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
                >
                  {t("name")}
                </motion.h1>

                <motion.h2
                  variants={itemVariants.fromBottom}
                  className="mt-2 text-xl font-light text-slate-200 sm:text-2xl lg:text-3xl"
                >
                  {t("title")}
                </motion.h2>

                <motion.p
                  variants={itemVariants.fromBottom}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
                >
                  {t("description")}
                </motion.p>

                <motion.p
                  variants={itemVariants.fromBottom}
                  className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base"
                >
                  {t("hero.subtitle")}
                </motion.p>

                {heroFocus.length > 0 && (
                  <motion.ul
                    variants={containerVariants}
                    className="mt-6 grid gap-3 sm:grid-cols-2"
                  >
                    {heroFocus.map((point, idx) => (
                      <motion.li
                        key={`${point}-${idx}`}
                        variants={itemVariants.fromBottom}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 shadow-sm backdrop-blur sm:text-base"
                      >
                        <span className="mt-1 inline-block h-2.5 w-2.5 flex-none rounded-full bg-teal-400" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                <motion.div
                  variants={itemVariants.fromBottom}
                  className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                >
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
                  >
                    <ArrowRightIcon className="h-5 w-5" />
                    {t("cta.primary")}
                  </Link>
                  <a
                    href={t("cta.secondaryHref")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
                  >
                    {t("cta.secondary")}
                  </a>
                </motion.div>

                <motion.div
                  variants={itemVariants.fromBottom}
                  className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300 sm:text-base"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 sm:text-sm">
                    {t("hero.socialLabel")}
                  </span>
                  <div className="flex items-center gap-4">
                    <motion.a
                      href="https://github.com/cwsquentin"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white transition hover:border-white/30 hover:text-teal-300"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/quentin-petiteville/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white transition hover:border-white/30 hover:text-teal-300"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              <motion.aside
                variants={itemVariants.fromBottom}
                className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/75 p-6 text-left shadow-xl backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-300/80">
                  {t("hero.sidebar.eyebrow")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {t("hero.sidebar.title")}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {t("hero.sidebar.description")}
                </p>

                {heroStats.length > 0 && (
                  <dl className="mt-6 space-y-4">
                    {heroStats.map((stat, idx) => (
                      <div key={`${stat.label}-${idx}`}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200/70">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-slate-100">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 shadow-inner">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/80">
                    {t("hero.sidebar.availabilityLabel")}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {t("availability")}
                  </p>
                  <p className="mt-3 text-xs text-slate-300">
                    {t("hero.sidebar.note")}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {t("hero.sidebar.timezone")}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:border-teal-400 hover:bg-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                  {t("hero.sidebar.contact")}
                </Link>
              </motion.aside>
            </div>
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
          <motion.div variants={itemVariants.fromBottom} className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
              {t("highlights.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("highlights.title")}</h2>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">{t("highlights.description")}</p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map(({ key, Icon }) => (
              <motion.article
                key={key}
                variants={itemVariants.fromBottom}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-teal-500/40 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  {t(`highlights.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {t(`highlights.items.${key}.description`)}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900/40 p-8 sm:p-10"
        >
          <motion.div variants={itemVariants.fromBottom} className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
              {t("skills.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("skills.title")}</h2>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">{t("skills.description")}</p>
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

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl"
        >
          <div className="flex flex-col items-start justify-between gap-6 text-left md:flex-row md:items-end">
            <motion.div variants={itemVariants.fromBottom} className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
                {t("projectsPreview.eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {t("projectsPreview.title")}
              </h2>
              <p className="mt-4 text-base text-slate-300 sm:text-lg">
                {t("projectsPreview.description")}
              </p>
            </motion.div>
            <motion.div variants={itemVariants.fromBottom}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/5"
              >
                {t("projectsPreview.viewAll")}
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => {
              const title = projectsT(`items.${project.id}.title`);
              const description = projectsT(`items.${project.id}.description`);
              const tech = project.technologies.slice(0, 4);
              const isConfidential = Boolean(project.confidential);
              const primaryHref = !isConfidential
                ? project.demo ?? project.github ?? "/projects"
                : "/projects";
              const primaryLabel = !isConfidential
                ? t("projectsPreview.viewProject")
                : projectsT("confidential");

              return (
                <motion.article
                  key={project.id}
                  variants={itemVariants.fromBottom}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-teal-500/40"
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-teal-300/80">
                    <span>{t("projectsPreview.badge")}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-100">{title}</h3>
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
                    <Link
                      href={primaryHref}
                      target={primaryHref.startsWith("http") ? "_blank" : undefined}
                      rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={clsx(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                        isConfidential
                          ? "border border-white/15 text-slate-200 hover:border-white/30"
                          : "bg-teal-500 text-white hover:bg-teal-400"
                      )}
                    >
                      {isConfidential ? <LockIcon className="h-4 w-4" /> : <ArrowRightIcon className="h-4 w-4" />}
                      {primaryLabel}
                    </Link>

                    <div className="flex gap-3">
                      {project.github && !isConfidential && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/5"
                        >
                          <GithubIcon className="h-4 w-4" />
                          {t("projectsPreview.github")}
                        </a>
                      )}
                      {project.demo && !isConfidential && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/5"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                          {t("projectsPreview.demo")}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={itemVariants.fromBottom} className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
              {t("experience.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("experience.title")}</h2>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">{t("experience.description")}</p>
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
                <p className="mt-1 text-sm font-medium text-teal-300">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.summary}</p>
              </motion.article>
            ))}
          </div>

          <motion.div variants={itemVariants.fromBottom} className="mt-10 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/5"
            >
              {t("experience.cta")}
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </motion.div>
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
          <motion.div variants={itemVariants.fromBottom} className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
                {t("ctaBanner.eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("ctaBanner.title")}</h2>
              <p className="mt-4 text-base text-slate-200 sm:text-lg">{t("ctaBanner.description")}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
              >
                {t("ctaBanner.primary")}
              </Link>
              <a
                href={t("ctaBanner.secondaryHref")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
              >
                {t("ctaBanner.secondary")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

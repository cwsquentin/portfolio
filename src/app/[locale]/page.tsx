import { Button } from "@/app/components/button";
import { SnakeBackground } from "@/app/components/snake-background";
import * as motion from "motion/react-client";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { containerVariants, itemVariants } from "@/animation";
import { projectsData } from "@/data/projects";

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
    icon: string;
  }> = [
    { key: "craft", icon: "mdi:palette" },
    { key: "performance", icon: "mdi:lightning-bolt" },
    { key: "collaboration", icon: "mdi:account-group" },
    { key: "delivery", icon: "mdi:toolbox-outline" }
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
              <div className="absolute -left-10 top-10 size-32 rounded-full bg-teal-500/30 blur-3xl" />
              <div className="absolute bottom-10 -right-10 size-40 rounded-full bg-sky-500/30 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col gap-10 p-8 sm:p-12 lg:flex-row lg:items-center lg:gap-14">
              <div className="flex-1 text-left">
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
                  className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg whitespace-pre-line"
                >
                  {t("description")}
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
                        <span className="mt-1 inline-block size-2.5 flex-none rounded-full bg-teal-400" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                <motion.div
                  variants={itemVariants.fromBottom}
                  className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                >
                  <Button
                    href="/projects"
                    background="teal"
                    size="lg"
                    className="shadow-lg shadow-teal-500/30"
                  >
                      <Icon icon="mdi:arrow-right" className="size-5" />
                    {t("cta.primary")}
                  </Button>
                  <Button
                    href={t("cta.secondaryHref")}
                    target="_blank"
                    rel="noopener noreferrer"
                    background="glass"
                    border="whiteSoft"
                    size="lg"
                    external
                  >
                    {t("cta.secondary")}
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemVariants.fromBottom}
                  className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300 sm:text-base"
                >
                  <div className="flex items-center gap-4">
                    <motion.a
                      href="https://github.com/cwsquentin"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white transition hover:border-white/30 hover:text-teal-300"
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
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white transition hover:border-white/30 hover:text-teal-300"
                      aria-label="LinkedIn"
                    >
                      <Icon icon="mdi:linkedin" className="size-6" />
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
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:border-teal-400 hover:bg-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
                >
                  <Icon icon="mdi:arrow-right" className="size-4" />
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
            {highlights.map(({ key, icon }) => (
              <motion.article
                key={key}
                variants={itemVariants.fromBottom}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-teal-500/40 hover:bg-slate-900"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300">
                  <Icon icon={icon} className="size-6" />
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

          <div className="mt-10 grid gap-6 md:grid-cols-2">
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
                    <Button
                      href={primaryHref}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      background={isConfidential ? "none" : "teal"}
                      border={isConfidential ? "whiteSoft" : "none"}
                      size="sm"
                      className={isConfidential ? "text-slate-200 hover:bg-white/5" : undefined}
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
              <Button
                href="/contact"
                background="teal"
                size="lg"
              >
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

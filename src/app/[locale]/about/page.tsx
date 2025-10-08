import TimelineRoadmap, {
  type TimelineEntry
} from "@/app/components/timeline-roadmap";
import { containerVariants, itemVariants } from "@/animation";
import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import GithubIcon from "~icons/mdi/github";
import LinkedinIcon from "~icons/mdi/linkedin";
import DownloadIcon from "~icons/streamline/download-file";

type TimelineItem = TimelineEntry;
type SkillCategory = { title: string; items: string[] };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("page.title")
  };
}

export default function AboutPage() {
  const t = useTranslations("about");

  const experience = (t.raw("experience") as TimelineItem[]) ?? [];
  const education = (t.raw("education") as TimelineItem[]) ?? [];
  const skillCategories =
    (t.raw("skills.categories") as SkillCategory[]) ?? [];

  const sectionLinks = [
    { id: "introduction", label: t("sections.introduction") },
    { id: "experiences", label: t("sections.experiences") },
    { id: "skills", label: t("sections.skills") }
  ];

  const firstRowCategories = skillCategories.slice(0, 3);
  const remainingCategories = skillCategories.slice(3);

  const renderCategoryCard = (category: SkillCategory, index: number) => (
    <motion.div
      key={`${category.title}-${index}`}
      variants={itemVariants.fromBottom}
      className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_40px_-32px_rgba(15,118,110,0.55)]"
    >
      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {category.items.map((item, itemIdx) => (
          <li key={`${item}-${itemIdx}`} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const resumeHref = t("resume.href");
  const timelineTitle = t("timeline.title");
  const skillsTitle = t("skills.title");
  const skillsLead = t("skills.lead");

  return (
    <div className="relative pb-24">
      <motion.nav
        variants={itemVariants.fromBottom}
        initial="hidden"
        animate="visible"
        className="fixed left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-5 text-sm text-slate-400 lg:flex"
      >
        {sectionLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="group inline-flex items-center gap-3 py-1 font-medium text-slate-400 transition hover:text-teal-300"
          >
            <span className="h-px w-6 bg-slate-600/50 transition-all group-hover:w-8 group-hover:bg-teal-400" />
            <span className="transition-transform group-hover:translate-x-1">
              {link.label}
            </span>
          </a>
        ))}
      </motion.nav>

      <div className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8 lg:pl-32">
        <nav className="mb-10 flex gap-3 overflow-x-auto text-sm text-slate-300 lg:hidden">
          {sectionLinks.map((link) => (
            <a
              key={`mobile-${link.id}`}
              href={`#${link.id}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-teal-400/60 hover:text-teal-300"
            >
              <span className="h-px w-4 bg-slate-600/50 transition-all group-hover:w-6 group-hover:bg-teal-400" />
              <span className="transition-transform group-hover:translate-x-1">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <motion.section
          id="introduction"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-16 sm:py-24 lg:py-32"
        >
          <motion.div
            variants={itemVariants.fromBottom}
            className="mx-auto max-w-3xl"
          >
            <p className="text-sm font-medium text-slate-200 sm:text-base">
              {t("hero.intro")}
            </p>

            <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-teal-400 sm:text-5xl lg:text-6xl">
              {t("hero.name")}
            </h1>
            <p className="mt-3 text-base text-grey-300 sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              <p>{t("hero.p1")}</p>
              <p>{t("hero.p2")}</p>
              <p>{t("hero.p3")}</p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-teal-400/90 sm:text-base">
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
        </motion.section>

        <motion.section
          id="experiences"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pb-16 pt-4 sm:pb-20"
        >
          <motion.div
            variants={itemVariants.fromBottom}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {timelineTitle}
            </h2>
          </motion.div>

          <div className="mt-12">
            <TimelineRoadmap items={[...experience, ...education]} />
          </div>

          <motion.div
            variants={itemVariants.fromBottom}
            className="mt-12 text-center"
          >
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
            >
              <DownloadIcon className="h-4 w-4" />
              {t("resume.button")}
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="pb-6"
        >
          <motion.div
            variants={itemVariants.fromBottom}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {skillsTitle}
            </h2>
            <p className="mt-3 text-base text-slate-300 sm:text-lg">
              {skillsLead}
            </p>
          </motion.div>

          <div className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {firstRowCategories.map((category, idx) =>
                renderCategoryCard(category, idx)
              )}
            </div>

            {remainingCategories.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[repeat(2,minmax(0,320px))] lg:justify-center">
                {remainingCategories.map((category, idx) =>
                  renderCategoryCard(
                    category,
                    idx + firstRowCategories.length
                  )
                )}
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

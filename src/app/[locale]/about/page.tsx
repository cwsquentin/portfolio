import { Button } from "@/app/components/button";
import TimelineRoadmap, { type TimelineEntry } from "@/app/components/timeline-roadmap";
import SideScrollNav from "@/app/components/side-scroll-nav";
import { containerVariants, itemVariants } from "@/animation";
import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import clsx from "clsx";


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

  const xlColumnCount = 3;
  const xlTailCount = skillCategories.length % xlColumnCount;
  const xlTailStartIndex =
    xlTailCount === 0 ? skillCategories.length : skillCategories.length - xlTailCount;
  const hasOddCountForMd = skillCategories.length % 2 === 1;

  const renderCategoryCard = (
    category: SkillCategory,
    index: number,
    extraClassName?: string
  ) => (
    <motion.div
      key={`${category.title}-${index}`}
      variants={itemVariants.fromBottom}
      className={clsx(
        "rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_40px_-32px_rgba(15,118,110,0.55)]",
        extraClassName
      )}
    >
      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {category.items.map((item, itemIdx) => (
          <li key={`${item}-${itemIdx}`} className="flex items-start gap-2">
            <span className="mt-1 size-1.5 rounded-full bg-teal-400" />
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
      <SideScrollNav links={sectionLinks} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8 xl:pl-32">
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
              <Link
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
                aria-label="GitHub"
                title="GitHub"
              >
                  <Icon icon="mdi:github" className="size-4" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                  <Icon icon="mdi:linkedin" className="size-4" />
                <span>LinkedIn</span>
              </Link>
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
              <Button
                href="/contact"
                background="tealStrong"
                border="whiteBase"
                radius="xl"
                size="mdTall"
                className="shadow"
              >
                {t("hero.ctaBtn")}
              </Button>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="experiences"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="scroll-mt-37.5 pb-16 pt-4 sm:pb-20"
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
            <Button
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              background="tealStrong"
              border="whiteBase"
              radius="xl"
              size="mdTall"
              className="shadow"
              external
            >
              <Icon icon="streamline:download-file" className="size-4" />
              {t("resume.button")}
            </Button>
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="scroll-mt-37.5 pb-6"
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skillCategories.map((category, idx) => {
                const isMdCenteredTail =
                  hasOddCountForMd && idx === skillCategories.length - 1;
                const hideAtXl =
                  xlTailCount === 2 && idx >= xlTailStartIndex ? "xl:hidden" : undefined;

                const extraClassName = clsx(
                  isMdCenteredTail &&
                    "md:col-span-2 md:justify-self-center xl:col-span-1 xl:justify-self-auto",
                  hideAtXl
                );

                return renderCategoryCard(category, idx, extraClassName);
              })}

              {xlTailCount === 2 && (
                <div className="hidden xl:col-span-3 xl:flex xl:justify-center xl:gap-6">
                  {skillCategories
                    .slice(xlTailStartIndex)
                    .map((category, idx) =>
                      renderCategoryCard(
                        category,
                        xlTailStartIndex + idx + skillCategories.length,
                        "xl:w-full xl:max-w-sm"
                      )
                    )}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

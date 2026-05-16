import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/app/components/button";
import { Display } from "@/app/components/primitives/display";
import { Block } from "@/app/components/primitives/block";
import { MonoLabel } from "@/app/components/primitives/mono-label";
import SideScrollNav from "@/app/components/side-scroll-nav";
import TimelineRoadmap, {
  type TimelineEntry,
} from "@/app/components/timeline-roadmap";
import { cn } from "@/lib/cn";

type SkillCategory = { title: string; items: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("page.title"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const experience = (t.raw("experience") as TimelineEntry[]) ?? [];
  const education = (t.raw("education") as TimelineEntry[]) ?? [];
  const skillCategories =
    (t.raw("skills.categories") as SkillCategory[]) ?? [];

  const sectionLinks = [
    { id: "introduction", label: t("sections.introduction") },
    { id: "experiences", label: t("sections.experiences") },
    { id: "skills", label: t("sections.skills") },
  ];

  const resumeHref = t("resume.href");
  const timelineTitle = t("timeline.title");
  const skillsTitle = t("skills.title");
  const skillsLead = t("skills.lead");

  const xlColumnCount = 3;
  const xlTailCount = skillCategories.length % xlColumnCount;
  const xlTailStartIndex =
    xlTailCount === 0
      ? skillCategories.length
      : skillCategories.length - xlTailCount;
  const hasOddCountForMd = skillCategories.length % 2 === 1;

  return (
    <div className="relative bg-paper pb-24 text-ink">
      <SideScrollNav links={sectionLinks} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8 xl:pl-32">
        <section id="introduction" className="py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <MonoLabel className="text-cyan">{t("hero.intro")}</MonoLabel>

            <Display
              size="section"
              as="h1"
              weight={700}
              className="mt-4 text-magenta"
            >
              {t("hero.name")}
            </Display>

            <p className="mt-3 font-body text-lg leading-relaxed text-ink/70 sm:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-block-sm transition-colors hover:bg-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <Icon icon="mdi:github" className="size-4" aria-hidden="true" />
                <span className="text-mono-label">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-block-sm transition-colors hover:bg-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <Icon
                  icon="mdi:linkedin"
                  className="size-4"
                  aria-hidden="true"
                />
                <span className="text-mono-label">LinkedIn</span>
              </a>
            </div>

            <div className="mt-8 space-y-4 font-body text-base leading-relaxed text-ink sm:text-lg">
              <p>{t("hero.p1")}</p>
              <p>{t("hero.p2")}</p>
              <p>{t("hero.p3")}</p>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-mono-label text-cyan">
                {t("hero.ctaLead")}
              </p>
              <Button
                href="/contact"
                variant="block"
                color="magenta"
                size="lg"
              >
                {t("hero.ctaBtn")}
              </Button>
            </div>
          </div>
        </section>

        <section
          id="experiences"
          className="scroll-mt-32 pb-16 pt-4 sm:pb-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <Display size="section" as="h2" weight={700}>
              {timelineTitle}
            </Display>
          </div>

          <div className="mt-12">
            <TimelineRoadmap items={[...experience, ...education]} />
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              href={resumeHref}
              external
              target="_blank"
              variant="block"
              color="yellow"
              size="lg"
            >
              <Icon
                icon="streamline:download-file"
                className="size-4"
                aria-hidden="true"
              />
              {t("resume.button")}
            </Button>
          </div>
        </section>

        <section id="skills" className="scroll-mt-32 pb-6">
          <div className="mx-auto max-w-3xl text-center">
            <Display size="section" as="h2" weight={700}>
              {skillsTitle}
            </Display>
            <p className="mt-3 font-body text-base leading-relaxed text-ink/80 sm:text-lg">
              {skillsLead}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skillCategories.map((category, idx) => {
                const isMdCenteredTail =
                  hasOddCountForMd && idx === skillCategories.length - 1;
                const hideAtXl =
                  xlTailCount === 2 && idx >= xlTailStartIndex
                    ? "xl:hidden"
                    : undefined;

                return (
                  <Block
                    key={`${category.title}-${idx}`}
                    color="paper"
                    shadow="sm"
                    className={cn(
                      "p-6",
                      isMdCenteredTail &&
                        "md:col-span-2 md:justify-self-center md:w-full md:max-w-md xl:col-span-1 xl:justify-self-auto xl:max-w-none",
                      hideAtXl,
                    )}
                  >
                    <h3 className="font-display text-xl font-bold leading-none tracking-[-0.02em] text-ink">
                      {category.title}
                    </h3>
                    <ul className="mt-4 space-y-2 font-body text-base text-ink/80">
                      {category.items.map((item, itemIdx) => (
                        <li
                          key={`${item}-${itemIdx}`}
                          className="flex items-start gap-2"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-magenta"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Block>
                );
              })}

              {xlTailCount === 2 && (
                <div className="hidden xl:col-span-3 xl:flex xl:justify-center xl:gap-6">
                  {skillCategories
                    .slice(xlTailStartIndex)
                    .map((category, tailIdx) => (
                      <Block
                        key={`tail-${category.title}-${tailIdx}`}
                        color="paper"
                        shadow="sm"
                        className="p-6 xl:w-full xl:max-w-sm"
                      >
                        <h3 className="font-display text-xl font-bold leading-none tracking-[-0.02em] text-ink">
                          {category.title}
                        </h3>
                        <ul className="mt-4 space-y-2 font-body text-base text-ink/80">
                          {category.items.map((item, itemIdx) => (
                            <li
                              key={`${item}-${itemIdx}`}
                              className="flex items-start gap-2"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-magenta"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Block>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

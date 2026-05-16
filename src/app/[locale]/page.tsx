import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/app/components/home/hero-section";
import { ProjectsFeatured } from "@/app/components/home/projects-featured";
import { ExperienceTimeline } from "@/app/components/home/experience-timeline";
import { SkillsGrid } from "@/app/components/home/skills-grid";
import { CtaFooterBlock } from "@/app/components/home/cta-footer-block";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProjectsFeatured />
      <ExperienceTimeline />
      <SkillsGrid />
      <CtaFooterBlock />
    </>
  );
}

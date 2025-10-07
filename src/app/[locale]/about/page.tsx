import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { Link } from "@/i18n/navigation";
import GithubIcon from "~icons/mdi/github";
import LinkedinIcon from "~icons/mdi/linkedin";
import DownloadIcon from "~icons/streamline/download-file";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { itemVariants } from "@/animation";
import TimelineRoadmap, { type TimelineEntry } from "@/app/components/timeline-roadmap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  
  return {
    title: t('page.title'),
  };
}

type TimelineItem = TimelineEntry;

export default function AboutPage() {
  const t = useTranslations("about");
  const experience = t.raw("experience") as TimelineItem[];
  const education = t.raw("education") as TimelineItem[];
  const resumeHref = t("resume.href");

  return (
    <section className="py-16 sm:py-24 lg:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={itemVariants.fromBottom}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-sm font-medium text-slate-200 sm:text-base">
            {t("hero.intro")}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-teal-400 sm:text-5xl lg:text-6xl">
            {t("hero.name")}
          </h1>
          <p className="text-base text-grey-300 sm:text-lg">
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

        <TimelineRoadmap items={[...experience, ...education]} />

        <motion.div
          variants={itemVariants.fromBottom}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
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
      </div>
    </section>
  );
}

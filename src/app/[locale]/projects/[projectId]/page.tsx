import { Button } from "@/app/components/button";
import { projectsData } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

type DetailListItem = { label: string; value: string };

type DetailSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type ProjectDetailMessages = {
  hero?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    period?: string;
    summary?: string[];
    ctaLabel?: string;
  };
  meta?: DetailListItem[];
  highlights?: Array<{ title: string; description: string }>;
  deliverables?: string[];
  results?: DetailListItem[];
  sections?: DetailSection[];
  confidentialNote?: string;
};

const projectsBySlug = new Map(
  projectsData.map((project) => [project.slug.toLowerCase(), project]),
);

function getProjectBySlug(slug: string) {
  return projectsBySlug.get(slug.toLowerCase());
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projectsData.map((project) => ({
      locale,
      projectId: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>;
}): Promise<Metadata> {
  const { locale, projectId } = await params;
  const project = getProjectBySlug(projectId);

  const t = await getTranslations({ locale, namespace: "projects" });

  if (!project) {
    return {
      title: t("page.title"),
    };
  }

  const detail = t.raw(`details.${project.id}`) as
    | ProjectDetailMessages
    | undefined;

  const heroTitle =
    detail?.hero?.title ?? t(`items.${project.id}.title`);
  const descriptionSource = Array.isArray(detail?.hero?.summary)
    ? detail?.hero?.summary?.[0]
    : t(`items.${project.id}.description`);

  return {
    title: heroTitle || t("page.title"),
    description: descriptionSource,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>;
}) {
  const { locale, projectId } = await params;
  const project = getProjectBySlug(projectId);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "projects" });
  const detail = t.raw(`details.${project.id}`) as
    | ProjectDetailMessages
    | undefined;

  if (!detail || !detail.hero) {
    notFound();
  }

  const hero = detail.hero;
  const summaryItems = Array.isArray(hero.summary) ? hero.summary : [];
  const metaItems = Array.isArray(detail.meta) ? detail.meta : [];
  const highlightItems = Array.isArray(detail.highlights)
    ? detail.highlights
    : [];
  const deliverableItems = Array.isArray(detail.deliverables)
    ? detail.deliverables
    : [];
  const resultItems = Array.isArray(detail.results) ? detail.results : [];
  const sectionItems = Array.isArray(detail.sections) ? detail.sections : [];
  const heroCtaLabel = hero.ctaLabel?.trim();
  const showDemoCta = Boolean(heroCtaLabel && project.demo);
  const showGithubCta = Boolean(project.github);

  const cardBaseClass =
    "rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-sky-lg";

  const isStaticImage = typeof project.image !== "string";

  return (
    <article className="pb-24">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 px-4 pb-20 pt-28 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.28),_transparent_60%)]"
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <Icon icon="mdi:arrow-left" className="size-4" />
            {t("detail.back")}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="space-y-6">
              {hero.eyebrow ? (
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-300/80">
                  {hero.eyebrow}
                </p>
              ) : null}
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                {hero.title}
              </h1>
              {hero.subtitle ? (
                <p className="text-lg text-slate-200 sm:text-xl">
                  {hero.subtitle}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                {hero.period ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                    <Icon icon="mdi:calendar" className="size-4" />
                    {hero.period}
                  </span>
                ) : null}
                {project.confidential ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-amber-200">
                    <Icon icon="mdi:shield-lock" className="size-4" />
                    {t("detail.confidentialBadge")}
                  </span>
                ) : null}
              </div>

              {summaryItems.length ? (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">
                    {t("detail.summaryTitle")}
                  </h2>
                  <ul className="mt-4 space-y-3 text-base text-slate-200">
                    {summaryItems.map((item, index) => (
                      <li
                        key={`${project.id}-summary-${index}`}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 inline-block size-2 rounded-full bg-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {(showDemoCta || showGithubCta) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {showDemoCta && project.demo ? (
                    <Button
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      background="indigo"
                      border="none"
                      radius="xl"
                      size="mdTall"
                    >
                      {heroCtaLabel}
                      <Icon icon="ph:arrow-square-out" className="size-5" />
                    </Button>
                  ) : null}
                  {showGithubCta && project.github ? (
                    <Button
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      background="transparentStrong"
                      border="whiteStrong"
                      radius="xl"
                      size="mdTall"
                    >
                      {t("code")}
                      <Icon icon="mdi:github" className="size-5" />
                    </Button>
                  ) : null}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              {metaItems.length ? (
                <div className={cardBaseClass}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-200/80">
                    {t("detail.metaTitle")}
                  </h3>
                  <dl className="mt-5 space-y-5 text-sm text-slate-200">
                    {metaItems.map((item, index) => (
                      <div key={`${project.id}-meta-${index}`} className="border-b border-white/10 pb-4 last:border-none last:pb-0">
                        <dt className="text-sm font-semibold text-slate-300">
                          {item.label}
                        </dt>
                        <dd className="mt-1 text-base text-white">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              <div className={cardBaseClass}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-200/80">
                  {t("detail.technologies")}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {resultItems.length ? (
                <div className={cardBaseClass}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-200/80">
                    {t("detail.resultsTitle")}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {resultItems.map((result, index) => (
                      <li key={`${project.id}-result-${index}`} className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                        <span className="text-sm font-medium text-slate-300">
                          {result.label}
                        </span>
                        <span className="text-lg font-semibold text-white">
                          {result.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="-mt-16 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-indigo-xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image}
              alt={hero.title}
              fill
              className="object-cover"
              placeholder={isStaticImage ? "blur" : "empty"}
              sizes="(min-width: 1280px) 960px, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6">
        {highlightItems.length ? (
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              {t("detail.highlightsTitle")}
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {highlightItems.map((item, index) => (
                <div
                  key={`${project.id}-highlight-${index}`}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-indigo-md"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {(deliverableItems.length || detail.confidentialNote) && (
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {deliverableItems.length ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="text-xl font-semibold text-white">
                  {t("detail.deliverablesTitle")}
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
                  {deliverableItems.map((deliverable, index) => (
                    <li key={`${project.id}-deliverable-${index}`} className="flex items-start gap-3">
                      <span className="mt-1 inline-block size-2 rounded-full bg-indigo-400" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {detail.confidentialNote ? (
              <div className="rounded-3xl border border-amber-400/40 bg-amber-500/5 p-6 text-amber-100">
                <h3 className="text-xl font-semibold">
                  {t("confidential")}
                </h3>
                <p className="mt-4 text-sm leading-relaxed">
                  {detail.confidentialNote}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </section>

      {sectionItems.length ? (
        <section className="mx-auto mt-20 w-full max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            {sectionItems.map((section, index) => (
              <article
                key={`${project.id}-section-${index}`}
                className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-indigo-sm"
              >
                <h3 className="text-2xl font-semibold text-white">
                  {section.title}
                </h3>
                {section.paragraphs?.length ? (
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${project.id}-section-${index}-paragraph-${paragraphIndex}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}

                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-3 text-sm text-slate-200 sm:text-base">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${project.id}-section-${index}-bullet-${bulletIndex}`}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 inline-block size-2 rounded-full bg-indigo-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

import { Button } from "@/app/components/button";
import { Block } from "@/app/components/primitives/block";
import { Display } from "@/app/components/primitives/display";
import { MonoLabel } from "@/app/components/primitives/mono-label";
import { ProjectGallery } from "@/app/components/project-slider";
import { projectsData } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

type DetailListItem = { label: string; value: string };

type DetailSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type ProjectDetailMessages = {
  hero?: {
    title: string;
    subtitle?: string;
    period?: string;
    summary?: string | string[];
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
    return { title: t("page.title") };
  }

  const detail = t.raw(`details.${project.id}`) as
    | ProjectDetailMessages
    | undefined;

  const heroTitle = detail?.hero?.title ?? t(`items.${project.id}.title`);
  const heroSummaryRaw = detail?.hero?.summary;
  let descriptionSource = t(`items.${project.id}.description`);

  if (typeof heroSummaryRaw === "string") {
    const trimmed = heroSummaryRaw.trim();
    if (trimmed) {
      descriptionSource = trimmed;
    }
  } else if (Array.isArray(heroSummaryRaw)) {
    const firstNonEmpty = heroSummaryRaw.find(
      (entry) => typeof entry === "string" && entry.trim().length > 0,
    );
    if (firstNonEmpty) {
      descriptionSource = firstNonEmpty.trim();
    }
  }

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
  setRequestLocale(locale);
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
  const heroSummaryRaw = hero.summary;
  const summaryParagraph =
    typeof heroSummaryRaw === "string" ? heroSummaryRaw.trim() : "";
  const metaItems = Array.isArray(detail.meta) ? detail.meta : [];
  const sections = Array.isArray(detail.sections) ? detail.sections : [];
  const highlights = Array.isArray(detail.highlights) ? detail.highlights : [];
  const deliverables = Array.isArray(detail.deliverables)
    ? detail.deliverables
    : [];
  const results = Array.isArray(detail.results) ? detail.results : [];
  const confidentialNote =
    typeof detail.confidentialNote === "string"
      ? detail.confidentialNote.trim()
      : "";

  const heroCtaLabel = hero.ctaLabel?.trim();
  const showDemoCta = Boolean(heroCtaLabel && project.demo);
  const showGithubCta = Boolean(project.github);

  const galleryImages = Array.isArray(project.gallery)
    ? project.gallery.filter(
        (image): image is string | StaticImageData => Boolean(image),
      )
    : [];
  const hasGallery = galleryImages.length > 0;
  const isStaticImage = typeof project.image !== "string";
  const heroPlaceholder = isStaticImage ? "blur" : "empty";

  const hasNarrativeContent =
    sections.length > 0 ||
    highlights.length > 0 ||
    deliverables.length > 0 ||
    results.length > 0 ||
    Boolean(confidentialNote);

  return (
    <article className="bg-paper text-ink">
      <section className="border-b-2 border-ink px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/projects"
            className="text-mono-label inline-flex items-center gap-2 text-ink/70 transition hover:text-magenta"
          >
            <Icon icon="mdi:arrow-left" className="size-4" />
            {t("detail.back")}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div className="space-y-6">
              <Display size="section" as="h1">
                {hero.title}
              </Display>

              <div className="flex flex-wrap gap-2">
                {hero.period ? (
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-mono-label text-ink">
                    <Icon icon="mdi:calendar" className="size-4" />
                    {hero.period}
                  </span>
                ) : null}
                {project.confidential ? (
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-4 py-1.5 text-mono-label text-ink">
                    <Icon icon="mdi:shield-lock" className="size-4" />
                    {t("detail.confidentialBadge")}
                  </span>
                ) : null}
              </div>

              {summaryParagraph ? (
                <div className="space-y-4">
                  <MonoLabel as="p">{t("detail.summaryTitle")}</MonoLabel>
                  <p className="whitespace-pre-line font-body text-base leading-relaxed text-ink/80 sm:text-lg">
                    {summaryParagraph}
                  </p>
                </div>
              ) : null}

              {(showDemoCta || showGithubCta) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {showDemoCta && project.demo ? (
                    <Button
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="block"
                      color="magenta"
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
                      variant="block"
                      color="paper"
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
                <Block
                  color="paper"
                  border
                  shadow="sm"
                  as="section"
                  className="p-6 sm:p-8"
                >
                  <MonoLabel as="p" className="mb-5 text-ink/70">
                    {t("detail.metaTitle")}
                  </MonoLabel>
                  <dl className="space-y-5">
                    {metaItems.map((item, index) => (
                      <div
                        key={`${project.id}-meta-${index}`}
                        className="border-b border-ink/15 pb-4 last:border-none last:pb-0"
                      >
                        <dt className="text-mono-label text-ink/70">
                          {item.label}
                        </dt>
                        <dd className="mt-1 font-body text-base text-ink">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Block>
              ) : null}

              <Block
                color="paper"
                border
                shadow="sm"
                as="section"
                className="p-6 sm:p-8"
              >
                <MonoLabel as="p" className="mb-4 text-ink/70">
                  {t("detail.technologies")}
                </MonoLabel>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="rounded-none border-2 border-ink bg-paper px-2 py-1 text-mono-label text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Block>
            </aside>
          </div>
        </div>
      </section>

      <section
        className={cn(
          "bg-paper px-4 py-16 sm:px-6 lg:px-8",
          hasNarrativeContent && "border-b-2 border-ink",
        )}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Block
            color="paper"
            border
            shadow="md"
            className="relative aspect-video w-full overflow-hidden"
          >
            {hasGallery ? (
              <ProjectGallery images={galleryImages} alt={hero.title} />
            ) : (
              <Image
                src={project.image}
                alt={hero.title}
                fill
                className="object-cover"
                placeholder={heroPlaceholder}
                sizes="(min-width: 1280px) 1152px, 100vw"
                priority
              />
            )}
          </Block>
        </div>
      </section>

      {hasNarrativeContent && (
        <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          {sections.length
            ? sections.map((section, index) => (
                <Block
                  key={`${project.id}-section-${index}`}
                  color="paper"
                  border
                  shadow="sm"
                  as="section"
                  className="p-6 sm:p-8"
                >
                  <Display size="block" as="h2">
                    {section.title}
                  </Display>
                  {Array.isArray(section.paragraphs)
                    ? section.paragraphs.map((paragraph, paraIndex) => (
                        <p
                          key={`${project.id}-section-${index}-p-${paraIndex}`}
                          className="mt-4 whitespace-pre-line font-body text-base leading-relaxed text-ink/80"
                        >
                          {paragraph}
                        </p>
                      ))
                    : null}
                  {Array.isArray(section.bullets) && section.bullets.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-base text-ink/80 marker:text-magenta">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={`${project.id}-section-${index}-b-${bulletIndex}`}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Block>
              ))
            : null}

          {highlights.length ? (
            <Block
              color="paper"
              border
              shadow="sm"
              as="section"
              className="p-6 sm:p-8"
            >
              <Display size="block" as="h2">
                {t("detail.summaryTitle")}
              </Display>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={`${project.id}-highlight-${index}`}
                    className="border-l-2 border-magenta pl-4"
                  >
                    <p className="font-display text-lg font-bold text-ink">
                      {highlight.title}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          ) : null}

          {deliverables.length ? (
            <Block
              color="paper"
              border
              shadow="sm"
              as="section"
              className="p-6 sm:p-8"
            >
              <Display size="block" as="h2">
                {t("detail.summaryTitle")}
              </Display>
              <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-base text-ink/80 marker:text-magenta">
                {deliverables.map((item, index) => (
                  <li key={`${project.id}-deliverable-${index}`}>{item}</li>
                ))}
              </ul>
            </Block>
          ) : null}

          {results.length ? (
            <Block
              color="paper"
              border
              shadow="sm"
              as="section"
              className="p-6 sm:p-8"
            >
              <Display size="block" as="h2">
                {t("detail.summaryTitle")}
              </Display>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                {results.map((item, index) => (
                  <div key={`${project.id}-result-${index}`}>
                    <dt className="text-mono-label text-ink/70">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-body text-base text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}

          {confidentialNote ? (
            <Block
              color="yellow"
              border
              shadow="sm"
              as="section"
              className="p-6 sm:p-8"
            >
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:shield-lock"
                  className="mt-1 size-5 shrink-0 text-ink"
                />
                <p className="whitespace-pre-line font-body text-base leading-relaxed text-ink">
                  {confidentialNote}
                </p>
              </div>
            </Block>
          ) : null}
        </div>
        </section>
      )}
    </article>
  );
}

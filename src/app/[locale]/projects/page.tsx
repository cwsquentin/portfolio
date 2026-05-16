import { ProjectCard } from "@/app/components/projects";
import { Display } from "@/app/components/primitives/display";
import { projectsData } from "@/data/projects";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('page.title'),
  };
}

type Params = { params: Promise<{ locale: string }> };

const ACCENT_ROTATION = ["cyan", "magenta", "yellow"] as const;
type CardAccent = (typeof ACCENT_ROTATION)[number];

export default async function ProjectsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section className="relative bg-paper px-6 py-24 text-ink sm:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 border-b-2 border-ink pb-12">
          <Display size="section" as="h1">
            {t("title")}
          </Display>
          <p className="max-w-2xl font-body text-base leading-relaxed text-ink/80 sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-16 space-y-12 whitespace-pre-line">
          {projectsData.map((p, index) => (
            <ProjectCard
              key={p.id}
              title={t(`items.${p.id}.title`)}
              description={t(`items.${p.id}.description`)}
              image={p.image}
              technologies={p.technologies}
              github={p.github}
              demo={p.demo}
              confidential={p.confidential}
              href={`/projects/${p.slug}`}
              accentColor={ACCENT_ROTATION[index % ACCENT_ROTATION.length] as CardAccent}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

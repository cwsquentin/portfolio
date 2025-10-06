import { ProjectCard } from "@/app/components/projects";
import { projectsData } from "@/data/projects";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

export default async function ProjectsPage({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section id="projects" className="min-h-screen px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-slate-100">{t("title")}</h2>
          <div className="h-1 w-16 bg-indigo-500" />
          <p className="text-lg text-slate-400">{t("intro")}</p>
        </div>

        <div className="mt-10 space-y-8">
          {projectsData.map((p) => (
            <ProjectCard
              key={p.id}
              title={t(`items.${p.id}.title`)}
              description={t(`items.${p.id}.description`)}
              image={p.image}
              technologies={p.technologies}
              github={p.github}
              demo={p.demo}
              confidential={p.confidential}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

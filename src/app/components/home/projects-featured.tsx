"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projectsData, type ProjectItem } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ColorFlood } from "../motion/color-flood";
import { MechanicalPress } from "../motion/mechanical-press";
import { Display } from "../primitives/display";
import { MonoLabel } from "../primitives/mono-label";
import { SectionMarker } from "../primitives/section-marker";

const FLOOD_ROTATION = ["cyan", "magenta", "yellow", "magenta", "cyan"] as const;
const MAX_TECHNOLOGIES_PER_ROW = 3;

export function ProjectsFeatured() {
  const t = useTranslations("home.projectsPreview");
  const projectsT = useTranslations("projects");
  const featuredProjects = projectsData.slice(0, 5);

  return (
    <section
      id="projects"
      className="border-b-2 border-ink bg-paper px-6 py-24 text-ink sm:px-12"
    >
      <SectionMarker number="01" title={t("title")} />

      <p className="mt-6 max-w-2xl font-body text-base leading-relaxed sm:text-lg">
        {t("description")}
      </p>

      <ul className="mt-16 divide-y-2 divide-ink border-y-2 border-ink">
        {featuredProjects.map((project, index) => (
          <ProjectEditorialRow
            key={project.id}
            project={project}
            index={index}
            title={projectsT(`items.${project.id}.title`)}
            confidentialLabel={projectsT("confidential")}
          />
        ))}
      </ul>

      <div className="mt-12 flex justify-end">
        <MechanicalPress
          as={Link}
          href="/projects"
          aria-label={t("viewAll")}
          className="group inline-flex items-baseline gap-3 border-2 border-ink bg-paper px-6 py-3 shadow-block-sm hover:bg-yellow"
        >
          <MonoLabel>{t("viewAll")}</MonoLabel>
          <Icon
            icon="mdi:arrow-right"
            aria-hidden="true"
            className="size-4 translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        </MechanicalPress>
      </div>
    </section>
  );
}

interface ProjectEditorialRowProps {
  project: ProjectItem;
  index: number;
  title: string;
  confidentialLabel: string;
}

function ProjectEditorialRow({
  project,
  index,
  title,
  confidentialLabel,
}: ProjectEditorialRowProps) {
  const isConfidential = Boolean(project.confidential);
  const href = isConfidential ? "/projects" : `/projects/${project.slug}`;
  const floodColor = FLOOD_ROTATION[index % FLOOD_ROTATION.length];
  const visibleTechnologies = project.technologies.slice(
    0,
    MAX_TECHNOLOGIES_PER_ROW,
  );

  return (
    <li>
      <ColorFlood
        as={Link}
        href={href}
        floodColor={floodColor}
        aria-label={title}
        className={cn(
          "group block w-full",
          "!inline-block",
        )}
      >
        <div className="grid grid-cols-12 items-baseline gap-4 px-4 py-8 sm:px-6 sm:py-10">
          <div className="col-span-12 sm:col-span-9">
            <Display
              size="section"
              as="h3"
              className="flex items-baseline gap-3 transition-transform duration-200 ease-out group-hover:translate-x-2"
            >
              <span>{title}</span>
              {isConfidential && (
                <Icon
                  icon="uis:lock"
                  aria-label={confidentialLabel}
                  role="img"
                  className="size-6 shrink-0 translate-y-1 opacity-70"
                />
              )}
            </Display>
          </div>

          <div className="col-span-12 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:col-span-3 sm:justify-end sm:text-right">
            {visibleTechnologies.map((tech, techIndex) => (
              <MonoLabel
                key={`${project.id}-${tech}`}
                className="inline-flex items-baseline"
              >
                {techIndex > 0 && (
                  <span aria-hidden="true" className="mr-3 opacity-50">
                    /
                  </span>
                )}
                {tech}
              </MonoLabel>
            ))}
          </div>
        </div>
      </ColorFlood>
    </li>
  );
}

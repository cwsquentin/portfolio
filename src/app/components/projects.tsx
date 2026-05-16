"use client";

import { Button } from "@/app/components/button";
import { Display } from "@/app/components/primitives/display";
import { Link } from "@/i18n/navigation";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

type CardAccent = "cyan" | "magenta" | "yellow";

export type ProjectProps = {
  title: string;
  description: string;
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
  href?: string;
  accentColor?: CardAccent;
  priority?: boolean;
};

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
  confidential = false,
  href,
  priority = false,
}: ProjectProps) {
  const t = useTranslations("projects");

  const cardClassName = clsx(
    "group relative w-full overflow-hidden rounded-none border-2 border-ink bg-paper text-ink shadow-block-md transition-transform duration-200 ease-out focus-within:ring-2 focus-within:ring-cyan focus-within:ring-offset-2 focus-within:ring-offset-paper",
    href && "cursor-pointer hover:-translate-x-1 hover:-translate-y-1",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cardClassName}
    >
      {href ? (
        <Link
          href={href}
          aria-label={t("detail.openProject", { project: title })}
          className="absolute inset-0 z-0 focus:outline-none"
        >
          <span className="sr-only">{title}</span>
        </Link>
      ) : null}

      <div className="md:flex">
        <div className="relative h-56 overflow-hidden border-b-2 border-ink sm:h-64 md:h-auto md:min-h-72 md:w-1/2 md:border-b-0 md:border-r-2">
          <Image
            src={image}
            alt={title}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 576px, 100vw"
            priority={priority}
          />
        </div>

        <div className="p-6 md:w-1/2 md:p-8">
          <div className="space-y-5">
            <Display size="block" as="h3">
              {title}
            </Display>

            <p className="font-body text-sm leading-relaxed text-ink/80 sm:text-base">
              {description}
            </p>

            <div className="relative z-10 flex flex-wrap gap-2 pt-1">
              {technologies.map((tech, index) => (
                <motion.span
                  key={`${title}-${tech}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-default rounded-none border-2 border-ink bg-paper px-2 py-1 text-mono-label text-ink"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 pt-3">
              {github ? (
                <Button
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="flood"
                  floodColor="cyan"
                  size="compact"
                >
                  <Icon icon="mdi:github" className="mr-2 size-4" />
                  {t("code")}
                </Button>
              ) : null}

              {!github && confidential ? (
                <Button
                  as="button"
                  type="button"
                  variant="ghost"
                  size="compact"
                  disabled
                  title={t("codePrivate")}
                >
                  <Icon icon="uis:lock" className="mr-2 size-4" />
                  {t("codePrivate")}
                </Button>
              ) : null}

              {demo ? (
                <Button
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="block"
                  color="magenta"
                  size="compact"
                >
                  <Icon icon="ph:arrow-square-out" className="mr-2 size-4" />
                  {t("demo")}
                </Button>
              ) : confidential ? (
                <Button
                  as="button"
                  type="button"
                  variant="ghost"
                  size="compact"
                  disabled
                  title={t("demoUnavailable")}
                >
                  <Icon icon="ph:arrow-square-out" className="mr-2 size-4" />
                  {t("demoUnavailable")}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

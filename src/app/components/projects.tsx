"use client";

import { Button } from "@/app/components/button";
import { useRouter } from "@/i18n/navigation";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import * as motion from "motion/react-client";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import {
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export type ProjectProps = {
  title: string;
  description: string;
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
  href?: string;
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
}: ProjectProps) {
  const t = useTranslations("projects");
  const router = useRouter();

  const navigateToDetails = useCallback(() => {
    if (href) {
      router.push(href);
    }
  }, [href, router]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!href) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateToDetails();
      }
    },
    [href, navigateToDetails],
  );

  const stopPropagation = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }, []);

  const cardClassName = clsx(
    "w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/60 shadow-md transition-all duration-300 hover:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70",
    href && "cursor-pointer",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cardClassName}
      role={href ? "link" : undefined}
      tabIndex={href ? 0 : undefined}
      aria-label={href ? t("detail.openProject", { project: title }) : undefined}
      onClick={href ? navigateToDetails : undefined}
      onKeyDown={href ? handleKeyDown : undefined}
    >
      <div className="md:flex">
        <div className="relative h-56 overflow-hidden sm:h-64 md:h-auto md:min-h-[18rem] md:w-1/2">
          <Image
            src={image}
            alt={title}
            className="object-cover"
            fill
            placeholder="blur"
          />
        </div>

        <div className="p-5 md:w-1/2 md:p-6">
          <div className="space-y-4">
            <motion.h3
              className="text-xl font-bold text-slate-100 sm:text-2xl"
              whileHover={{ x: 4 }}
            >
              {title}
            </motion.h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span
                  key={`${title}-${tech}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                  className="cursor-default rounded bg-slate-700 px-2 py-1 text-xs text-slate-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {confidential ? (
                <>
                  <Button
                    as="button"
                    type="button"
                    background="none"
                    border="slateMuted"
                    radius="md"
                    size="compact"
                    weight="medium"
                    className="text-slate-100"
                    disabled
                    title={t("codePrivate")}
                    onClick={stopPropagation}
                  >
                    <Icon icon="uis:lock" className="mr-2 size-4" />
                    {t("codePrivate")}
                  </Button>
                  <Button
                    as="button"
                    type="button"
                    background="slate"
                    border="none"
                    radius="md"
                    size="compact"
                    weight="medium"
                    disabled
                    title={t("demoUnavailable")}
                    onClick={stopPropagation}
                  >
                    <Icon icon="ph:arrow-square-out" className="mr-2 size-4" />
                    {t("demoUnavailable")}
                  </Button>
                </>
              ) : (
                <>
                  {github && (
                    <Button
                      as={motion.a}
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      background="none"
                      border="slate"
                      radius="md"
                      size="compact"
                      weight="medium"
                      className="text-slate-100 hover:bg-slate-700/60"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopPropagation}
                    >
                      <Icon icon="mdi:github" className="mr-2 size-4" />
                      {t("code")}
                    </Button>
                  )}
                  {demo && (
                    <Button
                      as={motion.a}
                      href={demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      background="indigo"
                      border="none"
                      radius="md"
                      size="compact"
                      weight="medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopPropagation}
                    >
                      <Icon icon="ph:arrow-square-out" className="mr-2 size-4" />
                      {t("demo")}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

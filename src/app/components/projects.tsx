import * as motion from "motion/react-client";
import LockIcon from "~icons/uis/lock";
import ExternalLinkIcon from "~icons/ph/arrow-square-out";
import GithubIcon from "~icons/mdi/github";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

export type ProjectProps = {
  title: string;
  description: string;
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
};

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
  confidential = false,
}: ProjectProps) {
  const t = useTranslations("projects");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/60 shadow-md transition-all duration-300 hover:border-indigo-500/50"
    >
      <div className="md:flex">
        <div className="relative overflow-hidden md:w-1/2">
          <Image
            src={image}
            alt={title}
            className="h-64 w-full object-cover"
            fill
            placeholder="blur"
          />
        </div>

        <div className="p-6 md:w-1/2">
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-bold text-slate-100"
              whileHover={{ x: 4 }}
            >
              {title}
            </motion.h3>
            <p className="mt-2 leading-relaxed text-slate-300">{description}</p>

            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ scale: 1.08 }}
                  className="cursor-default rounded bg-slate-700 px-2 py-1 text-xs text-slate-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              {confidential ? (
                <>
                  <button
                    type="button"
                    aria-disabled
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium cursor-not-allowed border border-slate-600 text-slate-100 opacity-70"
                    title={t("codePrivate")}
                  >
                    <LockIcon className="mr-2 h-4 w-4" />
                    {t("codePrivate")}
                  </button>
                  <button
                    type="button"
                    aria-disabled
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium cursor-not-allowed bg-slate-700/60 text-slate-300 opacity-70"
                    title={t("demoUnavailable")}
                  >
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    {t("demoUnavailable")}
                  </button>
                </>
              ) : (
                <>
                  {github && (
                    <motion.a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium border border-slate-600 text-slate-100 transition hover:border-indigo-500 hover:bg-slate-700/60"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      {t("code")}
                    </motion.a>
                  )}
                  {demo && (
                    <motion.a
                      href={demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white transition hover:bg-indigo-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      {t("demo")}
                    </motion.a>
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

import * as motion from "motion/react-client";
import Image, { type StaticImageData } from "next/image";

export type ProjectProps = {
  title: string;
  description: string;
  image: string | StaticImageData;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
  labels?: {
    code: string;
    demo: string;
    codePrivate: string;
    demoUnavailable: string;
    confidential: string;
  };
};

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
  confidential = false,
  labels = {
    code: "Code",
    demo: "Demo",
    codePrivate: "Code confidentiel",
    demoUnavailable: "Démo indisponible",
    confidential: "Confidentiel",
  },
}: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8 }}
      className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/60 shadow-md transition-all duration-300 hover:border-indigo-500/50"
    >
      <div className="md:flex">
        <div className="relative overflow-hidden md:w-1/2">
          {typeof image === "string" ? (
            <motion.img
              src={image || "/placeholder.svg"}
              alt={title}
              className="h-64 w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <Image
              src={image}
              alt={title}
              className="h-64 w-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder={"blur" in image && image.blurDataURL ? "blur" : "empty"}
            />
          )}

          <motion.div
            className="absolute inset-0 bg-indigo-500/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-6 md:w-1/2">
          <div className="space-y-4">
            <div>
              <motion.h3 className="text-2xl font-bold text-slate-100" whileHover={{ x: 4 }}>
                {title}
              </motion.h3>
              <p className="mt-2 leading-relaxed text-slate-300">{description}</p>
            </div>

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
                    className="inline-flex cursor-not-allowed items-center rounded-md border border-slate-600 px-3 py-2 text-sm font-medium text-slate-100 opacity-70"
                    title={labels.codePrivate}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 8V7a3 3 0 116 0v3H9z" />
                    </svg>
                    {labels.codePrivate}
                  </button>
                  <button
                    type="button"
                    aria-disabled
                    className="inline-flex cursor-not-allowed items-center rounded-md bg-slate-700/60 px-3 py-2 text-sm font-medium text-slate-300 opacity-70"
                    title={labels.demoUnavailable}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {labels.demoUnavailable}
                  </button>
                </>
              ) : (
                <>
                  {github && (
                    <motion.a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md border border-slate-600 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-indigo-500 hover:bg-slate-700/60"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {labels.code}
                    </motion.a>
                  )}
                  {demo && (
                    <motion.a
                      href={demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {labels.demo}
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

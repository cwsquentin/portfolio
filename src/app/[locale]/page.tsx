import { SnakeBackground } from "@/app/components/snake-background";
import * as motion from "motion/react-client";
import GithubIcon from "~icons/lucide/github";
import LinkedinIcon from "~icons/lucide/linkedin";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { containerVariants, itemVariants } from "@/animation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: `Quentin Petiteville - ${t("page.title")}`,
  };
}

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center px-8 overflow-hidden">
        <SnakeBackground />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl text-center"
        >
          <motion.p
            variants={itemVariants.fromBottom}
            className="text-lg font-medium mb-2"
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            variants={itemVariants.fromBottom}
            className="text-6xl font-bold"
          >
            {t("name")}
          </motion.h1>

          <motion.h2
            variants={itemVariants.fromBottom}
            className="text-3xl font-light mt-2"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={itemVariants.fromBottom}
            className="mx-auto max-w-2xl text-xl leading-relaxed mt-6"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={itemVariants.fromBottom}
            className="flex items-center justify-center space-x-2 pt-6"
          >
            <motion.span
              className="h-2 w-2 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span>{t("availability")}</span>
          </motion.div>

          <motion.div
            variants={itemVariants.fromBottom}
            className="flex items-center justify-center space-x-6 pt-6"
          >
            <motion.a
              href="https://github.com/cwsquentin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5, color: "#3b82f6" }}
              whileTap={{ scale: 0.9 }}
              className="transition-colors duration-300"
              aria-label="GitHub"
            >
              <GithubIcon className="h-7 w-7" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/quentin-petiteville/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5, color: "#3b82f6" }}
              whileTap={{ scale: 0.9 }}
              className="transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-7 w-7" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

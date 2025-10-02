import { SnakeBackground } from "@/app/components/snake-background";
import * as motion from "motion/react-client";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return {
    title: `Quentin Petiteville - ${t('page.title')}`
  };
}

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center px-8 overflow-hidden">
        <SnakeBackground />
        <div className="relative z-10 max-w-4xl text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-medium"
              >
                {t("greeting")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold"
              >
                {t("name")}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl font-light"
              >
                {t("title")}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mx-auto max-w-2xl text-xl leading-relaxed"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center space-x-4 pt-4"
            >
              <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <motion.span
                  className="h-2 w-2 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <span className="">{t("availability")}</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
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
                <Icon icon="lucide:github" width={28} height={28} />
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
                <Icon icon="lucide:linkedin" width={28} height={28} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { itemVariants } from "@/animation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return {
    title: t('page.title'),
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="min-h-220 flex items-center justify-center py-20">
      <div className="w-full px-6 text-center">
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-8">
            {t("title")}
          </h2>

          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              className="inline-flex text-4xl md:text-6xl font-bold"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <a
                    href="mailto:contact@quentinpetiteville.me"
                    className="hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    contact@quentinpetiteville.me
                  </a>
                  <span className="mx-8 opacity-70">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-medium mb-8">
            {t("socialsTitle")}
          </h2>

          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              className="inline-flex text-3xl md:text-5xl font-bold"
              style={{
                width: "200%"
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <a
                    href="https://github.com/cwsquentin"
                    className="hover:text-teal-400 transition-colors whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <span className="mx-6 opacity-70">•</span>
                  <a
                    href="https://www.linkedin.com/in/quentin-petiteville/"
                    className="hover:text-teal-400 transition-colors whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <span className="mx-6 opacity-70">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

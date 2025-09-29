"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              x: [0, 5, -5, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              x: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="text-2xl font-medium mb-8"
          >
            {t("title")}
          </motion.h1>

          <motion.a
            href="mailto:contact@quentinpetiteville.me"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [1, 1.02, 1],
              y: [0, -8, 0],
              rotateX: [0, 2, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              y: { duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              rotateX: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-block text-4xl md:text-6xl font-bold cursor-pointer"
          >
            contact@quentinpetiteville.me
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -5, 0],
              x: [0, -3, 3, 0],
            }}
            transition={{
              delay: 1,
              y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              x: { duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="text-2xl font-medium mb-8"
          >
            {t("socialsTitle")}
          </motion.h2>

          <div className="flex justify-center items-center gap-8 text-3xl md:text-5xl font-bold">
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{
                opacity: 1,
                y: [0, -3, 0],
                rotateX: 0,
                x: [0, 2, 0],
              }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                type: "spring",
                stiffness: 100,
                y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                x: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              whileHover={{
                scale: 1.1,
                y: -5,
                rotateY: 5,
              }}
            >
              <a
                href="https://github.com/cwsquentin"
                className="hover:text-teal-400 group-hover:text-teal-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.3 }}
              className="text-muted-foreground"
            >
              •
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{
                opacity: 1,
                y: [0, -3, 0],
                rotateX: 0,
                x: [0, -2, 0],
              }}
              transition={{
                duration: 0.6,
                delay: 1.4,
                type: "spring",
                stiffness: 100,
                y: { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                x: { duration: 3.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              whileHover={{
                scale: 1.1,
                y: -5,
                rotateY: -5,
              }}
            >
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                className="hover:text-teal-400 group-hover:text-teal-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { SnakeBackground } from "./components/snake-background";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex min-h-screen items-center justify-center px-8 overflow-hidden">
        <SnakeBackground />
        <div className="relative z-10 max-w-4xl text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-primary text-lg font-medium"
              >
                {t("greeting")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold text-foreground text-balance font-heading"
              >
                {t("name")}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl text-muted-foreground font-light"
              >
                {t("title")}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed"
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
                  className="h-2 w-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <span className="text-muted-foreground">
                  {t("availability")}
                </span>
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
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={28} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5, color: "#3b82f6" }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

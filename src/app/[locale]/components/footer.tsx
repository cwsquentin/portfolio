"use client";

import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type NavKey = "home" | "about" | "projects" | "contact";

const NAV: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" }
];

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between gap-10">
          <div className="space-y-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-3xl font-bold text-teal-400 font-heading"
            >
              <span>{t("footer.cta")}</span>
              <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <p className="max-w-xs text-sm text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex items-start gap-10">
            <nav className="flex flex-col">
              {NAV.map((item) => {
                const locale = typeof window !== "undefined"
                  ? window.location.pathname.split("/")[1]
                  : "en";
                return (
                  <Link
                    key={item.key}
                    href={getPathname({ href: item.href, locale })}
                    className="py-1 text-sm font-medium text-slate-200 hover:text-white"
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-4 pt-1">
              <a
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition hover:scale-110 hover:text-white"
                aria-label={t("social.github")}
                title={t("social.github")}
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition hover:scale-110 hover:text-white"
                aria-label={t("social.linkedin")}
                title={t("social.linkedin")}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

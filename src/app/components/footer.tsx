"use client";

import ArrowRightIcon from "~icons/mdi/arrow-right";
import GithubIcon from "~icons/mdi/github";
import LinkedinIcon from "~icons/mdi/linkedin";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type NavKey = "home" | "about" | "projects" | "contact";

const NAV: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" }
];

export default function Footer() {
  const t = useTranslations("common");
  const pathname = usePathname();

  return (
    <footer className="mt-auto overflow-hidden rounded-t-3xl border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-3 sm:px-6 sm:pt-20">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="space-y-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-3xl font-bold text-teal-400 font-heading sm:text-4xl"
            >
              <span>{t("footer.cta")}</span>
              <ArrowRightIcon className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <p className="max-w-xs text-base text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-6 sm:w-auto sm:flex-row sm:items-start sm:gap-7">
            <nav className="flex flex-wrap gap-1 sm:flex-col">
              {NAV.map((item) => {
                const basePath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
                const isActive = basePath === item.href || (item.href !== "/" && basePath.startsWith(item.href));
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`rounded-md border border-transparent p-1 text-sm font-medium transition-colors hover:bg-teal-400/10 hover:text-teal-400 sm:text-base ${
                      isActive ? "text-teal-400" : "text-slate-200"
                    }`}
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex gap-3 pt-1 sm:flex-col">
              <a
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 rounded-md border border-transparent hover:bg-teal-400/10 hover:text-teal-400 transition-colors p-1"
                aria-label={t("social.github")}
                title={t("social.github")}
              >
                <GithubIcon className="h-[35px] w-[35px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 rounded-md border border-transparent hover:bg-teal-400/10 hover:text-teal-400 transition-colors p-1"
                aria-label={t("social.linkedin")}
                title={t("social.linkedin")}
              >
                <LinkedinIcon className="h-[35px] w-[35px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <p className="text-center text-xs text-slate-400">
            {t("footer.rights")} 
            <span className="text-teal-400"> | </span> 
            Designed by 
            <span className="font-bold text-slate-400"> Quentin Petiteville</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

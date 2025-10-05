"use client";

import { Icon } from "@iconify/react";
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
    <footer className="mt-auto border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-2.5">
        <div className="flex items-start justify-between gap-10">
          <div className="space-y-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-4xl font-bold text-teal-400 font-heading"
            >
              <span>{t("footer.cta")}</span>
              <Icon icon="lucide:arrow-right" className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <p className="max-w-xs text-md text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex items-start gap-7.5">
            <nav className="flex flex-col">
              {NAV.map((item) => {
                const basePath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
                const isActive = basePath === item.href || (item.href !== "/" && basePath.startsWith(item.href));
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`p-1 text-md font-medium rounded-md border border-transparent hover:bg-teal-400/10 hover:text-teal-400 transition-colors ${
                      isActive ? "text-teal-400" : "text-slate-200"
                    }`}
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 rounded-md border border-transparent hover:bg-teal-400/10 hover:text-teal-400 transition-colors p-1"
                aria-label={t("social.github")}
                title={t("social.github")}
              >
                <Icon icon="mdi:github" width={35} height={35} />
              </a>
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 rounded-md border border-transparent hover:bg-teal-400/10 hover:text-teal-400 transition-colors p-1"
                aria-label={t("social.linkedin")}
                title={t("social.linkedin")}
              >
                <Icon icon="mdi:linkedin" width={35} height={35} />
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

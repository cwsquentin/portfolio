"use client";

import { Icon } from "@iconify/react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import clsx from "clsx";

type NavKey = "about" | "projects" | "contact";
const NAV: { key: NavKey; href: `/${NavKey}`; icon: string }[] = [
  { key: "about", href: "/about", icon: "mdi:account-circle" },
  { key: "projects", href: "/projects", icon: "mdi:grid" },
  { key: "contact", href: "/contact", icon: "mdi:email" },
];

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("common");

  const isHomeActive =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/" || pathname === "";

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-3 py-2 shadow-lg backdrop-blur-md">
          <Link
            href="/"
            aria-label={t("navigation.home")}
            aria-current={isHomeActive ? "page" : undefined}
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
              isHomeActive
                ? "bg-white/10 text-white ring-1 ring-white/15"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title={t("navigation.home")}
          >
            <Icon icon="mdi:home" className="size-4" />
          </Link>

          <span className="mx-1 h-6 w-px bg-white/10" aria-hidden />
          <nav className="flex items-center gap-1">
            {NAV.map(({ key, href, icon }) => {
              const active = pathname?.endsWith(href) ?? false;
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                    active
                      ? "text-teal-400 border-b-2 border-teal-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon icon={icon} className="size-4 opacity-90" />
                  <span className="font-heading">{t(`navigation.${key}`)}</span>
                </Link>
              );
            })}
          </nav>

          <span className="mx-1 h-6 w-px bg-white/10" aria-hidden />
          <div className="flex items-center gap-1">
            {routing.locales.map((lng) => {
              const active = locale === lng;
              return (
                <Link
                  key={lng}
                  href={pathname}
                  locale={lng}
                  scroll={false}
                  className={clsx(
                    "rounded-md px-2 py-1 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                    active
                      ? "text-teal-400 border-b-2 border-teal-500"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                  aria-current={active ? "true" : undefined}
                >
                  {t(`navigation.${lng}`)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect, useRef, type ComponentType, type SVGProps } from "react";
import HomeIcon from "~icons/mdi/home";
import AboutIcon from "~icons/mdi/account-circle";
import ProjectsIcon from "~icons/mdi/grid";
import ContactIcon from "~icons/mdi/email";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import clsx from "clsx";

type NavKey = "about" | "projects" | "contact";
const NAV: { key: NavKey; href: `/${NavKey}`; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "about", href: "/about", Icon: AboutIcon },
  { key: "projects", href: "/projects", Icon: ProjectsIcon },
  { key: "contact", href: "/contact", Icon: ContactIcon }
];

const MOBILE_NAV: { key: "home" | NavKey; href: string; Icon?: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "home", href: "/", Icon: HomeIcon },
  ...NAV
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("common");

  const isHomeActive =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/" || pathname === "";

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) document.addEventListener("mousedown", onOutside);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("mousedown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 w-full text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:px-4 lg:justify-center">
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-2 shadow-lg backdrop-blur-md sm:gap-3">
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
            <HomeIcon className="size-4" />
          </Link>

          <span className="mx-1 hidden h-6 w-px bg-white/10 lg:block" aria-hidden />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ key, href, Icon }) => {
              const active = pathname === href || pathname === `/${locale}${href}`;
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
                  <Icon className="size-4 opacity-90" />
                  <span className="font-heading">{t(`navigation.${key}`)}</span>
                </Link>
              );
            })}
          </nav>

          <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" aria-hidden />
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

        <div className="relative lg:hidden" ref={menuRef}>
          <button
            className={clsx(
              "flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-bold uppercase text-slate-300 transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
              mobileMenuOpen && "bg-white/10 text-white"
            )}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={t("menubtn")}
            aria-expanded={mobileMenuOpen}
            aria-haspopup="menu"
          >
            {t("menubtn")}
          </button>

          <div
            className={clsx(
              "absolute right-0 top-12 w-52 origin-top-right overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur transition duration-200",
              mobileMenuOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0"
            )}
            role="menu"
          >
            <nav className="flex flex-col gap-1" aria-label={t("menubtn")}>
              {MOBILE_NAV.map(({ key, href, Icon }) => {
                const isActive =
                  key === "home"
                    ? isHomeActive
                    : pathname === href || pathname === `/${locale}${href}`;

                return (
                  <Link
                    key={key}
                    href={href}
                    locale={locale}
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-white text-slate-900"
                        : "hover:bg-white/5 hover:text-white text-slate-200"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    <span>{t(`navigation.${key}`)}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
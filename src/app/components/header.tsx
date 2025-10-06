"use client";

import { useState, useEffect, useRef } from "react";
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
      <div className="flex justify-between lg:justify-center items-center px-4">
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

          <span className="hidden lg:block mx-1 h-6 w-px bg-white/10" aria-hidden />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(({ key, href, icon }) => {
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

        <button
          className="lg:hidden bg-teal-400 text-white font-bold uppercase px-4 py-3 rounded-full shadow-lg hover:bg-teal-500 transition"
          onClick={() => setMobileMenuOpen(true)}
          aria-label={t("menubtn")}
        >
          {t("menubtn")}
        </button>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={clsx(
          "fixed top-0 right-0 bottom-0 w-64 z-50 transition-transform duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          "bg-teal-400 text-white shadow-2xl"
        )}
      >
        <div
          className="h-full p-3 overflow-y-auto relative flex flex-col justify-start"
          ref={menuRef}
        >
          <button
            className="absolute top-4 right-4 text-4xl cursor-pointer text-white focus:outline-none hover:opacity-80 transition"
            aria-label={t("button.close")}
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>

          <div className="mt-16 flex flex-col items-center space-y-6">
            <div className="text-lg font-semibold text-center w-full">
              {NAV.map(({ key, href }) => {
                const isActive = pathname === href || pathname === `/${locale}${href}`;
                return (
                  <Link
                    key={key}
                    href={href}
                    className={clsx(
                      "block w-full transition duration-200 hover:bg-white hover:text-black px-4 py-3",
                      isActive && "bg-white text-black"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`navigation.${key}`)}
                  </Link>
                );
              })}
            </div>

            <div className="w-full uppercase text-2xs font-semibold py-3 space-y-5">
              <div className="flex justify-center space-x-6">
                {routing.locales.map((lng) => (
                  <Link
                    key={lng}
                    href={pathname}
                    locale={lng}
                    scroll={false}
                    className={clsx(
                      "hover:underline text-xs font-bold underline-offset-4 transition",
                      locale === lng && "underline"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`languages.${lng}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type NavKey = "about" | "projects" | "contact";

const NAV: { key: NavKey; href: `/${NavKey}`; icon: string }[] = [
  { key: "about", href: "/about", icon: "mdi:account-circle" },
  { key: "projects", href: "/projects", icon: "mdi:grid" },
  { key: "contact", href: "/contact", icon: "mdi:email" },
];

const MOBILE_NAV: { key: "home" | NavKey; href: string; icon: string }[] = [
  { key: "home", href: "/", icon: "mdi:home" },
  ...NAV,
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("common");

  const isPathActive = (href: string) =>
    pathname === href || pathname === `/${locale}${href}`;

  const isHomeActive =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === "/" ||
    pathname === "";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:px-4 md:justify-center">
        <div className="hidden flex-wrap items-center gap-2 rounded-full border-2 border-ink bg-paper/95 px-3 py-2 shadow-block-sm backdrop-blur-md sm:gap-3 md:flex">
          <Link
            href="/"
            aria-label={t("navigation.home")}
            aria-current={isHomeActive ? "page" : undefined}
            title={t("navigation.home")}
            className={cn(
              "flex size-9 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              isHomeActive
                ? "bg-ink text-paper"
                : "text-ink/60 hover:bg-ink/5 hover:text-ink",
            )}
          >
            <Icon icon="mdi:home" className="size-4" />
          </Link>

          <span className="mx-1 h-6 w-px bg-ink/15" aria-hidden />

          <nav
            className="flex items-center gap-1"
            aria-label={t("navigation.primaryLabel")}
          >
            {NAV.map(({ key, href, icon }) => {
              const active = isPathActive(href);
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-mono-label group flex items-center gap-2 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                    active
                      ? "border-b-2 border-magenta text-magenta"
                      : "text-ink/60 hover:text-ink",
                  )}
                >
                  <Icon icon={icon} className="size-4 opacity-90" />
                  <span>{t(`navigation.${key}`)}</span>
                </Link>
              );
            })}
          </nav>

          <span className="mx-1 h-6 w-px bg-ink/15" aria-hidden />

          <div className="flex items-center gap-1">
            {routing.locales.map((lng) => {
              const active = locale === lng;
              return (
                <Link
                  key={lng}
                  href={pathname}
                  locale={lng}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  aria-label={t(`navigation.${lng}`)}
                  className={cn(
                    "text-mono-label rounded-md px-2 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                    active
                      ? "border-b-2 border-magenta text-magenta"
                      : "text-ink/60 hover:text-ink",
                  )}
                >
                  {t(`navigation.${lng}`)}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="relative ml-auto md:hidden" ref={menuRef}>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={t("menubtn")}
            aria-expanded={mobileMenuOpen}
            aria-haspopup="menu"
            aria-controls="mobile-menu-panel"
            className={cn(
              "text-mono-label flex items-center gap-2 rounded-full border-2 border-ink bg-paper/95 px-4 py-2 text-ink shadow-block-sm backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              mobileMenuOpen && "bg-ink text-paper",
            )}
          >
            {mobileMenuOpen ? t("closebtn") : t("menubtn")}
          </button>

          <div
            id="mobile-menu-panel"
            role="menu"
            className={cn(
              "absolute right-0 top-12 w-56 origin-top-right overflow-hidden rounded-none border-2 border-ink bg-paper p-3 shadow-block-md transition duration-200",
              mobileMenuOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            <nav
              className="flex flex-col gap-1"
              aria-label={t("navigation.primaryLabel")}
            >
              {MOBILE_NAV.map(({ key, href, icon }) => {
                const active =
                  key === "home" ? isHomeActive : isPathActive(href);
                return (
                  <Link
                    key={key}
                    href={href}
                    locale={locale}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className={cn(
                      "text-mono-label flex items-center gap-3 rounded-none px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                      active
                        ? "bg-ink text-paper"
                        : "text-ink/70 hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    <Icon icon={icon} className="size-4" />
                    <span>{t(`navigation.${key}`)}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-2 flex items-center justify-end gap-1 border-t-2 border-ink pt-2">
              {routing.locales.map((lng) => {
                const active = locale === lng;
                return (
                  <Link
                    key={lng}
                    href={pathname}
                    locale={lng}
                    scroll={false}
                    onClick={closeMobileMenu}
                    aria-label={t(`navigation.${lng}`)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "text-mono-label rounded-md px-2 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                      active
                        ? "border-b-2 border-magenta text-magenta"
                        : "text-ink/60 hover:text-ink",
                    )}
                  >
                    {t(`navigation.${lng}`)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

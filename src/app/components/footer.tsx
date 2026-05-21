"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { SnakeGameMini } from "@/app/components/snake-game-mini";

type SecondaryNavKey = "about" | "projects" | "contact";

const SECONDARY_NAV: { key: SecondaryNavKey; href: `/${SecondaryNavKey}` }[] = [
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    key: "github" as const,
    href: "https://github.com/cwsquentin",
    icon: "mdi:github",
  },
  {
    key: "linkedin" as const,
    href: "https://www.linkedin.com/in/quentin-petiteville/",
    icon: "mdi:linkedin",
  },
];

export default function Footer() {
  const t = useTranslations("common");
  const pathname = usePathname();

  const basePath = pathname || "/";
  const isLinkActive = (href: string) =>
    basePath === href || (href !== "/" && basePath.startsWith(href));

  return (
    <footer
      className="relative isolate overflow-hidden border-t-2 border-ink bg-ink text-paper"
      aria-label={t("footer.navigationLabel")}
    >
      <SnakeGameMini />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-12 sm:py-10 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        <nav
          className="flex flex-col gap-2"
          aria-label={t("footer.navigationLabel")}
        >
          <ul className="flex flex-col gap-2">
            {SECONDARY_NAV.map(({ key, href }) => {
              const active = isLinkActive(href);
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-mono-label inline-flex items-center gap-2 text-paper transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                      active && "border-b-2 border-paper pb-0.5",
                    )}
                  >
                    {t(`navigation.${key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ul className="flex flex-row items-center gap-3 sm:flex-col sm:items-end">
          {SOCIAL_LINKS.map(({ key, href, icon }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`social.${key}`)}
                title={t(`social.${key}`)}
                className="inline-flex size-9 items-center justify-center border-2 border-paper text-paper transition-colors hover:bg-paper hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <Icon icon={icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 px-6 pb-4 sm:px-12 sm:pb-6">
        <p className="text-mono-label text-center text-paper/60">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

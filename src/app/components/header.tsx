"use client";

import { Home, UserRound, LayoutGrid, Mail } from "lucide-react";
import { Link, usePathname, useRouter, getPathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

type Item = {
  key: "home" | "about" | "projects" | "contact";
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV: Item[] = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: UserRound },
  { key: "projects", href: "/projects", icon: LayoutGrid },
  { key: "contact", href: "/contact", icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("common");

  // --- FIX: comparer des chemins sans le préfixe de langue ---
  const normalize = (p: string) => p.replace(/^\/(en|fr)(?=\/|$)/, "");
  const isActive = (href: string) => {
    const current = normalize(pathname || "/");
    const target = normalize(getPathname({ href, locale }));
    if (href === "/") return current === "" || current === "/";
    return current === target;
  };

  const switchLanguage = (newLocale: "en" | "fr") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-3 py-2 shadow-lg backdrop-blur-md">
          <NavIconOnly
            item={NAV[0]}
            label={t(`navigation.${NAV[0].key}`)}
            active={isActive(NAV[0].href)}
          />

          <span className="mx-1 h-6 w-px bg-white/10" aria-hidden />
          <nav className="flex items-center gap-1">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                  isActive(item.href)
                    // Actif = même logique visuelle que les boutons de langue
                    ? "text-teal-400 border-b-2 border-teal-500"
                    : "text-slate-300 hover:text-white hover:bg-white/5",
                ].join(" ")}
              >
                <item.icon className="h-4 w-4 opacity-90" />
                <span className="font-heading">{t(`navigation.${item.key}`)}</span>
              </Link>
            ))}
          </nav>

          <span className="mx-1 h-6 w-px bg-white/10" aria-hidden />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={[
                "rounded-md px-2 py-1 text-xs font-semibold transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                locale === "en"
                  ? "text-teal-400 border-b-2 border-teal-500"
                  : "text-slate-300 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              {t("navigation.en")}
            </button>
            <button
              type="button"
              onClick={() => switchLanguage("fr")}
              className={[
                "rounded-md px-2 py-1 text-xs font-semibold transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                locale === "fr"
                  ? "text-teal-400 border-b-2 border-teal-500"
                  : "text-slate-300 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              {t("navigation.fr")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavIconOnly({
  item,
  label,
  active,
}: {
  item: Item;
  label: string;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={[
        "relative flex h-9 w-9 items-center justify-center rounded-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
        active
          ? "bg-white/10 text-white ring-1 ring-white/15"
          : "text-slate-300 hover:text-white hover:bg-white/5",
      ].join(" ")}
      title={label}
    >
      <Icon className="h-4 w-4" />
      <span
        className={[
          "pointer-events-none absolute inset-0 rounded-full",
          active ? "ring-2 ring-white/15" : "ring-1 ring-white/10",
        ].join(" ")}
        aria-hidden
      />
    </Link>
  );
}

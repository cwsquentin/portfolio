"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UserRound,
  LayoutGrid,
  Mail,
} from "lucide-react";

type Item = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV: Item[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: UserRound },
  { name: "Projects", href: "/projects", icon: LayoutGrid },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-3 py-2 shadow-lg backdrop-blur-md">
          <NavIconOnly item={NAV[0]} active={isActive(NAV[0].href)} />
          <span className="mx-1 h-6 w-px bg-white/10" aria-hidden />
          <nav className="flex items-center gap-1">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                  isActive(item.href)
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5",
                ].join(" ")}
              >
                <item.icon className="h-4 w-4 opacity-90" />
                <span className="font-heading">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavIconOnly({
  item,
  active,
}: {
  item: Item;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={[
        "relative flex h-9 w-9 items-center justify-center rounded-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
        active
          ? "bg-white/10 text-white ring-1 ring-white/15"
          : "text-slate-300 hover:text-white hover:bg-white/5",
      ].join(" ")}
      title={item.name}
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

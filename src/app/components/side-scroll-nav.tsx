"use client";

import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { itemVariants } from "@/animation";

type SectionLink = {
  id: string;
  label: string;
};

type SideScrollNavProps = {
  links: SectionLink[];
};

export default function SideScrollNav({ links }: SideScrollNavProps) {
  const t = useTranslations("common");
  const [activeId, setActiveId] = useState<string | null>(
    links[0]?.id ?? null,
  );

  useEffect(() => {
    if (!links.length) {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentId: string | null = links[0]?.id ?? null;

      for (const link of links) {
        const element = document.getElementById(link.id);
        if (!element) continue;

        const elementTop = element.offsetTop;
        if (scrollPosition >= elementTop) {
          currentId = link.id;
        }
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [links]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, "", url.toString());
      }
    },
    [],
  );

  return (
    <motion.nav
      variants={itemVariants.fromBottom}
      initial="hidden"
      animate="visible"
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-5 xl:flex"
      aria-label={t("navigation.sections")}
    >
      {links.map((link) => {
        const isActive = activeId === link.id;

        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => handleClick(event, link.id)}
            className={cn(
              "group inline-flex items-center gap-3 py-1 transition-colors",
              "text-mono-label",
              isActive
                ? "text-magenta"
                : "text-ink/40 hover:text-magenta focus-visible:text-magenta",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-0.5 transition-all",
                isActive
                  ? "w-8 bg-magenta"
                  : "w-6 bg-ink/20 group-hover:w-8 group-hover:bg-magenta group-focus-visible:w-8 group-focus-visible:bg-magenta",
              )}
            />
            <span
              className={cn(
                "transition-transform",
                isActive
                  ? "translate-x-1"
                  : "group-hover:translate-x-1 group-focus-visible:translate-x-1",
              )}
            >
              {link.label}
            </span>
          </a>
        );
      })}
    </motion.nav>
  );
}

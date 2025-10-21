'use client';

import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import * as motion from "motion/react-client";
import clsx from "clsx";
import { itemVariants } from "@/animation";
import { useTranslations } from "next-intl";

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
    links[0]?.id ?? null
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
    []
  );

  return (
    <motion.nav
      variants={itemVariants.fromBottom}
      initial="hidden"
      animate="visible"
      className="fixed left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-5 text-sm text-slate-400 xl:flex"
      aria-label={t("navigation.sections")}
    >
      {links.map((link) => {
        const isActive = activeId === link.id;

        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => handleClick(event, link.id)}
            className={clsx(
              "group inline-flex items-center gap-3 py-1 font-medium transition",
              isActive ? "text-teal-300" : "text-slate-400 hover:text-teal-300"
            )}
          >
            <span
              className={clsx(
                "h-px w-6 bg-slate-600/50 transition-all",
                isActive
                  ? "w-8 bg-teal-400"
                  : "group-hover:w-8 group-hover:bg-teal-400"
              )}
            />
            <span
              className={clsx(
                "transition-transform",
                isActive ? "translate-x-1" : "group-hover:translate-x-1"
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

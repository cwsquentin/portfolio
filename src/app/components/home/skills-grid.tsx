"use client";

import { useTranslations } from "next-intl";
import { Block } from "../primitives/block";
import { Display } from "../primitives/display";
import { SectionMarker } from "../primitives/section-marker";

type SkillCategory = { title: string; items: string[] };

const BLOCK_COLORS = ["cyan", "magenta", "yellow"] as const;

export function SkillsGrid() {
  const t = useTranslations("home");
  const categories = (t.raw("skills.categories") as SkillCategory[]) ?? [];
  const description = t("skills.description");

  return (
    <section className="border-b-2 border-ink bg-paper px-6 py-24 text-ink sm:px-12">
      <SectionMarker number="04" title={t("skills.title")} />

      {description && (
        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed sm:text-lg">
          {description}
        </p>
      )}

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {categories.map((category, index) => {
          const color = BLOCK_COLORS[index % BLOCK_COLORS.length];

          return (
            <Block
              key={category.title}
              color={color}
              shadow="md"
              className="p-6"
            >
              <Display size="block" as="h3">
                {category.title}
              </Display>

              <ul className="mt-6 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="bg-ink px-3 py-1 text-mono-label text-paper"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Block>
          );
        })}
      </div>
    </section>
  );
}

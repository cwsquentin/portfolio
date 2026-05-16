"use client";

import { useTranslations } from "next-intl";
import { BlockSlideIn } from "../motion/block-slide-in";
import { Block } from "../primitives/block";
import { Display } from "../primitives/display";
import { MonoLabel } from "../primitives/mono-label";
import { SectionMarker } from "../primitives/section-marker";

type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  summary: string;
};

export function ExperienceTimeline() {
  const t = useTranslations("home");
  const items = (t.raw("experience.items") as ExperienceItem[]) ?? [];

  return (
    <section className="relative border-b-2 border-ink bg-paper px-6 py-24 text-ink sm:px-12">
      <SectionMarker number="02" title={t("experience.title")} />

      <div className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-ink md:block"
        />

        <ul className="space-y-12">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li
                key={`${item.role}-${index}`}
                className="relative md:grid md:grid-cols-2 md:gap-12"
              >
                <BlockSlideIn
                  from={isLeft ? "left" : "right"}
                  className={
                    isLeft
                      ? "md:pr-12 md:text-right"
                      : "md:col-start-2 md:pl-12"
                  }
                >
                  <Block color="paper" shadow="sm" className="p-6">
                    <MonoLabel>{item.period}</MonoLabel>
                    <Display as="h3" size="block" className="mt-4">
                      {item.role}
                    </Display>
                    <p className="mt-1 text-mono-label">{item.company}</p>
                    <p className="mt-3 font-body text-base leading-relaxed">
                      {item.summary}
                    </p>
                  </Block>
                </BlockSlideIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

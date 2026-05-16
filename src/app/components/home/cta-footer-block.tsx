"use client";

import { useTranslations } from "next-intl";
import { Block } from "../primitives/block";
import { Display } from "../primitives/display";
import { Button } from "../button";

export function CtaFooterBlock() {
  const t = useTranslations("home.ctaBanner");

  return (
    <Block
      as="section"
      color="ink"
      border={false}
      className="px-6 py-24 sm:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Display size="hero" as="h2" weight={800}>
            {t("title")}
          </Display>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-shrink-0">
          <Button href="/contact" variant="block" color="magenta" size="lg">
            {t("primary")}
          </Button>
          <Button
            href={t("secondaryHref")}
            target="_blank"
            rel="noopener noreferrer"
            variant="block"
            color="yellow"
            size="lg"
            external
          >
            {t("secondary")}
          </Button>
        </div>
      </div>
    </Block>
  );
}

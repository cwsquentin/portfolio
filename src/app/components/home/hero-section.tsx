"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Duck from "@/app/favicon.ico";
import { Display } from "../primitives/display";
import { MonoLabel } from "../primitives/mono-label";

const HeroBlocks3D = dynamic(
  () => import("./hero-blocks-3d").then((module) => module.HeroBlocks3D),
  {
    ssr: false,
    loading: () => null,
  },
);

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden border-b-2 border-ink bg-paper px-6 py-24 text-center text-ink sm:px-12 sm:py-32">
      <HeroBlocks3D />

      <div className="pointer-events-none relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <Display size="section" as="h1" weight={700} className="text-balance">
          {t("headline")}
        </Display>

        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-ink/80 sm:text-xl">
          {t("subheadline")}
        </p>

        {/* Ancienne version statut — à restaurer si besoin
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-block-sm">
          <Icon
            icon="mdi:calendar-star"
            aria-hidden="true"
            className="size-5 text-magenta"
          />
          <MonoLabel>{t("availability")}</MonoLabel>
        </div>
        */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-block-sm">
          <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-paper">
            <Image
              src="/projects/Logo_Worldline.svg"
              alt=""
              width={20}
              height={20}
              className="size-5 object-contain"
            />
          </span>
          <MonoLabel>{t("current")}</MonoLabel>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/about"
            aria-label={t("ctaAriaLabel")}
            className="group pointer-events-auto inline-flex items-center gap-3 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-block-sm transition hover:bg-yellow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-paper">
              <Image
                src={Duck}
                alt=""
                width={20}
                height={20}
                className="size-5 rounded-full object-cover"
              />
            </span>
            <span className="font-body text-sm font-medium">{t("cta")}</span>
            <Icon
              icon="mdi:arrow-right"
              aria-hidden="true"
              className="size-4 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

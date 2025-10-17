"use client";

import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { itemVariants } from "@/animation";

const EMAIL_LOOP_DISTANCE = 1000;
const SOCIALS_LOOP_DISTANCE = 1000;
const EMAIL_BASE_SPEED = 50;
const SOCIALS_BASE_SPEED = 45;
const EMAIL_DECEL_RATE = EMAIL_BASE_SPEED / 3;
const SOCIALS_DECEL_RATE = SOCIALS_BASE_SPEED / 3;
const EMAIL_ACCEL_RATE = 80;
const SOCIALS_ACCEL_RATE = 80;
const REPEAT_COUNT = 10;

type MarqueeConfig = {
  baseSpeed: number;
  decelRate: number;
  accelRate: number;
  loopDistance: number;
  hovered: boolean;
};

function useMarqueeOffset({
  baseSpeed,
  decelRate,
  accelRate,
  loopDistance,
  hovered
}: MarqueeConfig) {
  const hoverRef = useRef(hovered);
  const offsetRef = useRef(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    hoverRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    let frameId: number;
    let lastTimestamp: number | null = null;
    let speed = baseSpeed;

    const step = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const targetSpeed = hoverRef.current ? 0 : baseSpeed;
      const rate = hoverRef.current ? decelRate : accelRate;
      const diff = targetSpeed - speed;
      const maxChange = rate * delta;
      const clampedChange = Math.max(-maxChange, Math.min(maxChange, diff));
      speed = Math.max(0, speed + clampedChange);

      let nextOffset = offsetRef.current - speed * delta;
      if (nextOffset <= -loopDistance) {
        nextOffset += loopDistance;
      } else if (nextOffset > 0) {
        nextOffset -= loopDistance;
      }

      offsetRef.current = nextOffset;
      setOffset(nextOffset);

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [baseSpeed, decelRate, accelRate, loopDistance]);

  return offset;
}

export default function ContactAnimations() {
  const t = useTranslations("contact");
  const [emailHovered, setEmailHovered] = useState(false);
  const [socialsHovered, setSocialsHovered] = useState(false);
  const email = "contact@quentinpetiteville.me";
  const mailtoSubject = encodeURIComponent(t("mailtoSubject"));
  const mailtoBody = encodeURIComponent(t("mailtoBody"));
  const emailOffset = useMarqueeOffset({
    baseSpeed: EMAIL_BASE_SPEED,
    decelRate: EMAIL_DECEL_RATE,
    accelRate: EMAIL_ACCEL_RATE,
    loopDistance: EMAIL_LOOP_DISTANCE,
    hovered: emailHovered
  });

  const socialOffset = useMarqueeOffset({
    baseSpeed: SOCIALS_BASE_SPEED,
    decelRate: SOCIALS_DECEL_RATE,
    accelRate: SOCIALS_ACCEL_RATE,
    loopDistance: SOCIALS_LOOP_DISTANCE,
    hovered: socialsHovered
  });

  const highlightItems = [
    {
      icon: "mdi:lightning-bolt-outline",
      label: t("meta.response")
    },
    {
      icon: "mdi:earth",
      label: t("meta.remote")
    }
  ];

  return (
  <div className="flex items-start justify-center px-4 pt-16 pb-20 sm:px-6 sm:pt-28 sm:pb-24 lg:min-h-[25rem]">
      <motion.div
        variants={itemVariants.fromBottom}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl"
      >
        <div className="relative mb-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-900/40 p-8 text-left shadow-[0_25px_60px_-45px_rgba(15,118,110,0.6)] sm:p-12">
          <div className="absolute -right-6 -top-6 hidden rotate-12 rounded-full border border-teal-500/30 bg-teal-500/10 p-6 text-teal-300 sm:block">
            <Icon icon="mdi:cursor-default-click-outline" className="size-8 opacity-80" />
          </div>
          <div className="absolute -bottom-8 left-4 hidden -rotate-6 text-4xl text-teal-700/30 sm:block">
            <Icon icon="mdi:send-circle-outline" className="size-20" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-teal-300/80">
              <Icon icon="mdi:sparkles" className="size-4" />
              <span>{t("cta.title")}</span>
            </div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl whitespace-pre-line">
              {t("cta.subtitle")}
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-5 py-2 text-sm font-medium text-teal-200 transition hover:bg-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <Icon icon="mdi:email-send-outline" className="size-4" />
                {t("actions.email")}
              </Link>
              <a
                href={t("resumeHref")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <Icon icon="mdi:file-download-outline" className="size-4" />
                {t("actions.resume")}
              </a>
              <Link
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <Icon icon="mdi:github" className="size-4" />
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <Icon icon="mdi:linkedin" className="size-4" />
                LinkedIn
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              {highlightItems.map((item, idx) => (
                <span
                  key={`${item.icon}-${idx}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  <Icon icon={item.icon} className="size-3.5 text-teal-300" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-left text-sm font-medium uppercase tracking-widest text-slate-400">
            {t("title")}
          </h2>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 px-6 py-8">
            <motion.div
              style={{ transform: `translateX(${emailOffset}px)` }}
              className="inline-flex text-2xl font-bold tracking-[0.075em] text-white/90 will-change-transform sm:text-4xl md:text-6xl"
            >
              {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href={`mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="cursor-pointer whitespace-nowrap transition-colors hover:text-teal-400"
                    onMouseEnter={() => setEmailHovered(true)}
                    onMouseLeave={() => setEmailHovered(false)}
                  >
                    {email}
                  </Link>
                  <span className="mx-4 text-lg text-teal-500/50 opacity-80 sm:mx-6 md:mx-8">
                    <Icon icon="mdi:star-four-points-outline" className="size-4" />
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-20 pb-15">
          <h2 className="mb-6 text-left text-sm font-medium uppercase tracking-widest text-slate-400">
            {t("socialsTitle")}
          </h2>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 px-6 py-7">
            <motion.div
              style={{ transform: `translateX(${socialOffset}px)` }}
              className="inline-flex text-2xl font-bold tracking-[0.12em] text-white/90 will-change-transform sm:text-3xl md:text-5xl"
            >
              {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href="https://github.com/cwsquentin"
                    className="whitespace-nowrap transition-colors hover:text-teal-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setSocialsHovered(true)}
                    onMouseLeave={() => setSocialsHovered(false)}
                  >
                    GitHub
                  </Link>
                  <span className="mx-4 text-lg text-teal-500/50 opacity-80 sm:mx-5 md:mx-6">
                    <Icon icon="mdi:star-four-points-outline" className="size-4" />
                  </span>
                  <Link
                    href="https://www.linkedin.com/in/quentin-petiteville/"
                    className="whitespace-nowrap transition-colors hover:text-teal-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setSocialsHovered(true)}
                    onMouseLeave={() => setSocialsHovered(false)}
                  >
                    LinkedIn
                  </Link>
                  <span className="mx-4 text-lg text-teal-500/50 opacity-80 sm:mx-5 md:mx-6">
                    <Icon icon="mdi:star-four-points-outline" className="size-4" />
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

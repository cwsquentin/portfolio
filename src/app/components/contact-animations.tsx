"use client";

import * as motion from "motion/react-client";
import { Link } from "@/i18n/navigation";
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
  const [copied, setCopied] = useState(false);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex min-h-[25rem] items-center justify-center px-4 py-50 sm:px-6 sm:py-70">
      <motion.div
        variants={itemVariants.fromBottom}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl text-center"
      >
        <div className="mb-14">
          <h1 className="mb-3 text-2xl font-semibold sm:text-3xl">
            {t("cta.title")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-balance text-sm opacity-80 sm:text-base">
            {t("cta.subtitle")}
          </p>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={handleCopy}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-live="polite"
            >
              {copied ? t("actions.copied") : t("actions.copy")}
            </button>
            <Link
              href={`mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="rounded-md border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-300 transition hover:bg-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {t("actions.email")}
            </Link>
            <Link
              href={t("resumeHref")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {t("actions.resume")}
            </Link>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                GitHub
              </Link>
            </div>
          </div>

          <div className="mt-6 text-xs opacity-70 sm:text-sm">
            <span className="mr-3">{t("meta.timezone")}</span>
            <span className="mr-3">•</span>
            <span className="mr-3">{t("meta.response")}</span>
            <span className="mr-3">•</span>
            <span>{t("meta.remote")}</span>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="mb-6 text-xl font-medium sm:text-2xl">
            {t("title")}
          </h2>

          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              style={{ transform: `translateX(${emailOffset}px)` }}
              className="inline-flex text-2xl font-bold will-change-transform sm:text-4xl md:text-6xl"
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
                  <span className="mx-4 text-lg opacity-70 sm:mx-6 md:mx-8">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-6 text-xl font-medium sm:text-2xl">
            {t("socialsTitle")}
          </h2>

          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              style={{ transform: `translateX(${socialOffset}px)` }}
              className="inline-flex text-xl font-bold will-change-transform sm:text-3xl md:text-5xl"
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
                  <span className="mx-4 text-lg opacity-70 sm:mx-5 md:mx-6">•</span>
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
                  <span className="mx-4 text-lg opacity-70 sm:mx-5 md:mx-6">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { MonoLabel } from "./primitives/mono-label";

const EMAIL = "quentin.petiteville@student.junia.com";
const GITHUB_URL = "https://github.com/cwsquentin";
const LINKEDIN_URL = "https://www.linkedin.com/in/quentin-petiteville/";

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
  hovered,
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

export default function ContactMarquees() {
  const t = useTranslations("contact");
  const reducedMotion = useReducedMotion();
  const [emailHovered, setEmailHovered] = useState(false);
  const [socialsHovered, setSocialsHovered] = useState(false);

  const mailtoSubject = encodeURIComponent(t("mailtoSubject"));
  const mailtoBody = encodeURIComponent(t("mailtoBody"));
  const mailtoHref = `mailto:${EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const emailOffset = useMarqueeOffset({
    baseSpeed: EMAIL_BASE_SPEED,
    decelRate: EMAIL_DECEL_RATE,
    accelRate: EMAIL_ACCEL_RATE,
    loopDistance: EMAIL_LOOP_DISTANCE,
    hovered: emailHovered,
  });

  const socialOffset = useMarqueeOffset({
    baseSpeed: SOCIALS_BASE_SPEED,
    decelRate: SOCIALS_DECEL_RATE,
    accelRate: SOCIALS_ACCEL_RATE,
    loopDistance: SOCIALS_LOOP_DISTANCE,
    hovered: socialsHovered,
  });

  if (reducedMotion) {
    return (
      <section className="border-t-2 border-ink bg-paper px-6 py-20 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div>
            <MonoLabel className="text-marquee-accent">{t("title")}</MonoLabel>
            <div className="mt-6 border-2 border-ink bg-marquee-surface px-6 py-8 text-marquee-on">
              <Link
                href={mailtoHref}
                className="font-display text-[clamp(24px,5vw,60px)] font-extrabold leading-none tracking-[0.05em] transition-colors hover:text-marquee-accent focus:outline-none focus-visible:text-marquee-accent break-all"
              >
                {EMAIL}
              </Link>
            </div>
          </div>
          <div>
            <MonoLabel className="text-marquee-accent">
              {t("socialsTitle")}
            </MonoLabel>
            <ul className="mt-6 flex flex-col gap-3 border-2 border-ink bg-marquee-surface px-6 py-8 text-marquee-on sm:flex-row sm:gap-8">
              <li>
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-display text-2xl font-extrabold tracking-[0.1em] transition-colors hover:text-marquee-accent focus:outline-none focus-visible:text-marquee-accent sm:text-3xl"
                >
                  <Icon icon="mdi:github" className="size-7" aria-hidden />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-display text-2xl font-extrabold tracking-[0.1em] transition-colors hover:text-marquee-accent focus:outline-none focus-visible:text-marquee-accent sm:text-3xl"
                >
                  <Icon icon="mdi:linkedin" className="size-7" aria-hidden />
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t-2 border-ink bg-paper px-6 py-20 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <div>
          <MonoLabel className="text-marquee-accent">{t("title")}</MonoLabel>
          <div className="relative mt-6 overflow-hidden border-2 border-ink bg-marquee-surface px-6 py-8">
            <motion.div
              style={{ transform: `translateX(${emailOffset}px)` }}
              className="inline-flex font-display text-[clamp(24px,5vw,60px)] font-extrabold leading-none tracking-[0.05em] text-marquee-on will-change-transform"
            >
              {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href={mailtoHref}
                    className="cursor-pointer whitespace-nowrap transition-colors hover:text-marquee-accent focus:outline-none focus-visible:text-marquee-accent"
                    onMouseEnter={() => setEmailHovered(true)}
                    onMouseLeave={() => setEmailHovered(false)}
                    onFocus={() => setEmailHovered(true)}
                    onBlur={() => setEmailHovered(false)}
                  >
                    {EMAIL}
                  </Link>
                  <span
                    aria-hidden
                    className="mx-4 inline-flex items-center text-marquee-accent sm:mx-6 md:mx-8"
                  >
                    <Icon
                      icon="mdi:slash-forward"
                      className="size-8 sm:size-10 md:size-12"
                    />
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div>
          <MonoLabel className="text-marquee-accent">
            {t("socialsTitle")}
          </MonoLabel>
          <div className="relative mt-6 overflow-hidden border-2 border-ink bg-marquee-surface px-6 py-7">
            <motion.div
              style={{ transform: `translateX(${socialOffset}px)` }}
              className="inline-flex font-display text-[clamp(24px,4vw,48px)] font-extrabold leading-none tracking-[0.08em] text-marquee-on will-change-transform"
            >
              {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 whitespace-nowrap transition-colors hover:text-marquee-accent focus:outline-none focus-visible:text-marquee-accent"
                    onMouseEnter={() => setSocialsHovered(true)}
                    onMouseLeave={() => setSocialsHovered(false)}
                    onFocus={() => setSocialsHovered(true)}
                    onBlur={() => setSocialsHovered(false)}
                  >
                    <Icon
                      icon="mdi:github"
                      className="size-7 sm:size-9"
                      aria-hidden
                    />
                    @cwsquentin
                  </Link>
                  <span
                    aria-hidden
                    className="mx-4 inline-flex items-center text-marquee-accent sm:mx-5 md:mx-6"
                  >
                    <Icon icon="mdi:slash-forward" className="size-7 sm:size-8" />
                  </span>
                  <Link
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 whitespace-nowrap transition-colors hover:text-marquee-accent focus:outline-none focus-visible:text-marquee-accent"
                    onMouseEnter={() => setSocialsHovered(true)}
                    onMouseLeave={() => setSocialsHovered(false)}
                    onFocus={() => setSocialsHovered(true)}
                    onBlur={() => setSocialsHovered(false)}
                  >
                    <Icon
                      icon="mdi:linkedin"
                      className="size-7 sm:size-9"
                      aria-hidden
                    />
                    in/quentin-petiteville
                  </Link>
                  <span
                    aria-hidden
                    className="mx-4 inline-flex items-center text-marquee-accent sm:mx-5 md:mx-6"
                  >
                    <Icon icon="mdi:slash-forward" className="size-7 sm:size-8" />
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

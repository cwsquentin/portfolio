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

  return (
    <div className="min-h-220 flex items-center justify-center py-20">
      <motion.div 
        variants={itemVariants.fromBottom}
        initial="hidden"
        animate="visible"
        className="w-full px-6 text-center"
      >
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-8">
            {t("title")}
          </h2>

          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              style={{ transform: `translateX(${emailOffset}px)` }}
              className="inline-flex text-4xl md:text-6xl font-bold will-change-transform"
            >
              {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href="mailto:contact@quentinpetiteville.me"
                    className="hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap"
                    onMouseEnter={() => setEmailHovered(true)}
                    onMouseLeave={() => setEmailHovered(false)}
                  >
                    contact@quentinpetiteville.me
                  </Link>
                  <span className="mx-8 opacity-70">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-medium mb-8">
            {t("socialsTitle")}
          </h2>

          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              style={{ transform: `translateX(${socialOffset}px)` }}
              className="inline-flex text-3xl md:text-5xl font-bold will-change-transform"
            >
              {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href="https://github.com/cwsquentin"
                    className="hover:text-teal-400 transition-colors whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setSocialsHovered(true)}
                    onMouseLeave={() => setSocialsHovered(false)}
                  >
                    GitHub
                  </Link>
                  <span className="mx-6 opacity-70">•</span>
                  <Link
                    href="https://www.linkedin.com/in/quentin-petiteville/"
                    className="hover:text-teal-400 transition-colors whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setSocialsHovered(true)}
                    onMouseLeave={() => setSocialsHovered(false)}
                  >
                    LinkedIn
                  </Link>
                  <span className="mx-6 opacity-70">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
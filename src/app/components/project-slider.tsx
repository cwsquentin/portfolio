"use client";

import { Icon } from "@iconify/react";
import Image, { type StaticImageData } from "next/image";
import { useMemo, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

type ProjectGalleryProps = {
  images: Array<string | StaticImageData>;
  alt: string;
};

export function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const slides = useMemo(
    () =>
      images.filter(
        (image): image is string | StaticImageData => Boolean(image),
      ),
    [images],
  );

  const swiperRef = useRef<SwiperInstance | null>(null);
  const hasMultipleSlides = slides.length > 1;

  if (!slides.length) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <style>{`
        .project-gallery .swiper-pagination-bullet {
          background-color: var(--color-ink);
          opacity: 0.4;
          border-radius: 0;
          width: 12px;
          height: 4px;
        }
        .project-gallery .swiper-pagination-bullet-active {
          background-color: var(--color-ink);
          opacity: 1;
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={600}
        loop={hasMultipleSlides}
        className="project-gallery h-full"
        slidesPerView={1}
        allowTouchMove={hasMultipleSlides}
      >
        {slides.map((src, index) => {
          const placeholder = typeof src !== "string" ? "blur" : "empty";

          return (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={
                    slides.length > 1 ? `${alt} - ${index + 1}` : alt
                  }
                  fill
                  className="object-cover"
                  placeholder={placeholder}
                  priority={index === 0}
                  sizes="(min-width: 1280px) 960px, 100vw"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {hasMultipleSlides ? (
        <>
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 -left-9 -translate-y-1/2 rounded-none border-2 border-ink bg-paper p-2 text-ink shadow-block-sm transition hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:-left-12 lg:-left-16"
            aria-label="Previous image"
          >
            <Icon icon="mdi:chevron-left" className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 -right-9 -translate-y-1/2 rounded-none border-2 border-ink bg-paper p-2 text-ink shadow-block-sm transition hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:-right-12 lg:-right-16"
            aria-label="Next image"
          >
            <Icon icon="mdi:chevron-right" className="size-6" />
          </button>
        </>
      ) : null}
    </div>
  );
}

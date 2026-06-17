"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import type { CarouselImageItem } from "./Carousel";

type CarouselLightboxProps = {
  images: CarouselImageItem[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 400;
const PRELOAD_RANGE = 2;

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

function getIndicesAround(center: number, length: number, range: number) {
  const indices = new Set<number>();
  for (let offset = -range; offset <= range; offset += 1) {
    indices.add(getWrappedIndex(center + offset, length));
  }
  return Array.from(indices);
}

function preloadImage(src: string) {
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

export function CarouselLightbox({
  images,
  initialIndex,
  open,
  onClose,
}: CarouselLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const mountedIndices = useMemo(
    () => getIndicesAround(index, images.length, PRELOAD_RANGE),
    [index, images.length]
  );

  useEffect(() => {
    if (!open) return;
    mountedIndices.forEach((imageIndex) => {
      preloadImage(images[imageIndex].src);
    });
  }, [open, mountedIndices, images]);

  const goPrev = useCallback(() => {
    setIndex((current) => getWrappedIndex(current - 1, images.length));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((current) => getWrappedIndex(current + 1, images.length));
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, goPrev, goNext]);

  if (!open || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Προβολή εικόνας"
    >
      <button
        type="button"
        aria-label="Κλείσιμο"
        onClick={onClose}
        className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <div
        className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <motion.div
          className="relative h-[60vh] w-full touch-pan-y sm:h-[75vh]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (
              info.offset.x < -SWIPE_THRESHOLD ||
              info.velocity.x < -VELOCITY_THRESHOLD
            ) {
              goNext();
            } else if (
              info.offset.x > SWIPE_THRESHOLD ||
              info.velocity.x > VELOCITY_THRESHOLD
            ) {
              goPrev();
            }
          }}
        >
          {mountedIndices.map((imageIndex) => {
            const image = images[imageIndex];
            const isActive = imageIndex === index;

            return (
              <div
                key={image.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-200",
                  isActive
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                )}
                aria-hidden={!isActive}
              >
                {/* Pre-compressed WebP in /public — direct load avoids /_next/image latency */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={
                    isActive
                      ? (image.alt ??
                        `Εικόνα ${imageIndex + 1} από ${images.length}`)
                      : ""
                  }
                  className="h-full w-full object-contain"
                  decoding="async"
                  loading="eager"
                  draggable={false}
                />
              </div>
            );
          })}
        </motion.div>

        <div className="mt-4 flex w-full items-center justify-between gap-4">
          <button
            type="button"
            aria-label="Προηγούμενη εικόνα"
            onClick={goPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <p className="text-sm text-white/80">
            {index + 1} / {images.length}
          </p>

          <button
            type="button"
            aria-label="Επόμενη εικόνα"
            onClick={goNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

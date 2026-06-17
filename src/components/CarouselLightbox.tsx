"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import type { CarouselImageItem } from "./Carousel";

type CarouselLightboxProps = {
  images: CarouselImageItem[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 400;

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

  const goPrev = useCallback(() => {
    setIndex((current) => (current > 0 ? current - 1 : images.length - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((current) => (current < images.length - 1 ? current + 1 : 0));
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

  const currentImage = images[index];
  const prevImage = images[index > 0 ? index - 1 : images.length - 1];
  const nextImage = images[index < images.length - 1 ? index + 1 : 0];

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
        <div className="relative h-[60vh] w-full sm:h-[75vh]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0 touch-pan-y"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.2 }}
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
              <Image
                src={currentImage.src}
                alt={currentImage.alt ?? `Εικόνα ${index + 1} από ${images.length}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={85}
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="sr-only" aria-hidden>
            <Image src={prevImage.src} alt="" width={1} height={1} />
            <Image src={nextImage.src} alt="" width={1} height={1} />
          </div>
        </div>

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

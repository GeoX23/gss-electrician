"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CarouselLightbox } from "./CarouselLightbox";
import { cn } from "@/lib/utils";

export type CarouselImageItem = {
  src: string;
  alt?: string;
};

export type ImageCarouselProps = {
  images: Array<string | CarouselImageItem>;
  autoplay?: boolean;
  autoplayDelay?: number;
  aspectClassName?: string;
  imageSizes?: string;
  showLightbox?: boolean;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  altPrefix?: string;
};

const DEFAULT_SIZES = "(max-width: 768px) 100vw, 50vw";
const DEFAULT_ASPECT = "aspect-[4/3] sm:aspect-[16/10]";

function normalizeImages(
  images: Array<string | CarouselImageItem>,
  altPrefix?: string
): CarouselImageItem[] {
  return images.map((image, index) => {
    if (typeof image === "string") {
      return {
        src: image,
        alt: altPrefix ? `${altPrefix} - ${index + 1}` : `Εικόνα ${index + 1}`,
      };
    }
    return {
      src: image.src,
      alt: image.alt ?? (altPrefix ? `${altPrefix} - ${index + 1}` : `Εικόνα ${index + 1}`),
    };
  });
}

export function ImageCarousel({
  images,
  autoplay = true,
  autoplayDelay = 5000,
  aspectClassName = DEFAULT_ASPECT,
  imageSizes = DEFAULT_SIZES,
  showLightbox = true,
  showControls = true,
  showDots = true,
  className,
  altPrefix,
}: ImageCarouselProps) {
  const items = useMemo(
    () => normalizeImages(images, altPrefix),
    [images, altPrefix]
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const openLightbox = (index: number) => {
    if (!showLightbox) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (items.length === 0) {
    return null;
  }

  const shouldLoadImage = (index: number) =>
    Math.abs(index - activeIndex) <= 1 ||
    (activeIndex === 0 && index === items.length - 1) ||
    (activeIndex === items.length - 1 && index === 0);

  const plugins = autoplay
    ? [
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]
    : [];

  return (
    <>
      {showLightbox && (
        <CarouselLightbox
          images={items}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10",
          className
        )}
      >
        <Carousel
          setApi={setApi}
          opts={{ loop: items.length > 1, align: "start", dragFree: false }}
          plugins={plugins}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {items.map((item, index) => (
              <CarouselItem key={item.src} className="pl-0">
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  disabled={!showLightbox}
                  className={cn(
                    "relative block w-full overflow-hidden bg-gray-100 dark:bg-gray-800",
                    aspectClassName,
                    showLightbox ? "cursor-zoom-in" : "cursor-default"
                  )}
                  aria-label={`Προβολή ${item.alt}`}
                >
                  {shouldLoadImage(index) ? (
                    <Image
                      src={item.src}
                      alt={item.alt ?? ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes={imageSizes}
                      priority={index === 0}
                      quality={75}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
                  )}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {items.length > 1 && showControls && (
            <>
              <CarouselPrevious className="opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100" />
              <CarouselNext className="opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100" />
            </>
          )}
          {items.length > 1 && showDots && <CarouselDots />}
        </Carousel>
      </div>
    </>
  );
}

/** @deprecated Use ImageCarousel */
export const CarouselComp = ImageCarousel;

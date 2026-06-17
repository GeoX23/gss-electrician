"use client";

import { Container } from "@/components/Container";
import { ImageCarousel } from "@/components/Carousel";
import type { GalleryItem } from "@/lib/gallery-images";

type GalleryProps = {
  items: GalleryItem[];
};

export function Gallery({ items }: GalleryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {item.title}
            </h3>
            <ImageCarousel
              images={item.photos}
              autoplay={false}
              altPrefix={item.title}
              imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </article>
        ))}
      </div>
    </Container>
  );
}

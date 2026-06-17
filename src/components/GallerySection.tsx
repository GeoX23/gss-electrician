import { getGalleryItems } from "@/lib/gallery-images";
import { Gallery } from "./Gallery";

export function GallerySection() {
  const items = getGalleryItems();
  return <Gallery items={items} />;
}

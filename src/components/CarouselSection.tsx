import { getCarouselImages } from "@/lib/carousel-images";
import { ImageCarousel } from "./Carousel";

export function CarouselSection() {
  const images = getCarouselImages();
  return <ImageCarousel images={images} altPrefix="Έργο" />;
}

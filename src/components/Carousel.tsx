import { Carousel } from "flowbite-react";

export function CarouselComp() {
  return (
    <div className="h-[200px] sm:h-[400px] w-full relative block">
      <Carousel slideInterval={2000}>
        <img src="/img/carousel/car1.png" alt="..." />
        <img src="/img/carousel/car2.png" alt="..." />
        <img src="/img/carousel/car3.png" alt="..." />
      </Carousel>
    </div>
  );
}

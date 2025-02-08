import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

export function CarouselComp() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/img/carousel/car1.jpg",
    "/img/carousel/car2.jpg",
    "/img/carousel/car3.jpg",
    "/img/carousel/car4.jpg",
    "/img/carousel/car5.jpg",
    "/img/carousel/car6.jpg",
    "/img/carousel/car7.jpg",
    "/img/carousel/car8.jpg",
    "/img/carousel/car9.jpg",
    "/img/carousel/car10.jpg",
    "/img/carousel/car11.jpg",
    "/img/carousel/car12.jpg",
    "/img/carousel/car13.jpg",
    "/img/carousel/car14.jpg",
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setCurrentSlide(index);
    setShowModal(true);
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="w-full h-full">
          <Carousel
            slideInterval={2000}
            indicators={true}
            slide={false}
            defaultSlide={selectedImageIndex}
            onSlideChange={setCurrentSlide}
          >
            {images.map((src, index) => (
              <div key={index} className="relative w-full h-[600px]">
                <Image
                  src={src}
                  alt="..."
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={currentSlide === index}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </Modal>

      <div className="h-[200px] sm:h-[400px] w-full relative block">
        <Carousel
          slideInterval={2000}
          defaultSlide={currentSlide}
          onSlideChange={setCurrentSlide}
        >
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="cursor-pointer relative h-full"
            >
              <Image
                src={src}
                alt="..."
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

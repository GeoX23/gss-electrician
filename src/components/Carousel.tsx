import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

export function CarouselComp() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/img/carousel/car1_new.jpg",
    "/img/carousel/car2_new.jpg",
    "/img/carousel/car3.jpg",
    "/img/carousel/car1.jpg",
    "/img/carousel/car2.jpg",
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
            onSlideChange={setCurrentSlide}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="relative w-fit-content h-[600px] overflow-hidden"
              >
                <Image
                  src={src}
                  alt="..."
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={currentSlide === index}
                />
                {(index === 0 || index === 1) && (
                  <div className="absolute top-[40px] left-[-40px] rotate-[-45deg] bg-red-600 text-white py-1 px-10 shadow-md z-10">
                    <span className="text-sm font-semibold">
                      Νέα συνεργασία
                    </span>
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </Modal>

      <div className="h-[200px] sm:h-[400px] w-full relative block">
        <Carousel slideInterval={2000} onSlideChange={setCurrentSlide}>
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="cursor-pointer relative h-full overflow-hidden"
            >
              <Image
                src={src}
                alt="..."
                fill
                className={index === 2 ? "object-contain" : "object-cover"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {(index === 0 || index === 1) && (
                <div className="absolute top-[40px] left-[-40px] rotate-[-45deg] bg-red-600 text-white py-1 px-10 shadow-md z-10">
                  <span className="text-sm font-semibold">Νέα συνεργασία</span>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

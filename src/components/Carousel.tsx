"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "./Modal";

export function CarouselComp() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/carousel-images")
      .then((res) => res.json())
      .then((data: string[]) => {
        setImages(Array.isArray(data) ? data : []);
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setCurrentSlide(index);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="h-[200px] sm:h-[400px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <span className="text-gray-500 dark:text-gray-400">
          Φόρτωση καρουζέλ...
        </span>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

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
                {/* {(index === 0 || index === 1) && (
                  <div className="absolute top-[40px] left-[-40px] rotate-[-45deg] bg-red-600 text-white py-1 px-10 shadow-md z-10">
                    <span className="text-sm font-semibold">
                      Νέα συνεργασία
                    </span>
                  </div>
                )} */}
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
              {/* {(index === 0 || index === 1) && (
                <div className="absolute top-[40px] left-[-40px] rotate-[-45deg] bg-red-600 text-white py-1 px-10 shadow-md z-10">
                  <span className="text-sm font-semibold">Νέα συνεργασία</span>
                </div>
              )} */}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import { useState, useEffect } from "react";

interface PhotoProps {
  src: string;
  alt: string;
  title: string;
}

interface GalleryItemProps {
  title: string;
  photos: PhotoProps[];
}

import { motion, AnimatePresence, useDragControls } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const GalleryItem: React.FC<GalleryItemProps & { onClick: () => void }> = ({
  photos,
  title,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full h-64 relative overflow-hidden rounded-lg">
        <Image
          src={photos[0].src}
          alt={photos[0].alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [items] = useState<GalleryItemProps[]>([
    {
      title: "Ηλεκτρολογικοί Πίνακες",
      photos: [
        {
          src: "/img/cat1/gallery1-1.jpg",
          alt: "Gallery Image 1-1",
          title: "",
        },
        {
          src: "/img/cat1/gallery2-1.jpg",
          alt: "Gallery Image 1-2",
          title: "",
        },
        {
          src: "/img/cat1/gallery3-1.jpg",
          alt: "Gallery Image 1-3",
          title: "",
        },
        {
          src: "/img/cat1/gallery4-1.jpg",
          alt: "Gallery Image 1-4",
          title: "",
        },
        {
          src: "/img/cat1/gallery5-1.jpg",
          alt: "Gallery Image 1-5",
          title: "",
        },
        {
          src: "/img/cat1/gallery6-1.jpg",
          alt: "Gallery Image 1-6",
          title: "",
        },
        {
          src: "/img/cat1/gallery7-1.jpg",
          alt: "Gallery Image 1-7",
          title: "",
        },
        {
          src: "/img/cat1/gallery8-1.jpg",
          alt: "Gallery Image 1-8",
          title: "",
        },
        {
          src: "/img/cat1/gallery9-1.jpg",
          alt: "Gallery Image 1-9",
          title: "",
        },
        {
          src: "/img/cat1/gallery10-1.jpg",
          alt: "Gallery Image 1-10",
          title: "",
        },
      ],
    },
    {
      title: "Οικιακές Εγκαταστάσεις",
      photos: [
        {
          src: "/img/cat2/gallery1-2.jpg",
          alt: "Gallery Image 2-1",
          title: "",
        },
        {
          src: "/img/cat2/gallery2-2.jpg",
          alt: "Gallery Image 2-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery3-2.jpg",
          alt: "Gallery Image 3-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery4-2.jpg",
          alt: "Gallery Image 4-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery5-2.jpg",
          alt: "Gallery Image 5-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery6-2.jpg",
          alt: "Gallery Image 6-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery7-2.jpg",
          alt: "Gallery Image 7-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery8-2.jpg",
          alt: "Gallery Image 8-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery9-2.jpg",
          alt: "Gallery Image 9-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery10-2.jpg",
          alt: "Gallery Image 10-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery11-2.jpg",
          alt: "Gallery Image 11-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery12-2.jpg",
          alt: "Gallery Image 12-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery13-2.jpg",
          alt: "Gallery Image 13-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery14-2.jpg",
          alt: "Gallery Image 14-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery15-2.jpg",
          alt: "Gallery Image 15-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery16-2.jpg",
          alt: "Gallery Image 16-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery17-2.jpg",
          alt: "Gallery Image 17-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery10-2.jpg",
          alt: "Gallery Image 10-2",
          title: "",
        },
        {
          src: "/img/cat2/gallery10-2.jpg",
          alt: "Gallery Image 10-2",
          title: "",
        },
      ],
    },
    {
      title: "Βιομηχανικές Εγκαταστάσεις",
      photos: [
        {
          src: "/img/cat3/gallery1-3.jpg",
          alt: "Gallery Image 3-1",
          title: "",
        },
        {
          src: "/img/cat3/gallery2-3.jpg",
          alt: "Gallery Image 3-2",
          title: "",
        },
        {
          src: "/img/cat3/gallery3-3.jpg",
          alt: "Gallery Image 3-3",
          title: "",
        },
        {
          src: "/img/cat3/gallery4-3.jpg",
          alt: "Gallery Image 3-4",
          title: "",
        },
        {
          src: "/img/cat3/gallery5-3.jpg",
          alt: "Gallery Image 3-5",
          title: "",
        },
        {
          src: "/img/cat3/gallery6-3.jpg",
          alt: "Gallery Image 3-6",
          title: "",
        },
        {
          src: "/img/cat3/gallery7-3.jpg",
          alt: "Gallery Image 3-7",
          title: "",
        },
        {
          src: "/img/cat3/gallery8-3.jpg",
          alt: "Gallery Image 3-8",
          title: "",
        },
        {
          src: "/img/cat3/gallery9-3.jpg",
          alt: "Gallery Image 3-9",
          title: "",
        },
        {
          src: "/img/cat3/gallery10-3.jpg",
          alt: "Gallery Image 3-10",
          title: "",
        },
        {
          src: "/img/cat3/gallery11-3.jpg",
          alt: "Gallery Image 3-11",
          title: "",
        },
        {
          src: "/img/cat3/gallery12-3.jpg",
          alt: "Gallery Image 3-12",
          title: "",
        },
        {
          src: "/img/cat3/gallery13-3.jpg",
          alt: "Gallery Image 3-13",
          title: "",
        },
      ],
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<GalleryItemProps | null>(
    null
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  const openModal = (item: GalleryItemProps) => {
    setSelectedItem(item);
    setSelectedPhotoIndex(0);
  };
  const closeModal = () => setSelectedItem(null);

  const navigateGallery = (direction: "prev" | "next") => {
    if (!selectedItem) return;
    const newIndex =
      (selectedPhotoIndex +
        (direction === "next" ? 1 : -1) +
        selectedItem.photos.length) %
      selectedItem.photos.length;
    setSelectedPhotoIndex(newIndex);
  };

  const dragControls = useDragControls();
  const [dragStartX, setDragStartX] = useState(0);

  const handleDragStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setDragStartX(event.touches[0].clientX);
  };

  const handleDragEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const dragEndX = event.changedTouches[0].clientX;
    const dragDistance = dragEndX - dragStartX;

    if (Math.abs(dragDistance) > 50) {
      // Threshold for swipe detection
      if (dragDistance > 0) {
        navigateGallery("prev");
      } else {
        navigateGallery("next");
      }
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Container>
      {isClient && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <GalleryItem
                key={index}
                {...item}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
          <AnimatePresence>
            {selectedItem && (
              <Modal isOpen={true} onClose={closeModal}>
                <motion.div
                  className="relative"
                  drag="x"
                  dragControls={dragControls}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onTouchStart={handleDragStart}
                  onTouchEnd={handleDragEnd}
                >
                  <Image
                    src={selectedItem.photos[selectedPhotoIndex].src}
                    alt={selectedItem.photos[selectedPhotoIndex].alt}
                    width={800}
                    height={600}
                    objectFit="contain"
                    className="openModalImage"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                  />
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full md:block hidden"
                    onClick={() => navigateGallery("prev")}
                  >
                    ←
                  </button>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full md:block hidden"
                    onClick={() => navigateGallery("next")}
                  >
                    →
                  </button>
                </motion.div>
                <h3 className="mt-4 text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
                  {selectedItem.photos[selectedPhotoIndex].title}
                </h3>
                <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                  {selectedItem.title} - Photo {selectedPhotoIndex + 1} of{" "}
                  {selectedItem.photos.length}
                </p>
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
};

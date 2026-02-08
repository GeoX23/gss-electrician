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
      <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
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
  const [items, setItems] = useState<GalleryItemProps[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery-images")
      .then((res) => res.json())
      .then((data: GalleryItemProps[]) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setItems([]))
      .finally(() => setGalleryLoading(false));
  }, []);

  const [selectedItem, setSelectedItem] = useState<GalleryItemProps | null>(
    null,
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

  const itemsWithPhotos = items.filter((item) => item.photos.length > 0);

  return (
    <Container>
      {isClient && (
        <>
          {galleryLoading ? (
            <div className="flex justify-center py-12 text-gray-500 dark:text-gray-400">
              Φόρτωση γκαλερί...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {itemsWithPhotos.map((item, index) => (
                <GalleryItem
                  key={index}
                  {...item}
                  onClick={() => openModal(item)}
                />
              ))}
            </div>
          )}
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

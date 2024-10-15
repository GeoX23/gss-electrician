"use client";

import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import { useState } from "react";

interface GalleryItemProps {
  src: string;
  alt: string;
  title: string;
}

import { motion, AnimatePresence } from "framer-motion";

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
  src,
  alt,
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
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
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
    { src: "/img/gallery1.jpg", alt: "Gallery Image 1", title: "Project One" },
    { src: "/img/gallery2.jpg", alt: "Gallery Image 2", title: "Project Two" },
    {
      src: "/img/gallery3.jpg",
      alt: "Gallery Image 3",
      title: "Project Three",
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    const newIndex =
      (selectedIndex + (direction === "next" ? 1 : -1) + items.length) %
      items.length;
    setSelectedIndex(newIndex);
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <GalleryItem key={index} {...item} onClick={() => openModal(index)} />
        ))}
      </div>
      <AnimatePresence>
        {selectedIndex !== null && (
          <Modal isOpen={true} onClose={closeModal}>
            <div className="relative">
              <Image
                src={items[selectedIndex].src}
                alt={items[selectedIndex].alt}
                width={800}
                height={600}
                objectFit="contain"
              />
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full"
                onClick={() => navigateGallery("prev")}
              >
                ←
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full"
                onClick={() => navigateGallery("next")}
              >
                →
              </button>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
              {items[selectedIndex].title}
            </h3>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

// const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, title }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="w-full h-64 relative overflow-hidden rounded-lg">
//         <Image
//           src={src}
//           alt={alt}
//           layout="fill"
//           objectFit="cover"
//           className="transition-transform duration-300 hover:scale-110"
//         />
//       </div>
//       <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
//         {title}
//       </h3>
//     </div>
//   );
// };

// export const Gallery: React.FC = () => {
//   const [items] = useState<GalleryItemProps[]>([
//     { src: "/img/gallery1.jpg", alt: "Gallery Image 1", title: "Project One" },
//     { src: "/img/gallery2.jpg", alt: "Gallery Image 2", title: "Project Two" },
//     {
//       src: "/img/gallery3.jpg",
//       alt: "Gallery Image 3",
//       title: "Project Three",
//     },
//   ]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {items.map((item, index) => (
//         <GalleryItem key={index} {...item} />
//       ))}
//     </div>
//   );
// };

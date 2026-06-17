import path from "path";
import {
  getPublicImgPath,
  listImageFiles,
  toPublicImagePath,
} from "./images";

export const GALLERY_CATEGORIES = [
  { folder: "cat1", title: "Ηλεκτρολογικοί Πίνακες" },
  { folder: "cat2", title: "Οικιακές Εγκαταστάσεις" },
  { folder: "cat3", title: "Βιομηχανικές Εγκαταστάσεις" },
  { folder: "cat4", title: "Πλωτό Εστιατόριο" },
  { folder: "cat5", title: "Παροχές Έργα ΔΕΔΗΕ" },
  { folder: "cat6", title: "Καταστήματα" },
] as const;

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type GalleryItem = {
  title: string;
  photos: GalleryPhoto[];
};

export function getGalleryItems(): GalleryItem[] {
  return GALLERY_CATEGORIES.map(({ folder, title }) => {
    const dirPath = getPublicImgPath(folder);
    const photos = listImageFiles(dirPath).map((filename) => {
      const src = toPublicImagePath(folder, filename);
      const baseName = path.basename(filename, path.extname(filename));
      return {
        src,
        alt: `${title} - ${baseName}`,
      };
    });
    return { title, photos };
  }).filter((item) => item.photos.length > 0);
}

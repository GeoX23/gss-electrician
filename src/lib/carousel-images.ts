import {
  IMAGE_FOLDERS,
  getPublicImgPath,
  listImageFiles,
  toPublicImagePath,
} from "./images";

export function getCarouselImages(): string[] {
  const dirPath = getPublicImgPath(IMAGE_FOLDERS.carousel);
  return listImageFiles(dirPath).map((filename) =>
    toPublicImagePath(IMAGE_FOLDERS.carousel, filename)
  );
}

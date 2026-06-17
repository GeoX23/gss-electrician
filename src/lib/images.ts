import fs from "fs";
import path from "path";

export const IMG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export const IMAGE_FOLDERS = {
  carousel: "carousel",
  cat1: "cat1",
  cat2: "cat2",
  cat3: "cat3",
  cat4: "cat4",
  cat5: "cat5",
  cat6: "cat6",
} as const;

export function getPublicImgPath(...segments: string[]): string {
  return path.join(process.cwd(), "public", "img", ...segments);
}

export function listImageFiles(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs
      .readdirSync(dirPath)
      .filter((file) =>
        IMG_EXTENSIONS.includes(path.extname(file).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export function toPublicImagePath(folder: string, filename: string): string {
  return `/img/${folder}/${filename}`;
}

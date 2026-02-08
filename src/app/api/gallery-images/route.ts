import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const CATEGORIES = [
  { folder: "cat1", title: "Ηλεκτρολογικοί Πίνακες" },
  { folder: "cat2", title: "Οικιακές Εγκαταστάσεις" },
  { folder: "cat3", title: "Βιομηχανικές Εγκαταστάσεις" },
  { folder: "cat4", title: "Πλωτό Εστιατόριο" },
] as const;

function getImagesInFolder(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    return files
      .filter((file) =>
        IMG_EXTENSIONS.includes(path.extname(file).toLowerCase()),
      )
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const basePath = path.join(process.cwd(), "public", "img");
    const items = CATEGORIES.map(({ folder, title }) => {
      const dirPath = path.join(basePath, folder);
      const files = getImagesInFolder(dirPath);
      const photos = files.map((filename) => {
        const src = `/img/${folder}/${filename}`;
        const baseName = path.basename(filename, path.extname(filename));
        const alt = `${title} - ${baseName}`;
        return { src, alt, title: "" };
      });
      return { title, photos };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Gallery images API error:", error);
    return NextResponse.json(
      { error: "Failed to list gallery images" },
      { status: 500 },
    );
  }
}

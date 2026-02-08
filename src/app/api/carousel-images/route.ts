import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const CAROUSEL_FOLDER = "carousel";

function getImagesInFolder(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    return files
      .filter((file) =>
        IMG_EXTENSIONS.includes(path.extname(file).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "public", "img", CAROUSEL_FOLDER);
    const files = getImagesInFolder(dirPath);
    const images = files.map(
      (filename) => `/img/${CAROUSEL_FOLDER}/${filename}`
    );
    return NextResponse.json(images);
  } catch (error) {
    console.error("Carousel images API error:", error);
    return NextResponse.json(
      { error: "Failed to list carousel images" },
      { status: 500 }
    );
  }
}

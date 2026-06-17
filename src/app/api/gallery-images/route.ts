import { NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/gallery-images";

export async function GET() {
  try {
    return NextResponse.json(getGalleryItems());
  } catch (error) {
    console.error("Gallery images API error:", error);
    return NextResponse.json(
      { error: "Failed to list gallery images" },
      { status: 500 }
    );
  }
}

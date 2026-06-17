import { NextResponse } from "next/server";
import { getCarouselImages } from "@/lib/carousel-images";

export async function GET() {
  try {
    return NextResponse.json(getCarouselImages());
  } catch (error) {
    console.error("Carousel images API error:", error);
    return NextResponse.json(
      { error: "Failed to list carousel images" },
      { status: 500 }
    );
  }
}

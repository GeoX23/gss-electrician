import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  try {
    const response = await fetch(
      `https://www.douleutaras.gr/api/public/v3/seller/giannisstergiopoulos/reviews/?include=buyer%2Cresponse%2Cclient&page%5Bnumber%5D=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

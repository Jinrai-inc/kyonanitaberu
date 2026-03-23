import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!name || !lat || !lng) {
    return NextResponse.json(
      { error: "name, lat, and lng are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ url: null });
  }

  try {
    const params = new URLSearchParams({
      key: apiKey,
      keyword: name,
      lat,
      lng,
      range: "3", // ~1km
      count: "3",
      format: "json",
    });

    const response = await fetch(
      `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${params}`
    );

    if (!response.ok) {
      return NextResponse.json({ url: null });
    }

    const data = await response.json();
    const shops = data.results?.shop;

    if (!shops || shops.length === 0) {
      return NextResponse.json({ url: null });
    }

    // Find best match by comparing names
    const match = shops.find((s: { name: string }) =>
      s.name.includes(name) || name.includes(s.name)
    ) || shops[0];

    return NextResponse.json({ url: match.urls?.pc || null });
  } catch {
    return NextResponse.json({ url: null });
  }
}

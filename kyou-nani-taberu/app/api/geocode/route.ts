import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const locale = searchParams.get("locale") || "ja";

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=${locale}&key=${apiKey}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Geocoding failed" }, { status: response.status });
    }

    const data = await response.json();
    const results = data.results || [];

    // Try to find a neighborhood/locality level result for a concise address
    const locality = results.find((r: { types: string[] }) =>
      r.types.includes("sublocality") || r.types.includes("locality") || r.types.includes("neighborhood")
    );
    const address = locality?.formatted_address || results[0]?.formatted_address || "";

    return NextResponse.json({ address });
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

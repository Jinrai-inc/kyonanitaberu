import { NextRequest, NextResponse } from "next/server";
import { TYPE_TO_GENRE } from "@/lib/genreMap";

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.priceLevel",
  "places.currentOpeningHours",
  "places.nationalPhoneNumber",
  "places.googleMapsUri",
  "places.primaryType",
  "places.primaryTypeDisplayName",
].join(",");

function mapPriceLevel(level: string | undefined): number {
  switch (level) {
    case "PRICE_LEVEL_FREE": return 0;
    case "PRICE_LEVEL_INEXPENSIVE": return 1;
    case "PRICE_LEVEL_MODERATE": return 2;
    case "PRICE_LEVEL_EXPENSIVE": return 3;
    case "PRICE_LEVEL_VERY_EXPENSIVE": return 4;
    default: return 0;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "1000";
  const keyword = searchParams.get("keyword");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const body: Record<string, unknown> = {
      includedTypes: ["restaurant"],
      maxResultCount: 20,
      locationRestriction: {
        circle: {
          center: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          },
          radius: parseFloat(radius),
        },
      },
    };

    if (keyword) {
      body.includedTypes = [keyword];
    }

    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch places", detail: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const places = (data.places || []).map((p: Record<string, unknown>) => {
      const loc = p.location as { latitude: number; longitude: number } | undefined;
      const displayName = p.displayName as { text: string } | undefined;
      const primaryType = (p.primaryType as string) || "restaurant";
      const openingHours = p.currentOpeningHours as {
        openNow?: boolean;
        weekdayDescriptions?: string[];
      } | undefined;

      return {
        place_id: p.id,
        name: displayName?.text || "",
        address: p.formattedAddress || "",
        lat: loc?.latitude || 0,
        lng: loc?.longitude || 0,
        rating: (p.rating as number) || 0,
        user_ratings_total: (p.userRatingCount as number) || 0,
        price_level: mapPriceLevel(p.priceLevel as string | undefined),
        is_open_now: openingHours?.openNow ?? false,
        opening_hours_text: openingHours?.weekdayDescriptions?.join(" / ") || "",
        close_day: "なし",
        phone: (p.nationalPhoneNumber as string) || null,
        google_maps_url: (p.googleMapsUri as string) || "",
        primary_type: primaryType,
        genre: TYPE_TO_GENRE[primaryType] || "レストラン",
      };
    });

    return NextResponse.json({ places });
  } catch (error) {
    console.error("Places API proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

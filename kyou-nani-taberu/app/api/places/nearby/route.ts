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

// Search in batches of types to get more results beyond the 20-per-request limit
const TYPE_GROUPS = [
  ["restaurant"],
  ["ramen_restaurant", "sushi_restaurant", "japanese_restaurant", "izakaya"],
  ["italian_restaurant", "french_restaurant", "chinese_restaurant", "korean_restaurant"],
  ["thai_restaurant", "indian_restaurant", "mexican_restaurant"],
  ["cafe", "coffee_shop", "bar"],
  ["hamburger_restaurant", "barbecue_restaurant", "seafood_restaurant"],
  ["bakery", "fast_food_restaurant", "pizza_restaurant", "steak_house", "noodle_restaurant"],
];

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

// Map locale to Google API languageCode
function toLanguageCode(locale: string): string {
  switch (locale) {
    case "zh-CN": return "zh-CN";
    case "zh-TW": return "zh-TW";
    default: return locale;
  }
}

interface PlaceResult {
  place_id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number | null;
  user_ratings_total: number | null;
  price_level: number;
  is_open_now: boolean | null;
  opening_hours_text: string;
  close_day: string;
  phone: string | null;
  google_maps_url: string | null;
  primary_type: string;
  genre: string;
  data_source: "google";
}

async function fetchBatch(
  apiKey: string,
  types: string[],
  lat: number,
  lng: number,
  radius: number,
  languageCode: string
): Promise<PlaceResult[]> {
  const body = {
    includedTypes: types,
    maxResultCount: 20,
    languageCode,
    locationRestriction: {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius,
      },
    },
  };

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
    console.error("Google Places API error for types", types, await response.text());
    return [];
  }

  const data = await response.json();
  return (data.places || []).map((p: Record<string, unknown>) => {
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
      rating: (p.rating as number) || null,
      user_ratings_total: (p.userRatingCount as number) || null,
      price_level: mapPriceLevel(p.priceLevel as string | undefined),
      is_open_now: openingHours?.openNow ?? null,
      opening_hours_text: openingHours?.weekdayDescriptions?.join(" / ") || "",
      close_day: "なし",
      phone: (p.nationalPhoneNumber as string) || null,
      google_maps_url: (p.googleMapsUri as string) || null,
      primary_type: primaryType,
      genre: TYPE_TO_GENRE[primaryType] || "restaurant",
      data_source: "google" as const,
    };
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "1000";
  const keyword = searchParams.get("keyword");
  const locale = searchParams.get("locale") || "ja";

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    const parsedRadius = parseFloat(radius);
    const languageCode = toLanguageCode(locale);

    let allPlaces: PlaceResult[];

    if (keyword) {
      // Single type search
      allPlaces = await fetchBatch(apiKey, [keyword], parsedLat, parsedLng, parsedRadius, languageCode);
    } else {
      // Parallel multi-type search for comprehensive results
      const results = await Promise.all(
        TYPE_GROUPS.map((types) =>
          fetchBatch(apiKey, types, parsedLat, parsedLng, parsedRadius, languageCode)
        )
      );
      allPlaces = results.flat();
    }

    // Deduplicate by place_id
    const seen = new Set<string>();
    const places = allPlaces.filter((p) => {
      if (seen.has(p.place_id)) return false;
      seen.add(p.place_id);
      return true;
    });

    return NextResponse.json({ places });
  } catch (error) {
    console.error("Places API proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

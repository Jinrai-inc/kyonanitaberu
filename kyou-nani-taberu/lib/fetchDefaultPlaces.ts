import type { Place } from "@/types/place";
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
].join(",");

const TYPE_GROUPS = [
  ["restaurant", "japanese_restaurant"],
  ["ramen_restaurant", "sushi_restaurant", "noodle_restaurant", "seafood_restaurant"],
  ["cafe", "coffee_shop", "izakaya", "bar", "bakery"],
  ["italian_restaurant", "chinese_restaurant", "korean_restaurant", "indian_restaurant", "french_restaurant"],
  ["fast_food_restaurant", "pizza_restaurant", "hamburger_restaurant", "barbecue_restaurant", "thai_restaurant", "mexican_restaurant", "steak_house"],
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

function toLanguageCode(locale: string): string {
  switch (locale) {
    case "zh-CN": return "zh-CN";
    case "zh-TW": return "zh-TW";
    default: return locale;
  }
}

async function fetchBatch(
  apiKey: string,
  types: string[],
  lat: number,
  lng: number,
  radius: number,
  languageCode: string
): Promise<Place[]> {
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

  if (!response.ok) return [];

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
      place_id: p.id as string,
      name: displayName?.text || "",
      address: (p.formattedAddress as string) || "",
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

export async function fetchDefaultPlaces(lat: number, lng: number, locale: string): Promise<Place[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  try {
    const languageCode = toLanguageCode(locale);
    const radius = 1000;

    const results = await Promise.all(
      TYPE_GROUPS.map((types) =>
        fetchBatch(apiKey, types, lat, lng, radius, languageCode)
      )
    );

    const allPlaces = results.flat();
    const seen = new Set<string>();
    return allPlaces.filter((p) => {
      if (seen.has(p.place_id)) return false;
      seen.add(p.place_id);
      return true;
    });
  } catch (error) {
    console.error("Failed to fetch default places:", error);
    return [];
  }
}

import type { Place } from "@/types/place";

export async function fetchNearbyPlaces(params: {
  lat: number;
  lng: number;
  radius: number;
  keyword?: string;
}): Promise<Place[]> {
  const query = new URLSearchParams({
    lat: String(params.lat),
    lng: String(params.lng),
    radius: String(params.radius),
  });
  if (params.keyword) {
    query.set("keyword", params.keyword);
  }

  const res = await fetch(`/api/places/nearby?${query.toString()}`);
  if (!res.ok) {
    throw new Error(`Places API error: ${res.status}`);
  }
  const data = await res.json();
  return data.places ?? [];
}

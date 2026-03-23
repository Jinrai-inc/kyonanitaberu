export interface Place {
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
  genre: string; // genre key (e.g. "ramen", "sushi")
  data_source: "google" | "osm" | "promoted";
  access?: string;
  walkMin?: number;
  bikeMin?: number;
  carMin?: number;
  // Affiliate
  hotpepper_url?: string | null;
  // Phase 1.5
  rating_loaded?: boolean;
  // Phase 2
  is_promoted?: boolean;
  promo_badge?: string;
  promo_photo_url?: string;
}

export type TransportMode = "walk" | "bike" | "car";
export type SortBy = "rating" | "time";

export interface SearchParams {
  lat: number;
  lng: number;
  mode: TransportMode;
  maxTime: number;
  genres: string[];
  onlyOpen: boolean;
  sortBy: SortBy;
}

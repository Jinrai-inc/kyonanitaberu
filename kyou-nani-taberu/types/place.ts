export interface Place {
  place_id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  user_ratings_total: number;
  price_level: number;
  is_open_now: boolean;
  opening_hours_text: string;
  close_day: string;
  phone: string | null;
  google_maps_url: string;
  primary_type: string;
  genre: string;
  access?: string;
  walkMin?: number;
  bikeMin?: number;
  carMin?: number;
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

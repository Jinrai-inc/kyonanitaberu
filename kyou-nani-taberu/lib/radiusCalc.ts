import type { TransportMode } from "@/types/place";

// Realistic speeds in meters per minute
// walk: ~4.0 km/h, bike: ~12 km/h, car: ~20 km/h (urban with signals/traffic)
const SPEED: Record<TransportMode, number> = {
  walk: 67,
  bike: 200,
  car: 333,
};

// Road detour factor: actual road distance ≈ 1.3× straight-line distance in urban areas
export const DETOUR_FACTOR = 1.3;

export function calcRadius(mode: TransportMode, minutes: number): number {
  return SPEED[mode] * minutes;
}

// Estimate travel time in minutes from straight-line distance (meters)
export function estimateTravelMin(mode: TransportMode, straightLineMeters: number): number {
  const roadDistance = straightLineMeters * DETOUR_FACTOR;
  return Math.max(1, Math.round(roadDistance / SPEED[mode]));
}

export function getTimeKey(mode: TransportMode): "walkMin" | "bikeMin" | "carMin" {
  switch (mode) {
    case "walk": return "walkMin";
    case "bike": return "bikeMin";
    case "car": return "carMin";
  }
}

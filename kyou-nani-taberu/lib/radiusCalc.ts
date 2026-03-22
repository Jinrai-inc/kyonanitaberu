import type { TransportMode } from "@/types/place";

const SPEED: Record<TransportMode, number> = {
  walk: 67,
  bike: 250,
  car: 500,
};

export function calcRadius(mode: TransportMode, minutes: number): number {
  return SPEED[mode] * minutes;
}

export function getTimeKey(mode: TransportMode): "walkMin" | "bikeMin" | "carMin" {
  switch (mode) {
    case "walk": return "walkMin";
    case "bike": return "bikeMin";
    case "car": return "carMin";
  }
}

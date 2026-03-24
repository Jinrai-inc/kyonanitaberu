const DEFAULT_LOCATIONS: Record<string, {
  lat: number;
  lng: number;
  name: string;
}> = {
  ja: { lat: 35.6812, lng: 139.7671, name: "東京駅周辺のおすすめ飲食店" },
  en: { lat: 35.6812, lng: 139.7671, name: "Popular restaurants near Tokyo Station" },
  "zh-CN": { lat: 35.6812, lng: 139.7671, name: "东京站周边人气餐厅" },
  "zh-TW": { lat: 35.6812, lng: 139.7671, name: "東京站周邊人氣餐廳" },
  ko: { lat: 35.6812, lng: 139.7671, name: "도쿄역 주변 인기 맛집" },
};

export function getDefaultLocation(locale: string) {
  return DEFAULT_LOCATIONS[locale] || DEFAULT_LOCATIONS.ja;
}

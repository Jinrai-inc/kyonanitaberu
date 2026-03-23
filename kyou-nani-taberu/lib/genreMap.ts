export const TYPE_TO_GENRE: Record<string, string> = {
  "ramen_restaurant": "ramen",
  "sushi_restaurant": "sushi",
  "japanese_restaurant": "japanese",
  "italian_restaurant": "italian",
  "chinese_restaurant": "chinese",
  "korean_restaurant": "korean",
  "thai_restaurant": "thai",
  "indian_restaurant": "curry",
  "french_restaurant": "french",
  "mexican_restaurant": "mexican",
  "hamburger_restaurant": "western",
  "barbecue_restaurant": "yakiniku",
  "seafood_restaurant": "japanese",
  "cafe": "cafe",
  "coffee_shop": "cafe",
  "bar": "bar",
  "izakaya": "izakaya",
  "restaurant": "restaurant",
  // Additional types
  "bakery": "bakery",
  "fast_food_restaurant": "fastfood",
  "pizza_restaurant": "pizza",
  "steak_house": "western",
  "noodle_restaurant": "ramen",
};

// Genre keys used for filtering (translation key based)
export const ALL_GENRE_KEYS = [
  "japanese", "izakaya", "ramen", "cafe", "italian",
  "yakiniku", "chinese", "bar", "sushi", "curry",
  "western", "korean", "french", "thai", "mexican",
  "okonomiyaki", "creative", "bakery", "fastfood", "pizza",
] as const;

export type GenreKey = (typeof ALL_GENRE_KEYS)[number] | "restaurant";

// Genres included in izakaya (drinking) mode
export const IZAKAYA_GENRES: string[] = [
  "izakaya", "yakiniku", "bar", "japanese", "korean",
];

// Multi-language genre name resolution
const GENRE_NAMES: Record<string, Record<string, string>> = {
  "ramen_restaurant": { ja: "ラーメン", en: "Ramen", "zh-CN": "拉面", "zh-TW": "拉麵", ko: "라멘" },
  "sushi_restaurant": { ja: "寿司", en: "Sushi", "zh-CN": "寿司", "zh-TW": "壽司", ko: "스시" },
  "japanese_restaurant": { ja: "和食", en: "Japanese", "zh-CN": "日料", "zh-TW": "日本料理", ko: "일식" },
  "italian_restaurant": { ja: "イタリアン", en: "Italian", "zh-CN": "意大利菜", "zh-TW": "義大利料理", ko: "이탈리안" },
  "chinese_restaurant": { ja: "中華", en: "Chinese", "zh-CN": "中餐", "zh-TW": "中餐", ko: "중식" },
  "korean_restaurant": { ja: "韓国料理", en: "Korean", "zh-CN": "韩餐", "zh-TW": "韓國料理", ko: "한식" },
  "thai_restaurant": { ja: "タイ料理", en: "Thai", "zh-CN": "泰餐", "zh-TW": "泰國料理", ko: "태국 요리" },
  "indian_restaurant": { ja: "カレー", en: "Curry", "zh-CN": "咖喱", "zh-TW": "咖哩", ko: "카레" },
  "french_restaurant": { ja: "フレンチ", en: "French", "zh-CN": "法餐", "zh-TW": "法國料理", ko: "프렌치" },
  "mexican_restaurant": { ja: "メキシカン", en: "Mexican", "zh-CN": "墨西哥菜", "zh-TW": "墨西哥料理", ko: "멕시칸" },
  "hamburger_restaurant": { ja: "洋食", en: "Western", "zh-CN": "西餐", "zh-TW": "西餐", ko: "양식" },
  "barbecue_restaurant": { ja: "焼肉", en: "Yakiniku", "zh-CN": "烤肉", "zh-TW": "燒肉", ko: "야키니쿠" },
  "seafood_restaurant": { ja: "和食", en: "Japanese", "zh-CN": "日料", "zh-TW": "日本料理", ko: "일식" },
  "cafe": { ja: "カフェ", en: "Café", "zh-CN": "咖啡厅", "zh-TW": "咖啡廳", ko: "카페" },
  "coffee_shop": { ja: "カフェ", en: "Café", "zh-CN": "咖啡厅", "zh-TW": "咖啡廳", ko: "카페" },
  "bar": { ja: "バー", en: "Bar", "zh-CN": "酒吧", "zh-TW": "酒吧", ko: "바" },
  "izakaya": { ja: "居酒屋", en: "Izakaya", "zh-CN": "居酒屋", "zh-TW": "居酒屋", ko: "이자카야" },
  "restaurant": { ja: "レストラン", en: "Restaurant", "zh-CN": "餐厅", "zh-TW": "餐廳", ko: "레스토랑" },
  "bakery": { ja: "パン・ベーカリー", en: "Bakery", "zh-CN": "面包店", "zh-TW": "麵包店", ko: "베이커리" },
  "fast_food_restaurant": { ja: "ファストフード", en: "Fast Food", "zh-CN": "快餐", "zh-TW": "速食", ko: "패스트푸드" },
  "pizza_restaurant": { ja: "ピザ", en: "Pizza", "zh-CN": "披萨", "zh-TW": "披薩", ko: "피자" },
  "steak_house": { ja: "洋食", en: "Western", "zh-CN": "西餐", "zh-TW": "西餐", ko: "양식" },
  "noodle_restaurant": { ja: "ラーメン", en: "Ramen", "zh-CN": "拉面", "zh-TW": "拉麵", ko: "라멘" },
};

export function getGenreName(primaryType: string, locale: string): string {
  return GENRE_NAMES[primaryType]?.[locale] || GENRE_NAMES[primaryType]?.["en"] || primaryType;
}

export const PRICE_LABEL = ["", "¥", "¥¥", "¥¥¥", "¥¥¥¥"];

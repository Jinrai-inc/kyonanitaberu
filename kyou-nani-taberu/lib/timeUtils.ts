interface TimeRange {
  oH: number;
  oM: number;
  cH: number;
  cM: number;
}

export function parseTime(s: string): TimeRange | null {
  const m = s.match(/(\d{1,2}):(\d{2})\s*[〜~\-]\s*(翌)?(\d{1,2}):(\d{2})/);
  if (!m) return null;
  let cH = parseInt(m[4]);
  if (m[3]) cH += 24;
  return {
    oH: parseInt(m[1]),
    oM: parseInt(m[2]),
    cH,
    cM: parseInt(m[5]),
  };
}

export function isOpenNow(str: string): boolean {
  const now = new Date();
  const nm = now.getHours() * 60 + now.getMinutes();
  for (const p of str.split("/").map((s) => s.trim())) {
    const t = parseTime(p);
    if (!t) continue;
    const o = t.oH * 60 + t.oM;
    const c = t.cH * 60 + t.cM;
    if (c > 1440) {
      if (nm >= o || nm < c - 1440) return true;
    } else {
      if (nm >= o && nm < c) return true;
    }
  }
  return false;
}

const WEEKDAYS: Record<string, string[]> = {
  ja: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "zh-CN": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  "zh-TW": ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  ko: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
};

export function isClosedToday(s: string | undefined, locale = "ja"): boolean {
  if (!s || s === "なし" || s === "none" || s === "없음" || s === "无" || s === "無") return false;
  const days = WEEKDAYS[locale] || WEEKDAYS["ja"];
  const dayIdx = new Date().getDay();
  // Check all locales in case data is in Japanese but user is in another locale
  for (const lang of Object.keys(WEEKDAYS)) {
    if (s.includes(WEEKDAYS[lang][dayIdx])) return true;
  }
  return false;
}

export function getCloseDayDisplay(closeDay: string, locale: string): string {
  if (!closeDay || closeDay === "なし") {
    const noneMap: Record<string, string> = {
      ja: "なし",
      en: "None",
      "zh-CN": "无",
      "zh-TW": "無",
      ko: "없음",
    };
    return noneMap[locale] || "None";
  }
  // Close day data is in Japanese from mock/API; try to translate the day name
  const jaDays = WEEKDAYS["ja"];
  const targetDays = WEEKDAYS[locale] || jaDays;
  let result = closeDay;
  for (let i = 0; i < jaDays.length; i++) {
    result = result.replace(jaDays[i], targetDays[i]);
  }
  return result;
}

export function getTime(): string {
  const n = new Date();
  return `${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`;
}

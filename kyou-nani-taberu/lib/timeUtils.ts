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

export function isClosedToday(s: string | undefined): boolean {
  if (!s || s === "なし") return false;
  const days = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"];
  return s.includes(days[new Date().getDay()]);
}

export function getTime(): string {
  const n = new Date();
  return `${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`;
}

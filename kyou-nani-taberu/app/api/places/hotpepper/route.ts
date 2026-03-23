import { NextRequest, NextResponse } from "next/server";

// Normalize shop name for comparison: remove whitespace, brackets, common suffixes
function normalize(s: string): string {
  return s
    .replace(/[\s\u3000]+/g, "") // full/half-width spaces
    .replace(/[（()）【】「」『』]/g, "") // brackets
    .replace(/\u3000/g, "")
    .toLowerCase();
}

// Score how well two names match (0 = no match, higher = better)
function nameScore(google: string, hotpepper: string): number {
  const g = normalize(google);
  const h = normalize(hotpepper);

  // Exact match
  if (g === h) return 100;

  // One contains the other fully
  if (h.includes(g) || g.includes(h)) {
    const shorter = Math.min(g.length, h.length);
    const longer = Math.max(g.length, h.length);
    return 50 + Math.round((shorter / longer) * 40);
  }

  // Check overlap: split Google name and see how many chars match
  // This handles cases like "焼肉きんぐ 横浜港南店" vs "焼肉きんぐ横浜港南店"
  const overlap = longestCommonSubstring(g, h);
  if (overlap >= 3) {
    return Math.round((overlap / Math.max(g.length, h.length)) * 60);
  }

  return 0;
}

function longestCommonSubstring(a: string, b: string): number {
  let max = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let k = 0;
      while (i + k < a.length && j + k < b.length && a[i + k] === b[j + k]) k++;
      if (k > max) max = k;
    }
  }
  return max;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!name || !lat || !lng) {
    return NextResponse.json(
      { error: "name, lat, and lng are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ url: null });
  }

  try {
    const params = new URLSearchParams({
      key: apiKey,
      keyword: name,
      lat,
      lng,
      range: "3", // ~1km
      count: "5",
      format: "json",
    });

    const response = await fetch(
      `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${params}`
    );

    if (!response.ok) {
      return NextResponse.json({ url: null });
    }

    const data = await response.json();
    const shops = data.results?.shop;

    if (!shops || shops.length === 0) {
      return NextResponse.json({ url: null });
    }

    // Score each result and pick the best match
    let bestScore = 0;
    let bestShop: { urls?: { pc?: string } } | null = null;

    for (const s of shops as { name: string; urls?: { pc?: string } }[]) {
      const score = nameScore(name, s.name);
      if (score > bestScore) {
        bestScore = score;
        bestShop = s;
      }
    }

    // Only return URL if we have a confident match (score >= 30)
    // Otherwise return null so the client falls back to search URL
    if (bestShop && bestScore >= 30) {
      return NextResponse.json({ url: bestShop.urls?.pc || null });
    }

    return NextResponse.json({ url: null });
  } catch {
    return NextResponse.json({ url: null });
  }
}

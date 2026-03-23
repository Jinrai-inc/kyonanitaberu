import { NextRequest, NextResponse } from "next/server";
import { recordLogin } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userAgent = request.headers.get("user-agent");

    await recordLogin({
      provider: body.provider || "guest",
      email: body.email,
      name: body.name,
      avatarUrl: body.avatarUrl,
      providerAccountId: body.providerAccountId,
      userAgent,
      locale: body.locale,
      isGuest: body.isGuest ?? false,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics login error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

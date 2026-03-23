import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// Save or update profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, providerAccountId, nickname, gender, ageGroup, email, isGuest, guestId } = body;

    const supabase = getSupabaseAdmin();

    if (isGuest) {
      // For guest users, create a new user record with guestId
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("provider", "guest")
        .eq("provider_account_id", guestId)
        .single();

      if (existing) {
        await supabase
          .from("users")
          .update({ nickname, gender, age_group: ageGroup, profile_completed: true })
          .eq("id", existing.id);
        return NextResponse.json({ ok: true, userId: existing.id, nickname });
      } else {
        const { data: newUser } = await supabase
          .from("users")
          .insert({
            provider: "guest",
            provider_account_id: guestId,
            nickname,
            gender,
            age_group: ageGroup,
            profile_completed: true,
          })
          .select("id")
          .single();
        return NextResponse.json({ ok: true, userId: newUser?.id, nickname });
      }
    }

    // OAuth users
    if (!provider || !providerAccountId) {
      return NextResponse.json({ error: "provider and providerAccountId required" }, { status: 400 });
    }

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("provider", provider)
      .eq("provider_account_id", providerAccountId)
      .single();

    if (user) {
      await supabase
        .from("users")
        .update({ nickname, gender, age_group: ageGroup, profile_completed: true })
        .eq("id", user.id);
      return NextResponse.json({ ok: true, userId: user.id, nickname });
    } else {
      const { data: newUser } = await supabase
        .from("users")
        .insert({
          email,
          provider,
          provider_account_id: providerAccountId,
          nickname,
          gender,
          age_group: ageGroup,
          profile_completed: true,
        })
        .select("id")
        .single();
      return NextResponse.json({ ok: true, userId: newUser?.id, nickname });
    }
  } catch (error) {
    console.error("Profile save error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Check if profile is completed
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const provider = searchParams.get("provider");
  const providerAccountId = searchParams.get("providerAccountId");
  const guestId = searchParams.get("guestId");

  const supabase = getSupabaseAdmin();

  try {
    let query;
    if (guestId) {
      query = supabase
        .from("users")
        .select("nickname, gender, age_group, profile_completed")
        .eq("provider", "guest")
        .eq("provider_account_id", guestId)
        .single();
    } else if (provider && providerAccountId) {
      query = supabase
        .from("users")
        .select("nickname, gender, age_group, profile_completed")
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId)
        .single();
    } else {
      return NextResponse.json({ profileCompleted: false });
    }

    const { data } = await query;

    return NextResponse.json({
      profileCompleted: data?.profile_completed ?? false,
      nickname: data?.nickname ?? null,
      gender: data?.gender ?? null,
      ageGroup: data?.age_group ?? null,
    });
  } catch {
    return NextResponse.json({ profileCompleted: false });
  }
}

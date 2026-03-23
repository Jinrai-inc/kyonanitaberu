import { getSupabaseAdmin } from "./supabase";

interface LoginEventParams {
  provider: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  providerAccountId?: string | null;
  userAgent?: string | null;
  locale?: string;
  isGuest?: boolean;
}

export async function recordLogin(params: LoginEventParams) {
  const supabase = getSupabaseAdmin();
  const { provider, email, name, avatarUrl, providerAccountId, userAgent, locale, isGuest } = params;

  let userId: string | null = null;

  if (!isGuest && providerAccountId) {
    // Upsert user
    const { data: existingUser } = await supabase
      .from("users")
      .select("id, login_count")
      .eq("provider", provider)
      .eq("provider_account_id", providerAccountId)
      .single();

    if (existingUser) {
      userId = existingUser.id;
      await supabase
        .from("users")
        .update({
          email,
          name,
          avatar_url: avatarUrl,
          last_login_at: new Date().toISOString(),
          login_count: existingUser.login_count + 1,
        })
        .eq("id", userId);
    } else {
      const { data: newUser } = await supabase
        .from("users")
        .insert({
          email,
          name,
          avatar_url: avatarUrl,
          provider,
          provider_account_id: providerAccountId,
        })
        .select("id")
        .single();
      userId = newUser?.id ?? null;
    }
  }

  // Record login event
  await supabase.from("login_events").insert({
    user_id: userId,
    provider,
    user_agent: userAgent,
    locale,
    is_guest: isGuest ?? false,
  });
}

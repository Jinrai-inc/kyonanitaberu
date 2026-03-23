import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import LINE from "next-auth/providers/line";
import { recordLogin } from "@/lib/analytics";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Apple,
    LINE,
  ],
  pages: {
    signIn: "/",
  },
  events: {
    async signIn({ user, account }) {
      if (account) {
        try {
          await recordLogin({
            provider: account.provider,
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
            providerAccountId: account.providerAccountId,
            isGuest: false,
          });
        } catch (e) {
          console.error("Failed to record login:", e);
        }
      }
    },
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      if (profile) {
        token.name = profile.name;
        token.picture = (profile as Record<string, unknown>).picture as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).provider = token.provider;
      }
      return session;
    },
  },
});

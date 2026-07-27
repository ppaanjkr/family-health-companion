import type { NextAuthConfig } from "next-auth";
import LINE from "next-auth/providers/line";
import { NextResponse } from "next/server";

export const authCallbacks = {
  authorized({ auth, request }) {
    const isLoggedIn = Boolean(auth?.user);
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (isLoginPage && isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return isLoginPage || isLoggedIn;
  },
  jwt({ token, account, profile }) {
    if (account?.provider === "line" && typeof profile?.sub === "string") {
      token.lineUserId = profile.sub;
    }

    return token;
  },
  session({ session, token }) {
    if (session.user) {
      session.user.id = token.sub ?? "";
      session.user.lineUserId =
        typeof token.lineUserId === "string" ? token.lineUserId : token.sub ?? "";
    }

    return session;
  },
} satisfies NonNullable<NextAuthConfig["callbacks"]>;

export default {
  providers: [LINE],
  pages: {
    signIn: "/login",
  },
  callbacks: authCallbacks,
} satisfies NextAuthConfig;

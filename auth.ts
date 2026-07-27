import NextAuth from "next-auth";
import authConfig, { authCallbacks } from "./auth.config";
import { upsertLineUser } from "./services/user/user.service";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  callbacks: {
    ...authCallbacks,
    async signIn({ user, account }) {
      if (account?.provider !== "line") {
        return false;
      }

      await upsertLineUser({
        lineUserId: account.providerAccountId,
        displayName: user.name ?? "ผู้ใช้ LINE",
        pictureUrl: user.image ?? undefined,
      });

      return true;
    },
  },
});

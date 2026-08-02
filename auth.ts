import NextAuth from "next-auth";

import authConfig, { authCallbacks } from "./auth.config";

import {
  getUserByLineUserId,
  upsertLineUser,
} from "./services/user/user.service";

import { USER_STATUS } from "@/constants/auth";

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

      const dbUser = await getUserByLineUserId(
        account.providerAccountId,
      );

      if (!dbUser) {
        return false;
      }

      return dbUser.status === USER_STATUS.ACTIVE;
    },
  },
});
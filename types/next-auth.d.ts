// types/next-auth.d.ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      lineUserId: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    lineUserId?: string;
  }
}

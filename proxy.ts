/* eslint-disable @typescript-eslint/no-explicit-any */

// v1
// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";

// export const { auth: proxy } = NextAuth(authConfig);

// export const config = {
//   matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
// };

// v2
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   return NextResponse.next();
// }

// v3
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export function proxy(request: Request) {
  return auth(request as any);
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
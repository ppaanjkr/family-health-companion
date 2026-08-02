import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

import { USER_STATUS } from "@/constants/auth";
import { getUserByLineUserId } from "@/services/user/user.service";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.lineUserId) {
    redirect("/login");
  }

  const user = await getUserByLineUserId(
    session.user.lineUserId,
  );

  if (!user) {
    redirect("/login");
  }

  if (user.status !== USER_STATUS.ACTIVE) {
    await signOut({
      redirectTo: "/login",
    });
  }

  return children;
}
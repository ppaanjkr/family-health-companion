import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { AppShell } from "@/components/layout/AppShell";

import { PageHeader } from "@/components/ui";

import { USER_ROLE } from "@/constants/auth";

import { getUserByLineUserId, getUsers } from "@/services/user/user.service";
import PermissionClient from "@/components/permission/PermissionClient";

export default async function PermissionPage() {
  const session = await auth();

  if (!session?.user?.lineUserId) {
    redirect("/login");
  }

  const currentUser = await getUserByLineUserId(session.user.lineUserId);

  if (!currentUser || currentUser.role !== USER_ROLE.OWNER) {
    redirect("/");
  }

  const users = await getUsers();

  return (
    <AppShell>
      <PageHeader title="สิทธิ์การใช้งาน" backButton />

      {users.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-500">
          ยังไม่มีผู้ใช้งาน
        </div>
      ) : (
        <PermissionClient users={users} />
      )}
    </AppShell>
  );
}

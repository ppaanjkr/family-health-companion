// app/profile/page.tsx
import { auth, signOut } from "@/auth";
import { AppShell } from "@/components/layout/AppShell";
import { Card, PageHeader } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import { USER_ROLE } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { getUserByLineUserId } from "@/services/user/user.service";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  const lineUserId = session?.user?.lineUserId;
  const user = lineUserId ? await getUserByLineUserId(lineUserId) : null;
  const displayName = user?.displayName ?? session?.user?.name ?? "ผู้ใช้ LINE";

  return (
    <AppShell>
      <PageHeader title="โปรไฟล์" />

      <Card className="mt-7 flex items-center gap-4 p-5 ring-1 ring-slate-100">
        <Avatar imageUrl={user?.pictureUrl} name={displayName} size="lg" />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold">{displayName}</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            เชื่อมต่อกับ LINE
          </p>
          <span className="mt-3 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            {user?.role === USER_ROLE.OWNER ? "ตัวมัม" : "ลูกกะจ๊อก"}
          </span>
        </div>
      </Card>

      <section className="mt-8">
        <h2 className="px-1 text-xs font-semibold tracking-wider text-slate-500">
          เมนู
        </h2>
        <Card className="mt-3 overflow-hidden ring-1 ring-slate-100">
          <Link
            href={ROUTES.FAMILY}
            className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50"
          >
            <div>
              <div className="font-medium text-slate-900">
                รายการสมาชิกข้อมูลสุขภาพ
              </div>
            </div>

            <ChevronRight size={20} className="text-slate-400" />
          </Link>
          <Link
            href={ROUTES.EXPENSE_MEMBERS}
            className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50 border-t border-slate-100"
          >
            <div>
              <div className="font-medium text-slate-900">
                รายการสมาชิกหารค่าใช้จ่าย
              </div>
            </div>

            <ChevronRight size={20} className="text-slate-400" />
          </Link>
          {user?.role === USER_ROLE.OWNER && (
            <Link
              href={ROUTES.PERMISSION}
              className="flex items-center justify-between border-t border-slate-100 px-5 py-4 transition hover:bg-slate-50"
            >
              <div>
                <div className="font-medium text-slate-900">
                  สิทธิ์การใช้งาน
                </div>
              </div>

              <ChevronRight size={20} className="text-slate-400" />
            </Link>
          )}
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="px-1 text-xs font-semibold tracking-wider text-slate-500">
          บัญชี
        </h2>
        <Card className="mt-3 overflow-hidden ring-1 ring-slate-100">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-medium">บัญชี LINE</p>
              <p className="mt-1 text-sm text-slate-500">{displayName}</p>
            </div>
            <span className="text-slate-400">›</span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              className="flex w-full items-center justify-between border-t border-slate-100 px-5 py-4 text-left font-medium text-rose-600 transition hover:bg-rose-50"
              type="submit"
            >
              <span>ออกจากระบบ</span>
              <span>›</span>
            </button>
          </form>
        </Card>
      </section>
    </AppShell>
  );
}

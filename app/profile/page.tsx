// app/profile/page.tsx
import { auth, signOut } from "@/auth";
import { AppShell } from "@/components/layout/AppShell";
import { Card, PageHeader } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import { getUserByLineUserId } from "@/services/user/user.service";

export default async function ProfilePage() {
  const session = await auth();
  const lineUserId = session?.user?.lineUserId;
  const user = lineUserId ? await getUserByLineUserId(lineUserId) : null;
  const displayName = user?.displayName ?? session?.user?.name ?? "ผู้ใช้ LINE";

  return (
    <AppShell>
      <PageHeader title="โปรไฟล์" description="ข้อมูลบัญชีของคุณ" />

      <Card className="mt-7 flex items-center gap-4 p-5 ring-1 ring-slate-100">
        <Avatar imageUrl={user?.pictureUrl} name={displayName} size="lg" />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold">{displayName}</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            เชื่อมต่อกับ LINE
          </p>
          <span className="mt-3 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            เจ้าของครอบครัว
          </span>
        </div>
      </Card>

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
      <p className="mt-10 text-center text-xs text-slate-400">
        Family Health Companion · v0.1
      </p>
    </AppShell>
  );
}

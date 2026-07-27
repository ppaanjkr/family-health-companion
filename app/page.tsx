import Link from "next/link";

import { auth } from "@/auth";
import { Avatar } from "@/components/ui/Avatar";
import { AppShell } from "@/components/layout/AppShell";
import { ROUTES } from "@/constants/routes";
import { getUserByLineUserId } from "@/services/user/user.service";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "สวัสดีตอนเช้า";
  if (hour < 17) return "สวัสดีตอนบ่าย";
  return "สวัสดีตอนเย็น";
}

export default async function Home() {
  const session = await auth();
  const lineUserId = session?.user?.lineUserId;
  const user = lineUserId ? await getUserByLineUserId(lineUserId) : null;
  const displayName = user?.displayName ?? session?.user?.name ?? "คุณ";
  const currentDate = new Intl.DateTimeFormat("th-TH", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <AppShell>
      <p className="text-sm text-slate-500">{currentDate}</p>
      <div className="mt-1 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{getGreeting()} {displayName}</h1>
          <p className="mt-2 text-slate-600">วันนี้สุขภาพครอบครัวเป็นอย่างไรบ้าง</p>
        </div>
        <Avatar imageUrl={user?.pictureUrl} name={displayName} size="md" />
      </div>

      <section className="mt-7 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <p className="text-sm font-medium text-slate-500">ภาพรวมวันนี้</p>
        <p className="mt-2 text-xl font-semibold">เริ่มสร้างสมุดสุขภาพของครอบครัว</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">เพิ่มสมาชิกคนแรก แล้วบันทึกข้อมูลสุขภาพประจำวันได้ทันที</p>
      </section>

      <Link className="mt-5 flex items-center justify-between rounded-3xl bg-sky-500 p-5 text-white shadow-sm transition hover:bg-sky-600" href={ROUTES.FAMILY}>
        <span className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl">+</span><span><span className="block text-base font-semibold">เพิ่มสมาชิกครอบครัว</span><span className="mt-0.5 block text-sm text-sky-50">เริ่มต้นได้ในไม่กี่ขั้นตอน</span></span></span>
        <span aria-hidden="true" className="text-2xl">›</span>
      </Link>

      <section className="mt-8">
        <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">บันทึกล่าสุด</h2><span className="text-sm text-slate-400">เร็ว ๆ นี้</span></div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {["ความดันโลหิต", "ชีพจร", "น้ำหนัก", "อุณหภูมิ"].map((label) => (
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100" key={label}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">—</div>
              <p className="mt-4 text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-lg font-semibold text-slate-400">ยังไม่มีข้อมูล</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

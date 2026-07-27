// app/daily/page.tsx
import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { ROUTES } from "@/constants/routes";

export default function DailyPage() {
  const currentDate = new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <AppShell>
      <h1 className="text-3xl font-semibold tracking-tight">บันทึกประจำวัน</h1>
      <p className="mt-2 text-slate-600">บันทึกข้อมูลสุขภาพของสมาชิกในแต่ละวัน</p>

      <div className="mt-7 flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-100">
        <span className="text-slate-400">‹</span>
        <div className="text-center"><p className="text-xs font-medium text-sky-600">วันนี้</p><p className="mt-1 font-semibold">{currentDate}</p></div>
        <span className="text-slate-300">›</span>
      </div>

      <section className="mt-6 rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-2xl text-sky-600">+</div>
        <h2 className="mt-4 text-lg font-semibold">ยังไม่มีสมาชิกให้บันทึกข้อมูล</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">เพิ่มสมาชิกในครอบครัวก่อน แล้วคุณจะบันทึกความดัน ชีพจร น้ำหนัก และข้อมูลอื่น ๆ ได้ที่นี่</p>
        <Link className="mt-5 inline-flex rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600" href={ROUTES.FAMILY}>ไปที่หน้าครอบครัว</Link>
      </section>
    </AppShell>
  );
}

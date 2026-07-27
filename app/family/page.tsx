// app/family/page.tsx
import { AppShell } from "@/components/layout/AppShell";

export default function FamilyPage() {
  return (
    <AppShell>
      <div className="flex items-start justify-between gap-4">
        <div><h1 className="text-3xl font-semibold tracking-tight">ครอบครัว</h1><p className="mt-2 text-slate-600">คนที่คุณดูแลและใส่ใจ</p></div>
        <button className="rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600" type="button">+ เพิ่ม</button>
      </div>

      <section className="mt-8 rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-600">♡</div>
        <h2 className="mt-5 text-xl font-semibold">เริ่มเพิ่มสมาชิกในครอบครัว</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">เก็บบันทึกสุขภาพของทุกคนในที่เดียว รวมถึงสัตว์เลี้ยงได้ในอนาคต</p>
        <button className="mt-6 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600" type="button">เพิ่มสมาชิกคนแรก</button>
      </section>
    </AppShell>
  );
}

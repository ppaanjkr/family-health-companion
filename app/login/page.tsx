// app/login/page.tsx
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
        <p className="text-sm font-semibold tracking-wide text-emerald-600">
          FAMILY HEALTH COMPANION
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          สุขภาพของครอบครัว<br />อยู่ใกล้มือเสมอ
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          เข้าสู่ระบบด้วยบัญชี LINE เพื่อเริ่มบันทึกและติดตามข้อมูลสุขภาพของคนที่คุณรัก
        </p>
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signIn("line", { redirectTo: "/" });
          }}
        >
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#06C755] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#05b64d] focus:outline-none focus:ring-4 focus:ring-[#06C755]/20"
            type="submit"
          >
            <span aria-hidden="true" className="text-base leading-none">●</span>
            เข้าสู่ระบบด้วย LINE
          </button>
        </form>
      </section>
    </main>
  );
}

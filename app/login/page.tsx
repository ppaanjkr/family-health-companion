// app/login/page.tsx
import { signIn } from "@/auth";
import { Button, Card } from "@/components/ui";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-10">
      <Card  className="w-full max-w-md p-8 ring-1 ring-slate-200 sm:p-10">
        <p className="text-sm font-semibold tracking-wide text-emerald-600">
          FAMILY HEALTH COMPANION
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          สุขภาพของครอบครัว
          <br />
          อยู่ใกล้มือเสมอ
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          เข้าสู่ระบบด้วยบัญชี LINE
          เพื่อเริ่มบันทึกและติดตามข้อมูลสุขภาพของคนที่คุณรัก
        </p>
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signIn("line", { redirectTo: "/" });
          }}
        >
          <Button
            type="submit"
            variant="line"
            fullWidth
          >
            เข้าสู่ระบบด้วย LINE
          </Button>
        </form>
      </Card>
    </main>
  );
}

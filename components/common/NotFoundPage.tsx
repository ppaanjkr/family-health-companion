"use client";

import { useRouter } from "next/navigation";

import { Button, Card } from "@/components/ui";

interface NotFoundPageProps {
  title?: string;
  description?: string;
}

export default function NotFoundPage({
  title = "ไม่พบข้อมูล",
  description = "ข้อมูลที่คุณค้นหาอาจถูกลบ หรือไม่มีอยู่ในระบบ",
}: NotFoundPageProps) {
  const router = useRouter();

  return (
    <Card className="py-16 text-center">
      <div className="text-6xl">
        🔍
      </div>

      <h2 className="mt-4 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <Button
          variant="secondary"
          onClick={() => router.back()}
        >
          ย้อนกลับ
        </Button>

        <Button
          onClick={() => router.push("/family")}
        >
          กลับหน้าครอบครัว
        </Button>
      </div>
    </Card>
  );
}
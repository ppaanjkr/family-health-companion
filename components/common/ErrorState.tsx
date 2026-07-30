"use client";

import { Button, Card } from "@/components/ui";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "เกิดข้อผิดพลาด",
  description = "ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="py-16 text-center">
      <div className="text-5xl">
        ⚠️
      </div>

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry}>
            ลองใหม่
          </Button>
        </div>
      )}
    </Card>
  );
}
"use client";

import { Button, Card } from "@/components/ui";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "ยืนยันการดำเนินการ",
  description = "คุณต้องการดำเนินการต่อใช่หรือไม่?",
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  loading = false,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          {description}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "กำลังดำเนินการ..." : confirmText}
          </Button>
        </div>
      </Card>
    </div>
  );
}
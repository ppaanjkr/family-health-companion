"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

import { Button, Card } from "@/components/ui";

interface Props {
  profileId: string;
}

export default function HealthProfileActions({
  profileId,
}: Props) {
  const router = useRouter();

  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <Button
          className="flex-1"
          outline
          onClick={() =>
            router.push(`/family/${profileId}/edit`)
          }
        >
          แก้ไขข้อมูล
        </Button>

        <Button
          className="flex-1"
          variant="danger"
          outline
        >
          ลบสมาชิก
        </Button>
      </div>
    </Card>
  );
}
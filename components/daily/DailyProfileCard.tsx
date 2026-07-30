import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import type { HealthProfile } from "@/types/profile";
import LabelHeader from "../common/LabelHeader";
import type { DailyRecord } from "@/types/daily";

type Props = {
  profile: HealthProfile;
  record?: DailyRecord | null;
};

export function DailyProfileCard({ profile, record }: Props) {
  return (
    <Link href={`${ROUTES.DAILY}/${profile.id}`}>
      <Card className="cursor-pointer p-5 transition hover:ring-2 hover:ring-sky-200">
        <div className="flex items-start justify-between">
          <div>
            <LabelHeader label={profile.nickname ?? ""} />
          </div>

          <ChevronRight className="text-slate-400" size={20} />
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">ความดัน</span>
            <span>
              {record?.systolic != null && record?.diastolic != null
                ? `${record.systolic}/${record.diastolic}`
                : "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">ชีพจร</span>
            <span>{record?.pulse != null ? `${record.pulse} bpm` : "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">ออกซิเจน</span>
            <span>{record?.spo2 != null ? `${record.spo2}%` : "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">อุณหภูมิ</span>
            <span>
              {record?.temperature != null ? `${record.temperature}°C` : "-"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

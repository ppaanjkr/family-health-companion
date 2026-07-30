// components/health-profile/HealthProfileBasicInfo.tsx
import { Card } from "@/components/ui";

import {
  formatThaiDate,
} from "@/lib/utils/date";
import { HealthProfile } from "@/types/profile";
import LabelHeader from "../common/LabelHeader";

interface Props {
  profile: HealthProfile;
}

export default function HealthProfileBasicInfo({
  profile,
}: Props) {
  return (
    <Card className="p-6">
      <LabelHeader label="ข้อมูลพื้นฐาน" />

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {profile.type === "person" && (
          <>
            <InfoRow
              label="เลขบัตรประชาชน"
              value={profile.nationalId}
            />

            <InfoRow
              label="หมู่เลือด"
              value={profile.bloodType}
            />
          </>
        )}

        {profile.type === "pet" && (
          <>
            <InfoRow
              label="ประเภท"
              value={profile.species}
            />

            <InfoRow
              label="สายพันธุ์"
              value={profile.breed}
            />
          </>
        )}

        <InfoRow
          label="วันเกิด"
          value={
            profile.birthday
              ? formatThaiDate(profile.birthday)
              : undefined
          }
        />

        <InfoRow
          label="โรคประจำตัว"
          value={profile.chronicDiseases?.join(", ")}
        />

      </div>
    </Card>
  );
}

interface InfoRowProps {
  label: string;
  value?: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value || "-"}
      </p>
    </div>
  );
}
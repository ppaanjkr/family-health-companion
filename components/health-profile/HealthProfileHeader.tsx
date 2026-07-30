// components/health-profile/HealthProfileHeader.tsx
import HealthProfileAvatar from "./HealthProfileAvatar";

import {
  formatAge,
  formatThaiDate,
} from "@/lib/utils/date";
import { HealthProfile } from "@/types/profile";
import { Card } from "@/components/ui";

interface HealthProfileHeaderProps {
  profile: HealthProfile;
}

export default function HealthProfileHeader({
  profile,
}: HealthProfileHeaderProps) {
  const fullName =
    `${profile.firstName} ${profile.lastName ?? ""}`.trim();

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">
        <HealthProfileAvatar
          profile={profile}
          size="lg"
        />

        <h1 className="mt-4 text-2xl font-bold">
          {fullName}
        </h1>

        {profile.nickname && (
          <p className="mt-1 text-slate-500">
            ({profile.nickname})
          </p>
        )}

        <p className="mt-4 text-sm text-slate-600">
          {[
            profile.type === "person"
              ? profile.gender
              : profile.species,
            formatAge(profile.birthday),
            profile.birthday
              ? formatThaiDate(profile.birthday)
              : null,
          ]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </div>
    </Card>
  );
}
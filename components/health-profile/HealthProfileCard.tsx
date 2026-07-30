import { ChevronRight } from "lucide-react";

import { formatThaiDate, calculateAge, formatAge } from "@/lib/utils/date";
import { getDisplayName, getNickname } from "@/lib/utils/health-profile";
import { HealthProfile } from "@/types/profile";

import HealthProfileAvatar from "./HealthProfileAvatar";

interface HealthProfileCardProps {
  profile: HealthProfile;
  onClick?: () => void;
}

interface ProfileInfoProps {
  profile: HealthProfile;
}

function PersonInfo({ profile }: ProfileInfoProps) {
  const age = formatAge(profile.birthday);

  return (
    <>
      <p className="mt-2 text-sm text-slate-600">
        {[age, profile.birthday ? formatThaiDate(profile.birthday) : null]
          .filter(Boolean)
          .join(" • ")}
      </p>

      {profile.chronicDiseases && profile.chronicDiseases.length > 0 && (
        <p className="mt-1 truncate text-sm text-red-600">
          🩺 {profile.chronicDiseases.join(", ")}
        </p>
      )}
    </>
  );
}

function PetInfo({ profile }: ProfileInfoProps) {
  const age = formatAge(profile.birthday);

  return (
    <>
      <p className="mt-2 text-sm text-slate-600">
        {[profile.species, profile.breed].filter(Boolean).join(" • ")}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        {[age, profile.birthday ? formatThaiDate(profile.birthday) : null]
          .filter(Boolean)
          .join(" • ")}
      </p>
    </>
  );
}

export default function HealthProfileCard({
  profile,
  onClick,
}: HealthProfileCardProps) {
  const nickname =
    profile.type === "pet" ? getDisplayName(profile) : getNickname(profile);
  const fullname = profile.type === "pet" ? null : getDisplayName(profile);
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-4 rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
    >
      <HealthProfileAvatar profile={profile} />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-slate-800">
          {nickname}
        </h3>

        {fullname && <p className="text-sm text-slate-500">({fullname})</p>}

        {profile.type === "person" ? (
          <PersonInfo profile={profile} />
        ) : (
          <PetInfo profile={profile} />
        )}
      </div>

      <ChevronRight className="mt-1 h-6 w-6 shrink-0 text-slate-400" />
    </button>
  );
}

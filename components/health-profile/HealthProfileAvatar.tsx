import Image from "next/image";

import { HealthProfile } from "@/types/profile";
import { Heart } from "lucide-react";

interface HealthProfileAvatarProps {
  profile: HealthProfile;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-12 w-12 text-2xl",
  md: "h-16 w-16 text-3xl",
  lg: "h-24 w-24 text-5xl",
};

export default function HealthProfileAvatar({
  profile,
  size = "md",
  className = "",
}: HealthProfileAvatarProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-sky-50 text-sky-500 ${sizeClasses[size]} ${className}`}
    >
      {profile.photoUrl ? (
        <Image
          src={profile.photoUrl}
          alt={profile.firstName}
          fill
          sizes="96px"
          className="object-cover"
        />
      ) : (
        <span>{profile.avatar ?? <Heart width={24}/>}</span>
      )}
    </div>
  );
}
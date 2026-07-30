import { Timestamp } from "firebase/firestore";
import { HealthProfile } from "@/types/profile";

export function getDisplayName(profile: HealthProfile): string {
  return [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(" ");
}

export function getNickname(profile: HealthProfile): string | null {
  return profile.nickname?.trim() || null;
}

export function getAge(birthday?: Timestamp): number | null {
  if (!birthday) return null;

  const birthDate = birthday.toDate();
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return age;
}
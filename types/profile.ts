// types/profile.ts
import { Timestamp } from "firebase/firestore";
import { PROFILE_TYPE, GENDER, BLOOD_TYPES, SPECIES } from "@/constants/profile";
import { BaseModel } from "./common";

export type ProfileType =
  (typeof PROFILE_TYPE)[keyof typeof PROFILE_TYPE];

export type Gender =
  (typeof GENDER)[keyof typeof GENDER];

export type BloodType =
  typeof BLOOD_TYPES[number]["value"];

export type Species =
  typeof SPECIES[number]["value"];

export type HealthProfile = BaseModel & {
  type: ProfileType;

  nationalId?: string;

  firstName: string;
  lastName?: string;
  nickname?: string;

  gender?: Gender;
  birthday?: string;
  bloodType?: BloodType;
  chronicDiseases?: string[];

  photoUrl?: string;
  avatar?: string;

  // displayOrder: number;
  active: boolean;

  // Pet Only
  species?: Species;
  breed?: string;
};

export type CreateHealthProfile = Omit<
  HealthProfile,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateHealthProfile = Partial<CreateHealthProfile>;
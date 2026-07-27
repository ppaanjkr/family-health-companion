// types/profile.ts
import { Timestamp } from "firebase/firestore";
import { PROFILE_TYPE, GENDER } from "@/constants/profile";
import { BaseModel } from "./common";

export type ProfileType =
  (typeof PROFILE_TYPE)[keyof typeof PROFILE_TYPE];

export type Gender =
  (typeof GENDER)[keyof typeof GENDER];

export type HealthProfile = BaseModel & {
  type: ProfileType;

  firstName: string;
  lastName?: string;
  nickname?: string;

  gender?: Gender;
  birthday?: Timestamp;

  photoUrl?: string;

  displayOrder: number;
  active: boolean;

  // Pet Only
  species?: string;
  breed?: string;
};
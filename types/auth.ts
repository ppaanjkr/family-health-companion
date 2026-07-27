// types/auth.ts
import { USER_ROLE, USER_STATUS } from "@/constants/auth";
import { BaseModel } from "./common";

export type UserRole =
  (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type UserStatus =
  (typeof USER_STATUS)[keyof typeof USER_STATUS];

export type User = BaseModel & {
  lineUserId: string;
  displayName: string;
  pictureUrl?: string;

  role: UserRole;
  status: UserStatus;
};
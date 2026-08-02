"use server";

import {
  approveUser,
  updateUserStatus,
} from "@/services/user/user.service";

import { USER_STATUS } from "@/constants/auth";

export async function approveUserAction(
  lineUserId: string,
) {
  await approveUser(lineUserId);
}

export async function toggleUserStatusAction(
  lineUserId: string,
  active: boolean,
) {
  await updateUserStatus(
    lineUserId,
    active
      ? USER_STATUS.ACTIVE
      : USER_STATUS.INACTIVE,
  );
}
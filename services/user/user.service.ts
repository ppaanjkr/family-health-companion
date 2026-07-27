// services/user/user.service.ts
import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { USER_ROLE, USER_STATUS } from "@/constants/auth";
import { getAdminDb } from "@/lib/firebase/admin";
import type { User } from "@/types/auth";

type UpsertLineUserInput = {
  lineUserId: string;
  displayName: string;
  pictureUrl?: string;
};

const COLLECTION = "users";

export async function getUserByLineUserId(
  lineUserId: string,
): Promise<User | null> {
  const userSnapshot = await getAdminDb()
    .collection(COLLECTION)
    .doc(lineUserId)
    .get();

  if (!userSnapshot.exists) {
    return null;
  }

  return {
    id: userSnapshot.id,
    ...(userSnapshot.data() as Omit<User, "id">),
  };
}

export async function upsertLineUser({
  lineUserId,
  displayName,
  pictureUrl,
}: UpsertLineUserInput) {
  const userReference = getAdminDb().collection(COLLECTION).doc(lineUserId);
  const existingUser = await userReference.get();

  await userReference.set(
    {
      lineUserId,
      displayName,
      ...(pictureUrl ? { pictureUrl } : {}),
      updatedAt: FieldValue.serverTimestamp(),
      ...(!existingUser.exists
        ? {
            role: USER_ROLE.OWNER,
            status: USER_STATUS.ACTIVE,
            createdAt: FieldValue.serverTimestamp(),
          }
        : {}),
    },
    { merge: true },
  );
}

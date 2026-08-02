// services/user/user.service.ts
import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { USER_ROLE, USER_STATUS } from "@/constants/auth";
import { getAdminDb } from "@/lib/firebase/admin";
import type { User, UserRole, UserStatus } from "@/types/auth";

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

  const data = userSnapshot.data()!;

return {
  id: userSnapshot.id,
  ...data,

  createdAt: data.createdAt
    ? data.createdAt.toMillis()
    : null,

  updatedAt: data.updatedAt
    ? data.updatedAt.toMillis()
    : null,
} as User;
}

export async function upsertLineUser({
  lineUserId,
  displayName,
  pictureUrl,
}: UpsertLineUserInput) {
  const db = getAdminDb();

  const userReference = db.collection(COLLECTION).doc(lineUserId);

  const existingUser = await userReference.get();

  // ถ้ายังไม่มี User นี้
  if (!existingUser.exists) {
    // ตรวจสอบว่ามี Owner แล้วหรือยัง
    const ownerSnapshot = await db
      .collection(COLLECTION)
      .where("role", "==", USER_ROLE.OWNER)
      .limit(1)
      .get();

    const isFirstUser = ownerSnapshot.empty;

    await userReference.set({
      lineUserId,
      displayName,
      ...(pictureUrl ? { pictureUrl } : {}),

      role: isFirstUser ? USER_ROLE.OWNER : USER_ROLE.MEMBER,

      status: isFirstUser ? USER_STATUS.ACTIVE : USER_STATUS.PENDING,

      createdAt: FieldValue.serverTimestamp(),

      updatedAt: FieldValue.serverTimestamp(),
    });

    return;
  }

  // ถ้ามี User อยู่แล้ว ให้อัปเดตข้อมูลจาก LINE
  await userReference.set(
    {
      displayName,
      ...(pictureUrl ? { pictureUrl } : {}),

      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

/**
 * ดึง User ทั้งหมด
 */
export async function getUsers(): Promise<User[]> {
  const snapshot = await getAdminDb()
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,

    createdAt: data.createdAt
      ? data.createdAt.toMillis()
      : null,

    updatedAt: data.updatedAt
      ? data.updatedAt.toMillis()
      : null,
  } as User;
});
}

/**
 * เปลี่ยน Status
 */
export async function updateUserStatus(lineUserId: string, status: UserStatus) {
  await getAdminDb().collection(COLLECTION).doc(lineUserId).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * เปลี่ยน Role
 */
export async function updateUserRole(lineUserId: string, role: UserRole) {
  await getAdminDb().collection(COLLECTION).doc(lineUserId).update({
    role,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * อนุมัติผู้ใช้
 */
export async function approveUser(lineUserId: string) {
  await updateUserStatus(lineUserId, USER_STATUS.ACTIVE);
}

function mapUser(doc: FirebaseFirestore.QueryDocumentSnapshot): User {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,

    createdAt: data.createdAt?.toMillis?.() ?? null,
    updatedAt: data.updatedAt?.toMillis?.() ?? null,
  } as User;
}


// services/daily/daily.service.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

import type {
  CreateDailyRecord,
  DailyRecord,
  UpdateDailyRecord,
} from "@/types/daily";
import { COLLECTIONS } from "@/constants/firestore";
import { removeUndefinedFields } from "@/lib/utils/removeUndefinedFields";

const COLLECTION = COLLECTIONS.DAILY_RECORDS;

/**
 * ดึงข้อมูลของ 1 คน ใน 1 วัน
 */
export async function getDailyRecord(
  profileId: string,
  recordDate: string,
): Promise<DailyRecord | null> {
  const q = query(
    collection(db, COLLECTION),
    where("profileId", "==", profileId),
    where("recordDate", "==", recordDate),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<DailyRecord, "id">),
  };
}

/**
 * ดึงข้อมูลทั้งหมดของวันนั้น
 */
export async function getDailyRecordsByDate(
  recordDate: string,
): Promise<DailyRecord[]> {
  const q = query(
    collection(db, COLLECTION),
    where("recordDate", "==", recordDate),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<DailyRecord, "id">),
  }));
}

/**
 * เพิ่มข้อมูล
 */
export async function createDailyRecord(
  data: CreateDailyRecord,
) {
  const payload = removeUndefinedFields({
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return addDoc(collection(db, COLLECTION), payload);
}

/**
 * แก้ไขข้อมูล
 */
export async function updateDailyRecord(
  id: string,
  data: UpdateDailyRecord,
) {
  const payload = removeUndefinedFields({
    ...data,
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, COLLECTION, id), payload);
}

/**
 * ลบข้อมูล
 */
export async function deleteDailyRecord(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}

/**
 * ดึงประวัติทั้งหมดของสมาชิก
 */
export async function getDailyRecordsByProfile(
  profileId: string,
): Promise<DailyRecord[]> {
  const q = query(
    collection(db, COLLECTION),
    where(
      "profileId",
      "==",
      profileId,
    ),
    orderBy(
      "recordDate",
      "asc",
    ),
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<
        DailyRecord,
        "id"
      >),
    }),
  );
}
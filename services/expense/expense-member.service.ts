import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

import { COLLECTIONS } from "@/constants/firestore";
import { removeUndefinedFields } from "@/lib/utils/removeUndefinedFields";

import type {
  CreateExpenseMember,
  ExpenseMember,
  UpdateExpenseMember,
} from "@/types/expense-member";

const COLLECTION = COLLECTIONS.EXPENSE_MEMBERS;

/**
 * ดึงสมาชิกทั้งหมด
 */
export async function getExpenseMembers(): Promise<ExpenseMember[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "asc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<ExpenseMember, "id">),
  }));
}

/**
 * ดึงเฉพาะสมาชิกที่ Active
 */
export async function getActiveExpenseMembers(): Promise<ExpenseMember[]> {
  const q = query(
    collection(db, COLLECTION),
    where("active", "==", true),
    orderBy("createdAt", "asc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<ExpenseMember, "id">),
  }));
}

/**
 * ดึงข้อมูลสมาชิก 1 คน
 */
export async function getExpenseMember(
  id: string,
): Promise<ExpenseMember | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<ExpenseMember, "id">),
  };
}

/**
 * เพิ่มสมาชิก
 */
export async function createExpenseMember(
  data: CreateExpenseMember,
) {
  const payload = removeUndefinedFields({
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return addDoc(collection(db, COLLECTION), payload);
}

/**
 * แก้ไขสมาชิก
 */
export async function updateExpenseMember(
  id: string,
  data: UpdateExpenseMember,
) {
  const payload = removeUndefinedFields({
    ...data,
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, COLLECTION, id), payload);
}

/**
 * ลบสมาชิก
 */
export async function deleteExpenseMember(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
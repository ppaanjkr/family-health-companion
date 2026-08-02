import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

import { COLLECTIONS } from "@/constants/firestore";
import { EXPENSE_CYCLE_STATUS } from "@/constants/expense-cycle";

import { removeUndefinedFields } from "@/lib/utils/removeUndefinedFields";
import { getNextCycle } from "@/lib/utils/getNextCycle";

import type {
  CreateExpenseCycle,
  ExpenseCycle,
} from "@/types/expense-cycle";

const COLLECTION = COLLECTIONS.EXPENSE_CYCLES;

/**
 * ดึงรอบทั้งหมด
 */
export async function getExpenseCycles(): Promise<ExpenseCycle[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("year", "desc"),
    orderBy("month", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<ExpenseCycle, "id">),
  }));
}

/**
 * ดึงข้อมูลรอบ
 */
export async function getExpenseCycle(
  id: string,
): Promise<ExpenseCycle | null> {
  const snapshot = await getDoc(
    doc(db, COLLECTION, id),
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      ExpenseCycle,
      "id"
    >),
  };
}

/**
 * ดึงรอบที่เปิดอยู่
 */
export async function getActiveExpenseCycle(): Promise<ExpenseCycle | null> {
  const q = query(
    collection(db, COLLECTION),
    where(
      "status",
      "==",
      EXPENSE_CYCLE_STATUS.OPEN,
    ),
    limit(1),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<
      ExpenseCycle,
      "id"
    >),
  };
}

/**
 * สร้างรอบใหม่
 */
export async function createExpenseCycle(
  data: CreateExpenseCycle,
) {
  const payload = removeUndefinedFields({
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return await addDoc(
    collection(db, COLLECTION),
    payload,
  );
}

/**
 * ตรวจสอบว่ามีรอบเปิดอยู่หรือไม่
 * ถ้าไม่มีจะสร้างรอบปัจจุบันให้อัตโนมัติ
 */
export async function ensureActiveExpenseCycle(): Promise<ExpenseCycle> {
  const active =
    await getActiveExpenseCycle();

  if (active) {
    return active;
  }

  const now = new Date();

  const docRef =
    await createExpenseCycle({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      status:
        EXPENSE_CYCLE_STATUS.OPEN,
    });

  const cycle =
    await getExpenseCycle(docRef.id);

  if (!cycle) {
    throw new Error(
      "Failed to create expense cycle.",
    );
  }

  return cycle;
}

/**
 * ปิดรอบปัจจุบัน
 * และสร้างรอบเดือนถัดไป
 */
export async function closeCurrentExpenseCycle(): Promise<ExpenseCycle> {
  const active =
    await ensureActiveExpenseCycle();

  const next = getNextCycle(
    active.month,
    active.year,
  );

  await updateDoc(
    doc(db, COLLECTION, active.id),
    {
      status:
        EXPENSE_CYCLE_STATUS.CLOSED,
      closedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
  );

  const docRef =
    await createExpenseCycle({
      month: next.month,
      year: next.year,
      status:
        EXPENSE_CYCLE_STATUS.OPEN,
    });

  const cycle =
    await getExpenseCycle(docRef.id);

  if (!cycle) {
    throw new Error(
      "Failed to create next expense cycle.",
    );
  }

  return cycle;
}
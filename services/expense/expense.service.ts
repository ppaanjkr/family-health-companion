import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

import type {
  CreateExpense,
  Expense,
  UpdateExpense,
} from "@/types/expense";

import { COLLECTIONS } from "@/constants/firestore";

const COLLECTION = COLLECTIONS.EXPENSES;

/**
 * ดึงรายการค่าใช้จ่ายของรอบ
 */
export async function getExpenses(
  cycleId?: string,
): Promise<Expense[]> {
  let q;

  if (cycleId) {

    q = query(
      collection(db, COLLECTION),
      where("cycleId", "==", cycleId),
      orderBy("expenseDate", "desc"),
    );
  } else {
    q = query(
      collection(db, COLLECTION),
      orderBy("expenseDate", "desc"),
    );
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Expense[];
}

/**
 * ดึงรายการเดียว
 */
export async function getExpense(
  id: string,
): Promise<Expense | null> {
  const snapshot = await getDoc(
    doc(db, COLLECTION, id),
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Expense,
      "id"
    >),
  };
}

/**
 * เพิ่มรายการ
 */
export async function createExpense(
  data: CreateExpense,
): Promise<string> {
  const docRef = await addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      expenseDate:
        data.expenseDate instanceof Timestamp
          ? data.expenseDate
          : Timestamp.fromDate(
              new Date(data.expenseDate),
            ),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    },
  );

  return docRef.id;
}

/**
 * แก้ไขรายการ
 */
export async function updateExpense(
  id: string,
  data: UpdateExpense,
): Promise<void> {
  const payload: Record<
    string,
    unknown
  > = {
    ...data,
    updatedAt: Timestamp.now(),
  };

  if (data.expenseDate) {
    payload.expenseDate =
      data.expenseDate instanceof Timestamp
        ? data.expenseDate
        : Timestamp.fromDate(
            new Date(data.expenseDate),
          );
  }

  await updateDoc(
    doc(db, COLLECTION, id),
    payload,
  );
}

/**
 * ลบรายการ
 */
export async function deleteExpense(
  id: string,
): Promise<void> {
  await deleteDoc(
    doc(db, COLLECTION, id),
  );
}
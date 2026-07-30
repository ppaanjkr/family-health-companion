import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";
import {
  CreateHealthProfile,
  HealthProfile,
  UpdateHealthProfile,
} from "@/types/profile";
import { COLLECTIONS } from "@/constants/firestore";
import { removeUndefinedFields } from "../utils/removeUndefinedFields";

const COLLECTION_NAME = COLLECTIONS.HEALTH_PROFILES;

export async function createHealthProfile(
  data: CreateHealthProfile
) {
  const docRef = doc(collection(db, COLLECTION_NAME));

  const docData = removeUndefinedFields({
    id: docRef.id,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await setDoc(docRef, docData);

  return docRef.id;
}

export async function getHealthProfiles(): Promise<HealthProfile[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as HealthProfile);
}

export async function getHealthProfileById(
  id: string
): Promise<HealthProfile | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as HealthProfile;
}

export async function updateHealthProfile(
  id: string,
  data: UpdateHealthProfile
) {
  const docRef = doc(db, COLLECTION_NAME, id);

  const updateData = removeUndefinedFields({
    ...data,
    updatedAt: serverTimestamp(),
  });

  await updateDoc(docRef, updateData);
}

export async function deleteHealthProfile(id: string) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
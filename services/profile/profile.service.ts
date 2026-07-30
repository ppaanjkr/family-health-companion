// services/profile/profile.service.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";
import type { HealthProfile } from "@/types/profile";

import { serverTimestamp } from "firebase/firestore";

const COLLECTION = "health_profiles";

export async function getProfiles(): Promise<HealthProfile[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<HealthProfile, "id">),
  }));
}

export async function getProfile(id: string): Promise<HealthProfile | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<HealthProfile, "id">),
  };
}

export async function createProfile(
  data: Omit<HealthProfile, "id" | "createdAt" | "updatedAt">,
) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProfile(
  id: string,
  data: Partial<Omit<HealthProfile, "id" | "createdAt" | "updatedAt">>,
) {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProfile(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getPersonProfiles(): Promise<HealthProfile[]> {
  const profiles = await getProfiles();

  return profiles.filter(
    (profile) => profile.type === "person" && profile.active,
  );
}
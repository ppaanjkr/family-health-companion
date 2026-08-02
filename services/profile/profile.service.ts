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

  return snapshot.docs.map((d) => {
    const data = d.data();

    return {
      id: d.id,
      ...data,

      createdAt: data.createdAt ? data.createdAt.toMillis() : null,

      updatedAt: data.updatedAt ? data.updatedAt.toMillis() : null,
    } as HealthProfile;
  });
}

export async function getProfile(id: string): Promise<HealthProfile | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, id));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    ...data,

    createdAt: data.createdAt ? data.createdAt.toMillis() : null,

    updatedAt: data.updatedAt ? data.updatedAt.toMillis() : null,
  } as HealthProfile;
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

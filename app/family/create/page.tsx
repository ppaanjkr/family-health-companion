"use client";

import { useRouter } from "next/navigation";

import HealthProfileForm, {
  HealthProfileFormValues,
} from "@/components/health-profile/HealthProfileForm";
import { createHealthProfile } from "@/lib/firebase/health-profile";
import { CreateHealthProfile } from "@/types/profile";
import { AppShell } from "@/components/layout/AppShell";

export default function CreateFamilyPage() {
  const router = useRouter();

  async function handleSubmit(values: HealthProfileFormValues) {
    const data: CreateHealthProfile = {
      type: values.profileType,

      firstName: values.firstName,
      lastName: values.lastName,
      nickname: values.nickname,

      gender: values.gender,
      birthday: values.birthday,

      bloodType: values.bloodType,
      nationalId: values.nationalId,

      species: values.species,
      breed: values.breed,

      active: true,

      avatar: undefined,
      photoUrl: undefined,
      chronicDiseases: values.chronicDiseases
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    await createHealthProfile(data);

    router.push("/family");
  }

  return (
    <AppShell>
      <HealthProfileForm onSubmit={handleSubmit} />
    </AppShell>
  );
}

// components/health-profile/HealthProfileForm/index.tsx
"use client";

import { useForm } from "react-hook-form";

import { Button, Card } from "@/components/ui";

import BasicInformation from "./BasicInformation";
import PersonFields from "./PersonFields";
import PetFields from "./PetFields";

import {
  ProfileType,
  BloodType,
  Gender,
  Species,
} from "@/types/profile";

export interface HealthProfileFormValues {
  profileType: ProfileType;

  firstName: string;
  lastName: string;
  nickname: string;

  gender?: Gender;
  birthday?: string;

  bloodType?: BloodType;
  chronicDiseases?: string;
  nationalId?: string;

  species?: Species;
  breed?: string;
}

interface HealthProfileFormProps {
  defaultValues?: Partial<HealthProfileFormValues>;
  onSubmit: (data: HealthProfileFormValues) => void | Promise<void>;
}

export default function HealthProfileForm({
  defaultValues,
  onSubmit,
}: HealthProfileFormProps) {
  const form = useForm<HealthProfileFormValues>({
    defaultValues: {
      profileType: "person",

      firstName: "",
      lastName: "",
      nickname: "",

      gender: undefined,
      birthday: "",

      bloodType: undefined,
      nationalId: "",

      species: undefined,
      breed: "",

      ...defaultValues,
    },
  });

  const profileType = form.watch("profileType");

  const profileFields =
    profileType === "person" ? (
      <PersonFields form={form} />
    ) : (
      <PetFields form={form} />
    );

  return (
    <div className="">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <BasicInformation form={form} />

        <div className="mt-8">{profileFields}</div>

        <div className="mt-8 flex">
          <Button type="submit" className="w-full">บันทึก</Button>
        </div>

      </form>
    </div>
  );
}

// components/health-profile/HealthProfileForm/BasicInformation.tsx
"use client";

import { UseFormReturn } from "react-hook-form";

import { FormRadioGroup, FormSection } from "@/components/ui/form";

import { HealthProfileFormValues } from "./index";

import { ProfileType } from "@/types/profile";

interface Props {
  form: UseFormReturn<HealthProfileFormValues>;
}

const PROFILE_TYPES: {
  value: ProfileType;
  label: string;
  icon: string;
}[] = [
  {
    value: "person",
    label: "คน",
    icon: "👤",
  },
  {
    value: "pet",
    label: "สัตว์เลี้ยง",
    icon: "🐶",
  },
];

export default function BasicInformation({ form }: Props) {
  const profileType = form.watch("profileType");

  return (
    <FormSection
      title="ข้อมูลพื้นฐาน"
      description="เลือกประเภทของสมาชิกที่ต้องการเพิ่ม"
    >
      <div>
        <FormRadioGroup
          form={form}
          name="profileType"
          label="ประเภท"
          options={PROFILE_TYPES}
          variant="card"
        />
      </div>
    </FormSection>
  );
}

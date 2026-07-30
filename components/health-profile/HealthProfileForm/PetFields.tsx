"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FormDateInput,
  FormInput,
  FormRadioGroup,
  FormSection,
  FormSelect,
} from "@/components/ui/form";
import { GENDER, SPECIES } from "@/constants/profile";

import { HealthProfileFormValues } from "./index";

interface Props {
  form: UseFormReturn<HealthProfileFormValues>;
}

export default function PetFields({ form }: Props) {
  return (
    <FormSection title="ข้อมูลสัตว์เลี้ยง">
      <FormInput
        form={form}
        name="firstName"
        label="ชื่อสัตว์เลี้ยง"
        placeholder="ชื่อสัตว์เลี้ยง"
      />

      <FormRadioGroup
        form={form}
        name="gender"
        label="เพศ"
        options={GENDER}
        variant="card"
      />

      <FormDateInput
        form={form}
        name="birthday"
        label="วันเกิด"
      />

      <FormSelect
        form={form}
        name="species"
        label="ชนิด"
        placeholder="เลือกชนิด"
        options={SPECIES}
      />

      <FormInput
        form={form}
        name="breed"
        label="สายพันธุ์"
        placeholder="Golden Retriever"
      />
    </FormSection>
  );
}
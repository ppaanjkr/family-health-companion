"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FormDateInput,
  FormInput,
  FormRadioGroup,
  FormSection,
  FormSelect,
  FormTextarea,
} from "@/components/ui/form";
import { BLOOD_TYPES, GENDER } from "@/constants/profile";

import { HealthProfileFormValues } from "./index";

interface Props {
  form: UseFormReturn<HealthProfileFormValues>;
}

export default function PersonFields({ form }: Props) {
  return (
    <FormSection title="ข้อมูลส่วนตัว">
      <FormInput
        form={form}
        name="nationalId"
        label="เลขบัตรประชาชน"
        placeholder="1-2345-67890-12-3"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          form={form}
          name="firstName"
          label="ชื่อ"
          placeholder="ชื่อ"
        />

        <FormInput
          form={form}
          name="lastName"
          label="นามสกุล"
          placeholder="นามสกุล"
        />
      </div>

      <FormInput
        form={form}
        name="nickname"
        label="ชื่อเล่น"
        placeholder="ชื่อเล่น"
      />

      <FormRadioGroup
        form={form}
        name="gender"
        label="เพศ"
        options={GENDER}
        variant="card"
      />

      <FormDateInput form={form} name="birthday" label="วันเกิด" />

      <FormSelect
        form={form}
        name="bloodType"
        label="กรุ๊ปเลือด"
        placeholder="ไม่ระบุ"
        options={BLOOD_TYPES}
      />

      <FormTextarea
        form={form}
        name="chronicDiseases"
        label='โรคประจำตัว - เขียนคั่นด้วยคอมม่า " , " '
        placeholder="เช่น เบาหวาน, ความดัน, ภูมิแพ้ (คั่นด้วย ,)"
        rows={3}
      />
    </FormSection>
  );
}

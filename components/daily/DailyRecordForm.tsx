"use client";

import { useForm } from "react-hook-form";

import {
  FormChipGroup,
  FormInputNumber,
  FormSection,
  FormTextarea,
} from "@/components/ui/form";

import { DAILY_SYMPTOMS } from "@/constants/daily";

import { DailyRecordFormValues } from "./types";
import { Button, Card } from "../ui";

interface DailyRecordFormProps {
  defaultValues?: Partial<DailyRecordFormValues>;

  onSubmit: (data: DailyRecordFormValues) => void | Promise<void>;

  submitting?: boolean;
}
export default function DailyRecordForm({
  defaultValues,
  onSubmit,
  submitting,
}: DailyRecordFormProps) {
  const form = useForm<DailyRecordFormValues>({
    defaultValues: {
      systolic: undefined,
      diastolic: undefined,

      pulse: undefined,

      spo2: undefined,

      weight: undefined,

      temperature: undefined,

      bloodSugar: undefined,

      symptoms: [],

      note: "",

      ...defaultValues,
    },
  });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-8">
        {/* ----------------------------- */}
        {/* สัญญาณชีพ */}
        {/* ----------------------------- */}
        <Card className="p-6">
          <FormSection title="🩺 สัญญาณชีพ">
            <div className="grid grid-cols-2 gap-4">
              <FormInputNumber
                form={form}
                name="systolic"
                label="SYS (ตัวบน)"
                suffix="mmHg"
              />

              <FormInputNumber
                form={form}
                name="diastolic"
                label="DIA (ตัวล่าง)"
                suffix="mmHg"
              />
            </div>

            <FormInputNumber
              form={form}
              name="pulse"
              label="ชีพจร"
              suffix="bpm"
            />

            <FormInputNumber form={form} name="spo2" label="SpO₂" suffix="%" />
          </FormSection>
        </Card>

        {/* ----------------------------- */}
        {/* สุขภาพทั่วไป */}
        {/* ----------------------------- */}
        <Card className="p-6">
          <FormSection title="🩺 สุขภาพทั่วไป">
            <FormInputNumber
              form={form}
              name="weight"
              label="น้ำหนัก"
              suffix="kg"
            />

            <FormInputNumber
              form={form}
              name="temperature"
              label="อุณหภูมิ"
              suffix="°C"
            />

            <FormInputNumber
              form={form}
              name="bloodSugar"
              label="น้ำตาลในเลือด"
              suffix="mg/dL"
            />
          </FormSection>
        </Card>

        {/* ----------------------------- */}
        {/* อาการ */}
        {/* ----------------------------- */}
        <Card className="p-6">
          <FormSection title="🤒 อาการ">
            <FormChipGroup
              form={form}
              name="symptoms"
              // label="อาการ"
              options={DAILY_SYMPTOMS}
            />
          </FormSection>
        </Card>

        {/* ----------------------------- */}
        {/* หมายเหตุ */}
        {/* ----------------------------- */}
        <Card className="p-6">
          <FormSection title="📝 หมายเหตุ">
            <FormTextarea
              form={form}
              name="note"
              // label="รายละเอียดเพิ่มเติม"
              placeholder="เช่น รับประทานยาหลังอาหาร มีอาการดีขึ้นช่วงเย็น เป็นต้น"
              rows={4}
            />
          </FormSection>
        </Card>

        <div className="">
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </div>
      </div>
    </form>
  );
}

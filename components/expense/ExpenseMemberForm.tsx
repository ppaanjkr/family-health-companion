"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormRadioGroup from "@/components/ui/form/FormRadioGroup";
import FormSelect from "@/components/ui/form/FormSelect";

import { Button } from "@/components/ui";

import { BANKS, BankCode } from "@/constants/bank";
import { ExpenseMember } from "@/types/expense-member";

export type ExpenseMemberFormValues = {
  name: string;
  bank?: BankCode;
  bankAccount?: string;
  active: "true" | "false";
};

type ExpenseMemberFormProps = {
  initialData?: Partial<ExpenseMember>;
  submitText?: string;
  loading?: boolean;
  onSubmit: (values: ExpenseMemberFormValues) => Promise<void>;
  onCancel?: () => void;
};

export default function ExpenseMemberForm({
  initialData,
  submitText = "บันทึก",
  loading = false,
  onSubmit,
  onCancel,
}: ExpenseMemberFormProps) {
  const form = useForm<ExpenseMemberFormValues>({
    defaultValues: {
      name: "",
      bank: undefined,
      bankAccount: "",
      active: "true",
    },
  });

  useEffect(() => {
    if (!initialData) return;

    form.reset({
      name: initialData.name ?? "",
      bank: initialData.bank,
      bankAccount: initialData.bankAccount ?? "",
      active: initialData.active ? "true" : "false",
    });
  }, [initialData, form]);

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput
        form={form}
        name="name"
        label="ชื่อสมาชิก"
        placeholder="เช่น พ่อ, แม่"
      />

      <FormSelect
        form={form}
        name="bank"
        label="ธนาคาร"
        options={BANKS}
        placeholder="เลือกธนาคาร"
      />

      <FormInput
        form={form}
        name="bankAccount"
        label="เลขบัญชี"
        placeholder="123-4-56789-0"
      />

      <FormRadioGroup
        form={form}
        name="active"
        label="สถานะ"
        options={[
          {
            label: "ใช้งาน",
            value: "true",
          },
          {
            label: "ไม่ใช้งาน",
            value: "false",
          },
        ]}
      />

      <div className="mt-6 flex gap-3">
        <Button type="button" outline onClick={onCancel}>
          ยกเลิก
        </Button>

        <Button type="submit" loading={loading}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}

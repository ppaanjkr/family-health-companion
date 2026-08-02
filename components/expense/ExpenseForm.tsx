"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  ChipSelector,
  FormChipGroup,
  FormDateInput,
  FormInput,
  FormInputNumber,
  FormSection,
  FormSelect,
  FormTextarea,
} from "@/components/ui/form";

import { Button, Card } from "@/components/ui";

import { EXPENSE_CATEGORIES, ExpenseCategory } from "@/constants/expense";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";

export type ExpenseFormValues = {
  expenseDate: string;
  title: string;
  amount?: number;
  category: string[];
  payerId: string;
  participantIds: string[];
  note: string;
};

type ExpenseFormProps = {
  members: ExpenseMember[];
  initialData?: Partial<Expense>;
  submitText?: string;
  loading?: boolean;
  onSubmit: (
    values: Omit<ExpenseFormValues, "category"> & {
      category: ExpenseCategory;
    },
  ) => Promise<void>;
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ExpenseForm({
  members,
  initialData,
  submitText = "บันทึก",
  loading = false,
  onSubmit,
}: ExpenseFormProps) {
  const form = useForm<ExpenseFormValues>({
    defaultValues: {
      expenseDate: formatDate(new Date()),
      title: "",
      amount: undefined,
      category: [],
      payerId: "",
      participantIds: [],
      note: "",
    },
  });

  useEffect(() => {
    if (initialData) return;

    if (members.length === 0) return;

    form.setValue(
      "participantIds",
      members.map((member) => member.id),
      {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      },
    );
  }, [members, initialData, form]);

  const amount = form.watch("amount") ?? 0;

  const participantIds = form.watch("participantIds") ?? [];

  const participantOptions = useMemo(
    () =>
      members.map((member) => ({
        value: member.id,
        label: member.name,
      })),
    [members],
  );

  const payerOptions = useMemo(
    () =>
      members.map((member) => ({
        value: member.id,
        label: member.name,
      })),
    [members],
  );

  const summary =
    amount > 0 && participantIds.length > 0
      ? `${amount.toLocaleString()} บาท • หาร ${
          participantIds.length
        } คน • คนละ ${(amount / participantIds.length).toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )} บาท`
      : "";

  async function submit(values: ExpenseFormValues) {
    if (!values.payerId) {
      form.setError("payerId", {
        message: "กรุณาเลือกผู้จ่าย",
      });

      return;
    }

    if (values.participantIds.length === 0) {
      form.setError("participantIds", {
        message: "กรุณาเลือกผู้ร่วมหารอย่างน้อย 1 คน",
      });

      return;
    }

    await onSubmit({
      ...values,
      category: (values.category[0] ?? "other") as ExpenseCategory,
    });
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(submit)}>
      <Card className="p-4">
        <FormSection title="ข้อมูลรายการ">
          <div className="space-y-4">
            <FormDateInput
              form={form}
              name="expenseDate"
              label="วันที่"
              required
              className="hidden"
            />

            <FormInput
              form={form}
              name="title"
              label="ชื่อรายการ"
              required
              placeholder="เช่น ซื้อของเข้าบ้าน"
            />

            <FormChipGroup
              form={form}
              name="category"
              label="หมวดหมู่"
              required
              multiple={false}
              options={EXPENSE_CATEGORIES.map((item) => ({
                value: item.value,
                label: item.label,
              }))}
            />

            <FormInputNumber
              form={form}
              name="amount"
              label="จำนวนเงิน"
              required
              placeholder="0"
              suffix="บาท"
            />
          </div>
        </FormSection>
      </Card>
      <Card className="p-4">
        <FormSection title="การหารค่าใช้จ่าย">
          <div className="space-y-4">
            <FormSelect
              form={form}
              name="payerId"
              label="ผู้จ่าย"
              required
              placeholder="กรุณาเลือกผู้จ่าย"
              options={payerOptions}
            />

            {/* <ChipSelector
              label="ผู้ร่วมหาร"
              required
              options={participantOptions}
              value={participantIds}
              onChange={(value) => {
                form.setValue("participantIds", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                if (value.length > 0) {
                  form.clearErrors("participantIds");
                }
              }}
              error={
                form.formState.errors.participantIds?.message as
                  | string
                  | undefined
              }
            /> */}

            {summary && <p className="text-sm text-slate-500">{summary}</p>}
          </div>
        </FormSection>
      </Card>

      <Card className="p-4">
        <FormSection title="หมายเหตุ">
          <FormTextarea
            form={form}
            name="note"
            label="หมายเหตุ"
            placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
            rows={3}
          />
        </FormSection>
      </Card>

      <Button type="submit" loading={loading} className="w-full">
        {submitText}
      </Button>
    </form>
  );
}

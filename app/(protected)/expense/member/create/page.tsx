"use client";

import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui";

import ExpenseMemberForm, {
  ExpenseMemberFormValues,
} from "@/components/expense/ExpenseMemberForm";

import { ROUTES } from "@/constants/routes";
import { createExpenseMember } from "@/services/expense/expense-member.service";

export default function CreateExpenseMemberPage() {
  const router = useRouter();

  async function handleSubmit(values: ExpenseMemberFormValues) {
    await createExpenseMember({
      name: values.name,
      bank: values.bank,
      bankAccount: values.bankAccount,
      active: values.active === "true",
    });

    router.push(ROUTES.EXPENSE_MEMBERS);
  }

  return (
    <AppShell>
      <PageHeader
        title="เพิ่มสมาชิก"
        backButton
      />

      <div className="mt-6">
        <ExpenseMemberForm onSubmit={handleSubmit} />
      </div>
    </AppShell>
  );
}
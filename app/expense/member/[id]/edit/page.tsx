"use client";

import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { Button, PageHeader } from "@/components/ui";

import ExpenseMemberForm, {
  ExpenseMemberFormValues,
} from "@/components/expense/ExpenseMemberForm";

import {
  deleteExpenseMember,
  getExpenseMember,
  updateExpenseMember,
} from "@/services/expense/expense-member.service";

import { ROUTES } from "@/constants/routes";

import { useEffect, useState } from "react";
import { ExpenseMember } from "@/types/expense-member";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditExpenseMemberPage({
  params,
}: Props) {
  const router = useRouter();

  const [member, setMember] =
    useState<ExpenseMember | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { id } = await params;

      const data = await getExpenseMember(id);

      if (!data) {
        router.replace(ROUTES.EXPENSE_MEMBERS);
        return;
      }

      setMember(data);
      setLoading(false);
    }

    load();
  }, [params, router]);

  async function handleSubmit(
    values: ExpenseMemberFormValues,
  ) {
    if (!member) return;

    await updateExpenseMember(member.id, {
      name: values.name,
      bank: values.bank,
      bankAccount: values.bankAccount,
      active: values.active === "true",
    });

    router.push(ROUTES.EXPENSE_MEMBERS);
  }

  async function handleDelete() {
    if (!member) return;

    if (!confirm("ต้องการลบสมาชิกใช่หรือไม่")) {
      return;
    }

    await deleteExpenseMember(member.id);

    router.push(ROUTES.EXPENSE_MEMBERS);
  }

  if (loading || !member) {
    return null;
  }

  return (
    <AppShell>
      <PageHeader
        title="แก้ไขสมาชิก"
        backButton
      />

      <div className="mt-6 space-y-6">
        <ExpenseMemberForm
          initialData={member}
          submitText="บันทึก"
          onSubmit={handleSubmit}
        />
      </div>
    </AppShell>
  );
}
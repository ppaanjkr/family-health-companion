"use client";

import { Timestamp } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";

import { PageHeader } from "@/components/ui";

import ExpenseForm, {
  type ExpenseFormValues,
} from "@/components/expense/ExpenseForm";

import { toast } from "@/components/ui/toast/toast";

import type { ExpenseCategory } from "@/constants/expense";
import type { ExpenseMember } from "@/types/expense-member";

import { ROUTES } from "@/constants/routes";

import {
  createExpense,
} from "@/services/expense/expense.service";

import {
  getActiveExpenseMembers,
} from "@/services/expense/expense-member.service";

import {
  ensureActiveExpenseCycle,
} from "@/services/expense/expense-cycle.service";

export default function CreateExpensePage() {
  const router = useRouter();

  const [members, setMembers] = useState<
    ExpenseMember[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function loadMembers() {
      try {
        setLoading(true);

        const data =
          await getActiveExpenseMembers();

        setMembers(data);
      } catch (error) {
        console.error(error);

        toast.error({
          title: "เกิดข้อผิดพลาด",
          message:
            "ไม่สามารถโหลดข้อมูลสมาชิกได้",
        });
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  async function handleSubmit(
    values: Omit<
      ExpenseFormValues,
      "category"
    > & {
      category: ExpenseCategory;
    },
  ) {
    try {
      setSaving(true);

      const activeCycle =
        await ensureActiveExpenseCycle();

      await createExpense({
        cycleId: activeCycle.id,

        expenseDate:
          Timestamp.fromDate(
            new Date(values.expenseDate),
          ),

        title: values.title,

        amount: values.amount ?? 0,

        category: values.category,

        payerId: values.payerId,

        participantIds:
          values.participantIds,

        note: values.note,
      });

      toast.success({
        title: "สำเร็จ",
        message:
          "เพิ่มรายการรายจ่ายเรียบร้อยแล้ว",
      });

      router.push(
        ROUTES.EXPENSES,
      );
    } catch (error) {
      console.error(error);

      toast.error({
        title: "เกิดข้อผิดพลาด",
        message:
          "ไม่สามารถบันทึกรายการได้",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AppShell>
        <PageHeader
          title="เพิ่มรายจ่าย"
          backButton
        />

        <div className="mt-6 rounded-xl border bg-white p-6">
          กำลังโหลดข้อมูล...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="เพิ่มรายจ่าย"
        backButton
      />

      <div className="mt-6">
        <ExpenseForm
          members={members}
          loading={saving}
          submitText="บันทึก"
          onSubmit={handleSubmit}
        />
      </div>
    </AppShell>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import { ChartPie, ReceiptText, Scale } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui";

import EmptyState from "@/components/expense/ExpenseEmptyState";
import ExpenseCard from "@/components/expense/ExpenseCard";
import TabButton from "@/components/expense/ExpenseTabs";

import { toast } from "@/components/ui/toast/toast";

import { getExpenseCycle } from "@/services/expense/expense-cycle.service";

import { getExpenses } from "@/services/expense/expense.service";

import { getExpenseMembers } from "@/services/expense/expense-member.service";

import { getExpenseCycleDisplayName } from "@/lib/utils/getExpenseCycleDisplayName";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";
import type { ExpenseCycle } from "@/types/expense-cycle";
import ExpenseContent from "@/components/expense/ExpenseContent";

type TabType = "list" | "settlement" | "summary";

export default function ExpenseHistoryDetailPage() {
  const params = useParams();

  const cycleId = params.id as string;

  const [activeTab, setActiveTab] = useState<TabType>("list");

  const [cycle, setCycle] = useState<ExpenseCycle | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [members, setMembers] = useState<ExpenseMember[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const expenseCycle = await getExpenseCycle(cycleId);

        if (!expenseCycle) {
          throw new Error("Expense cycle not found");
        }

        const [expenseData, memberData] = await Promise.all([
          getExpenses(cycleId),
          getExpenseMembers(),
        ]);

        setCycle(expenseCycle);
        setExpenses(expenseData);
        setMembers(memberData);
      } catch (error) {
        console.error(error);

        toast.error({
          title: "เกิดข้อผิดพลาด",
          message: "ไม่สามารถโหลดข้อมูลได้",
        });
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [cycleId]);

  const totalAmount = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses],
  );

  const monthYear = cycle
    ? getExpenseCycleDisplayName(cycle.month, cycle.year)
    : "-";

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="ประวัติค่าใช้จ่าย" backButton />

        <ExpenseContent
          cycle={cycle}
          expenses={expenses}
          members={members}
          readonly
        />
      </div>
    </AppShell>
  );
}

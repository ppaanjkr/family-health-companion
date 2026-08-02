"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui";

import ExpenseCycleCard from "@/components/expense/ExpenseCycleCard";
import EmptyState from "@/components/expense/ExpenseEmptyState";

import { getExpenseCycles } from "@/services/expense/expense-cycle.service";
import { getExpenses } from "@/services/expense/expense.service";

import type { ExpenseCycle } from "@/types/expense-cycle";

import { toast } from "@/components/ui/toast/toast";

type ExpenseCycleWithSummary = ExpenseCycle & {
  expenseCount: number;
  totalAmount: number;
};

export default function ExpenseHistoryPage() {
  const [cycles, setCycles] = useState<
    ExpenseCycleWithSummary[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const expenseCycles =
          await getExpenseCycles();

        const result =
          await Promise.all(
            expenseCycles.map(
              async (cycle) => {
                const expenses =
                  await getExpenses(
                    cycle.id,
                  );

                return {
                  ...cycle,

                  expenseCount:
                    expenses.length,

                  totalAmount:
                    expenses.reduce(
                      (
                        sum,
                        item,
                      ) =>
                        sum +
                        item.amount,
                      0,
                    ),
                };
              },
            ),
          );

        setCycles(result);
      } catch (error) {
        console.error(error);

        toast.error({
          title:
            "เกิดข้อผิดพลาด",
          message:
            "ไม่สามารถโหลดประวัติรอบค่าใช้จ่ายได้",
        });
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="ประวัติค่าใช้จ่าย"
          backButton
        />

        {loading && (
          <div className="py-10 text-center text-slate-500">
            กำลังโหลด...
          </div>
        )}

        {!loading &&
          cycles.length === 0 && (
            <EmptyState
              title="ยังไม่มีประวัติ"
              description="เมื่อมีการปิดรอบ ประวัติจะแสดงที่นี่"
            />
          )}

        {!loading && (
          <div className="space-y-3">
            {cycles.map(
              (cycle) => (
                <ExpenseCycleCard
                  key={
                    cycle.id
                  }
                  cycle={cycle}
                />
              ),
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
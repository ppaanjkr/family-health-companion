"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartPie, History, ReceiptText, Scale } from "lucide-react";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { Button, PageHeader } from "@/components/ui";

import EmptyState from "@/components/expense/ExpenseEmptyState";
import ExpenseCard from "@/components/expense/ExpenseCard";
import TabButton from "@/components/expense/ExpenseTabs";

import { ROUTES } from "@/constants/routes";

import { deleteExpense, getExpenses } from "@/services/expense/expense.service";

import { getActiveExpenseMembers } from "@/services/expense/expense-member.service";

import {
  closeCurrentExpenseCycle,
  ensureActiveExpenseCycle,
} from "@/services/expense/expense-cycle.service";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";
import type { ExpenseCycle } from "@/types/expense-cycle";

import { toast } from "@/components/ui/toast/toast";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import SettlementList from "@/components/expense/SettlementList";
import SummaryList from "@/components/expense/SummaryList";
import ExpenseContent from "@/components/expense/ExpenseContent";

type TabType = "list" | "settlement" | "summary";

export default function ExpensePage() {
  const [activeTab, setActiveTab] = useState<TabType>("list");

  const [activeCycle, setActiveCycle] = useState<ExpenseCycle | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [members, setMembers] = useState<ExpenseMember[]>([]);

  const [loading, setLoading] = useState(true);

  const [deleteExpenseItem, setDeleteExpenseItem] = useState<Expense | null>(
    null,
  );

  // confirm modal
  type DialogType = "close-cycle" | "delete-expense" | null;

  const [dialogType, setDialogType] = useState<DialogType>(null);

  const [dialogLoading, setDialogLoading] = useState(false);

  async function loadData() {
    try {
      setLoading(true);

      const cycle = await ensureActiveExpenseCycle();

      const [expenseData, memberData] = await Promise.all([
        getExpenses(cycle.id),
        getActiveExpenseMembers(),
      ]);

      setActiveCycle(cycle);
      setExpenses(expenseData);
      setMembers(memberData);
    } catch (error) {
      console.error(error);

      toast.error({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถโหลดข้อมูลค่าใช้จ่ายได้",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      await loadData();
    }

    void init();
  }, []);

  const totalAmount = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses],
  );

  const currentMonthYear = useMemo(() => {
    if (!activeCycle) {
      return "-";
    }

    return new Date(activeCycle.year, activeCycle.month - 1).toLocaleDateString(
      "th-TH",
      {
        month: "long",
        year: "numeric",
      },
    );
  }, [activeCycle]);

  // ปิดรอบ
  function handleCloseCycle() {
    setDialogType("close-cycle");
    // setConfirmCloseOpen(true);
  }
  async function confirmCloseCycle() {
    try {
      setDialogLoading(true);

      await closeCurrentExpenseCycle();

      toast.success({
        title: "สำเร็จ",
        message: "ปิดรอบค่าใช้จ่ายเรียบร้อยแล้ว",
      });

      setDialogLoading(false);
      setDialogType(null);

      await loadData();
    } catch (error) {
      console.error(error);

      toast.error({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถปิดรอบได้",
      });
    } finally {
      setDialogLoading(false);
    }
  }

  // ลบรายการ
  function handleDeleteExpense(expense: Expense) {
    setDeleteExpenseItem(expense);
    setDialogType("delete-expense");
  }
  async function confirmDeleteExpense() {
    if (!deleteExpenseItem) {
      return;
    }

    try {
      setDialogLoading(true);

      await deleteExpense(deleteExpenseItem.id);

      setDialogLoading(false);
      setDialogType(null);
      setDeleteExpenseItem(null);

      await loadData();

      toast.success({
        title: "สำเร็จ",
        message: "ลบรายการเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error(error);

      toast.error({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถลบรายการได้",
      });
    } finally {
      setDialogLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="ค่าใช้จ่าย"
          rightAction={
            <Link href={ROUTES.EXPENSE_HISTORY}>
              <History
                size={20}
                className="text-gray-500 transition hover:text-gray-700"
              />
            </Link>
          }
        />

        <div className="flex flex-col gap-2">
          <Link href={ROUTES.EXPENSE_CREATE}>
            <Button className="h-12 w-full">เพิ่มรายการ</Button>
          </Link>
          <button onClick={handleCloseCycle} className="text-sm text-gray-500">
            ปิดรอบ
          </button>
        </div>

        <ExpenseContent
          cycle={activeCycle!}
          expenses={expenses}
          members={members}
          onDelete={handleDeleteExpense}
        />
      </div>
      <ConfirmDialog
        open={dialogType !== null}
        title={dialogType === "close-cycle" ? "ปิดรอบค่าใช้จ่าย" : "ลบรายการ"}
        description={
          dialogType === "close-cycle"
            ? `ต้องการปิดรอบ ${currentMonthYear} และสร้างรอบถัดไปใช่หรือไม่?`
            : `ต้องการลบรายการ "${deleteExpenseItem?.title ?? ""}" ใช่หรือไม่?`
        }
        confirmText={dialogType === "close-cycle" ? "ปิดรอบ" : "ลบ"}
        cancelText="ยกเลิก"
        danger
        loading={dialogLoading}
        onConfirm={
          dialogType === "close-cycle"
            ? confirmCloseCycle
            : confirmDeleteExpense
        }
        onCancel={() => {
          setDialogType(null);
          setDeleteExpenseItem(null);
        }}
      />
    </AppShell>
  );
}

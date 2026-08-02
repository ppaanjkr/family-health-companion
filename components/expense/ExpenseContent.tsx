"use client";

import { useMemo, useState } from "react";

import {
  ChartPie,
  ReceiptText,
  Scale,
} from "lucide-react";

import EmptyState from "./ExpenseEmptyState";
import ExpenseCard from "./ExpenseCard";
import SettlementList from "./SettlementList";
import SummaryList from "./SummaryList";
import TabButton from "./ExpenseTabs";

import { getExpenseCycleDisplayName } from "@/lib/utils/getExpenseCycleDisplayName";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";
import type { ExpenseCycle } from "@/types/expense-cycle";

type TabType =
  | "list"
  | "settlement"
  | "summary";

type ExpenseContentProps = {
  cycle: ExpenseCycle | null;

  expenses: Expense[];

  members: ExpenseMember[];

  readonly?: boolean;

  onDelete?: (
    expense: Expense,
  ) => void;
};

export default function ExpenseContent({
  cycle,
  expenses,
  members,
  readonly = false,
  onDelete,
}: ExpenseContentProps) {
  const [activeTab, setActiveTab] =
    useState<TabType>("list");

  const totalAmount = useMemo(
    () =>
      expenses.reduce(
        (sum, item) =>
          sum + item.amount,
        0,
      ),
    [expenses],
  );

  const monthYear = cycle
  ? getExpenseCycleDisplayName(
      cycle.month,
      cycle.year,
    )
  : "-";

  return (
    <>
      <div className="space-y-1">
        <p className="text-gray-500">
          {monthYear}
        </p>

        <h2 className="text-4xl font-bold">
          ฿
          {totalAmount.toLocaleString()}
        </h2>

        <p className="text-sm text-gray-500">
          {expenses.length} รายการ
        </p>
      </div>

      <div className="grid grid-cols-3 rounded-xl bg-gray-100 p-1">
        <TabButton
          active={activeTab === "list"}
          icon={<ReceiptText size={16} />}
          label="รายการ"
          onClick={() =>
            setActiveTab("list")
          }
        />

        <TabButton
          active={
            activeTab ===
            "settlement"
          }
          icon={<Scale size={16} />}
          label="หารเงิน"
          onClick={() =>
            setActiveTab(
              "settlement",
            )
          }
        />

        <TabButton
          active={
            activeTab ===
            "summary"
          }
          icon={<ChartPie size={16} />}
          label="สรุป"
          onClick={() =>
            setActiveTab(
              "summary",
            )
          }
        />
      </div>

      <div className="flex flex-col space-y-3">
        {activeTab === "list" &&
          (expenses.length === 0 ? (
            <EmptyState
              title="ยังไม่มีรายการ"
              description="ไม่มีข้อมูลในรอบนี้"
            />
          ) : (
            expenses.map(
              (expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={
                    expense
                  }
                  members={
                    members
                  }
                  readonly={
                    readonly
                  }
                  onDelete={
                    onDelete
                  }
                />
              ),
            )
          ))}

        {activeTab ===
          "settlement" && (
          <SettlementList
            expenses={expenses}
            members={members}
          />
        )}

        {activeTab ===
          "summary" && (
          <SummaryList
            monthYear={
              monthYear
            }
            expenses={
              expenses
            }
            members={
              members
            }
          />
        )}
      </div>
    </>
  );
}
"use client";

import { MoveRight } from "lucide-react";

import { Card } from "@/components/ui";

import EmptyState from "./ExpenseEmptyState";

import {
  calculateMemberBalances,
  calculateSettlement,
} from "@/services/expense/expense-calculator.service";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";

type SettlementListProps = {
  expenses: Expense[];
  members: ExpenseMember[];
};

export default function SettlementList({
  expenses,
  members,
}: SettlementListProps) {
  const balances =
    calculateMemberBalances(
      expenses,
      members,
    );

  const settlements =
    calculateSettlement(
      balances,
    );

  if (settlements.length === 0) {
    return (
      <EmptyState
        title="ไม่มีรายการที่ต้องโอน"
        description="ทุกคนชำระครบเรียบร้อยแล้ว"
      />
    );
  }

  return (
    <div className="space-y-3">
      {settlements.map(
        (settlement, index) => (
          <Card
            key={index}
            className="px-5 py-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex min-w-0 flex-1 items-center  gap-4">
                <span className="truncate font-medium text-slate-900">
                  {settlement.fromMemberName}
                </span>

                <MoveRight
                  size={20}
                  className="shrink-0 text-slate-400"
                />

                <span className="truncate font-medium text-slate-900">
                  {settlement.toMemberName}
                </span>
              </div>

              <span className="shrink-0 text-lg font-semibold text-sky-600">
                ฿
                {settlement.amount.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </span>
            </div>
          </Card>
        ),
      )}
    </div>
  );
}
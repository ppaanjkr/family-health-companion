"use client";

import { Trash2 } from "lucide-react";

import { Card } from "@/components/ui";

import { EXPENSE_CATEGORIES } from "@/constants/expense";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";

type ExpenseCardProps = {
  expense: Expense;
  members: ExpenseMember[];
  onDelete?: (expense: Expense) => void;
  readonly?: boolean;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseCard({
  expense,
  members,
  onDelete,
  readonly = false,
}: ExpenseCardProps) {
  const category = EXPENSE_CATEGORIES.find(
    (item) => item.value === expense.category,
  );

  const payer = members.find((member) => member.id === expense.payerId);

  const CategoryIcon = category?.icon;

  return (
    <Card className="rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            {CategoryIcon && <CategoryIcon className="h-5 w-5" />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="">
              <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                {category?.label ?? "-"}
              </span>
            </div>
            <h3 className="mt-1 truncate font-semibold text-slate-900">
              {expense.title}
            </h3>
          </div>
        </div>
        {!readonly && (
          <button
            type="button"
            onClick={() => onDelete?.(expense)}
            className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-300"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-y-3">
        <span className="text-slate-500">วันที่</span>

        <span className="text-right font-medium">
          {formatDate(expense.expenseDate.toDate())}
        </span>

        <span className="text-slate-500">ผู้จ่าย</span>

        <span className="text-right font-medium">{payer?.name ?? "-"}</span>

        {/* <span className="text-slate-500">
          ผู้ร่วมหาร
        </span>

        <span className="text-right font-medium">
          {expense.participantIds.length} คน
        </span> */}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className=" text-slate-500">จำนวนเงิน</span>

        <span className="font-bold text-sky-600">
          ฿{expense.amount.toLocaleString()}
        </span>
      </div>
    </Card>
  );
}

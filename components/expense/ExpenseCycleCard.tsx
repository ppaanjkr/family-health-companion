"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";

import { EXPENSE_CYCLE_STATUS } from "@/constants/expense-cycle";
import { ROUTES } from "@/constants/routes";

import type { ExpenseCycle } from "@/types/expense-cycle";

import { getExpenseCycleDisplayName } from "@/lib/utils/getExpenseCycleDisplayName";

type ExpenseCycleCardProps = {
  cycle: ExpenseCycle & {
    expenseCount: number;
    totalAmount: number;
  };
};

export default function ExpenseCycleCard({ cycle }: ExpenseCycleCardProps) {
  const href = ROUTES.EXPENSE_HISTORY_DETAIL(cycle.id);
  const displayName = getExpenseCycleDisplayName(cycle.month, cycle.year);

  return (
    <Link href={href}>
      <Card className="cursor-pointer p-4 transition hover:ring-2 hover:ring-sky-200 mt-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              {displayName}
            </h3>

            {/* <span
              className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                cycle.status === EXPENSE_CYCLE_STATUS.OPEN
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {cycle.status === EXPENSE_CYCLE_STATUS.OPEN ? "เปิด" : "ปิด"}
            </span> */}
          </div>

          <ChevronRight size={20} className="text-slate-400" />
        </div>

        <div className="mt-5 space-y-2 text-sm">
          {/* <div className="flex justify-between">
            <span className="text-slate-500">จำนวนรายการ</span>

            <span>
              {(cycle.expenseCount ?? 0).toLocaleString()}
            </span>
          </div> */}

          <div className="flex justify-between pt-2">
            <span className="font-medium">ยอดรวม</span>

            <span className="font-semibold text-sky-600">
              ฿{(cycle.totalAmount ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";

import { Card } from "@/components/ui";

import { ROUTES } from "@/constants/routes";

type ExpenseSummaryCardProps = {
  cycleName: string;
  expenseCount: number;
  totalAmount: number;
};

export default function ExpenseSummaryCard({
  cycleName,
  expenseCount,
  totalAmount,
}: ExpenseSummaryCardProps) {
  return (
    <Link href={ROUTES.EXPENSES}>
      <Card className="mt-6 cursor-pointer rounded-3xl p-5 transition hover:ring-2 hover:ring-sky-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              ค่าใช้จ่ายรอบปัจจุบัน
            </p>

            <h2 className="mt-1 text-xl font-bold">{cycleName}</h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <Wallet size={24} />
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-sky-600">
              ฿{totalAmount.toLocaleString()}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {expenseCount.toLocaleString()} รายการ
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

"use client";

import { Card } from "@/components/ui";

type SummaryOverviewProps = {
  monthYear: string;
  totalAmount: number;
  expenseCount: number;
};

export default function SummaryOverview({
  monthYear,
  totalAmount,
  expenseCount,
}: SummaryOverviewProps) {
  return (
    <Card className="rounded-2xl p-6 text-center shadow-sm">
      <p className="text-sm text-slate-500">
        {monthYear}
      </p>

      <h2 className="mt-2 text-4xl font-bold text-slate-900">
        ฿
        {totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {expenseCount} รายการ
      </p>
    </Card>
  );
}
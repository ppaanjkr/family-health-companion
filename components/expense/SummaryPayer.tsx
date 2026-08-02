"use client";

import { Card } from "@/components/ui";

import type {
  PayerSummary,
} from "@/types/expense-calculator";

type SummaryPayerProps = {
  payers: PayerSummary[];
};

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SummaryPayer({
  payers,
}: SummaryPayerProps) {
  if (payers.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-2xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold">
        ผู้จ่าย
      </h3>

      <div className="mt-5 divide-y divide-slate-200">
        {payers.map((payer) => (
          <div
            key={payer.memberId}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="font-medium text-slate-900">
                {payer.memberName}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {payer.expenseCount} รายการ
              </p>
            </div>

            <span className="text-lg font-semibold text-sky-600">
              ฿
              {formatMoney(
                payer.amount,
              )}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
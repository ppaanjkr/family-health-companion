"use client";

import { Card } from "@/components/ui";

import type {
  CategorySummary,
} from "@/types/expense-calculator";

type SummaryCategoryProps = {
  categories: CategorySummary[];
};

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SummaryCategory({
  categories,
}: SummaryCategoryProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-2xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold">
        ตามหมวดหมู่
      </h3>

      <div className="mt-5 space-y-5">
        {categories.map((category) => (
          <div key={category.category}>
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {category.label}
              </span>

              <span className="text-sm text-slate-500">
                {category.percentage}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-sky-500 transition-all"
                style={{
                  width: `${category.percentage}%`,
                }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">
                {category.expenseCount} รายการ
              </span>

              <span className="font-medium">
                ฿{formatMoney(category.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
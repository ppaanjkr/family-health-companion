"use client";

import SummaryOverview from "./SummaryOverview";
import SummaryCategory from "./SummaryCategory";
import SummaryPayer from "./SummaryPayer";

import {
  calculateCategorySummary,
  calculatePayerSummary,
} from "@/services/expense/expense-calculator.service";

import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";

type SummaryListProps = {
  monthYear: string;
  expenses: Expense[];
  members: ExpenseMember[];
};

export default function SummaryList({
  monthYear,
  expenses,
  members,
}: SummaryListProps) {
  const totalAmount = expenses.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const categories =
    calculateCategorySummary(expenses);

  const payers =
    calculatePayerSummary(
      expenses,
      members,
    );

  return (
    <div className="space-y-4">
      <SummaryOverview
        monthYear={monthYear}
        totalAmount={totalAmount}
        expenseCount={expenses.length}
      />

      <SummaryCategory
        categories={categories}
      />

      <SummaryPayer
        payers={payers}
      />
    </div>
  );
}
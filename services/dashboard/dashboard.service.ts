import { getActiveExpenseCycle } from "@/services/expense/expense-cycle.service";
import { getExpenses } from "@/services/expense/expense.service";
import { getExpenseCycleDisplayName } from "@/lib/utils/getExpenseCycleDisplayName";

export type DashboardExpenseSummary = {
  cycleId: string;
  cycleName: string;
  totalAmount: number;
  expenseCount: number;
};

export async function getCurrentExpenseSummary(): Promise<DashboardExpenseSummary | null> {
  const cycle = await getActiveExpenseCycle();

  if (!cycle) {
    return null;
  }

  const expenses = await getExpenses(cycle.id);

  return {
    cycleId: cycle.id,
    cycleName: getExpenseCycleDisplayName(
      cycle.month,
      cycle.year,
    ),
    expenseCount: expenses.length,
    totalAmount: expenses.reduce(
      (sum, item) => sum + item.amount,
      0,
    ),
  };
}
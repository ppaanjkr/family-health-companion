import { getExpenseCycle } from "./expense-cycle.service";
import { getExpenses } from "./expense.service";
import { getExpenseMembers } from "./expense-member.service";

export async function getExpenseHistory(
  cycleId: string,
) {
  const cycle = await getExpenseCycle(cycleId);

  if (!cycle) {
    throw new Error("Expense cycle not found.");
  }

  const [expenses, members] =
    await Promise.all([
      getExpenses(cycleId),
      getExpenseMembers(),
    ]);

  return {
    cycle,
    expenses,
    members,
  };
}
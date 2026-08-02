export const EXPENSE_CYCLE_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

export type ExpenseCycleStatus =
  (typeof EXPENSE_CYCLE_STATUS)[keyof typeof EXPENSE_CYCLE_STATUS];
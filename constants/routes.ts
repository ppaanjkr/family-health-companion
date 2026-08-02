// constants/routes.ts
export const ROUTES = {
  LOGIN: "/login",

  DASHBOARD: "/",

  DAILY: "/daily",

  FAMILY: "/family",
  FAMILY_NEW: "/family/create",

  PROFILE: "/profile",

  EXPENSES: "/expense",
  EXPENSE_CREATE: "/expense/create",
  EXPENSE_MEMBERS: "/expense/member",
  EXPENSE_MEMBER_NEW: "/expense/member/create",
  EXPENSE_HISTORY: "/expense/history",
  EXPENSE_HISTORY_DETAIL: (id: string) =>
  `/expense/history/${id}`,
} as const;
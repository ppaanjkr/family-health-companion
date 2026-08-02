import { Timestamp } from "firebase/firestore";

import { BaseModel } from "./common";

import type { ExpenseCycleStatus } from "@/constants/expense-cycle";

export type ExpenseCycle = BaseModel & {
  month: number;
  year: number;
  status: ExpenseCycleStatus;
  closedAt?: Timestamp;
};

export type CreateExpenseCycle = Omit<
  ExpenseCycle,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "closedAt"
>;

export type UpdateExpenseCycle =
  Partial<CreateExpenseCycle>;
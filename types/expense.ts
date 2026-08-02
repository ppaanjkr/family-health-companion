import { Timestamp } from "firebase/firestore";

import { ExpenseCategory } from "@/constants/expense";

import { BaseModel } from "./common";

export type Expense = BaseModel & {
  cycleId: string;

  expenseDate: Timestamp;

  title: string;

  amount: number;

  category: ExpenseCategory;

  payerId: string;

  participantIds: string[];

  note?: string;
};

export type CreateExpense = Omit<
  Expense,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateExpense = Partial<CreateExpense>;
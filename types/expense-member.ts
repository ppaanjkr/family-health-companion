import { BankCode } from "@/constants/bank";
import { BaseModel } from "./common";

export type ExpenseMember = BaseModel & {
  name: string;
  bank?: BankCode;
  bankAccount?: string;
  active: boolean;
};

export type CreateExpenseMember = Omit<
  ExpenseMember,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateExpenseMember =
  Partial<CreateExpenseMember>;
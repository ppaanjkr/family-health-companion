import {
  UtensilsCrossed,
  Lightbulb,
  ShoppingBasket,
  CreditCard,
  House,
  Ellipsis,
} from "lucide-react";

export const EXPENSE_CATEGORIES = [
  {
    value: "food",
    label: "อาหาร",
    icon: UtensilsCrossed,
  },
  {
    value: "utility",
    label: "ค่าน้ำค่าไฟ",
    icon: Lightbulb,
  },
  {
    value: "shopping",
    label: "ของใช้",
    icon: ShoppingBasket,
  },
  {
    value: "subscription",
    label: "ค่าบริการรายเดือน",
    icon: CreditCard,
  },
  {
    value: "home_repair",
    label: "ค่าซ่อมแซมบ้าน",
    icon: House,
  },
  {
    value: "other",
    label: "อื่น ๆ",
    icon: Ellipsis,
  },
] as const;

export type ExpenseCategory =
  (typeof EXPENSE_CATEGORIES)[number]["value"];
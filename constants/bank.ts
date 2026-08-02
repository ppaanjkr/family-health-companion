export const BANKS = [
  {
    value: "SCB",
    label: "ไทยพาณิชย์",
  },
  {
    value: "KBANK",
    label: "กสิกรไทย",
  },
  {
    value: "KTB",
    label: "กรุงไทย",
  },
  {
    value: "BBL",
    label: "กรุงเทพ",
  },
  {
    value: "TTB",
    label: "ทีทีบี",
  },
] as const;

export type BankCode =
  (typeof BANKS)[number]["value"];
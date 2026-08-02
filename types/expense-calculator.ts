export type MemberBalance = {
  memberId: string;
  memberName: string;
  paid: number;
  share: number;
  balance: number;
};

export type SettlementItem = {
  fromMemberId: string;
  fromMemberName: string;

  toMemberId: string;
  toMemberName: string;

  amount: number;
};

export type CategorySummary = {
  category: string;
  label: string;

  amount: number;

  percentage: number;

  expenseCount: number;
};

export type PayerSummary = {
  memberId: string;

  memberName: string;

  amount: number;

  expenseCount: number;
};
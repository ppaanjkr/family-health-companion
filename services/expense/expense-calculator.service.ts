import type { Expense } from "@/types/expense";
import type { ExpenseMember } from "@/types/expense-member";

import type {
  MemberBalance,
  SettlementItem,
  CategorySummary,
  PayerSummary,
} from "@/types/expense-calculator";

import {
  EXPENSE_CATEGORIES,
} from "@/constants/expense";


type MemberBalanceMap = Record<
  string,
  MemberBalance
>;

/**
 * คำนวณยอดจ่าย ยอดที่ควรจ่าย และยอดคงเหลือของสมาชิกแต่ละคน
 */
export function calculateMemberBalances(
  expenses: Expense[],
  members: ExpenseMember[],
): MemberBalance[] {
  const balances: MemberBalanceMap = {};

  // เตรียมข้อมูลสมาชิก
  members.forEach((member) => {
    balances[member.id] = {
      memberId: member.id,
      memberName: member.name,
      paid: 0,
      share: 0,
      balance: 0,
    };
  });

  // คำนวณแต่ละรายการ
  expenses.forEach((expense) => {
    const payer =
      balances[expense.payerId];

    if (payer) {
      payer.paid += expense.amount;
    }

    const participantCount =
      expense.participantIds.length;

    if (participantCount === 0) {
      return;
    }

    const sharePerPerson =
      expense.amount / participantCount;

    expense.participantIds.forEach(
      (participantId) => {
        const participant =
          balances[participantId];

        if (!participant) {
          return;
        }

        participant.share +=
          sharePerPerson;
      },
    );
  });

  // คำนวณ Balance
  Object.values(balances).forEach(
    (member) => {
      member.balance =
        member.paid - member.share;
    },
  );

  return Object.values(balances);
}

/**
 * คำนวณรายการโอนเงินเพื่อให้ทุกคนจ่ายเท่ากัน
 */
export function calculateSettlement(
  balances: MemberBalance[],
): SettlementItem[] {
  const EPSILON = 0.01;

  const creditors = balances
    .filter((member) => member.balance > EPSILON)
    .map((member) => ({
      ...member,
      remaining: member.balance,
    }))
    .sort(
      (a, b) => b.remaining - a.remaining,
    );

  const debtors = balances
    .filter((member) => member.balance < -EPSILON)
    .map((member) => ({
      ...member,
      remaining: Math.abs(member.balance),
    }))
    .sort(
      (a, b) => b.remaining - a.remaining,
    );

  const settlements: SettlementItem[] = [];

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (
    creditorIndex < creditors.length &&
    debtorIndex < debtors.length
  ) {
    const creditor =
      creditors[creditorIndex];

    const debtor =
      debtors[debtorIndex];

    const amount = Math.min(
      creditor.remaining,
      debtor.remaining,
    );

    settlements.push({
      fromMemberId: debtor.memberId,
      fromMemberName: debtor.memberName,

      toMemberId: creditor.memberId,
      toMemberName: creditor.memberName,

      amount: Number(amount.toFixed(2)),
    });

    creditor.remaining -= amount;
    debtor.remaining -= amount;

    if (creditor.remaining <= EPSILON) {
      creditorIndex++;
    }

    if (debtor.remaining <= EPSILON) {
      debtorIndex++;
    }
  }

  return settlements;
}

export function calculateCategorySummary(
  expenses: Expense[],
): CategorySummary[] {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const map = new Map<
    string,
    CategorySummary
  >();

  expenses.forEach((expense) => {
    const category =
      EXPENSE_CATEGORIES.find(
        (item) =>
          item.value === expense.category,
      );

    if (!category) {
      return;
    }

    if (!map.has(category.value)) {
      map.set(category.value, {
        category: category.value,
        label: category.label,
        amount: 0,
        percentage: 0,
        expenseCount: 0,
      });
    }

    const item = map.get(category.value)!;

    item.amount += expense.amount;
    item.expenseCount++;
  });

  const result = Array.from(
    map.values(),
  );

  result.forEach((item) => {
    item.percentage =
      totalAmount === 0
        ? 0
        : Number(
            (
              (item.amount /
                totalAmount) *
              100
            ).toFixed(1),
          );
  });

  return result.sort(
    (a, b) => b.amount - a.amount,
  );
}

export function calculatePayerSummary(
  expenses: Expense[],
  members: ExpenseMember[],
): PayerSummary[] {
  const map = new Map<
    string,
    PayerSummary
  >();

  members.forEach((member) => {
    map.set(member.id, {
      memberId: member.id,
      memberName: member.name,
      amount: 0,
      expenseCount: 0,
    });
  });

  expenses.forEach((expense) => {
    const payer = map.get(
      expense.payerId,
    );

    if (!payer) {
      return;
    }

    payer.amount += expense.amount;
    payer.expenseCount++;
  });

  return Array.from(
    map.values(),
  )
    .filter(
      (item) => item.expenseCount > 0,
    )
    .sort(
      (a, b) => b.amount - a.amount,
    );
}
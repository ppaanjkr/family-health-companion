import Link from "next/link";
import { Plus } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { Button, PageHeader } from "@/components/ui";

import ExpenseMemberCard from "@/components/expense/ExpenseMemberCard";

import { ROUTES } from "@/constants/routes";
import { getExpenseMembers } from "@/services/expense/expense-member.service";

export default async function ExpenseMemberPage() {
  const members = await getExpenseMembers();

  return (
    <AppShell>
      <PageHeader
        title="สมาชิกหารค่าใช้จ่าย"
        backButton
      />

      <div className="mt-6">
        <Link href={ROUTES.EXPENSE_MEMBER_NEW}>
          <Button className="w-full">
            เพิ่มสมาชิก
          </Button>
        </Link>
      </div>

      <div className="mt-6 space-y-4 flex flex-col">
        {members.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            ยังไม่มีสมาชิก
          </p>
        ) : (
          members.map((member) => (
            <ExpenseMemberCard
              key={member.id}
              member={member}
            />
          ))
        )}
      </div>
    </AppShell>
  );
}
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";

import { Card } from "@/components/ui";

import { BANKS } from "@/constants/bank";
import { ROUTES } from "@/constants/routes";
import { ExpenseMember } from "@/types/expense-member";

type ExpenseMemberCardProps = {
  member: ExpenseMember;
};

export default function ExpenseMemberCard({
  member,
}: ExpenseMemberCardProps) {
  const bankName =
    BANKS.find((x) => x.value === member.bank)?.label ?? "-";

  return (
    <Link href={`${ROUTES.EXPENSE_MEMBERS}/${member.id}/edit`}>
      <Card className="cursor-pointer p-5 transition hover:ring-2 hover:ring-sky-200">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
              <User
                size={20}
                className="text-slate-500"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">
                {member.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                ธนาคาร : {bankName}
              </p>

              <p className="text-sm text-slate-500">
                เลขบัญชี : {member.bankAccount || "-"}
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  member.active
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {member.active ? "ใช้งาน" : "ไม่ใช้งาน"}
              </span>
            </div>
          </div>

          <ChevronRight
            className="text-slate-400"
            size={20}
          />
        </div>
      </Card>
    </Link>
  );
}
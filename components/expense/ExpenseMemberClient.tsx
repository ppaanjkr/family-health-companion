"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui";

import ExpenseMemberCard from "./ExpenseMemberCard";
import ExpenseMemberForm, {
  ExpenseMemberFormValues,
} from "./ExpenseMemberForm";

import {
  createExpenseMember,
  deleteExpenseMember,
  updateExpenseMember,
} from "@/services/expense/expense-member.service";

import { ExpenseMember } from "@/types/expense-member";

type Props = {
  initialMembers: ExpenseMember[];
};

export default function ExpenseMemberClient({
  initialMembers,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [isAdding, setIsAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleCreate(values: ExpenseMemberFormValues) {
    await createExpenseMember({
      name: values.name,
      bank: values.bank,
      bankAccount: values.bankAccount,
      active: values.active === "true",
    });

    setIsAdding(false);

    startTransition(() => {
      router.refresh();
    });
  }

  async function handleUpdate(
    id: string,
    values: ExpenseMemberFormValues
  ) {
    await updateExpenseMember(id, {
      name: values.name,
      bank: values.bank,
      bankAccount: values.bankAccount,
      active: values.active === "true",
    });

    setEditingId(null);

    startTransition(() => {
      router.refresh();
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("ลบสมาชิกนี้ใช่หรือไม่")) {
      return;
    }

    await deleteExpenseMember(id);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="space-y-5">
      {!isAdding && (
        <Button
          className="w-full"
          onClick={() => setIsAdding(true)}
        >
          เพิ่มสมาชิก
        </Button>
      )}

      {isAdding && (
        <ExpenseMemberForm
          loading={isPending}
          submitText="เพิ่มสมาชิก"
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {initialMembers.length === 0 ? (
        <p className="text-center text-sm text-slate-500">
          
        </p>
      ) : (
        <div className="space-y-4">
          {initialMembers.map((member) => (
            <ExpenseMemberCard
              key={member.id}
              member={member}
              editing={editingId === member.id}
              onEdit={() => setEditingId(member.id)}
              onCancel={() => setEditingId(null)}
              onDelete={() => handleDelete(member.id)}
              onSave={(values) =>
                handleUpdate(member.id, values)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
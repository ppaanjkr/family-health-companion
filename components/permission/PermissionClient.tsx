"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import UserPermissionCard from "./UserPermissionCard";

import type { User } from "@/types/auth";

import { USER_STATUS } from "@/constants/auth";
import { approveUserAction, toggleUserStatusAction } from "@/app/(protected)/permission/actions";
import ConfirmDialog from "../common/ConfirmDialog";



type Props = {
  users: User[];
};

type DialogType = "approve" | "toggle" | null;

export default function PermissionClient({
  users,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [dialogType, setDialogType] =
    useState<DialogType>(null);

  function openApprove(user: User) {
    setSelectedUser(user);
    setDialogType("approve");
  }

  function openToggle(user: User) {
    setSelectedUser(user);
    setDialogType("toggle");
  }

  function closeDialog() {
    if (isPending) return;

    setDialogType(null);
    setSelectedUser(null);
  }

  function handleConfirm() {
    if (!selectedUser) return;

    startTransition(async () => {
      if (dialogType === "approve") {
        await approveUserAction(
          selectedUser.lineUserId,
        );
      }

      if (dialogType === "toggle") {
        await toggleUserStatusAction(
          selectedUser.lineUserId,
          selectedUser.status !==
            USER_STATUS.ACTIVE,
        );
      }

      closeDialog();

      router.refresh();
    });
  }

  return (
    <>
      <div className="mt-6 space-y-3">
        {users.map((user) => (
          <UserPermissionCard
            key={user.id}
            user={user}
            loading={
              isPending &&
              selectedUser?.id === user.id
            }
            onApprove={openApprove}
            onToggle={openToggle}
          />
        ))}
      </div>

      <ConfirmDialog
        open={dialogType !== null}
        loading={isPending}
        title={
          dialogType === "approve"
            ? "อนุมัติผู้ใช้งาน"
            : selectedUser?.status ===
                USER_STATUS.ACTIVE
              ? "ปิดการใช้งาน"
              : "เปิดการใช้งาน"
        }
        description={
          dialogType === "approve"
            ? `ต้องการอนุมัติ "${selectedUser?.displayName}" ใช่หรือไม่?`
            : selectedUser?.status ===
                USER_STATUS.ACTIVE
              ? `ต้องการปิดการใช้งาน "${selectedUser?.displayName}" ใช่หรือไม่?`
              : `ต้องการเปิดการใช้งาน "${selectedUser?.displayName}" ใช่หรือไม่?`
        }
        confirmText={
          dialogType === "approve"
            ? "อนุมัติ"
            : selectedUser?.status ===
                USER_STATUS.ACTIVE
              ? "ปิดใช้งาน"
              : "เปิดใช้งาน"
        }
        cancelText="ยกเลิก"
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />
    </>
  );
}
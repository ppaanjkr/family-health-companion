"use client";

import { Card, Button, Switch } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";

import {
  USER_ROLE,
  USER_STATUS,
} from "@/constants/auth";

import type { User } from "@/types/auth";

type UserPermissionCardProps = {
  user: User;

  loading?: boolean;

  onApprove?: (user: User) => void;

  onToggle?: (
    user: User,
    active: boolean,
  ) => void;
};

export default function UserPermissionCard({
  user,
  loading = false,
  onApprove,
  onToggle,
}: UserPermissionCardProps) {
  const isOwner =
    user.role === USER_ROLE.OWNER;

  const isPending =
    user.status === USER_STATUS.PENDING;

  const isActive =
    user.status === USER_STATUS.ACTIVE;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar
            imageUrl={user.pictureUrl}
            name={user.displayName}
            size="sm"
          />

          <div>
            <h3 className="font-semibold">
              {user.displayName}
            </h3>

            <p
              className={`mt-1 text-sm ${
                isPending
                  ? "text-yellow-600"
                  : isActive
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {isPending
                ? "รอการอนุมัติ"
                : isActive
                  ? "ใช้งาน"
                  : "ปิดใช้งาน"}
            </p>
          </div>
        </div>

        {isOwner ? (
          <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
            Owner
          </span>
        ) : isPending ? (
          <Button
            size="sm"
            loading={loading}
            onClick={() => onApprove?.(user)}
          >
            อนุมัติ
          </Button>
        ) : (
          <Switch
            checked={isActive}
            disabled={loading}
            onCheckedChange={(checked) =>
              onToggle?.(user, checked)
            }
          />
        )}
      </div>
    </Card>
  );
}
// constants/auth.ts
export const USER_ROLE = {
  OWNER: "owner",
  MEMBER: "member",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  REJECTED: "rejected",
} as const;
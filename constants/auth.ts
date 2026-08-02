// constants/auth.ts
export const USER_ROLE = {
  OWNER: "owner",
  MEMBER: "member",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  INACTIVE: "inactive",
} as const;
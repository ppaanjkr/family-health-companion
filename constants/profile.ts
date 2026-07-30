// constants/profile.ts
export const PROFILE_TYPE = {
  HUMAN: "person",
  PET: "pet",
} as const;

export const GENDER = [
  {
    value: "male",
    label: "ชาย",
  },
  {
    value: "female",
    label: "หญิง",
  },
] as const;

export const BLOOD_TYPES = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "AB", label: "AB" },
  { value: "O", label: "O" },
  { value: "UNKNOWN", label: "ไม่ทราบ" },
] as const;

export const SPECIES = [
  { value: "dog", label: "หมา" },
  { value: "cat", label: "แมว" },
] as const;
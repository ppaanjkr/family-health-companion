import { BaseModel } from "./common";

export type DailyRecord = BaseModel & {
  profileId: string;

  // YYYY-MM-DD
  recordDate: string;

  systolic?: number;
  diastolic?: number;

  pulse?: number;
  weight?: number;
  temperature?: number;
  spo2?: number;
  bloodSugar?: number;

  symptoms?: string[];
  note?: string;
};

export type CreateDailyRecord = Omit<
  DailyRecord,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateDailyRecord = Partial<CreateDailyRecord>;
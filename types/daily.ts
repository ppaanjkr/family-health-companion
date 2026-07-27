// types/daily.ts
import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./common";

export type DailyRecord = BaseModel & {
  profileId: string;

  recordDate: string;
  recordTime: Timestamp;

  systolic?: number;
  diastolic?: number;

  heartRate?: number;
  weight?: number;
  temperature?: number;
  spo2?: number;
  bloodSugar?: number;

  note?: string;

  createdBy: string;
};
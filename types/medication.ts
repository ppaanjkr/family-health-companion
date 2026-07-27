// types/medication.ts
import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./common";

export type Medication = BaseModel & {
  profileId: string;

  medicineName: string;

  strength?: string;
  dosage?: string;
  frequency?: string;

  startDate?: Timestamp;
  endDate?: Timestamp;

  note?: string;

  active: boolean;
};
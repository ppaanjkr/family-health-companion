// types/vaccination.ts
import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./common";

export type Vaccination = BaseModel & {
  profileId: string;

  vaccineName: string;

  dose?: string;

  vaccinationDate: Timestamp;

  nextDueDate?: Timestamp;

  hospital?: string;

  note?: string;
};
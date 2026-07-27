// types/health-check.ts
import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./common";

export type HealthCheck = BaseModel & {
  profileId: string;

  checkDate: Timestamp;

  hospital?: string;

  weight?: number;
  height?: number;
  bmi?: number;

  note?: string;
};

export type HealthCheckItem = BaseModel & {
  healthCheckId: string;

  testName: string;

  value: number;

  unit?: string;

  referenceMin?: number;
  referenceMax?: number;

  abnormal?: boolean;
};
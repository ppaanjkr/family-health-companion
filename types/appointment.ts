// types/appointment.ts
import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./common";

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "cancelled";

export type Appointment = BaseModel & {
  profileId: string;

  hospital: string;

  department?: string;

  doctor?: string;

  appointmentDate: Timestamp;

  purpose?: string;

  fastingRequired: boolean;

  note?: string;

  status: AppointmentStatus;
};
export type DailyRecordFormValues = {
  systolic?: number;
  diastolic?: number;

  pulse?: number;
  spo2?: number;
  weight?: number;
  temperature?: number;
  bloodSugar?: number;

  symptoms?: string[];
  note: string;
};
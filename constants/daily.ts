export const DAILY_FIELDS = {
  BLOOD_PRESSURE: "bloodPressure",
  HEART_RATE: "heartRate",
  WEIGHT: "weight",
  TEMPERATURE: "temperature",
  SPO2: "spo2",
  BLOOD_SUGAR: "bloodSugar",
} as const;

export const DAILY_UNITS = {
  BLOOD_PRESSURE: "mmHg",
  HEART_RATE: "bpm",
  WEIGHT: "kg",
  TEMPERATURE: "°C",
  SPO2: "%",
  BLOOD_SUGAR: "mg/dL",
} as const;

export const DAILY_SYMPTOMS = [
  { value: "fever", label: "มีไข้" },
  { value: "cough", label: "ไอ" },
  { value: "sore_throat", label: "เจ็บคอ" },
  { value: "runny_nose", label: "น้ำมูก" },
  { value: "headache", label: "ปวดศีรษะ" },
  { value: "dizziness", label: "เวียนศีรษะ" },
  { value: "fatigue", label: "อ่อนเพลีย" },
  { value: "nausea", label: "คลื่นไส้" },
  { value: "vomiting", label: "อาเจียน" },
  { value: "diarrhea", label: "ท้องเสีย" },
  { value: "loss_of_appetite", label: "เบื่ออาหาร" },
  { value: "shortness_of_breath", label: "หายใจลำบาก" },
] as const;
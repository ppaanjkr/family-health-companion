import { Timestamp } from "firebase/firestore";

const THAI_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

type DateValue = string | Date | Timestamp | null | undefined;

function toDate(value: DateValue): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  if (value instanceof Timestamp) {
    return value.toDate();
  }

  // รองรับ YYYY-MM-DD
  const date = new Date(`${value}T00:00:00`);

  return isNaN(date.getTime()) ? null : date;
}

export function formatThaiDate(date?: DateValue): string {
  const d = toDate(date);

  if (!d) return "-";

  const day = d.getDate();
  const month = THAI_MONTHS[d.getMonth()];
  const year = d.getFullYear() + 543;

  return `${day} ${month} ${year}`;
}

export function calculateAge(birthday?: DateValue): number | null {
  const d = toDate(birthday);

  if (!d) return null;

  const today = new Date();

  let age = today.getFullYear() - d.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > d.getMonth() ||
    (today.getMonth() === d.getMonth() &&
      today.getDate() >= d.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return age;
}
export function calculateAgeDetail(
  birthday?: DateValue
): { years: number; months: number } | null {
  const birth = toDate(birthday);

  if (!birth) return null;

  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  // ถ้าวันในเดือนยังไม่ถึง ให้ลดเดือนลง 1
  if (today.getDate() < birth.getDate()) {
    months--;
  }

  // ถ้าเดือนติดลบ แสดงว่ายังไม่ถึงวันเกิดปีนี้
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
  };
}
export function formatAge(
  birthday?: DateValue
): string {
  const age = calculateAgeDetail(birthday);

  if (!age) return "-";

  if (age.months === 0) {
    return `${age.years} ปี`;
  }

  return `${age.years} ปี ${age.months} เดือน`;
}

export function formatThaiDateWithAge(
  birthday?: DateValue
): string {
  const age = calculateAge(birthday);

  if (age === null) return "-";

  return `${age} ปี • ${formatThaiDate(birthday)}`;
}

export function getRecordDate(date: Date = new Date()): string {
  return date.toLocaleDateString("sv-SE");
}
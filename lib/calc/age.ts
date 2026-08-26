import type { CalcResult } from "./types";
import { fromEpochDay, toEpochDay, formatDateLong } from "@/lib/date-utils";

export type AgeInputs = {
  birthEpochDay: number;
  asOfEpochDay: number;
};

export type AgeValue = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayEpochDay: number;
  daysUntilNextBirthday: number;
};

// Calendar-aware age (years/months/days), not just totalDays ÷ 365 — a
// simple division drifts because months and years aren't a fixed number
// of days, so this walks year/month/day components the way a birthday
// actually works.
export function calculateAge(inputs: AgeInputs): CalcResult<AgeValue> {
  const { birthEpochDay, asOfEpochDay } = inputs;
  const birth = fromEpochDay(birthEpochDay);
  const asOf = fromEpochDay(asOfEpochDay);

  let years = asOf.getUTCFullYear() - birth.getUTCFullYear();
  let months = asOf.getUTCMonth() - birth.getUTCMonth();
  let days = asOf.getUTCDate() - birth.getUTCDate();

  if (days < 0) {
    months--;
    const daysInPrevMonth = new Date(Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), 0)).getUTCDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = asOfEpochDay - birthEpochDay;

  let nextBirthdayYear = asOf.getUTCFullYear();
  let nextBirthdayEpochDay = toEpochDay(
    `${nextBirthdayYear}-${String(birth.getUTCMonth() + 1).padStart(2, "0")}-${String(birth.getUTCDate()).padStart(2, "0")}`,
  );
  if (nextBirthdayEpochDay < asOfEpochDay) {
    nextBirthdayYear++;
    nextBirthdayEpochDay = toEpochDay(
      `${nextBirthdayYear}-${String(birth.getUTCMonth() + 1).padStart(2, "0")}-${String(birth.getUTCDate()).padStart(2, "0")}`,
    );
  }
  const daysUntilNextBirthday = nextBirthdayEpochDay - asOfEpochDay;

  return {
    value: { years, months, days, totalDays, nextBirthdayEpochDay, daysUntilNextBirthday },
    steps: [
      { label: "Age", formula: "calendar years/months/days between the two dates", value: `${years}y ${months}m ${days}d` },
      { label: "Total days lived", formula: "as-of date − birth date", value: totalDays },
      { label: "Next birthday", formula: "", value: `${formatDateLong(nextBirthdayEpochDay)} (in ${daysUntilNextBirthday} days)` },
    ],
    assumptions: ["Age is calculated in calendar years/months/days, matching how a birthday actually works, not a simple days-÷-365 approximation"],
    rulesVersion: "Calendar-based age calculation",
  };
}

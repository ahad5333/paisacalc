import type { CalcResult } from "./types";

export type TimeCardDay = {
  clockInH: number;
  clockInM: number;
  clockOutH: number;
  clockOutM: number;
  breakMinutes: number;
};

export type TimeCardInputs = {
  days: TimeCardDay[];
  overtimeThresholdHours: number;
};

export type TimeCardValue = {
  dailyHours: number[];
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
};

function dayMinutes(day: TimeCardDay): number {
  const inTotal = day.clockInH * 60 + day.clockInM;
  let outTotal = day.clockOutH * 60 + day.clockOutM;
  if (outTotal < inTotal) outTotal += 24 * 60;
  return Math.max(0, outTotal - inTotal - day.breakMinutes);
}

export function calculateTimeCard(inputs: TimeCardInputs): CalcResult<TimeCardValue> {
  const { days, overtimeThresholdHours } = inputs;
  const dailyHours = days.map((d) => Math.round((dayMinutes(d) / 60) * 100) / 100);
  const totalHours = Math.round(dailyHours.reduce((a, b) => a + b, 0) * 100) / 100;
  const regularHours = Math.min(totalHours, overtimeThresholdHours);
  const overtimeHours = Math.round(Math.max(0, totalHours - overtimeThresholdHours) * 100) / 100;

  return {
    value: { dailyHours, totalHours, regularHours, overtimeHours },
    steps: [
      { label: "Total hours worked", formula: "sum of every day, minus breaks", value: totalHours },
      { label: "Regular hours", formula: `up to ${overtimeThresholdHours}h`, value: regularHours },
      { label: "Overtime hours", formula: `hours beyond ${overtimeThresholdHours}h`, value: overtimeHours },
    ],
    assumptions: [`Overtime is anything beyond ${overtimeThresholdHours} hours for the whole period entered — adjust the threshold to match your actual pay rules`],
    rulesVersion: "Standard timesheet calculation",
  };
}

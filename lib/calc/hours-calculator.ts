import type { CalcResult } from "./types";

export type HoursInputs = {
  startH: number;
  startM: number;
  endH: number;
  endM: number;
  breakMinutes: number;
};

export type HoursValue = {
  totalMinutes: number;
  hours: number;
  minutes: number;
  decimalHours: number;
};

// If the end time is earlier than the start time, the shift is assumed
// to cross midnight (a common real-world case for night shifts) rather
// than treated as invalid.
export function calculateHours(inputs: HoursInputs): CalcResult<HoursValue> {
  const { startH, startM, endH, endM, breakMinutes } = inputs;
  const startTotal = startH * 60 + startM;
  let endTotal = endH * 60 + endM;
  if (endTotal < startTotal) endTotal += 24 * 60;

  const totalMinutes = Math.max(0, endTotal - startTotal - breakMinutes);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const decimalHours = Math.round((totalMinutes / 60) * 100) / 100;

  return {
    value: { totalMinutes, hours, minutes, decimalHours },
    steps: [
      { label: "Elapsed time, before break", formula: "end − start", value: `${Math.floor((endTotal - startTotal) / 60)}h ${(endTotal - startTotal) % 60}m` },
      { label: "Total worked (after break)", formula: `elapsed − ${breakMinutes} min break`, value: `${hours}h ${minutes}m (${decimalHours}h)` },
    ],
    assumptions: ["If the end time is earlier than the start time, the shift is assumed to cross midnight"],
    rulesVersion: "Standard elapsed-time calculation",
  };
}

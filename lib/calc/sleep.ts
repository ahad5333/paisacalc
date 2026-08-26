import type { CalcResult } from "./types";

export type SleepDirection = "wakeUp" | "bedtime";

export type SleepInputs = {
  direction: SleepDirection;
  hour: number;
  minute: number;
  fallAsleepMinutes: number;
};

export type SleepValue = {
  options: { cycles: number; totalHours: number; hour: number; minute: number }[];
};

const CYCLE_MINUTES = 90;

function normalizeTime(totalMinutes: number): { hour: number; minute: number } {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  return { hour: Math.floor(wrapped / 60), minute: wrapped % 60 };
}

// Sleep progresses through roughly 90-minute cycles, and waking near the
// end of a cycle (rather than mid-cycle, during deep sleep) generally
// feels less groggy — this offers several cycle-count options rather
// than a single answer, since the ideal number of cycles varies by
// person.
export function calculateSleep(inputs: SleepInputs): CalcResult<SleepValue> {
  const { direction, hour, minute, fallAsleepMinutes } = inputs;
  const baseMinutes = hour * 60 + minute;
  const cycleCounts = [4, 5, 6];

  const options = cycleCounts.map((cycles) => {
    const totalHours = Math.round(((cycles * CYCLE_MINUTES) / 60) * 100) / 100;
    const offset = direction === "wakeUp" ? -(cycles * CYCLE_MINUTES + fallAsleepMinutes) : cycles * CYCLE_MINUTES + fallAsleepMinutes;
    const { hour: h, minute: m } = normalizeTime(baseMinutes + offset);
    return { cycles, totalHours, hour: h, minute: m };
  });

  return {
    value: { options },
    steps: options.map((o) => ({
      label: `${o.cycles} cycles (${o.totalHours}h sleep)`,
      formula: direction === "wakeUp" ? `wake time − (${o.cycles}×90min + ${fallAsleepMinutes}min)` : `bedtime + ${fallAsleepMinutes}min + ${o.cycles}×90min`,
      value: `${String(o.hour).padStart(2, "0")}:${String(o.minute).padStart(2, "0")}`,
    })),
    assumptions: [
      "Assumes 90-minute sleep cycles, a commonly cited average — actual cycle length varies somewhat by individual and by night",
      `Adds ${fallAsleepMinutes} minutes to account for the time it typically takes to actually fall asleep after getting into bed`,
    ],
    rulesVersion: "90-minute sleep cycle estimate",
  };
}

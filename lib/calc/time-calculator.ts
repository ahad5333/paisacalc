import type { CalcResult } from "./types";

export type TimeOperation = "add" | "subtract";

export type TimeCalcInputs = {
  h1: number;
  m1: number;
  s1: number;
  h2: number;
  m2: number;
  s2: number;
  operation: TimeOperation;
};

export type TimeCalcValue = {
  totalSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
  negative: boolean;
};

export function calculateTimeCalculator(inputs: TimeCalcInputs): CalcResult<TimeCalcValue> {
  const { h1, m1, s1, h2, m2, s2, operation } = inputs;
  const t1 = h1 * 3600 + m1 * 60 + s1;
  const t2 = h2 * 3600 + m2 * 60 + s2;
  const totalSeconds = operation === "add" ? t1 + t2 : t1 - t2;
  const negative = totalSeconds < 0;
  const abs = Math.abs(totalSeconds);

  const hours = Math.floor(abs / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const seconds = abs % 60;

  return {
    value: { totalSeconds, hours, minutes, seconds, negative },
    steps: [
      {
        label: "Result",
        formula: `${h1}:${String(m1).padStart(2, "0")}:${String(s1).padStart(2, "0")} ${operation === "add" ? "+" : "−"} ${h2}:${String(m2).padStart(2, "0")}:${String(s2).padStart(2, "0")}`,
        value: `${negative ? "−" : ""}${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      },
    ],
    assumptions: [],
    rulesVersion: "Standard clock-time arithmetic",
  };
}

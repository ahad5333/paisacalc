import type { CalcResult } from "./types";

export type PercentErrorInputs = {
  experimental: number;
  theoretical: number;
};

export function calculatePercentError(inputs: PercentErrorInputs): CalcResult<{ percentError: number }> {
  const { experimental, theoretical } = inputs;
  const percentError = Math.round((Math.abs(experimental - theoretical) / Math.abs(theoretical)) * 100 * 10000) / 10000;

  return {
    value: { percentError },
    steps: [
      {
        label: "Percent error",
        formula: `|${experimental} − ${theoretical}| ÷ |${theoretical}| × 100`,
        value: percentError,
      },
    ],
    assumptions: [
      "Uses the absolute value of the difference — this measures the size of the error, not whether the experimental value was too high or too low",
      "Undefined when the theoretical value is zero, since that would divide by zero",
    ],
    rulesVersion: "Standard percent error formula",
  };
}

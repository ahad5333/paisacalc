import { describe, expect, it } from "vitest";
import type { CalcResult } from "@/lib/calc";

describe("CalcResult", () => {
  it("carries a derivation, assumptions, and a rules version alongside the value", () => {
    const result: CalcResult<number> = {
      value: 34713,
      steps: [
        { label: "Monthly rate", formula: "8.5 / 12", value: 0.708 },
      ],
      assumptions: ["No prepayment"],
      rulesVersion: "FY 2026-27",
    };

    expect(result.value).toBe(34713);
    expect(result.steps).toHaveLength(1);
    expect(result.rulesVersion).toBe("FY 2026-27");
  });
});

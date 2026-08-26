import type { CalcResult } from "./types";

export type GstMode = "add" | "remove";

export type GstInputs = {
  amount: number;
  gstRatePercent: number;
  mode: GstMode;
};

export type GstValue = {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
};

// Plain percentage arithmetic — the only thing worth getting precisely
// right is that "remove GST" is a division, not a subtraction: backing
// ₹18 out of a ₹118 total-at-18%-GST means dividing by 1.18, not
// subtracting 18% of the total (that would remove too much, since the
// original 18% was calculated on the smaller base amount, not the total).
// GST slab rates themselves are cited in lib/rules — this file only ever
// receives a rate the caller already chose.
export function calculateGst(inputs: GstInputs): CalcResult<GstValue> {
  const { amount, gstRatePercent: r, mode } = inputs;

  if (mode === "add") {
    const baseAmount = amount;
    const gstAmount = Math.round((baseAmount * r) / 100);
    const totalAmount = baseAmount + gstAmount;

    return {
      value: { baseAmount, gstAmount, totalAmount },
      steps: [
        { label: "GST amount", formula: `${baseAmount} × ${r} ÷ 100`, value: gstAmount },
        {
          label: "Total (GST-inclusive)",
          formula: "Base amount + GST amount",
          value: totalAmount,
        },
      ],
      assumptions: [
        "The entered amount is the price before GST",
        "A single GST rate applies to the whole amount (no mixed-rate items)",
      ],
      rulesVersion: "GST arithmetic (rate-independent)",
    };
  }

  const totalAmount = amount;
  const baseAmount = Math.round((totalAmount * 100) / (100 + r));
  const gstAmount = totalAmount - baseAmount;

  return {
    value: { baseAmount, gstAmount, totalAmount },
    steps: [
      {
        label: "Base amount",
        formula: `${totalAmount} × 100 ÷ (100 + ${r})`,
        value: baseAmount,
      },
      { label: "GST amount", formula: "Total − Base amount", value: gstAmount },
    ],
    assumptions: [
      "The entered amount already includes GST",
      "A single GST rate applies to the whole amount (no mixed-rate items)",
    ],
    rulesVersion: "GST arithmetic (rate-independent)",
  };
}

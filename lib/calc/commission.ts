import type { CalcResult } from "./types";

export type CommissionInputs = {
  saleAmount: number;
  commissionPercent: number;
};

export type CommissionValue = {
  commissionAmount: number;
  netAmount: number;
};

export function calculateCommission(inputs: CommissionInputs): CalcResult<CommissionValue> {
  const { saleAmount, commissionPercent } = inputs;

  const commissionAmount = Math.round((saleAmount * commissionPercent) / 100);
  const netAmount = saleAmount - commissionAmount;

  return {
    value: { commissionAmount, netAmount },
    steps: [
      { label: "Commission", formula: `${saleAmount} × ${commissionPercent}%`, value: commissionAmount },
      { label: "Net amount after commission", formula: `${saleAmount} − ${commissionAmount}`, value: netAmount },
    ],
    assumptions: [
      "A single flat commission rate on the full sale amount — doesn't model tiered or slab-based commission structures some brokerages use",
      "Doesn't include GST that may apply on top of the commission itself, which brokers and agents commonly charge separately",
    ],
    rulesVersion: "Simple percentage commission",
  };
}

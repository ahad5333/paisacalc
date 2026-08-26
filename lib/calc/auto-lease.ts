import type { CalcResult } from "./types";

export type AutoLeaseInputs = {
  vehiclePrice: number;
  residualValuePercent: number;
  leaseTermMonths: number;
  ratePercent: number;
};

export type AutoLeaseValue = {
  residualValue: number;
  depreciationFeeMonthly: number;
  financeFeeMonthly: number;
  monthlyLeasePayment: number;
  totalLeaseCost: number;
};

// Standard lease-payment structure: a depreciation charge (the value the
// car is expected to lose over the lease, spread evenly across the
// term) plus a finance charge (interest on the average of what's
// financed — capitalised cost and residual value both still tied up for
// the lease's duration). Quoted here as a plain annual rate rather than
// the US "money factor" convention (money factor = this rate ÷ 2400) —
// same math, a unit Indian readers don't have to translate. Auto leasing
// itself is a smaller, newer segment in India (corporate fleets, and
// consumer services like ALD/ORIX/Mynd Fox) next to outright car loans,
// but the underlying lease-payment mechanics are the same worldwide.
export function calculateAutoLease(inputs: AutoLeaseInputs): CalcResult<AutoLeaseValue> {
  const { vehiclePrice, residualValuePercent, leaseTermMonths, ratePercent } = inputs;
  const r = ratePercent / 12 / 100;

  const residualValue = Math.round((vehiclePrice * residualValuePercent) / 100);
  const depreciationFeeMonthly = Math.round((vehiclePrice - residualValue) / leaseTermMonths);
  const financeFeeMonthly = Math.round((vehiclePrice + residualValue) * r);
  const monthlyLeasePayment = depreciationFeeMonthly + financeFeeMonthly;
  const totalLeaseCost = monthlyLeasePayment * leaseTermMonths;

  return {
    value: {
      residualValue,
      depreciationFeeMonthly,
      financeFeeMonthly,
      monthlyLeasePayment,
      totalLeaseCost,
    },
    steps: [
      { label: "Residual value at lease end", formula: `${vehiclePrice} × ${residualValuePercent}%`, value: residualValue },
      {
        label: "Monthly depreciation charge",
        formula: `(${vehiclePrice} − ${residualValue}) ÷ ${leaseTermMonths}`,
        value: depreciationFeeMonthly,
      },
      {
        label: "Monthly finance charge",
        formula: `(${vehiclePrice} + ${residualValue}) × monthly rate`,
        value: financeFeeMonthly,
      },
      { label: "Monthly lease payment", formula: "Depreciation charge + Finance charge", value: monthlyLeasePayment },
      { label: "Total cost over the lease", formula: `Monthly payment × ${leaseTermMonths} months`, value: totalLeaseCost },
    ],
    assumptions: [
      "You don't own the vehicle at the end of the lease — the residual value is what it's worth to the leasing company, not a payout to you",
      "The finance charge is calculated on the average of the capitalised cost and residual value, the standard lease convention — not a reducing balance the way a loan amortises",
      "Ignores any upfront capitalised cost reduction (a down payment on a lease), security deposit, or mileage limits and excess-mileage charges",
      "Doesn't include registration, insurance, or maintenance, which may be bundled separately depending on the lease provider",
    ],
    rulesVersion: "Standard lease-payment structure",
  };
}

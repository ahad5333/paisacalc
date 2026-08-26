import type { CalcResult } from "./types";

export type DepreciationInputs = {
  assetCost: number;
  wdvRatePercent: number;
  slmUsefulLifeYears: number;
  salvageValuePercent: number;
  yearsElapsed: number;
};

export type DepreciationValue = {
  slmAnnualDepreciation: number;
  slmAccumulatedDepreciation: number;
  slmBookValue: number;
  wdvAccumulatedDepreciation: number;
  wdvBookValue: number;
};

// India runs two different depreciation regimes side by side, which
// often confuses first-time asset buyers: the Income Tax Act mandates
// WDV (written-down value, a fixed percentage of the SHRINKING balance
// each year) on block-of-assets for tax purposes — common block rates
// are 15% for plant & machinery, 10% for furniture, 40% for computers —
// while the Companies Act, 2013 (Schedule II) generally expects SLM
// (straight-line, equal amounts every year) or WDV based on an asset's
// useful life for book/financial-statement depreciation. WDV front-loads
// deductions; SLM spreads them evenly — the same asset can show very
// different depreciation in a company's tax filing versus its books.
export function calculateDepreciation(inputs: DepreciationInputs): CalcResult<DepreciationValue> {
  const { assetCost, wdvRatePercent, slmUsefulLifeYears, salvageValuePercent, yearsElapsed } = inputs;

  const salvageValue = Math.round((assetCost * salvageValuePercent) / 100);
  const slmAnnualDepreciation = Math.round((assetCost - salvageValue) / slmUsefulLifeYears);
  const slmAccumulatedDepreciation = Math.min(slmAnnualDepreciation * yearsElapsed, assetCost - salvageValue);
  const slmBookValue = assetCost - slmAccumulatedDepreciation;

  let wdvBalance = assetCost;
  for (let year = 0; year < yearsElapsed; year++) {
    const yearDep = Math.round((wdvBalance * wdvRatePercent) / 100);
    wdvBalance -= yearDep;
  }
  const wdvBookValue = Math.round(wdvBalance);
  const wdvAccumulatedDepreciation = assetCost - wdvBookValue;

  return {
    value: {
      slmAnnualDepreciation,
      slmAccumulatedDepreciation,
      slmBookValue,
      wdvAccumulatedDepreciation,
      wdvBookValue,
    },
    steps: [
      { label: "SLM annual depreciation", formula: `(${assetCost} − ${salvageValue}) ÷ ${slmUsefulLifeYears}`, value: slmAnnualDepreciation },
      { label: `SLM accumulated depreciation after ${yearsElapsed} years`, formula: `${slmAnnualDepreciation} × ${yearsElapsed}`, value: slmAccumulatedDepreciation },
      { label: "SLM book value", formula: `${assetCost} − ${slmAccumulatedDepreciation}`, value: slmBookValue },
      {
        label: `WDV accumulated depreciation after ${yearsElapsed} years`,
        formula: "simulated year by year on the shrinking balance",
        value: wdvAccumulatedDepreciation,
      },
      { label: "WDV book value", formula: `${assetCost} − ${wdvAccumulatedDepreciation}`, value: wdvBookValue },
    ],
    assumptions: [
      "Common Income Tax Act block rates: 15% for general plant & machinery, 10% for furniture & fittings, 40% for computers and software, 5% for buildings — check the specific block your asset falls under rather than assuming a default",
      "SLM depreciation is capped at reducing the asset to its salvage value, never below it",
      "WDV never fully depreciates an asset to zero — a shrinking percentage of a shrinking balance approaches, but never reaches, zero",
      "Doesn't apply the half-rate rule some tax rules use for assets bought and used for under 180 days in the year of purchase",
    ],
    rulesVersion: "WDV (Income Tax Act) vs. SLM (Companies Act) comparison",
  };
}

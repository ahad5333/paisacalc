import type { CalcResult } from "./types";
import { calculateSipReturns } from "./sip";

export type NpsInputs = {
  monthlyContribution: number;
  annualReturnPercent: number;
  years: number;
};

export type NpsValue = {
  corpus: number;
  totalInvested: number;
  wealthGained: number;
  lumpSum: number;
  annuityAmount: number;
  annuityPercent: number;
};

// Accumulation phase reuses calculateSipReturns verbatim (ticket N1-01) —
// NPS contributions grow exactly like an SIP: a fixed monthly amount
// compounding at an assumed market-linked annual return. The only NPS-
// specific logic here is applying the exit-withdrawal split at
// retirement, per the current PFRDA (Exits and Withdrawals under the
// National Pension System) Regulations, 2025, effective December 2025 —
// verified against two independent sources (Finnovate, and Protean, one
// of the two official NPS Central Recordkeeping Agencies) before use.
// This is a significant, recent change: the long-standing "40% mandatory
// annuity" rule was reduced to 20% for non-government subscribers with a
// corpus above ₹12L, with even more flexibility below that. Modelled here
// for a non-government subscriber, the vast majority of retail NPS
// investors — government employees still face the older 40% floor.
export function calculateNpsCorpus(inputs: NpsInputs): CalcResult<NpsValue> {
  const { monthlyContribution, annualReturnPercent, years } = inputs;

  const sipResult = calculateSipReturns({
    monthlyAmount: monthlyContribution,
    annualReturnPercent,
    years,
    stepUpPercent: 0,
  });
  const corpus = sipResult.value.finalValue;
  const totalInvested = sipResult.value.totalInvested;
  const wealthGained = sipResult.value.wealthGained;

  let lumpSum: number;
  let annuityPercent: number;
  if (corpus <= 800000) {
    lumpSum = corpus;
    annuityPercent = 0;
  } else if (corpus <= 1200000) {
    lumpSum = 600000;
    annuityPercent = Math.round(((corpus - lumpSum) / corpus) * 100);
  } else {
    lumpSum = Math.round(corpus * 0.8);
    annuityPercent = 20;
  }
  const annuityAmount = corpus - lumpSum;

  return {
    value: { corpus, totalInvested, wealthGained, lumpSum, annuityAmount, annuityPercent },
    steps: [
      { label: "Monthly rate", formula: `${annualReturnPercent} ÷ 12 ÷ 100`, value: annualReturnPercent / 12 / 100 },
      { label: "Corpus at retirement", formula: "simulated month by month", value: corpus },
      { label: "Total contributed", formula: `${monthlyContribution} × ${years * 12} months`, value: totalInvested },
      { label: "Lump-sum withdrawal", formula: "per the current PFRDA exit-tier rule", value: lumpSum },
      { label: "Annuity purchase amount", formula: "Corpus − Lump sum", value: annuityAmount },
    ],
    assumptions: [
      "Returns are assumed constant every year — real NPS fund returns are market-linked and vary",
      "Modelled for a non-government subscriber under the PFRDA Exits and Withdrawals Regulations, 2025 (effective Dec 2025): corpus ≤ ₹8L → 100% lump sum; ₹8L–₹12L → up to ₹6L lump sum, rest to annuity; above ₹12L → up to 80% lump sum, minimum 20% to annuity",
      "Government-sector subscribers still face the earlier 60% lump sum / 40% annuity floor, not modelled here",
      "Only 60% of the lump sum is tax-exempt under Section 10(12A) even though up to 80% can now be withdrawn — the portion between 60% and 80% may be taxable",
      "Does not project a monthly pension amount, since that depends on the annuity rate at the provider you choose at retirement, not a fixed rule",
    ],
    rulesVersion: "PFRDA Exits and Withdrawals Regulations, 2025",
  };
}

import { CAPITAL_GAINS_FY_2026_27 } from "@/lib/rules";
import type { CalcResult } from "./types";

export type AssetType = "equity" | "property";

export type CapitalGainsInputs = {
  assetType: AssetType;
  purchaseValue: number;
  saleValue: number;
  purchaseFinancialYear: string; // e.g. "2018-19" — property indexation only
  holdingMonths: number;
};

export type CapitalGainsValue = {
  isLongTerm: boolean;
  gain: number;
  exemption: number;
  taxableGain: number;
  taxRate: number | null; // null when taxed at slab rate instead of a flat rate (property STCG)
  tax: number;
  // Property LTCG only — both options shown so the choice is visible, not asserted.
  indexedCost: number | null;
  taxWithIndexation: number | null;
  taxWithoutIndexation: number | null;
  usedIndexation: boolean;
};

function cii(financialYear: string): number {
  return CAPITAL_GAINS_FY_2026_27.costInflationIndex[financialYear] ?? 100;
}

// The rules this depends on changed substantially on 23 July 2024 (Finance
// (No. 2) Act, 2024) — indexation removed for most assets, LTCG unified at
// 12.5%, equity STCG raised to 20%. Verified specifically for FY 2026-27,
// not assumed unchanged from memory (PRD §7.3) — see
// lib/rules/fy-2026-27.ts for sourcing and the CII table.
export function calculateCapitalGains(inputs: CapitalGainsInputs): CalcResult<CapitalGainsValue> {
  const { assetType, purchaseValue, saleValue, purchaseFinancialYear, holdingMonths } = inputs;
  const rules = CAPITAL_GAINS_FY_2026_27;
  const gain = saleValue - purchaseValue;

  if (assetType === "equity") {
    const isLongTerm = holdingMonths > rules.equity.longTermHoldingMonths;
    let exemption = 0;
    let taxableGain = Math.max(0, gain);
    let taxRate: number = rules.equity.stcgRate;

    if (isLongTerm) {
      taxRate = rules.equity.ltcgRate;
      exemption = Math.min(Math.max(0, gain), rules.equity.ltcgExemption);
      taxableGain = Math.max(0, gain - rules.equity.ltcgExemption);
    }

    const tax = taxableGain * taxRate;

    return {
      value: {
        isLongTerm,
        gain: Math.round(gain),
        exemption: Math.round(exemption),
        taxableGain: Math.round(taxableGain),
        taxRate,
        tax: Math.round(tax),
        indexedCost: null,
        taxWithIndexation: null,
        taxWithoutIndexation: null,
        usedIndexation: false,
      },
      steps: [
        { label: "Gain", formula: "sale value − purchase value", value: Math.round(gain) },
        isLongTerm
          ? { label: "Exemption used", formula: `min(gain, ₹${rules.equity.ltcgExemption.toLocaleString("en-IN")})`, value: Math.round(exemption) }
          : { label: "Holding period", formula: `${holdingMonths} months (≤ 12 → short-term)`, value: holdingMonths },
        { label: "Taxable gain", formula: isLongTerm ? "gain − exemption" : "gain (no exemption, short-term)", value: Math.round(taxableGain) },
        { label: "Tax", formula: `taxable gain × ${(taxRate * 100).toFixed(1)}%`, value: Math.round(tax) },
      ],
      assumptions: [
        "Applies to listed equity shares and equity mutual funds on which securities transaction tax was paid",
        `Long-term means held for more than ${rules.equity.longTermHoldingMonths} months`,
        `The ₹${rules.equity.ltcgExemption.toLocaleString("en-IN")} long-term exemption is per financial year, across all your equity long-term gains combined — not per transaction`,
        "A capital loss isn't modelled here; a loss in one transaction can offset gains elsewhere, which this single-transaction view doesn't show",
      ],
      rulesVersion: "FY 2026-27",
    };
  }

  // Property
  const isLongTerm = holdingMonths > rules.property.longTermHoldingMonths;

  if (!isLongTerm) {
    return {
      value: {
        isLongTerm: false,
        gain: Math.round(gain),
        exemption: 0,
        taxableGain: Math.round(Math.max(0, gain)),
        taxRate: null,
        tax: 0,
        indexedCost: null,
        taxWithIndexation: null,
        taxWithoutIndexation: null,
        usedIndexation: false,
      },
      steps: [
        { label: "Gain", formula: "sale value − purchase value", value: Math.round(gain) },
        { label: "Holding period", formula: `${holdingMonths} months (≤ 24 → short-term)`, value: holdingMonths },
      ],
      assumptions: [
        `Long-term means held for more than ${rules.property.longTermHoldingMonths} months — this is short-term`,
        "Short-term property gains are added to your other income and taxed at your income-tax slab rate, not a flat rate — this tool shows the gain, not the tax; use the income tax calculator for the rest",
      ],
      rulesVersion: "FY 2026-27",
    };
  }

  const purchaseCii = cii(purchaseFinancialYear);
  const saleCii = cii(rules.currentFinancialYear);
  const indexedCost = purchaseValue * (saleCii / purchaseCii);
  const gainWithIndexation = saleValue - indexedCost;
  const taxWithIndexation = Math.max(0, gainWithIndexation) * rules.property.ltcgRateWithIndexation;
  const taxWithoutIndexation = Math.max(0, gain) * rules.property.ltcgRateWithoutIndexation;

  const eligibleForChoice = purchaseFinancialYear <= rules.property.indexationCutoverFinancialYear;
  const usedIndexation = eligibleForChoice && taxWithIndexation < taxWithoutIndexation;
  const tax = usedIndexation ? taxWithIndexation : taxWithoutIndexation;
  const taxableGain = usedIndexation ? Math.max(0, gainWithIndexation) : Math.max(0, gain);
  const taxRate = usedIndexation
    ? rules.property.ltcgRateWithIndexation
    : rules.property.ltcgRateWithoutIndexation;

  return {
    value: {
      isLongTerm: true,
      gain: Math.round(gain),
      exemption: 0,
      taxableGain: Math.round(taxableGain),
      taxRate,
      tax: Math.round(tax),
      indexedCost: Math.round(indexedCost),
      taxWithIndexation: Math.round(taxWithIndexation),
      taxWithoutIndexation: Math.round(taxWithoutIndexation),
      usedIndexation,
    },
    steps: [
      { label: "Gain (unindexed)", formula: "sale value − purchase value", value: Math.round(gain) },
      {
        label: "Indexed cost",
        formula: `purchase value × (CII ${rules.currentFinancialYear} ÷ CII ${purchaseFinancialYear}) = purchase value × (${saleCii} ÷ ${purchaseCii})`,
        value: Math.round(indexedCost),
      },
      { label: "Tax with indexation", formula: "max(0, sale − indexed cost) × 20%", value: Math.round(taxWithIndexation) },
      { label: "Tax without indexation", formula: "max(0, gain) × 12.5%", value: Math.round(taxWithoutIndexation) },
      {
        label: "Tax payable",
        formula: eligibleForChoice ? "lower of the two options" : "12.5%, no indexation choice available",
        value: Math.round(tax),
      },
    ],
    assumptions: [
      `Long-term means held for more than ${rules.property.longTermHoldingMonths} months`,
      eligibleForChoice
        ? "Purchased before the 23 July 2024 cutover, so both the 20%-with-indexation and 12.5%-without-indexation options are available — the cheaper one is used"
        : "Purchased on or after the 23 July 2024 cutover, so only the 12.5% no-indexation rate applies",
      "Modelled at financial-year granularity: if you purchased in FY 2024-25, the exact cutover was 23 July 2024 — if your purchase was after that specific date, only the 12.5% rate actually applies to you, not the choice shown here",
      "Assumes the sale happens in the current financial year (FY 2026-27), which sets the Cost Inflation Index used for the sale year",
      "Applies to residents; the indexation choice does not extend to all taxpayer categories",
    ],
    rulesVersion: "FY 2026-27",
  };
}

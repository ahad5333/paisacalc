export type DerivationStep = {
  label: string;
  formula: string;
  // Pre-formatted string for non-numeric results (dates, ranges) that
  // toLocaleString can't sensibly render — DerivationPanel passes numbers
  // through its usual formatting and strings through as-is.
  value: number | string;
};

export type CalcResult<T> = {
  value: T;
  steps: DerivationStep[];
  assumptions: string[];
  rulesVersion: string; // e.g. "FY 2026-27"
};

// Indian digit grouping (lakh/crore), currency, and percentage display.
// Rounding: paise/decimals are rounded half-up at 2dp unless a calculator's
// own statute specifies otherwise (documented beside that calculator's rules).

const INR_GROUPS = /(\d)(?=(\d\d)+\d$)/g;

export function formatIndianNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const negative = value < 0;
  // Round to 2dp first to absorb float noise (e.g. 8.499999999999998), but
  // — unlike a plain toFixed(0) — don't force-truncate a genuine fractional
  // value: an interest-rate input of 8.5% must still read "8.5", not
  // silently round to "9" while the state underneath stays exact.
  const rounded = Math.round(Math.abs(value) * 100) / 100;
  const [intPart, decPart] = String(rounded).split(".");
  const grouped = intPart.replace(INR_GROUPS, "$1,");
  return `${negative ? "-" : ""}${grouped}${decPart ? `.${decPart}` : ""}`;
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value);
  return `₹${formatIndianNumber(rounded)}`;
}

export function formatPercent(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(digits)}%`;
}

// Plain digits for editing mode — strips grouping commas and the currency
// symbol so a field is a clean number the moment the user focuses it.
export function toPlainDigits(display: string): string {
  return display.replace(/[₹,\s]/g, "");
}

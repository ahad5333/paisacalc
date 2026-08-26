import {
  CAPITAL_GAINS_FY_2026_27,
  GRATUITY_FY_2026_27,
  HRA_FY_2026_27,
  INCOME_TAX_FY_2026_27,
  SALARY_STRUCTURE_FY_2026_27,
} from "./fy-2026-27";
import { GST_RATES_2026, PPF_RULES_2026 } from "./current-rates";

// Current-FY-only in v1 (PRD §13 open question 2). Add prior-FY resolution
// here if that scope changes.
export function getActiveRules() {
  return INCOME_TAX_FY_2026_27;
}

export {
  INCOME_TAX_FY_2026_27,
  SALARY_STRUCTURE_FY_2026_27,
  HRA_FY_2026_27,
  CAPITAL_GAINS_FY_2026_27,
  GRATUITY_FY_2026_27,
  GST_RATES_2026,
  PPF_RULES_2026,
};
export type { TaxSlab } from "./fy-2026-27";

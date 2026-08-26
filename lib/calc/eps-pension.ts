import type { CalcResult } from "./types";

export type EpsPensionInputs = {
  pensionableSalary: number;
  pensionableServiceYears: number;
};

export type EpsPensionValue = {
  effectiveServiceYears: number;
  cappedPensionableSalary: number;
  monthlyPension: number;
};

// EPS (Employees' Pension Scheme, 1995) — the actual pension component
// of India's EPFO retirement architecture, separate from the PF/PPF
// corpus calculators already live. The formula EPFO itself publishes:
// Monthly Pension = (Pensionable Salary × Pensionable Service) ÷ 70,
// with pensionable salary capped at ₹15,000/month (the statutory
// wage ceiling, unchanged since 2014) and a service-years bonus: 2 extra
// years are added if actual service exceeds 20 years. This is a
// government-formula calculator, unlike the assumption-based ones
// elsewhere on the site — see /lib/rules if the ceiling or divisor
// changes in a future EPFO circular.
const EPS_SALARY_CEILING = 15000;
const EPS_DIVISOR = 70;
const BONUS_SERVICE_THRESHOLD_YEARS = 20;
const BONUS_SERVICE_YEARS = 2;

export function calculateEpsPension(inputs: EpsPensionInputs): CalcResult<EpsPensionValue> {
  const { pensionableSalary, pensionableServiceYears } = inputs;

  const cappedPensionableSalary = Math.min(pensionableSalary, EPS_SALARY_CEILING);
  const effectiveServiceYears =
    pensionableServiceYears > BONUS_SERVICE_THRESHOLD_YEARS
      ? pensionableServiceYears + BONUS_SERVICE_YEARS
      : pensionableServiceYears;
  const monthlyPension = Math.round((cappedPensionableSalary * effectiveServiceYears) / EPS_DIVISOR);

  return {
    value: { effectiveServiceYears, cappedPensionableSalary, monthlyPension },
    steps: [
      {
        label: "Pensionable salary (capped at ₹15,000)",
        formula: `min(${pensionableSalary}, ${EPS_SALARY_CEILING})`,
        value: cappedPensionableSalary,
      },
      {
        label: "Effective pensionable service",
        formula:
          pensionableServiceYears > BONUS_SERVICE_THRESHOLD_YEARS
            ? `${pensionableServiceYears} + 2 (bonus for over 20 years)`
            : `${pensionableServiceYears} (no bonus — 20 years or under)`,
        value: effectiveServiceYears,
      },
      {
        label: "Monthly pension",
        formula: `${cappedPensionableSalary} × ${effectiveServiceYears} ÷ 70`,
        value: monthlyPension,
      },
    ],
    assumptions: [
      "Pensionable salary is capped at ₹15,000/month regardless of actual basic + DA — this statutory wage ceiling has stayed unchanged since September 2014",
      "A 2-year bonus is added to pensionable service once actual service exceeds 20 years, per EPFO's own formula",
      "Assumes eligibility is already met — a minimum 10 years of pensionable service and reaching 58 years of age (with reduced early-pension options from 50)",
      "Doesn't include employees who opted for higher EPS contributions on actual (uncapped) salary under the Supreme Court's November 2022 ruling — that cohort's calculation differs and isn't modelled here",
    ],
    rulesVersion: "EPS 1995 formula (statutory)",
  };
}

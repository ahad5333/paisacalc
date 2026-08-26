"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  NumericInput,
  ResultDisplay,
  DerivationPanel,
  CalcChart,
  DetailTable,
  CalculatorPage,
} from "@/components/calculator";
import { calculateInHandSalary } from "@/lib/calc/in-hand-salary";
import type { AgeCategory } from "@/lib/calc/income-tax";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { ctc: 1200000, pt: 200, ded: 0 };

const AGE_LABELS: Record<AgeCategory, string> = {
  general: "Below 60",
  senior: "60–80 (senior citizen)",
  superSenior: "Above 80 (super senior)",
};

// Client-only — reads window.location.search directly, same reasoning as
// EmiCalculator.tsx and IncomeTaxCalculator.tsx.
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialAgeCategory(): AgeCategory {
  const raw = new URLSearchParams(window.location.search).get("age");
  return raw === "senior" || raw === "superSenior" ? raw : "general";
}

export function InHandSalaryCalculator({ content }: { content: ReactNode }) {
  const [ctc, setCtc] = useState(() => initialParam("ctc", DEFAULTS.ctc));
  const [ageCategory, setAgeCategory] = useState<AgeCategory>(initialAgeCategory);
  const [professionalTax, setProfessionalTax] = useState(() => initialParam("pt", DEFAULTS.pt));
  const [deductions, setDeductions] = useState(() => initialParam("ded", DEFAULTS.ded));

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("ctc", String(ctc));
    params.set("pt", String(professionalTax));
    params.set("ded", String(deductions));
    params.set("age", ageCategory);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [ctc, ageCategory, professionalTax, deductions]);

  const result = calculateInHandSalary({
    annualCtc: ctc,
    ageCategory,
    professionalTaxMonthly: professionalTax,
    additionalOldRegimeDeductions: deductions,
  });
  const { basic, employerPf, gratuity, grossSalary, employeePf, professionalTaxAnnual, newRegimeTax, oldRegimeTax, betterRegime, inHandAnnual, inHandMonthly } = result.value;
  const totalDeductions = Math.max(0, ctc - inHandAnnual);

  return (
    <CalculatorPage
      title="In-hand salary from CTC"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="center 30%"
      description="See your real monthly take-home from your CTC, with PF, gratuity, professional tax, and income tax under both regimes worked out."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Annual CTC"
            value={ctc}
            onChange={setCtc}
            min={200000}
            max={20000000}
            step={50000}
            slider
            helpText="Your total Cost to Company — the full annual figure from your offer letter, before any deductions."
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="age-category" className="text-sm text-muted">
              Age category
            </label>
            <select
              id="age-category"
              value={ageCategory}
              onChange={(e) => setAgeCategory(e.target.value as AgeCategory)}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              {(Object.keys(AGE_LABELS) as AgeCategory[]).map((key) => (
                <option key={key} value={key}>
                  {AGE_LABELS[key]}
                </option>
              ))}
            </select>
          </div>
          <NumericInput
            label="Professional tax"
            value={professionalTax}
            onChange={setProfessionalTax}
            min={0}
            max={300}
            step={10}
            suffix="₹/month"
            helpText="A small state-levied tax, deducted monthly. Varies by state; set to 0 if your state doesn't charge it."
          />
          <NumericInput
            label="Other old-regime deductions"
            value={deductions}
            onChange={setDeductions}
            min={0}
            max={500000}
            step={10000}
            slider
            helpText="80C, 80D, home loan interest, and similar — beyond your own PF contribution, which is already included automatically."
          />
        </>
      }
      result={
        <div className="flex flex-col gap-6">
          <ResultDisplay value={formatCurrency(inHandMonthly)} caption="in-hand per month" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded border border-rule p-3">
              <p className="text-xs text-muted">Annual in-hand</p>
              <p className="mt-1 font-mono text-ink">{formatCurrency(inHandAnnual)}</p>
            </div>
            <div className="rounded border border-rule p-3">
              <p className="text-xs text-muted">Cheaper regime</p>
              <p className="mt-1 font-mono text-ink capitalize">{betterRegime}</p>
            </div>
          </div>
        </div>
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "In-hand", value: inHandAnnual },
            { name: "PF, tax & deductions", value: totalDeductions },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="CTC breakdown"
          columns={[
            { key: "item", label: "Component" },
            { key: "value", label: "Amount", align: "right" },
          ]}
          rows={[
            { item: "Basic salary", value: formatCurrency(basic) },
            { item: "Employer PF (not in your payslip)", value: formatCurrency(employerPf) },
            { item: "Gratuity provision (not in your payslip)", value: formatCurrency(gratuity) },
            { item: "Gross salary (payslip)", value: formatCurrency(grossSalary) },
            { item: "− Employee PF", value: formatCurrency(employeePf) },
            { item: "− Professional tax", value: formatCurrency(professionalTaxAnnual) },
            { item: "− Income tax (new regime)", value: formatCurrency(newRegimeTax) },
            { item: "− Income tax (old regime)", value: formatCurrency(oldRegimeTax) },
            { item: "In-hand annual", value: formatCurrency(inHandAnnual) },
            { item: "In-hand monthly", value: formatCurrency(inHandMonthly) },
          ]}
        />
      }
      content={content}
    />
  );
}

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
import { calculateIncomeTax, type AgeCategory } from "@/lib/calc/income-tax";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { income: 1500000, deductions: 150000 };

const AGE_LABELS: Record<AgeCategory, string> = {
  general: "Below 60",
  senior: "60–80 (senior citizen)",
  superSenior: "Above 80 (super senior)",
};

// Client-only — reads window.location.search directly (see EmiCalculator.tsx
// for why: this must be loaded with ssr:false from page.tsx, not guarded
// with a mount effect).
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialAgeCategory(): AgeCategory {
  const raw = new URLSearchParams(window.location.search).get("age");
  return raw === "senior" || raw === "superSenior" ? raw : "general";
}

export function IncomeTaxCalculator({ content }: { content: ReactNode }) {
  const [income, setIncome] = useState(() => initialParam("income", DEFAULTS.income));
  const [ageCategory, setAgeCategory] = useState<AgeCategory>(initialAgeCategory);
  const [deductions, setDeductions] = useState(() => initialParam("ded", DEFAULTS.deductions));

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("income", String(income));
    params.set("ded", String(deductions));
    params.set("age", ageCategory);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [income, ageCategory, deductions]);

  const result = calculateIncomeTax({
    annualIncome: income,
    ageCategory,
    otherDeductions: deductions,
  });
  const { newRegime, oldRegime, cheaperRegime, savings } = result.value;
  const cheaperTax = cheaperRegime === "old" ? oldRegime.totalTax : newRegime.totalTax;

  return (
    <CalculatorPage
      title="Income tax: old vs new regime"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 70%"
      description="Compare your tax under both regimes and see exactly which one is cheaper, with the full calculation worked out."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Annual income"
            value={income}
            onChange={setIncome}
            min={0}
            max={20000000}
            step={50000}
            slider
            helpText="Gross annual income before any deductions — salary, or total taxable income."
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
            label="Deductions under old regime"
            value={deductions}
            onChange={setDeductions}
            min={0}
            max={500000}
            step={10000}
            slider
            helpText="80C, 80D, HRA, home loan interest, and other old-regime deductions, combined. Doesn't apply to the new regime."
          />
        </>
      }
      result={
        <div className="flex flex-col gap-6">
          <ResultDisplay
            value={formatCurrency(savings)}
            caption={
              cheaperRegime === "equal"
                ? "both regimes cost the same"
                : `saved per year under the ${cheaperRegime} regime`
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded border p-3 ${cheaperRegime === "new" ? "border-figure" : "border-rule"}`}
            >
              <p className="text-xs text-muted">New regime</p>
              <p className="mt-1 font-mono text-lg text-ink">{formatCurrency(newRegime.totalTax)}</p>
            </div>
            <div
              className={`rounded border p-3 ${cheaperRegime === "old" ? "border-figure" : "border-rule"}`}
            >
              <p className="text-xs text-muted">Old regime</p>
              <p className="mt-1 font-mono text-lg text-ink">{formatCurrency(oldRegime.totalTax)}</p>
            </div>
          </div>
        </div>
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Take-home", value: Math.max(0, income - cheaperTax) },
            { name: "Tax", value: cheaperTax },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Regime comparison, line by line"
          columns={[
            { key: "item", label: "Component" },
            { key: "new", label: "New regime", align: "right" },
            { key: "old", label: "Old regime", align: "right" },
          ]}
          rows={[
            {
              item: "Taxable income",
              new: formatCurrency(newRegime.taxableIncome),
              old: formatCurrency(oldRegime.taxableIncome),
            },
            {
              item: "Tax on slabs",
              new: formatCurrency(newRegime.baseTax),
              old: formatCurrency(oldRegime.baseTax),
            },
            {
              item: "Surcharge",
              new: formatCurrency(newRegime.surcharge),
              old: formatCurrency(oldRegime.surcharge),
            },
            {
              item: "Health & education cess",
              new: formatCurrency(newRegime.cess),
              old: formatCurrency(oldRegime.cess),
            },
            {
              item: "Section 87A rebate/relief",
              new: `−${formatCurrency(newRegime.rebateApplied)}`,
              old: `−${formatCurrency(oldRegime.rebateApplied)}`,
            },
            {
              item: "Total tax payable",
              new: formatCurrency(newRegime.totalTax),
              old: formatCurrency(oldRegime.totalTax),
            },
          ]}
        />
      }
      content={content}
    />
  );
}

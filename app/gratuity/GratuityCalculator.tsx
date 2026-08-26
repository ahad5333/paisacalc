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
import { calculateGratuity } from "@/lib/calc/gratuity";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { salary: 50000, years: 10 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialCovered(): boolean {
  return new URLSearchParams(window.location.search).get("covered") !== "0";
}

export function GratuityCalculator({ content }: { content: ReactNode }) {
  const [salary, setSalary] = useState(() => initialParam("salary", DEFAULTS.salary));
  const [years, setYears] = useState(() => initialParam("years", DEFAULTS.years));
  const [covered, setCovered] = useState<boolean>(initialCovered);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("salary", String(salary));
    params.set("years", String(years));
    params.set("covered", covered ? "1" : "0");
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [salary, years, covered]);

  const result = calculateGratuity({
    monthlySalary: salary,
    yearsOfService: years,
    coveredUnderAct: covered,
  });
  const { isEligible, computedGratuity, gratuityPayable, taxExempt, taxableGratuity } = result.value;
  const cappedAway = Math.max(0, computedGratuity - gratuityPayable);

  return (
    <CalculatorPage
      title="Gratuity calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 30%"
      description="Work out the gratuity you're entitled to and how much of it is tax-free, under the Payment of Gratuity Act."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Last drawn monthly salary"
            value={salary}
            onChange={setSalary}
            min={0}
            max={2000000}
            step={5000}
            slider
            helpText="Basic salary plus dearness allowance only — not your full CTC or gross salary."
          />
          <NumericInput
            label="Years of service"
            value={years}
            onChange={setYears}
            min={0}
            max={45}
            step={0.5}
            suffix="years"
            slider
            helpText="Total continuous service with this employer."
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="covered" className="text-sm text-muted">
              Employer covered under the Act
            </label>
            <select
              id="covered"
              value={covered ? "1" : "0"}
              onChange={(e) => setCovered(e.target.value === "1")}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              <option value="1">Yes — 10 or more employees (common case)</option>
              <option value="0">No</option>
            </select>
          </div>
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(gratuityPayable)}
          caption={
            !isEligible
              ? "not yet eligible — fewer than 5 years of service"
              : taxableGratuity > 0
                ? `${formatCurrency(taxExempt)} tax-free, ${formatCurrency(taxableGratuity)} taxable`
                : "fully tax-free"
          }
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Payable", value: gratuityPayable },
            { name: "Capped by ceiling", value: cappedAway },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Calculation breakdown"
          columns={[
            { key: "item", label: "Component" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={[
            { item: "Eligible", value: isEligible ? "Yes" : "No" },
            { item: "Computed gratuity", value: formatCurrency(computedGratuity) },
            { item: "Gratuity payable", value: formatCurrency(gratuityPayable) },
            { item: "Tax-exempt amount", value: formatCurrency(taxExempt) },
            { item: "Taxable amount", value: formatCurrency(taxableGratuity) },
          ]}
        />
      }
      content={content}
    />
  );
}

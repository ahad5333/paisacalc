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
import { calculatePrepaymentImpact, type PrepaymentStrategy } from "@/lib/calc/prepayment";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { principal: 4000000, rate: 8.5, tenureYears: 20, prepay: 500000, prepayYear: 2 };

const STRATEGY_LABELS: Record<PrepaymentStrategy, string> = {
  reduceEmi: "Lower my EMI, same end date",
  reduceTenure: "Keep my EMI, finish earlier",
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialStrategy(): PrepaymentStrategy {
  const raw = new URLSearchParams(window.location.search).get("strategy");
  return raw === "reduceEmi" ? "reduceEmi" : "reduceTenure";
}

export function PrepaymentCalculator({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.principal));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.rate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("t", DEFAULTS.tenureYears));
  const [prepayAmount, setPrepayAmount] = useState(() => initialParam("pp", DEFAULTS.prepay));
  const [prepayYear, setPrepayYear] = useState(() => initialParam("py", DEFAULTS.prepayYear));
  const [strategy, setStrategy] = useState<PrepaymentStrategy>(initialStrategy);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("p", String(principal));
    params.set("r", String(rate));
    params.set("t", String(tenureYears));
    params.set("pp", String(prepayAmount));
    params.set("py", String(prepayYear));
    params.set("strategy", strategy);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [principal, rate, tenureYears, prepayAmount, prepayYear, strategy]);

  const tenureMonths = Math.max(1, Math.round(tenureYears * 12));
  const prepaymentMonth = Math.max(1, Math.round(prepayYear * 12));

  const result = calculatePrepaymentImpact({
    principal,
    annualRatePercent: rate,
    tenureMonths,
    prepaymentAmount: prepayAmount,
    prepaymentMonth,
    strategy,
  });
  const {
    originalEmi,
    originalTotalInterest,
    originalTenureMonths,
    newEmi,
    newTenureMonths,
    newTotalInterest,
    interestSaved,
    tenureSavedMonths,
  } = result.value;

  return (
    <CalculatorPage
      title="Loan prepayment impact calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="30% 60%"
      description="See exactly how much interest a lump-sum prepayment saves, and whether it's worth lowering your EMI or shortening your tenure."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={100000}
            max={50000000}
            step={100000}
            slider
            helpText="The original loan principal."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.05}
            suffix="%"
            slider
            helpText="The annual interest rate on the loan."
          />
          <NumericInput
            label="Loan tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
            helpText="The original repayment period."
          />
          <NumericInput
            label="Prepayment amount"
            value={prepayAmount}
            onChange={setPrepayAmount}
            min={0}
            max={principal}
            step={50000}
            slider
            helpText="The one-time lump sum you plan to pay towards the principal."
          />
          <NumericInput
            label="Prepayment after"
            value={prepayYear}
            onChange={setPrepayYear}
            min={0}
            max={Math.max(1, tenureYears - 1)}
            step={0.5}
            suffix="years"
            slider
            helpText="How far into the loan you make the prepayment."
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="strategy" className="text-sm text-muted">
              What your lender does with the prepayment
            </label>
            <select
              id="strategy"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value as PrepaymentStrategy)}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              {(Object.keys(STRATEGY_LABELS) as PrepaymentStrategy[]).map((key) => (
                <option key={key} value={key}>
                  {STRATEGY_LABELS[key]}
                </option>
              ))}
            </select>
          </div>
        </>
      }
      result={
        <div className="flex flex-col gap-6">
          <ResultDisplay
            value={formatCurrency(interestSaved)}
            caption={
              strategy === "reduceTenure"
                ? `interest saved · loan finishes ${tenureSavedMonths} months early`
                : `interest saved · EMI drops to ${formatCurrency(newEmi)}`
            }
          />
        </div>
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Still paid", value: Math.max(0, newTotalInterest) },
            { name: "Saved", value: Math.max(0, interestSaved) },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Without prepayment vs with prepayment"
          columns={[
            { key: "item", label: "Component" },
            { key: "before", label: "Without prepayment", align: "right" },
            { key: "after", label: "With prepayment", align: "right" },
          ]}
          rows={[
            { item: "EMI", before: formatCurrency(originalEmi), after: formatCurrency(newEmi || originalEmi) },
            {
              item: "Tenure",
              before: `${originalTenureMonths} months`,
              after: `${newTenureMonths} months`,
            },
            {
              item: "Total interest",
              before: formatCurrency(originalTotalInterest),
              after: formatCurrency(newTotalInterest),
            },
          ]}
        />
      }
      content={content}
    />
  );
}

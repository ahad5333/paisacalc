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
import { aggregateYearly, calculateEmi } from "@/lib/calc/emi";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { p: 800000, r: 9.5, t: 5 };

// Client-only (see the same comment in EmiCalculator.tsx) — reads
// window.location.search directly, safe because there's no server-rendered
// output for it to mismatch against.
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

// Reuses lib/calc/emi.ts verbatim (ticket C9-01) — a car loan amortises
// exactly like a home loan, just with smaller amounts and a shorter
// tenure. No new calc logic, only different defaults, ranges, and copy.
export function CarLoanCalculator({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [tenureYears, setTenureYears] = useState(() => initialParam("t", DEFAULTS.t));

  useEffect(() => {
    replaceUrlParams({ p: principal, r: rate, t: tenureYears });
  }, [principal, rate, tenureYears]);

  const tenureMonths = Math.max(1, Math.round(tenureYears * 12));
  const result = calculateEmi({ principal, annualRatePercent: rate, tenureMonths });
  const yearly = aggregateYearly(result.value.schedule);

  return (
    <CalculatorPage
      title="Car loan EMI calculator"
      heroImage="/images/hero-highway.webp"
      heroObjectPosition="center 30%"
      description="Monthly EMI, total interest, and the full repayment schedule for a new or used car loan — with the formula worked out using your own numbers."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={50000}
            max={3000000}
            step={25000}
            slider
            presets={[
              { label: "₹3L", value: 300000 },
              { label: "₹5L", value: 500000 },
              { label: "₹8L", value: 800000 },
              { label: "₹12L", value: 1200000 },
              { label: "₹20L", value: 2000000 },
            ]}
            helpText="The on-road price of the car minus your down payment — the amount you're actually borrowing."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={6}
            max={16}
            step={0.05}
            suffix="%"
            slider
            helpText="The annual interest rate charged on the loan, as quoted by the lender."
          />
          <NumericInput
            label="Loan tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={7}
            step={1}
            suffix="years"
            slider
            helpText="How many years you'll take to repay the loan — most Indian lenders cap car loans at 7 years."
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(result.value.emi)} caption="per month" />}
      chart={
        <CalcChart
          variant="stacked-bar"
          data={yearly.map((y) => ({
            year: `Y${y.year}`,
            principal: y.principal,
            interest: y.interest,
          }))}
          xKey="year"
          keys={["principal", "interest"]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption={`Repayment schedule (${result.value.schedule.length} months)`}
          columns={[
            { key: "month", label: "Month" },
            { key: "emi", label: "EMI", align: "right" },
            { key: "principal", label: "Principal", align: "right" },
            { key: "interest", label: "Interest", align: "right" },
            { key: "balance", label: "Balance", align: "right" },
          ]}
          rows={result.value.schedule.map((row) => ({
            month: row.month,
            emi: formatCurrency(row.emi),
            principal: formatCurrency(row.principal),
            interest: formatCurrency(row.interest),
            balance: formatCurrency(row.balance),
          }))}
        />
      }
      content={content}
    />
  );
}

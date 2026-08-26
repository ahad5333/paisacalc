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
const DEFAULTS = { p: 4000000, r: 8.5, t: 20 };

// This component only ever mounts client-side (rendered via next/dynamic
// with ssr:false in page.tsx — see the comment there), so reading
// window.location.search directly in these initializers is safe: there's
// no server-rendered output for it to mismatch against.
function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function EmiCalculator({ content }: { content: ReactNode }) {
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
      title="Home loan EMI calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="60% 40%"
      description="Monthly EMI, total interest, and the full amortisation schedule — with the formula worked out using your own numbers."
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
            presets={[
              { label: "₹10L", value: 1000000 },
              { label: "₹25L", value: 2500000 },
              { label: "₹50L", value: 5000000 },
              { label: "₹75L", value: 7500000 },
              { label: "₹1Cr", value: 10000000 },
            ]}
            helpText="The total amount you're borrowing from the lender."
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
            helpText="The annual interest rate charged on the loan, as quoted by the lender."
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
            helpText="How many years you'll take to repay the loan."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(result.value.emi)}
          caption={`per month · ${formatCurrency(result.value.totalInterest)} total interest · ${formatCurrency(result.value.totalPayment)} total payment`}
        />
      }
      chart={
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-center font-mono text-xs uppercase tracking-wide text-muted">
              Principal vs interest
            </p>
            <CalcChart
              variant="donut"
              data={[
                { name: "Principal", value: principal },
                { name: "Total interest", value: result.value.totalInterest },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-center font-mono text-xs uppercase tracking-wide text-muted">
              Year by year
            </p>
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
          </div>
        </div>
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption={`Amortisation schedule (${result.value.schedule.length} months)`}
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

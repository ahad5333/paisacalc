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

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { p: 500000, r: 13, t: 3 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

// Reuses lib/calc/emi.ts verbatim, same as Car Loan EMI — a personal loan
// amortises identically, just unsecured (no collateral), which is exactly
// why its rate range and max tenure are so different from a home or car
// loan: verified against current bank-published rates before setting
// defaults (9.5-24% p.a., typically 5-year cap — BankBazaar, ICICI, SBI,
// accessed 18 Aug 2026).
export function PersonalLoanCalculator({ content }: { content: ReactNode }) {
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
      title="Personal loan EMI calculator"
      heroImage="/images/hero-rupee.webp"
      heroObjectPosition="55% center"
      description="Monthly EMI and repayment schedule for an unsecured personal loan — with the formula worked out using your own numbers."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={25000}
            max={4000000}
            step={25000}
            slider
            helpText="The amount you're borrowing — personal loans are unsecured, so this is capped by your income and credit profile, not a collateral value."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={9.5}
            max={24}
            step={0.1}
            suffix="%"
            slider
            helpText="Personal loan rates run well above secured loans like home or car loans, since there's no collateral backing them."
          />
          <NumericInput
            label="Loan tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={5}
            step={1}
            suffix="years"
            slider
            helpText="Most lenders cap personal loan tenure at 5 years — much shorter than a home or car loan."
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

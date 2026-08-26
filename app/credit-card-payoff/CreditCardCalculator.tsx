"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateCreditCardPayoff } from "@/lib/calc/credit-card";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { balance: 100000, rate: 3.5, payment: 5000 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CreditCardCalculator({ content }: { content: ReactNode }) {
  const [balance, setBalance] = useState(() => initialParam("b", DEFAULTS.balance));
  const [monthlyRate, setMonthlyRate] = useState(() => initialParam("r", DEFAULTS.rate));
  const [monthlyPayment, setMonthlyPayment] = useState(() => initialParam("p", DEFAULTS.payment));

  useEffect(() => {
    replaceUrlParams({ b: balance, r: monthlyRate, p: monthlyPayment });
  }, [balance, monthlyRate, monthlyPayment]);

  const result = calculateCreditCardPayoff({
    balance,
    monthlyRatePercent: monthlyRate,
    monthlyPayment,
  });
  const { monthsToPayoff, totalInterest, schedule, minInterestOnlyPayment } = result.value;
  const neverPaysOff = monthsToPayoff === null;

  return (
    <CalculatorPage
      title="Credit card payoff calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="70% 55%"
      description="How many months a fixed monthly payment takes to clear a credit card balance, and how much interest it costs along the way."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Outstanding balance"
            value={balance}
            onChange={setBalance}
            min={1000}
            max={2000000}
            step={1000}
            slider
            helpText="The amount currently owed on the card."
          />
          <NumericInput
            label="Monthly interest rate"
            value={monthlyRate}
            onChange={setMonthlyRate}
            min={1.5}
            max={4}
            step={0.05}
            suffix="% / month"
            slider
            helpText="Indian card issuers quote this monthly, not annually — typically 2.5-3.75% per month (30-45% a year)."
          />
          <NumericInput
            label="Monthly payment"
            value={monthlyPayment}
            onChange={setMonthlyPayment}
            min={500}
            max={200000}
            step={500}
            slider
            helpText="How much you'll pay every month, on top of no new spending on the card."
          />
        </>
      }
      result={
        neverPaysOff ? (
          <ResultDisplay
            value="Never"
            caption={`this payment doesn't cover this month's interest of ${formatCurrency(minInterestOnlyPayment)} — increase it to make any progress`}
          />
        ) : (
          <ResultDisplay
            value={`${monthsToPayoff} months`}
            caption={`to pay off — ${formatCurrency(totalInterest)} in total interest`}
          />
        )
      }
      chart={
        !neverPaysOff && schedule.length > 0 ? (
          <CalcChart
            variant="donut"
            data={[
              { name: "Balance", value: balance },
              { name: "Interest", value: totalInterest },
            ]}
          />
        ) : undefined
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        !neverPaysOff && schedule.length > 0 ? (
          <DetailTable
            caption={`Payoff schedule (${schedule.length} months)`}
            columns={[
              { key: "month", label: "Month" },
              { key: "payment", label: "Payment", align: "right" },
              { key: "principal", label: "Principal", align: "right" },
              { key: "interest", label: "Interest", align: "right" },
              { key: "balance", label: "Balance", align: "right" },
            ]}
            rows={schedule.map((row) => ({
              month: row.month,
              payment: formatCurrency(row.emi),
              principal: formatCurrency(row.principal),
              interest: formatCurrency(row.interest),
              balance: formatCurrency(row.balance),
            }))}
          />
        ) : undefined
      }
      content={content}
    />
  );
}

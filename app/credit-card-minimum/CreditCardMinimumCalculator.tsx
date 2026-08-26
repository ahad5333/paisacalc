"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateCreditCardMinimum } from "@/lib/calc/credit-card-minimum";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { balance: 100000, rate: 3, minPercent: 5, floor: 500 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CreditCardMinimumCalculator({ content }: { content: ReactNode }) {
  const [balance, setBalance] = useState(() => initialParam("b", DEFAULTS.balance));
  const [monthlyRatePercent, setMonthlyRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [minPaymentPercent, setMinPaymentPercent] = useState(() => initialParam("m", DEFAULTS.minPercent));
  const [minPaymentFloor, setMinPaymentFloor] = useState(() => initialParam("f", DEFAULTS.floor));

  useEffect(() => {
    replaceUrlParams({ b: balance, r: monthlyRatePercent, m: minPaymentPercent, f: minPaymentFloor });
  }, [balance, monthlyRatePercent, minPaymentPercent, minPaymentFloor]);

  const result = calculateCreditCardMinimum({ balance, monthlyRatePercent, minPaymentPercent, minPaymentFloor });
  const { monthsToPayoff, totalInterest } = result.value;

  return (
    <CalculatorPage
      title="Credit card minimum payment calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="70% 55%"
      description="What paying only the minimum actually costs — the payment shrinks as the balance shrinks, stretching payoff far longer than a fixed payment would."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Card balance" value={balance} onChange={setBalance} min={5000} max={2000000} step={5000} slider />
          <NumericInput
            label="Monthly interest rate"
            value={monthlyRatePercent}
            onChange={setMonthlyRatePercent}
            min={1}
            max={4}
            step={0.1}
            suffix="%/month"
            slider
            helpText="Indian cards typically quote 2.5-3.75% per month."
          />
          <NumericInput
            label="Minimum payment"
            value={minPaymentPercent}
            onChange={setMinPaymentPercent}
            min={1}
            max={10}
            step={0.5}
            suffix="% of balance"
            slider
          />
          <NumericInput
            label="Minimum payment floor"
            value={minPaymentFloor}
            onChange={setMinPaymentFloor}
            min={100}
            max={5000}
            step={100}
            slider
            helpText="Whichever is higher — the percentage or this flat amount."
          />
        </>
      }
      result={
        <ResultDisplay
          value={monthsToPayoff === null ? "Never" : `${monthsToPayoff} months`}
          caption={
            monthsToPayoff === null
              ? "This minimum payment doesn't even cover the interest"
              : `To pay off entirely — ${formatCurrency(totalInterest)} in total interest`
          }
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

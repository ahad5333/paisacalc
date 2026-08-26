"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateCommission } from "@/lib/calc/commission";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { amount: 1000000, rate: 2 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CommissionCalculator({ content }: { content: ReactNode }) {
  const [saleAmount, setSaleAmount] = useState(() => initialParam("a", DEFAULTS.amount));
  const [commissionPercent, setCommissionPercent] = useState(() => initialParam("c", DEFAULTS.rate));

  useEffect(() => {
    replaceUrlParams({ a: saleAmount, c: commissionPercent });
  }, [saleAmount, commissionPercent]);

  const result = calculateCommission({ saleAmount, commissionPercent });
  const { commissionAmount, netAmount } = result.value;

  return (
    <CalculatorPage
      title="Commission calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 45%"
      description="Commission earned on a sale, and what's left after it — for a broker's fee, an agent's cut, or a salesperson's commission."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Sale amount" value={saleAmount} onChange={setSaleAmount} min={1000} max={50000000} step={10000} slider />
          <NumericInput
            label="Commission rate"
            value={commissionPercent}
            onChange={setCommissionPercent}
            min={0}
            max={10}
            step={0.25}
            suffix="%"
            slider
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(commissionAmount)} caption={`Commission — ${formatCurrency(netAmount)} left after it`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

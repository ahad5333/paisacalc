"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateFactor } from "@/lib/calc/factor";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function FactorCalculator({ content }: { content: ReactNode }) {
  const [n, setN] = useState(() => initialParam("n", 36));

  useEffect(() => {
    replaceUrlParams({ n });
  }, [n]);

  const result = calculateFactor({ n });
  const { factors, primeFactorization, isPrime } = result.value;

  return (
    <CalculatorPage
      title="Factor calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Every factor of a number, plus its prime factorization."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<NumericInput label="Number" value={n} onChange={setN} min={1} max={100000} step={1} />}
      result={<ResultDisplay value={`${factors.length}`} caption={`factors${isPrime ? " — this number is prime" : ""}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="All factors"
          columns={[{ key: "factors", label: `Factors of ${n}` }]}
          rows={[{ factors: factors.join(", ") }]}
        />
      }
      content={content}
    />
  );
}

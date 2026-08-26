"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMargin } from "@/lib/calc/margin";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { cost: 600, selling: 900 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function MarginCalculator({ content }: { content: ReactNode }) {
  const [costPrice, setCostPrice] = useState(() => initialParam("c", DEFAULTS.cost));
  const [sellingPrice, setSellingPrice] = useState(() => initialParam("s", DEFAULTS.selling));

  useEffect(() => {
    replaceUrlParams({ c: costPrice, s: sellingPrice });
  }, [costPrice, sellingPrice]);

  const result = calculateMargin({ costPrice, sellingPrice });
  const { marginPercent, markupPercent } = result.value;

  return (
    <CalculatorPage
      title="Margin calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 40%"
      description="Margin and markup — the same profit expressed two different ways, and a common source of pricing mistakes when the two get confused."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Cost price" value={costPrice} onChange={setCostPrice} min={1} max={1000000} step={10} slider />
          <NumericInput label="Selling price" value={sellingPrice} onChange={setSellingPrice} min={1} max={1000000} step={10} slider />
        </>
      }
      result={
        <ResultDisplay
          value={formatPercent(marginPercent, 2)}
          caption={`Margin — which is a ${formatPercent(markupPercent, 2)} markup on cost`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

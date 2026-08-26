"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBraSize } from "@/lib/calc/bra-size";

const LAST_VERIFIED = "19 Aug 2026";

export function BraSizeCalculatorPage({ content }: { content: ReactNode }) {
  const [underbustIn, setUnderbustIn] = useState(32);
  const [bustIn, setBustIn] = useState(36);

  const result = calculateBraSize({ underbustIn, bustIn });
  const { sizeLabel } = result.value;

  return (
    <CalculatorPage
      title="Bra size calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Estimated bra size from underbust and bust measurements."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Underbust measurement" value={underbustIn} onChange={setUnderbustIn} min={24} max={50} step={0.5} suffix="in" slider />
          <NumericInput label="Bust measurement (fullest point)" value={bustIn} onChange={setBustIn} min={24} max={60} step={0.5} suffix="in" slider />
        </>
      }
      result={<ResultDisplay value={sizeLabel} caption="Estimated size" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

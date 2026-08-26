"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateSquareFootage } from "@/lib/calc/square-footage";

const LAST_VERIFIED = "19 Aug 2026";

export function SquareFootageCalculatorPage({ content }: { content: ReactNode }) {
  const [lengthFt, setLengthFt] = useState(12);
  const [widthFt, setWidthFt] = useState(10);
  const [costPerSqft, setCostPerSqft] = useState(0);

  const result = calculateSquareFootage({ lengthFt, widthFt, costPerSqft });
  const { squareFeet, totalCost } = result.value;

  return (
    <CalculatorPage
      title="Square footage calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Area of a rectangular room in square feet, plus a material cost estimate."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Length" value={lengthFt} onChange={setLengthFt} min={0.5} step={0.5} suffix="ft" />
            <NumericInput label="Width" value={widthFt} onChange={setWidthFt} min={0.5} step={0.5} suffix="ft" />
          </div>
          <NumericInput label="Cost per sq ft (optional)" value={costPerSqft} onChange={setCostPerSqft} min={0} step={0.5} />
        </>
      }
      result={<ResultDisplay value={`${squareFeet} sq ft`} caption={costPerSqft > 0 ? `Estimated cost: ${totalCost}` : "Area"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

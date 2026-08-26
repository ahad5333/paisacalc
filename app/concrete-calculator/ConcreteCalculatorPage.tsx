"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateConcrete } from "@/lib/calc/concrete";

const LAST_VERIFIED = "19 Aug 2026";

export function ConcreteCalculatorPage({ content }: { content: ReactNode }) {
  const [lengthFt, setLengthFt] = useState(10);
  const [widthFt, setWidthFt] = useState(10);
  const [depthInches, setDepthInches] = useState(4);

  const result = calculateConcrete({ lengthFt, widthFt, depthInches });
  const { cubicFeet, cubicYards, bags60lb, bags80lb } = result.value;

  return (
    <CalculatorPage
      title="Concrete calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Concrete volume needed for a slab, plus how many bags to buy."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Length" value={lengthFt} onChange={setLengthFt} min={0.5} step={0.5} suffix="ft" />
            <NumericInput label="Width" value={widthFt} onChange={setWidthFt} min={0.5} step={0.5} suffix="ft" />
          </div>
          <NumericInput label="Depth" value={depthInches} onChange={setDepthInches} min={1} max={24} step={0.5} suffix="in" slider />
        </>
      }
      result={<ResultDisplay value={`${cubicYards} yd³`} caption={`${cubicFeet} cubic feet`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Bags needed"
          columns={[
            { key: "bag", label: "Bag size" },
            { key: "count", label: "Bags", align: "right" },
          ]}
          rows={[
            { bag: "60 lb bags", count: `${bags60lb}` },
            { bag: "80 lb bags", count: `${bags80lb}` },
          ]}
        />
      }
      content={content}
    />
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGdp } from "@/lib/calc/gdp";

const LAST_VERIFIED = "19 Aug 2026";

export function GdpCalculatorPage({ content }: { content: ReactNode }) {
  const [consumption, setConsumption] = useState(500);
  const [investment, setInvestment] = useState(200);
  const [governmentSpending, setGovernmentSpending] = useState(150);
  const [exports, setExports] = useState(100);
  const [imports, setImports] = useState(80);

  const result = calculateGdp({ consumption, investment, governmentSpending, exports, imports });
  const { gdp, netExports } = result.value;

  return (
    <CalculatorPage
      title="GDP calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Gross Domestic Product via the expenditure approach: consumption, investment, government spending, and net exports."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Consumption (C)" value={consumption} onChange={setConsumption} min={0} step={10} />
          <NumericInput label="Investment (I)" value={investment} onChange={setInvestment} min={0} step={10} />
          <NumericInput label="Government spending (G)" value={governmentSpending} onChange={setGovernmentSpending} min={0} step={10} />
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Exports (X)" value={exports} onChange={setExports} min={0} step={10} />
            <NumericInput label="Imports (M)" value={imports} onChange={setImports} min={0} step={10} />
          </div>
        </>
      }
      result={<ResultDisplay value={`${gdp.toLocaleString("en-IN")}`} caption={`GDP — net exports ${netExports}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

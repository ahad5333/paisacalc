"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateTip } from "@/lib/calc/tip";

const LAST_VERIFIED = "19 Aug 2026";

export function TipCalculatorPage({ content }: { content: ReactNode }) {
  const [billAmount, setBillAmount] = useState(100);
  const [tipPct, setTipPct] = useState(20);
  const [numPeople, setNumPeople] = useState(4);

  const result = calculateTip({ billAmount, tipPct, numPeople });
  const { tipAmount, totalAmount, perPerson } = result.value;

  return (
    <CalculatorPage
      title="Tip calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Tip amount, total bill, and per-person split."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Bill amount" value={billAmount} onChange={setBillAmount} min={0} step={1} />
          <NumericInput label="Tip percentage" value={tipPct} onChange={setTipPct} min={0} max={30} step={1} suffix="%" slider />
          <NumericInput label="Number of people" value={numPeople} onChange={setNumPeople} min={1} max={20} step={1} slider />
        </>
      }
      result={<ResultDisplay value={`${totalAmount}`} caption={`Tip ${tipAmount} — ${perPerson} per person`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

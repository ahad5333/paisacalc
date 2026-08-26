"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMolarity, type MolarityUnknown } from "@/lib/calc/molarity";

const LAST_VERIFIED = "19 Aug 2026";

const UNKNOWN_OPTIONS: { value: MolarityUnknown; label: string }[] = [
  { value: "molarity", label: "Molarity" },
  { value: "moles", label: "Moles" },
  { value: "volume", label: "Volume" },
];

export function MolarityCalculatorPage({ content }: { content: ReactNode }) {
  const [unknown, setUnknown] = useState<MolarityUnknown>("molarity");
  const [molarity, setMolarity] = useState(0);
  const [moles, setMoles] = useState(1);
  const [volumeLiters, setVolumeLiters] = useState(2);

  const result = calculateMolarity({ molarity, moles, volumeLiters, unknown });
  const { result: value } = result.value;

  return (
    <CalculatorPage
      title="Molarity calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Solve for molarity, moles, or volume given the other two."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Solve for" value={unknown} onChange={setUnknown} options={UNKNOWN_OPTIONS} />
          {unknown !== "molarity" && <NumericInput label="Molarity (M)" value={molarity} onChange={setMolarity} min={0} step={0.1} />}
          {unknown !== "moles" && <NumericInput label="Moles of solute" value={moles} onChange={setMoles} min={0} step={0.1} />}
          {unknown !== "volume" && <NumericInput label="Volume of solution" value={volumeLiters} onChange={setVolumeLiters} min={0.01} step={0.1} suffix="L" />}
        </>
      }
      result={<ResultDisplay value={Number.isFinite(value) ? `${value}` : "undefined"} caption={`Solved for ${unknown}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

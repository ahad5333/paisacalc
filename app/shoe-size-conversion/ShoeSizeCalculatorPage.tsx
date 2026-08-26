"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateShoeSize, type ShoeSizeSystem } from "@/lib/calc/shoe-size";

const LAST_VERIFIED = "19 Aug 2026";

const SYSTEM_OPTIONS: { value: ShoeSizeSystem; label: string }[] = [
  { value: "usMen", label: "US Men's" },
  { value: "usWomen", label: "US Women's" },
  { value: "uk", label: "UK" },
  { value: "eu", label: "EU" },
];

export function ShoeSizeCalculatorPage({ content }: { content: ReactNode }) {
  const [size, setSize] = useState(10);
  const [system, setSystem] = useState<ShoeSizeSystem>("usMen");

  const result = calculateShoeSize({ size, system });
  const { usMen, usWomen, uk, eu } = result.value;

  return (
    <CalculatorPage
      title="Shoe size conversion"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert a shoe size between US Men's, US Women's, UK, and EU sizing."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sizing system" value={system} onChange={setSystem} options={SYSTEM_OPTIONS} />
          <NumericInput label="Size" value={size} onChange={setSize} min={1} max={50} step={0.5} />
        </>
      }
      result={<ResultDisplay value={`EU ${eu}`} caption={`US Men's ${usMen} — US Women's ${usWomen} — UK ${uk}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="All sizing systems"
          columns={[
            { key: "system", label: "System" },
            { key: "size", label: "Size", align: "right" },
          ]}
          rows={[
            { system: "US Men's", size: `${usMen}` },
            { system: "US Women's", size: `${usWomen}` },
            { system: "UK", size: `${uk}` },
            { system: "EU", size: `${eu}` },
          ]}
        />
      }
      content={content}
    />
  );
}

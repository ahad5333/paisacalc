"use client";

import { useId, useState, type ReactNode } from "react";
import { ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateMolecularWeight } from "@/lib/calc/molecular-weight";

const LAST_VERIFIED = "19 Aug 2026";

function FormulaInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        Chemical formula
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Ca(OH)2"
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
      <p className="text-xs text-muted">Case-sensitive element symbols, e.g. H2O, NaCl, Ca(OH)2, C6H12O6.</p>
    </div>
  );
}

export function MolecularWeightCalculatorPage({ content }: { content: ReactNode }) {
  const [formula, setFormula] = useState("H2O");

  const result = calculateMolecularWeight({ formula });
  const { totalWeight, elements, error } = result.value;

  return (
    <CalculatorPage
      title="Molecular weight calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Molecular weight of a compound from its chemical formula, including grouped formulas like Ca(OH)2."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<FormulaInput value={formula} onChange={setFormula} />}
      result={<ResultDisplay value={error ? "Error" : `${totalWeight} g/mol`} caption={error ?? "Molecular weight"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        !error && elements.length > 0 ? (
          <DetailTable
            caption="Element breakdown"
            columns={[
              { key: "element", label: "Element" },
              { key: "count", label: "Count", align: "right" },
              { key: "weight", label: "Weight", align: "right" },
            ]}
            rows={elements.map((e) => ({ element: e.element, count: `${e.count}`, weight: `${e.weight}` }))}
          />
        ) : undefined
      }
      content={content}
    />
  );
}

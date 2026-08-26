"use client";

import { useState, type ReactNode } from "react";
import { ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMatrix, type Matrix2x2, type MatrixOperation } from "@/lib/calc/matrix";

const LAST_VERIFIED = "19 Aug 2026";

const OPERATION_OPTIONS: { value: MatrixOperation; label: string }[] = [
  { value: "add", label: "A + B" },
  { value: "subtract", label: "A − B" },
  { value: "multiply", label: "A × B" },
];

function MatrixInput({ label, value, onChange }: { label: string; value: Matrix2x2; onChange: (m: Matrix2x2) => void }) {
  function setCell(row: 0 | 1, col: 0 | 1, raw: string) {
    const n = Number(raw);
    const next: Matrix2x2 = [
      [value[0][0], value[0][1]],
      [value[1][0], value[1][1]],
    ];
    next[row][col] = Number.isFinite(n) ? n : 0;
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-muted">{label}</span>
      <div className="grid w-fit grid-cols-2 gap-2 rounded border border-rule bg-paper/90 p-3">
        {([0, 1] as const).map((row) =>
          ([0, 1] as const).map((col) => (
            <input
              key={`${row}-${col}`}
              type="text"
              inputMode="decimal"
              value={value[row][col]}
              onChange={(e) => setCell(row, col, e.target.value)}
              className="w-16 rounded border border-rule bg-transparent px-2 py-1 text-center font-mono text-base text-ink outline-none focus:border-figure"
            />
          )),
        )}
      </div>
    </div>
  );
}

export function MatrixCalculator({ content }: { content: ReactNode }) {
  const [a, setA] = useState<Matrix2x2>([
    [1, 2],
    [3, 4],
  ]);
  const [b, setB] = useState<Matrix2x2>([
    [5, 6],
    [7, 8],
  ]);
  const [operation, setOperation] = useState<MatrixOperation>("add");

  const result = calculateMatrix({ a, b, operation });
  const { result: matrix } = result.value;

  return (
    <CalculatorPage
      title="Matrix calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Add, subtract, or multiply two 2×2 matrices, with each matrix's determinant."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="flex flex-wrap gap-6">
            <MatrixInput label="Matrix A" value={a} onChange={setA} />
            <MatrixInput label="Matrix B" value={b} onChange={setB} />
          </div>
          <ChoiceInput label="Operation" value={operation} onChange={setOperation} options={OPERATION_OPTIONS} />
        </>
      }
      result={
        <ResultDisplay
          value={`[${matrix[0][0]}, ${matrix[0][1]}; ${matrix[1][0]}, ${matrix[1][1]}]`}
          caption="Result matrix"
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

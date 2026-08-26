"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateFraction, type FractionOperation } from "@/lib/calc/fraction";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const OPERATION_OPTIONS: { value: FractionOperation; label: string }[] = [
  { value: "add", label: "+" },
  { value: "subtract", label: "−" },
  { value: "multiply", label: "×" },
  { value: "divide", label: "÷" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function FractionCalculator({ content }: { content: ReactNode }) {
  const [num1, setNum1] = useState(() => initialParam("n1", 1));
  const [den1, setDen1] = useState(() => initialParam("d1", 2));
  const [num2, setNum2] = useState(() => initialParam("n2", 1));
  const [den2, setDen2] = useState(() => initialParam("d2", 3));
  const [operation, setOperation] = useState<FractionOperation>("add");

  useEffect(() => {
    replaceUrlParams({ n1: num1, d1: den1, n2: num2, d2: den2 });
  }, [num1, den1, num2, den2]);

  const result = calculateFraction({ num1, den1, num2, den2, operation });
  const { resultNum, resultDen, decimal } = result.value;

  return (
    <CalculatorPage
      title="Fraction calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Add, subtract, multiply, or divide two fractions, simplified to lowest terms with the decimal equivalent."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Numerator 1" value={num1} onChange={setNum1} step={1} />
            <NumericInput label="Denominator 1" value={den1} onChange={setDen1} step={1} />
          </div>
          <ChoiceInput label="Operation" value={operation} onChange={setOperation} options={OPERATION_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Numerator 2" value={num2} onChange={setNum2} step={1} />
            <NumericInput label="Denominator 2" value={den2} onChange={setDen2} step={1} />
          </div>
        </>
      }
      result={<ResultDisplay value={`${resultNum}/${resultDen}`} caption={`= ${decimal}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

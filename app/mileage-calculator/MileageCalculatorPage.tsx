"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMileageReimbursement } from "@/lib/calc/mileage-reimbursement";

const LAST_VERIFIED = "19 Aug 2026";

export function MileageCalculatorPage({ content }: { content: ReactNode }) {
  const [miles, setMiles] = useState(120);
  const [ratePerMile, setRatePerMile] = useState(0.67);

  const result = calculateMileageReimbursement({ miles, ratePerMile });
  const { reimbursement } = result.value;

  return (
    <CalculatorPage
      title="Mileage calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Travel reimbursement owed for business miles driven, at a given rate per mile."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Miles driven" value={miles} onChange={setMiles} min={0} step={1} />
          <NumericInput label="Rate per mile" value={ratePerMile} onChange={setRatePerMile} min={0} step={0.01} />
        </>
      }
      result={<ResultDisplay value={`${reimbursement}`} caption="Total reimbursement" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

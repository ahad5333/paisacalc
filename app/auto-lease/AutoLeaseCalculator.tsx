"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateAutoLease } from "@/lib/calc/auto-lease";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { price: 1500000, residual: 50, term: 36, rate: 8 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function AutoLeaseCalculator({ content }: { content: ReactNode }) {
  const [vehiclePrice, setVehiclePrice] = useState(() => initialParam("p", DEFAULTS.price));
  const [residualValuePercent, setResidualValuePercent] = useState(() => initialParam("rv", DEFAULTS.residual));
  const [leaseTermMonths, setLeaseTermMonths] = useState(() => initialParam("t", DEFAULTS.term));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));

  useEffect(() => {
    replaceUrlParams({ p: vehiclePrice, rv: residualValuePercent, t: leaseTermMonths, r: ratePercent });
  }, [vehiclePrice, residualValuePercent, leaseTermMonths, ratePercent]);

  const result = calculateAutoLease({ vehiclePrice, residualValuePercent, leaseTermMonths, ratePercent });
  const { monthlyLeasePayment, totalLeaseCost } = result.value;

  return (
    <CalculatorPage
      title="Auto lease calculator"
      heroImage="/images/hero-highway.webp"
      heroObjectPosition="center 45%"
      description="Monthly lease payment for a car — the depreciation charge plus the finance charge, the two pieces every lease payment is built from."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Vehicle price"
            value={vehiclePrice}
            onChange={setVehiclePrice}
            min={300000}
            max={10000000}
            step={50000}
            slider
          />
          <NumericInput
            label="Residual value at lease end"
            value={residualValuePercent}
            onChange={setResidualValuePercent}
            min={30}
            max={70}
            step={5}
            suffix="%"
            slider
          />
          <NumericInput
            label="Lease term"
            value={leaseTermMonths}
            onChange={setLeaseTermMonths}
            min={12}
            max={60}
            step={6}
            suffix="months"
            slider
          />
          <NumericInput
            label="Interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={0}
            max={16}
            step={0.25}
            suffix="%"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(monthlyLeasePayment)}
          caption={`Monthly lease payment — ${formatCurrency(totalLeaseCost)} total over the lease`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

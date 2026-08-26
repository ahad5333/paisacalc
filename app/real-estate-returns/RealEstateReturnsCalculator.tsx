"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRealEstateReturns } from "@/lib/calc/real-estate-returns";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency, formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { price: 6000000, buyCost: 7, sellCost: 2, appreciation: 8, years: 5 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RealEstateReturnsCalculator({ content }: { content: ReactNode }) {
  const [purchasePrice, setPurchasePrice] = useState(() => initialParam("p", DEFAULTS.price));
  const [buyingCostPercent, setBuyingCostPercent] = useState(() => initialParam("bc", DEFAULTS.buyCost));
  const [sellingCostPercent, setSellingCostPercent] = useState(() => initialParam("sc", DEFAULTS.sellCost));
  const [appreciationPercent, setAppreciationPercent] = useState(() => initialParam("a", DEFAULTS.appreciation));
  const [holdingYears, setHoldingYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({
      p: purchasePrice,
      bc: buyingCostPercent,
      sc: sellingCostPercent,
      a: appreciationPercent,
      y: holdingYears,
    });
  }, [purchasePrice, buyingCostPercent, sellingCostPercent, appreciationPercent, holdingYears]);

  const result = calculateRealEstateReturns({
    purchasePrice,
    buyingCostPercent,
    sellingCostPercent,
    appreciationPercent,
    holdingYears,
  });
  const { netProfit, annualizedReturnPercent } = result.value;

  return (
    <CalculatorPage
      title="Real estate returns calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="70% 40%"
      description="Net profit and annualised return from buying a property and selling it later — after stamp duty, registration, and selling costs eat into the headline appreciation."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Purchase price"
            value={purchasePrice}
            onChange={setPurchasePrice}
            min={1000000}
            max={50000000}
            step={100000}
            slider
          />
          <NumericInput
            label="Buying cost"
            value={buyingCostPercent}
            onChange={setBuyingCostPercent}
            min={0}
            max={12}
            step={0.5}
            suffix="%"
            slider
            helpText="Stamp duty, registration, and buyer-side brokerage combined — varies by state."
          />
          <NumericInput
            label="Selling cost"
            value={sellingCostPercent}
            onChange={setSellingCostPercent}
            min={0}
            max={5}
            step={0.5}
            suffix="%"
            slider
          />
          <NumericInput
            label="Annual appreciation"
            value={appreciationPercent}
            onChange={setAppreciationPercent}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
            slider
          />
          <NumericInput
            label="Holding period"
            value={holdingYears}
            onChange={setHoldingYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(netProfit)}
          caption={`Net profit after all costs — an annualised return of ${formatPercent(annualizedReturnPercent, 1)}, below the ${formatPercent(appreciationPercent, 1)} headline appreciation rate`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

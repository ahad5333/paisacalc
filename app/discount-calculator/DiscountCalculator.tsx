"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDiscount } from "@/lib/calc/discount";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { price: 2000, discount: 30 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DiscountCalculator({ content }: { content: ReactNode }) {
  const [originalPrice, setOriginalPrice] = useState(() => initialParam("p", DEFAULTS.price));
  const [discountPercent, setDiscountPercent] = useState(() => initialParam("d", DEFAULTS.discount));

  useEffect(() => {
    replaceUrlParams({ p: originalPrice, d: discountPercent });
  }, [originalPrice, discountPercent]);

  const result = calculateDiscount({ originalPrice, discountPercent });
  const { discountAmount, finalPrice } = result.value;

  return (
    <CalculatorPage
      title="Discount calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="center 45%"
      description="The final price after a percentage discount, and exactly how much you're saving."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Original price" value={originalPrice} onChange={setOriginalPrice} min={0} max={1000000} step={10} slider />
          <NumericInput
            label="Discount"
            value={discountPercent}
            onChange={setDiscountPercent}
            min={0}
            max={90}
            step={1}
            suffix="%"
            slider
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(finalPrice)} caption={`Final price — you save ${formatCurrency(discountAmount)}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

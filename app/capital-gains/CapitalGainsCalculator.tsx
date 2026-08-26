"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  NumericInput,
  ResultDisplay,
  DerivationPanel,
  CalcChart,
  DetailTable,
  CalculatorPage,
} from "@/components/calculator";
import { calculateCapitalGains, type AssetType } from "@/lib/calc/capital-gains";
import { CAPITAL_GAINS_FY_2026_27 } from "@/lib/rules";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency, formatPercent } from "@/lib/format";

const LAST_VERIFIED = "17 Aug 2026";
const DEFAULTS = { purchase: 2000000, sale: 6000000, months: 200 };
const FY_OPTIONS = Object.keys(CAPITAL_GAINS_FY_2026_27.costInflationIndex).sort();

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialAssetType(): AssetType {
  const raw = new URLSearchParams(window.location.search).get("asset");
  return raw === "equity" ? "equity" : "property";
}

function initialFy(): string {
  const raw = new URLSearchParams(window.location.search).get("fy");
  return raw && FY_OPTIONS.includes(raw) ? raw : "2010-11";
}

export function CapitalGainsCalculator({ content }: { content: ReactNode }) {
  const [assetType, setAssetType] = useState<AssetType>(initialAssetType);
  const [purchaseValue, setPurchaseValue] = useState(() => initialParam("p", DEFAULTS.purchase));
  const [saleValue, setSaleValue] = useState(() => initialParam("s", DEFAULTS.sale));
  const [holdingMonths, setHoldingMonths] = useState(() => initialParam("m", DEFAULTS.months));
  const [purchaseFy, setPurchaseFy] = useState<string>(initialFy);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("asset", assetType);
    params.set("p", String(purchaseValue));
    params.set("s", String(saleValue));
    params.set("m", String(holdingMonths));
    params.set("fy", purchaseFy);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [assetType, purchaseValue, saleValue, holdingMonths, purchaseFy]);

  const result = calculateCapitalGains({
    assetType,
    purchaseValue,
    saleValue,
    purchaseFinancialYear: purchaseFy,
    holdingMonths,
  });
  const {
    isLongTerm,
    gain,
    taxableGain,
    taxRate,
    tax,
    indexedCost,
    taxWithIndexation,
    taxWithoutIndexation,
    usedIndexation,
  } = result.value;

  const isPropertyShortTerm = assetType === "property" && !isLongTerm;

  const detailRows =
    assetType === "equity"
      ? [
          { item: "Gain", value: formatCurrency(gain) },
          { item: "Holding period", value: isLongTerm ? "Long-term" : "Short-term" },
          { item: "Exemption used", value: formatCurrency(result.value.exemption) },
          { item: "Taxable gain", value: formatCurrency(taxableGain) },
          { item: "Tax rate", value: taxRate !== null ? formatPercent(taxRate * 100) : "—" },
          { item: "Tax payable", value: formatCurrency(tax) },
        ]
      : isPropertyShortTerm
        ? [
            { item: "Gain", value: formatCurrency(gain) },
            { item: "Holding period", value: "Short-term" },
            { item: "Tax", value: "At your income-tax slab rate" },
          ]
        : [
            { item: "Gain (unindexed)", value: formatCurrency(gain) },
            { item: "Indexed cost", value: formatCurrency(indexedCost ?? 0) },
            { item: "Tax with indexation (20%)", value: formatCurrency(taxWithIndexation ?? 0) },
            { item: "Tax without indexation (12.5%)", value: formatCurrency(taxWithoutIndexation ?? 0) },
            { item: "Method used", value: usedIndexation ? "With indexation" : "Without indexation" },
            { item: "Tax payable", value: formatCurrency(tax) },
          ];

  return (
    <CalculatorPage
      title="Capital gains tax calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="70% center"
      description="Work out the tax on a gain from equity or property, including the property indexation choice where it applies."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="asset-type" className="text-sm text-muted">
              Asset type
            </label>
            <select
              id="asset-type"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as AssetType)}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              <option value="equity">Equity shares / equity mutual funds</option>
              <option value="property">Property (land or building)</option>
            </select>
          </div>
          <NumericInput
            label="Purchase value"
            value={purchaseValue}
            onChange={setPurchaseValue}
            min={0}
            max={100000000}
            step={10000}
            slider
            helpText="What you originally paid to acquire it."
          />
          <NumericInput
            label="Sale value"
            value={saleValue}
            onChange={setSaleValue}
            min={0}
            max={100000000}
            step={10000}
            slider
            helpText="What you sold it for."
          />
          <NumericInput
            label="Holding period"
            value={holdingMonths}
            onChange={setHoldingMonths}
            min={0}
            max={480}
            step={1}
            suffix="months"
            helpText={`More than ${assetType === "equity" ? 12 : 24} months makes this long-term for ${assetType === "equity" ? "equity" : "property"}.`}
          />
          {assetType === "property" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="purchase-fy" className="text-sm text-muted">
                Purchase financial year
              </label>
              <select
                id="purchase-fy"
                value={purchaseFy}
                onChange={(e) => setPurchaseFy(e.target.value)}
                className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
              >
                {FY_OPTIONS.map((fy) => (
                  <option key={fy} value={fy}>
                    FY {fy}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      }
      result={
        isPropertyShortTerm ? (
          <ResultDisplay
            value={formatCurrency(gain)}
            caption="gain — taxed at your income-tax slab rate, not shown here"
          />
        ) : (
          <ResultDisplay
            value={formatCurrency(tax)}
            caption={`tax payable on a gain of ${formatCurrency(gain)}`}
          />
        )
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Post-tax", value: Math.max(0, gain - tax) },
            { name: "Tax", value: tax },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Calculation breakdown"
          columns={[
            { key: "item", label: "Component" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={detailRows}
        />
      }
      content={content}
    />
  );
}

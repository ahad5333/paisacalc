"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateGst, type GstMode } from "@/lib/calc/gst";
import { GST_RATES_2026 } from "@/lib/rules";
import { decodeNumber } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { amount: 10000, rate: 18, mode: "add" as GstMode };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

function initialMode(): GstMode {
  const raw = new URLSearchParams(window.location.search).get("mode");
  return raw === "remove" ? "remove" : "add";
}

export function GstCalculator({ content }: { content: ReactNode }) {
  const [amount, setAmount] = useState(() => initialParam("a", DEFAULTS.amount));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.rate));
  const [mode, setMode] = useState<GstMode>(initialMode);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("a", String(amount));
    params.set("r", String(rate));
    params.set("mode", mode);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [amount, rate, mode]);

  const result = calculateGst({ amount, gstRatePercent: rate, mode });

  return (
    <CalculatorPage
      title="GST calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 40%"
      description="Add or remove GST from a price across the current 0/3/5/18/40% slabs, with the arithmetic worked out step by step."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gst-mode" className="text-sm text-muted">
              Calculation
            </label>
            <select
              id="gst-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as GstMode)}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              <option value="add">Add GST to a price</option>
              <option value="remove">Remove GST from a price</option>
            </select>
          </div>
          <NumericInput
            label={mode === "add" ? "Price before GST" : "Price including GST"}
            value={amount}
            onChange={setAmount}
            min={0}
            max={10000000}
            step={100}
            slider
            helpText={
              mode === "add"
                ? "The base price, before GST is added."
                : "The final price the customer actually pays, GST already included."
            }
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gst-rate" className="text-sm text-muted">
              GST rate
            </label>
            <select
              id="gst-rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-base text-ink backdrop-blur-sm focus:border-figure focus:outline-none"
            >
              {GST_RATES_2026.slabs.map((slab) => (
                <option key={slab.rate} value={slab.rate}>
                  {slab.label}
                </option>
              ))}
            </select>
          </div>
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(mode === "add" ? result.value.totalAmount : result.value.baseAmount)}
          caption={mode === "add" ? "price including GST" : "price before GST"}
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Base price", value: result.value.baseAmount },
            { name: "GST", value: result.value.gstAmount },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

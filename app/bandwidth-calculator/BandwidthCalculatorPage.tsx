"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBandwidth } from "@/lib/calc/bandwidth";

const LAST_VERIFIED = "19 Aug 2026";

export function BandwidthCalculatorPage({ content }: { content: ReactNode }) {
  const [fileSizeMB, setFileSizeMB] = useState(100);
  const [bandwidthMbps, setBandwidthMbps] = useState(10);

  const result = calculateBandwidth({ fileSizeMB, bandwidthMbps });
  const { seconds } = result.value;

  const minutes = Math.floor(seconds / 60);
  const remSeconds = Math.round(seconds % 60);

  return (
    <CalculatorPage
      title="Bandwidth calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How long a file takes to transfer at a given connection speed."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="File size" value={fileSizeMB} onChange={setFileSizeMB} min={0.1} step={10} suffix="MB" />
          <NumericInput label="Connection speed" value={bandwidthMbps} onChange={setBandwidthMbps} min={0.1} step={1} suffix="Mbps" />
        </>
      }
      result={<ResultDisplay value={minutes > 0 ? `${minutes}m ${remSeconds}s` : `${seconds}s`} caption="Transfer time" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}

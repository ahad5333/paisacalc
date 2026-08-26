"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type CalcChartInnerComponent from "./CalcChartInner";

// Kept out of the initial bundle (tech spec §A6) — the fixed-height
// placeholder means its arrival causes zero layout shift.
const CalcChartInner = dynamic(() => import("./CalcChartInner"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded bg-rule/40" />,
});

export type CalcChartProps = ComponentProps<typeof CalcChartInnerComponent>;

// Chart is decorative context, not the only route to a value — every
// calculator page must place a text/table equivalent alongside it (§B4).
export function CalcChart(props: CalcChartProps) {
  return (
    <div className="aspect-video w-full">
      <CalcChartInner {...props} />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

// See EmiCalculatorLoader.tsx for why this indirection exists: ssr:false
// must be called from a Client Component, and CapitalGainsCalculator reads
// window.location.search directly.
export const CapitalGainsCalculatorLoader = dynamic(
  () => import("./CapitalGainsCalculator").then((m) => m.CapitalGainsCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="h-64 w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);

"use client";

import dynamic from "next/dynamic";

// See EmiCalculatorLoader.tsx for why this indirection exists: ssr:false
// must be called from a Client Component, and IncomeTaxCalculator reads
// window.location.search directly.
export const IncomeTaxCalculatorLoader = dynamic(
  () => import("./IncomeTaxCalculator").then((m) => m.IncomeTaxCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="min-h-[1200px] w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);

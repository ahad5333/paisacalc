"use client";

import dynamic from "next/dynamic";

// See EmiCalculatorLoader.tsx for why this indirection exists: ssr:false
// must be called from a Client Component, and SipCalculator reads
// window.location.search directly.
export const SipCalculatorLoader = dynamic(
  () => import("./SipCalculator").then((m) => m.SipCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="min-h-[1200px] w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);

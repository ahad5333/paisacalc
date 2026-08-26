import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline | PaisaCalc",
  robots: { index: false, follow: false },
};

// The service worker's navigation fallback when a page fails to load
// offline and nothing's cached for it (see public/sw.js). Deliberately
// plain rather than the usual UtilityPage treatment — it's a fallback for
// when things have already gone wrong, not a normal content page.
export default function OfflinePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <h1 className="font-serif text-xl text-ink">You&rsquo;re offline</h1>
      <p className="max-w-md text-sm text-muted">
        This page hasn&rsquo;t been visited yet, so there&rsquo;s nothing cached for it.
        Calculators you&rsquo;ve already opened will still work — try going back, or
        reconnect and try again.
      </p>
      <a href="/" className="mt-2 text-sm text-figure hover:underline">
        Back to the homepage
      </a>
    </div>
  );
}

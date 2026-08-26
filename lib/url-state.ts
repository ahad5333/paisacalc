// Encodes calculator inputs to short query keys and decodes them back.
// Decoding must never throw — an invalid or mangled value falls back to the
// provided default (tech spec §A4, ticket S-09).

export function decodeNumber(
  params: URLSearchParams,
  key: string,
  fallback: number,
): number {
  const raw = params.get(key);
  if (raw === null) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function encodeNumericParams(values: Record<string, number>): string {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (Number.isFinite(value)) usp.set(key, String(value));
  }
  return usp.toString();
}

// Updates the address bar to reflect the current inputs without a
// navigation — the calculator stays live-updating with no submit button,
// and the URL becomes copy-paste shareable (tech spec §A4).
export function replaceUrlParams(values: Record<string, number>): void {
  if (typeof window === "undefined") return;
  const query = encodeNumericParams(values);
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history.replaceState(null, "", url);
}

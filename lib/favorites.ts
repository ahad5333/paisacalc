// Plain localStorage, no server, no account — matches the site's "nothing
// you do here ever leaves your browser" privacy stance. Keyed by href
// (the same string used everywhere else in CALCULATORS) so it needs no
// translation layer to render.
const FAVORITES_KEY = "paisacalc:favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(href: string): string[] {
  const current = getFavorites();
  const next = current.includes(href) ? current.filter((h) => h !== href) : [...current, href];
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — the toggle
    // still updates in-memory state for this render, it just won't persist.
  }
  return next;
}

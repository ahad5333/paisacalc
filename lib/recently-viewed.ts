// Same localStorage-only approach as favorites.ts. Most-recent-first,
// capped short — this is a quick way back to what you just used, not a
// full history.
const RECENT_KEY = "paisacalc:recently-viewed";
const MAX_RECENT = 6;

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function recordView(href: string): void {
  if (typeof window === "undefined") return;
  const current = getRecentlyViewed().filter((h) => h !== href);
  const next = [href, ...current].slice(0, MAX_RECENT);
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — nothing to persist, safe to skip silently.
  }
}

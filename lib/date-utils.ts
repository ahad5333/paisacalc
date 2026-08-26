// Pure date-only arithmetic (no time-of-day) shared by every date-based
// calculator — pregnancy, due date, ovulation, conception, period. Dates
// are represented as whole days since the Unix epoch (UTC midnight) so
// arithmetic never drifts across a DST boundary the way local-time Date
// math can, and so every calc function stays a plain number-in/number-out
// pure function like the rest of /lib/calc.

export function toEpochDay(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

export function fromEpochDay(epochDay: number): Date {
  return new Date(epochDay * 86400000);
}

export function toIsoDate(epochDay: number): string {
  return fromEpochDay(epochDay).toISOString().slice(0, 10);
}

export function formatDateLong(epochDay: number): string {
  return fromEpochDay(epochDay).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function todayEpochDay(): number {
  const now = new Date();
  return toEpochDay(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`);
}

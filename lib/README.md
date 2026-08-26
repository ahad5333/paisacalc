# The three-layer rule

This is the constraint everything else in `/lib` follows (tech spec §A3).

1. **`/lib/rules`** holds values only — slabs, rates, limits, cess, thresholds. No logic. Keyed by financial year. Every value cites its official source in a comment.
2. **`/lib/calc`** holds pure functions — inputs and a rules object in, a `CalcResult` out. No React, no DOM, no imports from `/components`.
3. **`/components`** holds rendering only — no arithmetic beyond formatting.

Why: the annual Budget update becomes an edit to one file in `/lib/rules`. If rates leak into components, every February becomes a code hunt across every page, and something gets missed.

Every calculation function returns its own derivation via `CalcResult<T>` (`/lib/calc/types.ts`) — `value`, `steps`, `assumptions`, `rulesVersion`. A calculator cannot ship without showing its working because the return type won't compile without it.

// Reserved from launch, fixed height, serving nothing until a network is
// approved (tech spec §A7, §B5). Fixed height means adding a network later
// never causes layout shift — the space is already spoken for.
export function AdSlot({ label = "Ad slot" }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      data-ad-slot
      className="flex h-22.5 w-full items-center justify-center rounded border border-dashed border-rule text-xs text-muted"
    >
      {label} — reserved, empty until a network is approved
    </div>
  );
}

"use client";

interface AdSlotProps {
  hasContent: boolean;
  slotId: string;
}

export default function AdSlot({ hasContent, slotId }: AdSlotProps) {
  // Don't show ads when there's no content (AdSense policy)
  if (!hasContent) return null;

  return (
    <div
      className="my-4 text-center"
      data-slot={slotId}
      style={{ minHeight: 50 }}
    >
      <p className="text-[9px] mb-1" style={{ color: "var(--ink4)" }}>
        スポンサーリンク
      </p>
      {/* AdSense or 忍者AdMax code will be inserted here */}
    </div>
  );
}

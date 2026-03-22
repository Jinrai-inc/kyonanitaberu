"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface StarsProps {
  rating: number | null;
  count: number | null;
}

export default function Stars({ rating, count }: StarsProps) {
  const t = useTranslations("card");

  if (rating == null || rating === 0) {
    return (
      <span className="text-[10px]" style={{ color: "var(--ink4)" }}>
        {t("noRating")}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-[1px]">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0;
          const gradId = `sf${i}-${rating}`;
          return (
            <svg key={i} width="14" height="14" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={gradId}>
                  <stop offset={`${fill * 100}%`} stopColor="#F4B400" />
                  <stop offset={`${fill * 100}%`} stopColor="#DDD" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.5l2.47 5.01L18 7.27l-4 3.9.94 5.5L10 14.14l-4.94 2.53.94-5.5-4-3.9 5.53-.76z"
                fill={`url(#${gradId})`}
              />
            </svg>
          );
        })}
      </div>
      <span className="text-xs font-extrabold" style={{ color: "var(--ink)" }}>
        {rating}
      </span>
      {count != null && (
        <span className="text-[10px]" style={{ color: "var(--ink3)" }}>
          ({t("reviews", { count })})
        </span>
      )}
    </div>
  );
}

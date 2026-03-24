"use client";

import React from "react";
import { useTranslations } from "next-intl";
import type { Place, TransportMode, SortBy } from "@/types/place";
import { MapPin } from "./icons/UiIcons";
import ShopCard from "./ShopCard";

interface ShopListProps {
  shops: Place[];
  mode: TransportMode;
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  onlyOpen: boolean;
  locale: string;
}

export default function ShopList({ shops, mode, sortBy, onSortChange, onlyOpen, locale }: ShopListProps) {
  const t = useTranslations("results");

  return (
    <>
      {/* Result bar */}
      <div className="flex justify-between items-center mb-3 animate-fadeUp" style={{ animationDelay: "200ms" }}>
        <span className="text-[13px] font-bold" style={{ color: "var(--ink2)" }}>
          <em
            className="not-italic"
            style={{
              color: "var(--accent)",
              fontSize: 22,
              fontFamily: "var(--font-body)",
              marginRight: 2,
            }}
          >
            {shops.length}
          </em>
          {" "}
          {onlyOpen
            ? t("countOpen", { count: "" }).replace(/^\s*/, "")
            : t("count", { count: "" }).replace(/^\s*/, "")
          }
        </span>
        <div
          className="flex gap-[3px]"
          style={{ background: "var(--bg2)", borderRadius: 20, padding: 3 }}
        >
          {(["rating", "time"] as SortBy[]).map((s) => (
            <button
              key={s}
              onClick={() => onSortChange(s)}
              className="border-none cursor-pointer transition-all duration-200"
              style={{
                padding: "5px 12px",
                borderRadius: 18,
                background: sortBy === s ? "var(--card-solid)" : "transparent",
                color: sortBy === s ? "var(--ink)" : "var(--ink4)",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                boxShadow: sortBy === s ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {s === "rating" ? t("sortRating") : t("sortDistance")}
            </button>
          ))}
        </div>
      </div>

      {/* Shop cards */}
      <div className="grid gap-[10px]">
        {shops.length > 0 ? (
          shops.map((shop, i) => (
            <ShopCard key={shop.place_id} shop={shop} mode={mode} delay={i * 35} locale={locale} />
          ))
        ) : (
          <div className="text-center py-10 animate-fadeIn">
            <MapPin size={40} color="var(--ink4)" />
            <p className="text-sm font-bold mt-3" style={{ color: "var(--ink3)" }}>
              {t("empty")}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--ink4)" }}>
              {onlyOpen ? t("emptyHintOpen") : t("emptyHint")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import type { Place, TransportMode } from "@/types/place";
import { MapPin, Clock, Calendar, Navigation, Phone } from "./icons/UiIcons";
import { GoogleIcon } from "./icons/AuthIcons";
import { GenreIcon } from "./icons/GenreIcons";
import Stars from "./Stars";
import { PRICE_LABEL } from "@/lib/genreMap";
import { isOpenNow, isClosedToday, getCloseDayDisplay } from "@/lib/timeUtils";
import { getTimeKey } from "@/lib/radiusCalc";

interface ShopCardProps {
  shop: Place;
  mode: TransportMode;
  delay: number;
  locale: string;
}

export default function ShopCard({ shop, mode, delay, locale }: ShopCardProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("card");
  const tGenre = useTranslations("genre");
  const tk = getTimeKey(mode);
  const minutes = shop[tk] ?? 0;

  const nowOpen = !isClosedToday(shop.close_day, locale) && isOpenNow(shop.opening_hours_text);
  const closed = isClosedToday(shop.close_day, locale);

  const gUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.address)}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shop.name + " " + shop.address)}`;

  const genreLabel = tGenre.has(shop.genre) ? tGenre(shop.genre) : shop.genre;

  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer transition-all duration-300 animate-fadeUp"
      style={{
        background: open ? "var(--card-solid)" : "var(--card)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1.5px solid ${open ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        padding: "14px 16px",
        animationDelay: `${delay}ms`,
        boxShadow: open ? "0 6px 24px var(--accent-glow)" : "none",
      }}
    >
      <div className="flex gap-3 items-start">
        {/* Genre Icon */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 46,
            height: 46,
            background: "var(--bg)",
            borderRadius: 13,
          }}
        >
          <GenreIcon genre={shop.genre} size={26} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex justify-between items-center gap-2">
            <h3
              className="text-[14.5px] font-semibold truncate"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {shop.name}
            </h3>
            <span
              className="text-[11px] font-extrabold whitespace-nowrap flex-shrink-0"
              style={{
                color: "var(--accent)",
                background: "var(--accent-light)",
                padding: "2px 9px",
                borderRadius: 16,
              }}
            >
              {t("minutes", { min: minutes })}
            </span>
          </div>

          {/* Rating */}
          <div className="mb-[2px]">
            <Stars rating={shop.rating} count={shop.user_ratings_total} />
          </div>

          {/* Tags */}
          <div className="flex gap-[5px] items-center flex-wrap">
            <span
              className="text-[10.5px] font-bold"
              style={{
                color: "var(--ink2)",
                background: "var(--bg)",
                padding: "2px 7px",
                borderRadius: 5,
              }}
            >
              {genreLabel}
            </span>
            <span className="text-[10.5px] font-semibold" style={{ color: "var(--ink3)" }}>
              {PRICE_LABEL[shop.price_level]}
            </span>
            {closed ? (
              <span
                className="text-[10px] font-bold"
                style={{
                  color: "#C0392B",
                  background: "#FDE8E8",
                  padding: "2px 8px",
                  borderRadius: 10,
                }}
              >
                {t("closed")}
              </span>
            ) : nowOpen ? (
              <span
                className="text-[10px] font-extrabold inline-flex items-center gap-1"
                style={{
                  color: "var(--green)",
                  background: "var(--green-light)",
                  padding: "2px 8px",
                  borderRadius: 10,
                }}
              >
                <span
                  className="animate-pulseDot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--green)",
                    display: "inline-block",
                  }}
                />
                {t("open")}
              </span>
            ) : (
              <span
                className="text-[10px] font-bold"
                style={{
                  color: "var(--ink4)",
                  background: "var(--bg2)",
                  padding: "2px 8px",
                  borderRadius: 10,
                }}
              >
                {t("outside")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div
          className="mt-[14px] pt-[14px] animate-fadeIn"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--ink2)" }}>
              <MapPin size={14} color="var(--ink3)" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--ink2)" }}>
              <Clock size={14} color="var(--ink3)" />
              <span>{shop.opening_hours_text}</span>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--ink2)" }}>
              <Calendar size={14} color="var(--ink3)" />
              <span>{t("closedDay", { day: getCloseDayDisplay(shop.close_day, locale) })}</span>
            </div>
            {shop.access && (
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--ink2)" }}>
                <Navigation size={14} color="var(--ink3)" />
                <span>{shop.access}</span>
              </div>
            )}
            {shop.phone && (
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--ink2)" }}>
                <Phone size={14} color="var(--ink3)" />
                <span>{shop.phone}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-[14px]">
            <a
              href={gUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-[5px] no-underline transition-transform duration-200 hover:scale-[1.02]"
              style={{
                padding: "10px 0",
                borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--accent)",
                color: "var(--accent)",
                background: "var(--accent-light)",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
              }}
            >
              <GoogleIcon size={14} /> {t("googleReview")}
            </a>
            <a
              href={dirUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-[5px] no-underline transition-transform duration-200 hover:scale-[1.02]"
              style={{
                padding: "10px 0",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
              }}
            >
              <Navigation size={13} color="#fff" /> {t("route")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

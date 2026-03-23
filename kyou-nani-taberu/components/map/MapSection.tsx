"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { Place } from "@/types/place";
import { MapPin, ChevronDown } from "../icons/UiIcons";

const AppleMap = dynamic(() => import("./AppleMap"), { ssr: false });

interface MapSectionProps {
  center: { lat: number; lng: number };
  places: Place[];
  radius: number;
  onMarkerClick?: (place: Place) => void;
}

export default function MapSection({ center, places, radius, onMarkerClick }: MapSectionProps) {
  const [showMap, setShowMap] = useState(true);
  const t = useTranslations("map");

  return (
    <section className="mb-4 animate-fadeUp" style={{ animationDelay: "30ms" }}>
      <button
        onClick={() => setShowMap(!showMap)}
        className="flex items-center gap-[6px] mb-2 border-none bg-transparent cursor-pointer"
        style={{
          color: "var(--ink3)",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "var(--font-body)",
          padding: 0,
        }}
      >
        <MapPin size={13} color="var(--ink3)" />
        <span>{showMap ? t("hide") : t("show")}</span>
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.2s",
            transform: showMap ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={13} color="var(--ink3)" />
        </span>
      </button>

      {showMap && (
        <div className="animate-fadeIn">
          <AppleMap
            center={center}
            places={places}
            radius={radius}
            onMarkerClick={onMarkerClick}
          />
        </div>
      )}
    </section>
  );
}

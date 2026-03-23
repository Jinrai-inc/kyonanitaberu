"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Refresh } from "./icons/UiIcons";

interface LocationBarProps {
  located: boolean;
  onLocate: (lat: number, lng: number) => void;
  onReset: () => void;
  address?: string;
}

export default function LocationBar({ located, onLocate, onReset, address }: LocationBarProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("location");

  const handleLocate = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(t("unsupported"));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        onLocate(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(t("denied"));
            break;
          case err.POSITION_UNAVAILABLE:
            setError(t("unavailable"));
            break;
          case err.TIMEOUT:
            setError(t("timeout"));
            break;
          default:
            setError(t("error"));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  if (located) {
    return (
      <div
        className="flex items-center gap-2 my-4 animate-fadeIn"
        style={{
          background: "var(--green-light)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 14px",
        }}
      >
        <MapPin size={15} color="var(--green)" />
        <span className="text-xs font-bold" style={{ color: "var(--green)" }}>
          {address || t("located")}
        </span>
        <button
          onClick={onReset}
          className="ml-auto bg-transparent border-none cursor-pointer p-1 flex"
        >
          <Refresh size={14} color="var(--ink4)" />
        </button>
      </div>
    );
  }

  return (
    <div className="my-4">
      <button
        onClick={handleLocate}
        disabled={loading}
        className="w-full py-4 px-5 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer transition-all duration-200"
        style={{
          background: "var(--card-solid)",
          border: "1.5px dashed var(--ink4)",
          borderRadius: "var(--radius)",
          fontFamily: "var(--font-body)",
          color: "var(--ink2)",
          opacity: loading ? 0.5 : 1,
        }}
      >
        <MapPin size={18} color={loading ? "var(--ink4)" : "var(--accent)"} />
        {loading ? t("locating") : t("getLocation")}
      </button>
      {error && (
        <p className="text-xs mt-2 text-center" style={{ color: "#d32f2f" }}>
          {error}
        </p>
      )}
    </div>
  );
}

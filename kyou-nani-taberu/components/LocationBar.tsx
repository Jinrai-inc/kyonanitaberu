"use client";

import React, { useState } from "react";
import { MapPin, Refresh } from "./icons/UiIcons";

interface LocationBarProps {
  located: boolean;
  onLocate: () => void;
  onReset: () => void;
}

export default function LocationBar({ located, onLocate, onReset }: LocationBarProps) {
  const [loading, setLoading] = useState(false);

  const handleLocate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLocate();
    }, 1100);
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
          横浜駅周辺（デモ）
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
    <button
      onClick={handleLocate}
      disabled={loading}
      className="w-full py-4 px-5 my-4 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer transition-all duration-200"
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
      {loading ? "取得中..." : "現在地でお店をさがす"}
    </button>
  );
}

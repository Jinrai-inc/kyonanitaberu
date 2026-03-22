"use client";

import React from "react";
import { useTranslations } from "next-intl";

const TIMES = [5, 10, 15, 20, 30];

interface TimeSelectorProps {
  maxTime: number;
  onChange: (time: number) => void;
}

export default function TimeSelector({ maxTime, onChange }: TimeSelectorProps) {
  const t = useTranslations("time");

  return (
    <section className="mb-5 animate-fadeUp" style={{ animationDelay: "100ms" }}>
      <span
        className="text-[10.5px] font-extrabold block mb-[10px] uppercase"
        style={{ color: "var(--ink4)", letterSpacing: "1.6px" }}
      >
        {t("label")}
      </span>
      <div className="flex gap-2">
        {TIMES.map((time) => (
          <button
            key={time}
            onClick={() => onChange(time)}
            className="flex-1 border-none cursor-pointer transition-all duration-300"
            style={{
              padding: "11px 0",
              borderRadius: 28,
              background: maxTime === time ? "var(--accent)" : "var(--card-solid)",
              color: maxTime === time ? "#fff" : "var(--ink4)",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "var(--font-body)",
              transform: maxTime === time ? "scale(1.06)" : "scale(1)",
              boxShadow: maxTime === time ? "0 4px 14px var(--accent-glow)" : "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </section>
  );
}

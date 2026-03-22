"use client";

import React from "react";

const TIMES = [5, 10, 15, 20, 30];

interface TimeSelectorProps {
  maxTime: number;
  onChange: (time: number) => void;
}

export default function TimeSelector({ maxTime, onChange }: TimeSelectorProps) {
  return (
    <section className="mb-5 animate-fadeUp" style={{ animationDelay: "100ms" }}>
      <span
        className="text-[10.5px] font-extrabold block mb-[10px] uppercase"
        style={{ color: "var(--ink4)", letterSpacing: "1.6px" }}
      >
        何分以内？
      </span>
      <div className="flex gap-2">
        {TIMES.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className="flex-1 border-none cursor-pointer transition-all duration-300"
            style={{
              padding: "11px 0",
              borderRadius: 28,
              background: maxTime === t ? "var(--accent)" : "var(--card-solid)",
              color: maxTime === t ? "#fff" : "var(--ink4)",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "var(--font-body)",
              transform: maxTime === t ? "scale(1.06)" : "scale(1)",
              boxShadow: maxTime === t ? "0 4px 14px var(--accent-glow)" : "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </section>
  );
}

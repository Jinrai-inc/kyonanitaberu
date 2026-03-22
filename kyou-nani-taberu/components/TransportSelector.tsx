"use client";

import React from "react";
import type { TransportMode } from "@/types/place";
import { Walk, Bike, Car } from "./icons/TransportIcons";

const TRANSPORTS: { id: TransportMode; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "walk", label: "徒歩", Icon: Walk },
  { id: "bike", label: "自転車", Icon: Bike },
  { id: "car", label: "クルマ", Icon: Car },
];

interface TransportSelectorProps {
  mode: TransportMode;
  onChange: (mode: TransportMode) => void;
}

export default function TransportSelector({ mode, onChange }: TransportSelectorProps) {
  return (
    <section className="mb-5 animate-fadeUp" style={{ animationDelay: "50ms" }}>
      <span
        className="text-[10.5px] font-extrabold block mb-[10px] uppercase"
        style={{ color: "var(--ink4)", letterSpacing: "1.6px" }}
      >
        移動手段
      </span>
      <div className="flex gap-[10px]">
        {TRANSPORTS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex-1 flex flex-col items-center gap-[2px] cursor-pointer transition-all duration-300"
            style={{
              padding: "14px 8px 10px",
              borderRadius: "var(--radius)",
              border: `2px solid ${mode === id ? "var(--accent)" : "var(--border)"}`,
              background: mode === id ? "var(--accent-light)" : "var(--card-solid)",
              transform: mode === id ? "scale(1.03)" : "scale(1)",
              boxShadow: mode === id ? "0 4px 14px var(--accent-glow)" : "none",
            }}
          >
            <div className={mode === id ? "animate-bob" : ""}>
              <Icon size={34} />
            </div>
            <span
              className="text-[11px] font-extrabold"
              style={{
                fontFamily: "var(--font-body)",
                color: mode === id ? "var(--accent)" : "var(--ink4)",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

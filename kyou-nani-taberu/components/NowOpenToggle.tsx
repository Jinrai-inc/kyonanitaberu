"use client";

import React from "react";
import { Zap } from "./icons/UiIcons";

interface NowOpenToggleProps {
  onlyOpen: boolean;
  onChange: (value: boolean) => void;
  time: string;
  openCount: number;
}

export default function NowOpenToggle({ onlyOpen, onChange, time, openCount }: NowOpenToggleProps) {
  return (
    <section className="mb-5 animate-fadeUp" style={{ animationDelay: "130ms" }}>
      <button
        onClick={() => onChange(!onlyOpen)}
        className="w-full flex items-center justify-between cursor-pointer transition-all duration-300"
        style={{
          padding: "14px 16px",
          borderRadius: "var(--radius)",
          border: `2px solid ${onlyOpen ? "var(--accent)" : "var(--border)"}`,
          background: onlyOpen ? "var(--accent)" : "var(--card-solid)",
          fontFamily: "var(--font-body)",
          boxShadow: onlyOpen ? "0 4px 16px var(--accent-glow)" : "none",
        }}
      >
        <div className="flex items-center gap-[10px] text-left">
          <Zap size={16} color={onlyOpen ? "#fff" : "var(--accent)"} />
          <div>
            <span
              className="block text-[13px] font-extrabold"
              style={{ color: onlyOpen ? "#fff" : "var(--ink)" }}
            >
              今あいてるお店だけ
            </span>
            <span
              className="block text-[10.5px] mt-[1px]"
              style={{ color: onlyOpen ? "rgba(255,255,255,0.7)" : "var(--ink3)" }}
            >
              現在 {time}・{openCount}件が営業中
            </span>
          </div>
        </div>

        {/* Toggle switch */}
        <div
          className="relative flex-shrink-0"
          style={{
            width: 44,
            height: 26,
            borderRadius: 13,
            background: onlyOpen ? "rgba(255,255,255,0.35)" : "var(--bg2)",
            transition: "background 0.3s",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--card-solid)",
              position: "absolute",
              top: 2,
              left: 2,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: onlyOpen ? "translateX(18px)" : "translateX(0)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </button>
    </section>
  );
}

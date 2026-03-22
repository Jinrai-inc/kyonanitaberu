"use client";

import React from "react";
import { Dice } from "./icons/UiIcons";

interface FabProps {
  onClick: () => void;
}

export default function Fab({ onClick }: FabProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[26px] right-5 flex items-center gap-[7px] z-[100] border-none cursor-pointer transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97] animate-fadeUp"
      style={{
        background: "var(--accent)",
        color: "#fff",
        borderRadius: 50,
        padding: "14px 22px",
        fontSize: 14,
        fontWeight: 800,
        fontFamily: "var(--font-body)",
        boxShadow: "0 6px 24px var(--accent-glow), 0 2px 8px rgba(0,0,0,0.1)",
        animationDelay: "300ms",
      }}
    >
      <Dice size={18} /> 迷ったらコレ
    </button>
  );
}

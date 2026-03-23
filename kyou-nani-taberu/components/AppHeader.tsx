"use client";

import React from "react";
import { LogOut } from "./icons/UiIcons";
import LanguageSwitcher from "./LanguageSwitcher";

interface AppHeaderProps {
  onLogout: () => void;
}

export default function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(244, 240, 235, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-[460px] mx-auto px-[18px] py-[10px] flex items-center justify-between">
        <img
          src="/logo-optimized.webp"
          alt="今日何食べる？"
          style={{ height: 40 }}
        />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={onLogout}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{
              border: "1.5px solid var(--border)",
              background: "var(--card-solid)",
            }}
          >
            <LogOut size={18} color="var(--ink3)" />
          </button>
        </div>
      </div>
    </header>
  );
}

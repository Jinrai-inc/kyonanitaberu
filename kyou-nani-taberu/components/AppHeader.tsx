"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LogOut } from "./icons/UiIcons";
import LanguageSwitcher from "./LanguageSwitcher";

interface AppHeaderProps {
  onLogout: () => void;
}

export default function AppHeader({ onLogout }: AppHeaderProps) {
  const t = useTranslations("app");

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
      <div className="max-w-[460px] mx-auto px-[18px] py-[14px] flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("name")}
          </h1>
          <p
            className="text-[9.5px] mt-[1px]"
            style={{ color: "var(--ink4)", letterSpacing: "0.8px" }}
          >
            {t("subtitle")}
          </p>
        </div>
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

"use client";

import React from "react";
import { LogOut, User } from "./icons/UiIcons";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

interface AppHeaderProps {
  nickname?: string | null;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onLoginRequest?: () => void;
}

export default function AppHeader({ nickname, isLoggedIn, onLogout, onLoginRequest }: AppHeaderProps) {
  const t = useTranslations("header");

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
          style={{ height: 56 }}
        />
        <div className="flex items-center gap-2">
          {nickname && (
            <span
              className="text-xs font-bold truncate max-w-[80px]"
              style={{ color: "var(--ink2)" }}
            >
              {nickname}さん
            </span>
          )}
          <LanguageSwitcher />
          {isLoggedIn ? (
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
          ) : (
            <button
              onClick={onLoginRequest}
              className="flex items-center gap-1 px-3 h-9 rounded-full cursor-pointer transition-all duration-200"
              style={{
                border: "1.5px solid var(--border)",
                background: "var(--card-solid)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--ink3)",
              }}
            >
              <User size={16} color="var(--ink3)" />
              {t("login")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

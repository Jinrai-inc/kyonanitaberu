"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { GoogleIcon, AppleIcon, LINEIcon, XTwitterIcon, GuestIcon } from "./icons/AuthIcons";
import LanguageSwitcher from "./LanguageSwitcher";

interface LoginScreenProps {
  onGuestLogin: () => void;
}

export default function LoginScreen({ onGuestLogin }: LoginScreenProps) {
  const [leaving, setLeaving] = useState(false);
  const t = useTranslations();

  const handleOAuth = (provider: string) => {
    setLeaving(true);
    setTimeout(() => {
      signIn(provider);
    }, 700);
  };

  const handleGuest = () => {
    setLeaving(true);
    setTimeout(() => onGuestLogin(), 700);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-6"
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      {/* Orbs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: "var(--accent)",
          top: -80, right: -60,
          filter: "blur(80px)",
          opacity: 0.12,
          animation: "orbFloat 12s ease infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 250, height: 250,
          background: "var(--green)",
          bottom: -60, left: -40,
          filter: "blur(80px)",
          opacity: 0.1,
          animation: "orbFloat2 14s ease infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 180, height: 180,
          background: "#E8C547",
          top: "50%", left: "60%",
          filter: "blur(80px)",
          opacity: 0.08,
          animation: "orbFloat 16s ease infinite",
        }}
      />

      <div
        className={`relative z-10 text-center w-full max-w-[380px] ${leaving ? "animate-slideOut" : "animate-scaleIn"}`}
        style={{
          background: "var(--card-solid)",
          borderRadius: 24,
          padding: "40px 28px 32px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Language switcher */}
        <div className="absolute top-[14px] right-[16px]">
          <LanguageSwitcher />
        </div>

        {/* Brand */}
        <div className="mb-2">
          <img
            src="/icon-192.png"
            alt="今日何食べる？"
            width={80}
            height={80}
            style={{ margin: "0 auto" }}
          />
        </div>

        <h1
          className="text-2xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {t("app.name")}
        </h1>
        <p
          className="text-[11px] mt-[2px]"
          style={{ color: "var(--ink4)", letterSpacing: "1px" }}
        >
          {t("app.subtitle")}
        </p>
        <p
          className="text-[12.5px] leading-[1.7] mt-4 mb-6 whitespace-pre-line"
          style={{ color: "var(--ink3)" }}
        >
          {t("app.description")}
        </p>

        {/* Auth buttons */}
        <div className="grid gap-[10px]">
          <button
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-[10px] w-full py-[13px] px-4 font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid var(--border)",
              background: "var(--card-solid)",
              fontFamily: "var(--font-body)",
              color: "var(--ink)",
            }}
          >
            <GoogleIcon size={20} />
            <span>{t("login.google")}</span>
          </button>

          <button
            onClick={() => handleOAuth("apple")}
            className="flex items-center justify-center gap-[10px] w-full py-[13px] px-4 font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid #000",
              background: "#000",
              fontFamily: "var(--font-body)",
              color: "#fff",
            }}
          >
            <AppleIcon size={20} />
            <span>{t("login.apple")}</span>
          </button>

          <button
            onClick={() => handleOAuth("line")}
            className="flex items-center justify-center gap-[10px] w-full py-[13px] px-4 font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid #06C755",
              background: "#06C755",
              fontFamily: "var(--font-body)",
              color: "#fff",
            }}
          >
            <LINEIcon size={20} />
            <span>{t("login.line")}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-[18px]" style={{ color: "var(--ink4)", fontSize: 12 }}>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span>{t("login.or")}</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Guest */}
        <button
          onClick={handleGuest}
          className="flex items-center justify-center gap-[10px] w-full py-[13px] px-4 font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
          style={{
            borderRadius: "var(--radius-sm)",
            border: "1.5px dashed var(--border)",
            background: "var(--card-solid)",
            fontFamily: "var(--font-body)",
            color: "var(--ink2)",
          }}
        >
          <GuestIcon size={20} />
          <span>{t("login.guest")}</span>
        </button>

        <p className="text-[10px] mt-[18px] leading-[1.6]" style={{ color: "var(--ink4)" }}>
          {t.rich("login.terms", {
            terms: (chunks) => (
              <a href="/terms" className="underline" style={{ color: "var(--ink3)" }}>{chunks}</a>
            ),
            privacy: (chunks) => (
              <a href="https://jinrai.co.jp/privacypolicy/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--ink3)" }}>{chunks}</a>
            ),
          })}
        </p>
      </div>
    </div>
  );
}

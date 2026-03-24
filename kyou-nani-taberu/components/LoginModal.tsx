"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { GoogleIcon, AppleIcon, LINEIcon, GuestIcon } from "./icons/AuthIcons";
import { XIcon } from "./icons/UiIcons";

interface LoginModalProps {
  onClose: () => void;
  onGuestLogin: () => void;
}

export default function LoginModal({ onClose, onGuestLogin }: LoginModalProps) {
  const [leaving, setLeaving] = useState(false);
  const t = useTranslations();

  const handleOAuth = (provider: string) => {
    setLeaving(true);
    setTimeout(() => signIn(provider), 500);
  };

  const handleGuest = () => {
    setLeaving(true);
    setTimeout(() => {
      onGuestLogin();
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn"
      style={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-[400px] text-center ${leaving ? "animate-slideOut" : "animate-scaleIn"}`}
        style={{
          background: "var(--card-solid)",
          borderRadius: 24,
          padding: "40px 28px 32px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[14px] right-[14px] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
          style={{
            border: "1.5px solid var(--border)",
            background: "var(--card-solid)",
          }}
        >
          <XIcon size={16} color="var(--ink3)" />
        </button>

        {/* Brand */}
        <div className="mb-2">
          <img
            src="/icon-192.png"
            alt="今日何食べる？"
            width={64}
            height={64}
            style={{ margin: "0 auto" }}
          />
        </div>

        <h2
          className="text-xl"
          style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}
        >
          {t("app.name")}
        </h2>
        <p
          className="text-[11px] mt-[2px] mb-5"
          style={{ color: "var(--ink4)", letterSpacing: "1px" }}
        >
          {t("app.subtitle")}
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
        <div className="flex items-center gap-3 my-[14px]" style={{ color: "var(--ink4)", fontSize: 12 }}>
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

        <p className="text-[10px] mt-[14px] leading-[1.6]" style={{ color: "var(--ink4)" }}>
          {t.rich("login.terms", {
            terms: (chunks) => (
              <a href="/terms" className="underline" style={{ color: "var(--ink3)" }}>{chunks}</a>
            ),
            privacy: (chunks) => (
              <a href="/privacy" className="underline" style={{ color: "var(--ink3)" }}>{chunks}</a>
            ),
          })}
        </p>
      </div>
    </div>
  );
}

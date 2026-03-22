"use client";

import React, { useState } from "react";
import { GoogleIcon, AppleIcon, LINEIcon, XTwitterIcon, GuestIcon } from "./icons/AuthIcons";

interface LoginScreenProps {
  onLogin: (method: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [leaving, setLeaving] = useState(false);

  const go = (method: string) => {
    setLeaving(true);
    setTimeout(() => onLogin(method), 700);
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
        {/* Brand */}
        <div className="mb-4">
          <svg width="52" height="52" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="16" fill="var(--accent)" />
            <path d="M18 38V22a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a6 6 0 0 1-6 6h-4l-4 8z" fill="#fff" opacity="0.9" />
            <circle cx="34" cy="18" r="4" fill="#fff" opacity="0.6" />
          </svg>
        </div>

        <h1
          className="text-2xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          今日何食べる？
        </h1>
        <p
          className="text-[11px] mt-[2px]"
          style={{ color: "var(--ink4)", letterSpacing: "1px" }}
        >
          What do you want to eat today
        </p>
        <p
          className="text-[12.5px] leading-[1.7] mt-4 mb-6"
          style={{ color: "var(--ink3)" }}
        >
          現在地から近くのお店をサクッと探して、<br />迷ったらルーレットでおまかせ。
        </p>

        {/* Auth buttons */}
        <div className="grid gap-[10px]">
          <button
            onClick={() => go("google")}
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
            <span>Googleで続ける</span>
          </button>

          <button
            onClick={() => go("apple")}
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
            <span>Appleで続ける</span>
          </button>

          <button
            onClick={() => go("line")}
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
            <span>LINEで続ける</span>
          </button>

          <button
            onClick={() => go("x")}
            className="flex items-center justify-center gap-[10px] w-full py-[13px] px-4 font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid #000",
              background: "#000",
              fontFamily: "var(--font-body)",
              color: "#fff",
            }}
          >
            <XTwitterIcon size={18} />
            <span>Xで続ける</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-[18px]" style={{ color: "var(--ink4)", fontSize: 12 }}>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Guest */}
        <button
          onClick={() => go("guest")}
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
          <span>ゲストで始める</span>
        </button>

        <p className="text-[10px] mt-[18px] leading-[1.6]" style={{ color: "var(--ink4)" }}>
          続行することで
          <a href="#" className="underline" style={{ color: "var(--ink3)" }}>利用規約</a>
          と
          <a href="#" className="underline" style={{ color: "var(--ink3)" }}>プライバシーポリシー</a>
          に同意します
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface ProfileSetupProps {
  defaultName?: string;
  onComplete: (profile: { nickname: string; gender: string; ageGroup: string }) => void;
}

const GENDERS = [
  { key: "male", ja: "男性" },
  { key: "female", ja: "女性" },
  { key: "other", ja: "その他" },
  { key: "prefer_not", ja: "回答しない" },
];

const AGE_GROUPS = [
  { key: "10s", ja: "10代" },
  { key: "20s", ja: "20代" },
  { key: "30s", ja: "30代" },
  { key: "40s", ja: "40代" },
  { key: "50s", ja: "50代" },
  { key: "60s", ja: "60代以上" },
];

export default function ProfileSetup({ defaultName, onComplete }: ProfileSetupProps) {
  const t = useTranslations("app");
  const [nickname, setNickname] = useState(defaultName || "");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = nickname.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    onComplete({
      nickname: nickname.trim(),
      gender: gender || "prefer_not",
      ageGroup: ageGroup || "",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      <div
        className="relative z-10 w-full max-w-[400px] animate-scaleIn"
        style={{
          background: "var(--card-solid)",
          borderRadius: 24,
          padding: "36px 28px 32px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Icon */}
        <div className="text-center mb-2">
          <img
            src="/icon-192.png"
            alt={t("name")}
            width={64}
            height={64}
            style={{ margin: "0 auto" }}
          />
        </div>

        <h2
          className="text-xl text-center mb-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          プロフィール登録
        </h2>
        <p
          className="text-xs text-center mb-6"
          style={{ color: "var(--ink4)" }}
        >
          あなたのことを教えてください
        </p>

        {/* Nickname */}
        <div className="mb-5">
          <label className="text-xs font-bold mb-2 block" style={{ color: "var(--ink2)" }}>
            ニックネーム <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例: たろう"
            maxLength={20}
            className="w-full py-3 px-4 text-sm outline-none"
            style={{
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid var(--border)",
              background: "var(--card-solid)",
              fontFamily: "var(--font-body)",
              color: "var(--ink)",
            }}
          />
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="text-xs font-bold mb-2 block" style={{ color: "var(--ink2)" }}>
            性別
          </label>
          <div className="grid grid-cols-2 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.key}
                onClick={() => setGender(g.key)}
                className="py-2.5 px-3 text-xs font-bold cursor-pointer transition-all duration-200"
                style={{
                  borderRadius: "var(--radius-sm)",
                  border: `1.5px solid ${gender === g.key ? "var(--accent)" : "var(--border)"}`,
                  background: gender === g.key ? "rgba(201,85,62,0.08)" : "var(--card-solid)",
                  color: gender === g.key ? "var(--accent)" : "var(--ink3)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {g.ja}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div className="mb-6">
          <label className="text-xs font-bold mb-2 block" style={{ color: "var(--ink2)" }}>
            年代
          </label>
          <div className="grid grid-cols-3 gap-2">
            {AGE_GROUPS.map((a) => (
              <button
                key={a.key}
                onClick={() => setAgeGroup(a.key)}
                className="py-2.5 px-3 text-xs font-bold cursor-pointer transition-all duration-200"
                style={{
                  borderRadius: "var(--radius-sm)",
                  border: `1.5px solid ${ageGroup === a.key ? "var(--accent)" : "var(--border)"}`,
                  background: ageGroup === a.key ? "rgba(201,85,62,0.08)" : "var(--card-solid)",
                  color: ageGroup === a.key ? "var(--accent)" : "var(--ink3)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {a.ja}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="w-full py-3.5 text-sm font-bold cursor-pointer transition-all duration-200"
          style={{
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: canSubmit ? "var(--accent)" : "var(--border)",
            color: canSubmit ? "#fff" : "var(--ink4)",
            fontFamily: "var(--font-body)",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "登録中..." : "はじめる"}
        </button>

        <p className="text-[10px] text-center mt-3" style={{ color: "var(--ink4)" }}>
          性別・年代は任意です。後から変更できます。
        </p>
      </div>
    </div>
  );
}

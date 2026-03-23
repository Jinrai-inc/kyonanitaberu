"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function AppFooter() {
  const t = useTranslations("credit");

  return (
    <div
      className="text-center text-[10px] mt-6 pt-3"
      style={{ color: "var(--ink4)", borderTop: "1px solid var(--border)" }}
    >
      <p>{t("text")}</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="/terms" className="underline" style={{ color: "var(--ink4)" }}>利用規約</a>
        <a href="https://jinrai.co.jp/privacypolicy/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--ink4)" }}>プライバシーポリシー</a>
        <a href="/company" className="underline" style={{ color: "var(--ink4)" }}>運営会社</a>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function AppFooter() {
  const t = useTranslations("credit");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const prefix = locale === "ja" ? "" : `/${locale}`;

  return (
    <div
      className="text-center text-[10px] mt-6 pt-3"
      style={{ color: "var(--ink4)", borderTop: "1px solid var(--border)" }}
    >
      <p>{t("text")}</p>
      <p className="mt-1" style={{ color: "var(--ink4)" }}>
        {tFooter("ad")}
      </p>
      <div className="flex justify-center gap-3 mt-3 flex-wrap">
        <Link href={`${prefix}/guide`} className="underline" style={{ color: "var(--ink4)" }}>
          {tFooter("guide")}
        </Link>
        <Link href={`${prefix}/faq`} className="underline" style={{ color: "var(--ink4)" }}>
          {tFooter("faq")}
        </Link>
        <Link href={`${prefix}/about`} className="underline" style={{ color: "var(--ink4)" }}>
          {tFooter("about")}
        </Link>
        <Link href={`${prefix}/terms`} className="underline" style={{ color: "var(--ink4)" }}>
          {tFooter("terms")}
        </Link>
        <Link href={`${prefix}/privacy`} className="underline" style={{ color: "var(--ink4)" }}>
          {tFooter("privacy")}
        </Link>
        <Link href={`${prefix}/company`} className="underline" style={{ color: "var(--ink4)" }}>
          {tFooter("company")}
        </Link>
      </div>
      <p className="mt-2">&copy; 2025 株式会社仁頼</p>
    </div>
  );
}

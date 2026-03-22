"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

function FlagIcon({ locale, size = 20 }: { locale: Locale; size?: number }) {
  const r = size / 2;
  switch (locale) {
    case "ja":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#fff" />
          <circle cx="10" cy="10" r="4" fill="#BC002D" />
          <circle cx="10" cy="10" r="9.5" fill="none" stroke="#ddd" strokeWidth="0.5" />
        </svg>
      );
    case "en":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#B22234" />
          <rect x="0" y="3" width="20" height="2" fill="#fff" />
          <rect x="0" y="7" width="20" height="2" fill="#fff" />
          <rect x="0" y="11" width="20" height="2" fill="#fff" />
          <rect x="0" y="15" width="20" height="2" fill="#fff" />
          <rect x="0" y="0" width="10" height="10" fill="#3C3B6E" />
          <circle cx="10" cy="10" r="10" fill="none" stroke="#ddd" strokeWidth="0.5" />
        </svg>
      );
    case "zh-CN":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#DE2910" />
          <path d="M5 4l1.2 3.7-3.1-2.2h3.8l-3.1 2.2z" fill="#FFDE00" />
          <circle cx="10" cy="10" r="9.5" fill="none" stroke="#ddd" strokeWidth="0.5" />
        </svg>
      );
    case "zh-TW":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#FE0000" />
          <rect x="0" y="0" width="10" height="10" fill="#000095" />
          <circle cx="5" cy="5" r="2.5" fill="none" stroke="#fff" strokeWidth="0.8" />
          <circle cx="5" cy="5" r="1.2" fill="#fff" />
          <circle cx="10" cy="10" r="9.5" fill="none" stroke="#ddd" strokeWidth="0.5" />
        </svg>
      );
    case "ko":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#fff" />
          <circle cx="10" cy="10" r="4" fill="#CD2E3A" />
          <path d="M10 10a4 4 0 0 1 0-8" fill="none" />
          <path d="M7.5 8.5a2.5 2.5 0 0 0 5 0" fill="#0047A0" />
          <circle cx="10" cy="10" r="9.5" fill="none" stroke="#ddd" strokeWidth="0.5" />
        </svg>
      );
  }
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{
          border: "1.5px solid var(--border)",
          background: "var(--card-solid)",
        }}
      >
        <FlagIcon locale={locale} size={20} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[44px] z-50 animate-fadeIn"
          style={{
            background: "var(--card-solid)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            minWidth: 150,
          }}
        >
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className="w-full flex items-center gap-[10px] px-4 py-[10px] border-none cursor-pointer transition-colors duration-150"
              style={{
                background: l === locale ? "var(--accent-light)" : "transparent",
                color: l === locale ? "var(--accent)" : "var(--ink2)",
                fontSize: 13,
                fontWeight: l === locale ? 700 : 500,
                fontFamily: "var(--font-body)",
              }}
            >
              <FlagIcon locale={l} size={18} />
              <span>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

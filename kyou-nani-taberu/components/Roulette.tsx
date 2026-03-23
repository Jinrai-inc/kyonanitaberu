"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Place } from "@/types/place";
import { XIcon, MapPin, Navigation } from "./icons/UiIcons";
import { GenreIcon } from "./icons/GenreIcons";
import { PRICE_LABEL } from "@/lib/genreMap";
import Stars from "./Stars";

interface RouletteProps {
  items: Place[];
  onClose: () => void;
}

function extractArea(address: string): string {
  const noPref = address.replace(/^.+?[都道府県]/, "");
  const cityMatch = noPref.match(/^(.+?[市郡])/);
  const wardMatch = noPref.match(/(.+?区)/);
  if (cityMatch && wardMatch) {
    const city = cityMatch[1].replace(/市$/, "");
    const ward = wardMatch[1].match(/([^市]+区)/)?.[1] || "";
    return `${city} ${ward}`.trim();
  }
  if (wardMatch) return wardMatch[1].replace(/区$/, "");
  if (cityMatch) return cityMatch[1].replace(/[市郡]$/, "");
  return noPref.slice(0, 4);
}

function buildReservationLinks(shop: Place) {
  const area = extractArea(shop.address);
  const nameAndArea = `${shop.name} ${area}`;
  return [
    { label: "ホットペッパー", href: `https://www.google.com/search?q=${encodeURIComponent(`site:hotpepper.jp ${nameAndArea}`)}` },
    { label: "食べログ", href: `https://www.google.com/search?q=${encodeURIComponent(`site:tabelog.com ${nameAndArea}`)}` },
    { label: "一休", href: `https://www.google.com/search?q=${encodeURIComponent(`site:ikyu.com ${nameAndArea}`)}` },
    { label: "OZmall", href: `https://www.google.com/search?q=${encodeURIComponent(`site:ozmall.co.jp ${nameAndArea}`)}` },
  ];
}

export default function Roulette({ items, onClose }: RouletteProps) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Place | null>(null);
  const [idx, setIdx] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = useTranslations("roulette");
  const tCard = useTranslations("card");
  const tGenre = useTranslations("genre");

  // Get available genres from items
  const availableGenres = useMemo(() => {
    const genres = new Set(items.map((item) => item.genre));
    return Array.from(genres).sort();
  }, [items]);

  // Filter items by selected genre
  const filteredItems = useMemo(() => {
    if (!selectedGenre) return items;
    return items.filter((item) => item.genre === selectedGenre);
  }, [items, selectedGenre]);

  const spin = useCallback(() => {
    if (spinning || !filteredItems.length) return;
    setSpinning(true);
    setResult(null);

    let speed = 45;
    let count = 0;
    const total = 28 + Math.floor(Math.random() * 18);

    const tick = () => {
      count++;
      setIdx((p) => (p + 1) % filteredItems.length);

      if (count >= total) {
        if (timerRef.current) clearInterval(timerRef.current);
        setResult(filteredItems[Math.floor(Math.random() * filteredItems.length)]);
        setSpinning(false);
        return;
      }

      if (count > total * 0.65) speed = 130;
      if (count > total * 0.82) speed = 240;

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(tick, speed);
    };

    timerRef.current = setInterval(tick, speed);
  }, [spinning, filteredItems]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = filteredItems[idx % filteredItems.length];
  const display = result || current;

  const gUrl = result
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.name + " " + result.address)}`
    : "";
  const dirUrl = result
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(result.name + " " + result.address)}`
    : "";

  const getGenreLabel = (genre: string) => tGenre.has(genre) ? tGenre(genre) : genre;

  const reservationLinks = result ? buildReservationLinks(result) : [];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000] animate-fadeIn"
      style={{
        background: "rgba(42, 38, 34, 0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[370px] text-center animate-scaleIn"
        style={{
          background: "var(--card-solid)",
          borderRadius: 24,
          padding: "32px 24px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-[14px] right-[16px] bg-transparent border-none cursor-pointer flex p-1"
        >
          <XIcon size={18} color="var(--ink4)" />
        </button>

        <h2
          className="text-xl font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {t("title")}
        </h2>

        {/* Genre filter chips */}
        {availableGenres.length > 1 && (
          <div className="flex flex-wrap gap-[5px] justify-center mt-3">
            <button
              onClick={() => { setSelectedGenre(null); setResult(null); }}
              className="border-none cursor-pointer transition-all duration-200"
              style={{
                padding: "4px 10px",
                borderRadius: 14,
                fontSize: 10.5,
                fontWeight: selectedGenre === null ? 700 : 500,
                fontFamily: "var(--font-body)",
                background: selectedGenre === null ? "var(--accent)" : "var(--bg)",
                color: selectedGenre === null ? "#fff" : "var(--ink3)",
              }}
            >
              {t("allGenres")}
            </button>
            {availableGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => { setSelectedGenre(genre === selectedGenre ? null : genre); setResult(null); }}
                className="border-none cursor-pointer transition-all duration-200"
                style={{
                  padding: "4px 10px",
                  borderRadius: 14,
                  fontSize: 10.5,
                  fontWeight: selectedGenre === genre ? 700 : 500,
                  fontFamily: "var(--font-body)",
                  background: selectedGenre === genre ? "var(--accent)" : "var(--bg)",
                  color: selectedGenre === genre ? "#fff" : "var(--ink3)",
                }}
              >
                {getGenreLabel(genre)}
              </button>
            ))}
          </div>
        )}

        {/* Display area */}
        <div
          className={`flex items-center justify-center my-5 ${spinning ? "animate-wobble" : ""}`}
          style={{
            background: result ? "var(--green-light)" : spinning ? "#FFF8F0" : "var(--bg)",
            borderRadius: "var(--radius)",
            padding: "28px 16px",
            minHeight: 120,
            transition: "background 0.4s",
          }}
        >
          {!result && !spinning && (
            <span className="text-[13px]" style={{ color: "var(--ink4)" }}>
              {filteredItems.length === 0
                ? t("empty")
                : t("idle")}
            </span>
          )}

          {(spinning || result) && display && (
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center mb-2"
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--card-solid)",
                  borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <GenreIcon genre={display.genre} size={40} />
              </div>
              <span
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {display.name}
              </span>

              {result && (
                <div className="animate-fadeIn mt-2 flex flex-col items-center gap-[3px]">
                  <Stars rating={result.rating} count={result.user_ratings_total} />
                  <span
                    className="text-xs font-semibold mt-1"
                    style={{ color: "var(--ink2)" }}
                  >
                    {getGenreLabel(result.genre)}{"\u3000\u00B7\u3000"}{PRICE_LABEL[result.price_level]}
                  </span>
                  {result.access && (
                    <div className="flex items-center gap-1 text-[11px] mt-[2px]" style={{ color: "var(--ink3)" }}>
                      <MapPin size={12} color="var(--ink3)" />
                      <span>{result.access}</span>
                    </div>
                  )}
                  <div className="flex gap-2 mt-3 w-full">
                    <a
                      href={gUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-[5px] no-underline transition-transform duration-200 hover:scale-[1.02]"
                      style={{
                        padding: "9px 0",
                        borderRadius: "var(--radius-sm)",
                        border: "1.5px solid var(--accent)",
                        color: "var(--accent)",
                        background: "var(--accent-light)",
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tCard("googleReview")}
                    </a>
                    <a
                      href={dirUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-[5px] no-underline transition-transform duration-200 hover:scale-[1.02]"
                      style={{
                        padding: "9px 0",
                        borderRadius: "var(--radius-sm)",
                        border: "none",
                        background: "var(--accent)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <Navigation size={13} color="#fff" /> {tCard("route")}
                    </a>
                  </div>
                  <div className="flex gap-[5px] mt-[6px] flex-wrap justify-center">
                    {reservationLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center no-underline transition-transform duration-200 hover:scale-[1.02]"
                        style={{
                          padding: "5px 8px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border)",
                          color: "var(--ink2)",
                          background: "var(--bg)",
                          fontSize: 10,
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning || !filteredItems.length}
          className="w-full border-none cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          style={{
            padding: 14,
            borderRadius: 50,
            background: spinning || !filteredItems.length ? "var(--ink4)" : "var(--accent)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 800,
            fontFamily: "var(--font-body)",
            boxShadow: spinning || !filteredItems.length ? "none" : "0 4px 16px var(--accent-glow)",
          }}
        >
          {spinning ? t("spinning") : result ? t("restart") : t("start")}
        </button>
      </div>
    </div>
  );
}

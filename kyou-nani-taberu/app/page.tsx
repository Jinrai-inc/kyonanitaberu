"use client";

import React, { useState, useEffect, useMemo } from "react";
import type { TransportMode, SortBy } from "@/types/place";
import { MOCK_SHOPS } from "@/lib/mockData";
import { ALL_GENRES } from "@/lib/genreMap";
import { getTimeKey } from "@/lib/radiusCalc";
import { isOpenNow, isClosedToday, getTime } from "@/lib/timeUtils";

import LoginScreen from "@/components/LoginScreen";
import AppHeader from "@/components/AppHeader";
import LocationBar from "@/components/LocationBar";
import TransportSelector from "@/components/TransportSelector";
import TimeSelector from "@/components/TimeSelector";
import NowOpenToggle from "@/components/NowOpenToggle";
import GenreFilter from "@/components/GenreFilter";
import ShopList from "@/components/ShopList";
import Roulette from "@/components/Roulette";
import Fab from "@/components/Fab";

export default function Home() {
  const [auth, setAuth] = useState<string | null>(null);
  const [mode, setMode] = useState<TransportMode>("walk");
  const [maxTime, setMaxTime] = useState(10);
  const [genres, setGenres] = useState<string[]>([]);
  const [showRoulette, setShowRoulette] = useState(false);
  const [located, setLocated] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const iv = setInterval(() => setTime(getTime()), 60000);
    return () => clearInterval(iv);
  }, []);

  const tk = getTimeKey(mode);

  const filteredShops = useMemo(() => {
    let list = MOCK_SHOPS.filter((s) => (s[tk] ?? 0) <= maxTime);
    if (genres.length) list = list.filter((s) => genres.includes(s.genre));
    if (onlyOpen) list = list.filter((s) => !isClosedToday(s.close_day) && isOpenNow(s.opening_hours_text));

    return [...list].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      return (a[tk] ?? 0) - (b[tk] ?? 0);
    });
  }, [mode, maxTime, genres, onlyOpen, sortBy, tk]);

  const openCount = useMemo(() => {
    return MOCK_SHOPS.filter(
      (s) => (s[tk] ?? 0) <= maxTime && !isClosedToday(s.close_day) && isOpenNow(s.opening_hours_text)
    ).length;
  }, [maxTime, tk]);

  const availableGenres = useMemo(() => {
    const genresInRange = new Set(
      MOCK_SHOPS.filter((s) => (s[tk] ?? 0) <= maxTime).map((s) => s.genre)
    );
    return ALL_GENRES.filter((g) => genresInRange.has(g));
  }, [maxTime, tk]);

  if (!auth) {
    return <LoginScreen onLogin={setAuth} />;
  }

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--ink)",
          background: "var(--bg)",
          backgroundImage:
            "radial-gradient(ellipse at 15% 0%, rgba(201,85,62,0.04) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(90,158,111,0.04) 0%, transparent 50%)",
        }}
      >
        <AppHeader onLogout={() => setAuth(null)} />

        <div className="max-w-[460px] mx-auto px-4 pb-[110px]">
          <LocationBar
            located={located}
            onLocate={() => setLocated(true)}
            onReset={() => {
              setLocated(false);
              setGenres([]);
            }}
          />

          {located && (
            <>
              <TransportSelector mode={mode} onChange={setMode} />
              <TimeSelector maxTime={maxTime} onChange={setMaxTime} />
              <NowOpenToggle
                onlyOpen={onlyOpen}
                onChange={setOnlyOpen}
                time={time}
                openCount={openCount}
              />
              <GenreFilter
                allGenres={availableGenres}
                selected={genres}
                onChange={setGenres}
              />
              <ShopList
                shops={filteredShops}
                mode={mode}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onlyOpen={onlyOpen}
              />

              <div
                className="text-center text-[10px] mt-6 pt-3"
                style={{ color: "var(--ink4)", borderTop: "1px solid var(--border)" }}
              >
                店舗情報は{" "}
                <a
                  href="https://cloud.google.com/maps-platform"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--ink3)" }}
                >
                  Google Maps Platform
                </a>{" "}
                を利用しています
              </div>

              {filteredShops.length > 0 && (
                <Fab onClick={() => setShowRoulette(true)} />
              )}
            </>
          )}
        </div>
      </div>

      {showRoulette && (
        <Roulette items={filteredShops} onClose={() => setShowRoulette(false)} />
      )}
    </>
  );
}

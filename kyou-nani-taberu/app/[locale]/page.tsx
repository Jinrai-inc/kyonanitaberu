"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import type { Place, TransportMode, SortBy } from "@/types/place";
import { ALL_GENRE_KEYS } from "@/lib/genreMap";
import { getTimeKey, calcRadius, estimateTravelMin } from "@/lib/radiusCalc";
import { isOpenNow, isClosedToday, getTime } from "@/lib/timeUtils";
import { fetchNearbyPlaces } from "@/lib/places";

import LoginScreen from "@/components/LoginScreen";
import ProfileSetup from "@/components/ProfileSetup";
import AppHeader from "@/components/AppHeader";
import LocationBar from "@/components/LocationBar";
import TransportSelector from "@/components/TransportSelector";
import TimeSelector from "@/components/TimeSelector";
import NowOpenToggle from "@/components/NowOpenToggle";
import GenreFilter from "@/components/GenreFilter";
import ShopList from "@/components/ShopList";
import Roulette from "@/components/Roulette";
import Fab from "@/components/Fab";
import MapSection from "@/components/map/MapSection";

interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

// Generate a persistent guest ID
function getGuestId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("guest_id");
  if (!id) {
    id = "guest_" + crypto.randomUUID();
    localStorage.setItem("guest_id", id);
  }
  return id;
}

export default function Home() {
  const { data: session, status } = useSession();
  const locale = useLocale();
  const t = useTranslations("credit");
  const tLoc = useTranslations("location");
  const [guestMode, setGuestMode] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileChecked, setProfileChecked] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [mode, setMode] = useState<TransportMode>("walk");
  const [maxTime, setMaxTime] = useState(10);
  const [genres, setGenres] = useState<string[]>([]);
  const [showRoulette, setShowRoulette] = useState(false);
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [time, setTime] = useState(getTime());
  const [shops, setShops] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = status === "authenticated" || guestMode;

  // Check profile completion on auth change
  useEffect(() => {
    if (!isAuthenticated) {
      setProfileChecked(false);
      setProfileCompleted(false);
      setNickname(null);
      return;
    }

    const checkProfile = async () => {
      try {
        const params = new URLSearchParams();
        if (guestMode) {
          params.set("guestId", getGuestId());
        } else if (session?.user) {
          const user = session.user as unknown as Record<string, unknown>;
          params.set("provider", (user.provider as string) || "");
          // Use email as fallback identifier
          params.set("providerAccountId", (session.user.email as string) || "");
        }

        const res = await fetch(`/api/profile?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProfileCompleted(data.profileCompleted);
          if (data.nickname) setNickname(data.nickname);
        }
      } catch {
        // If check fails, show profile setup
      }
      setProfileChecked(true);
    };

    checkProfile();
  }, [isAuthenticated, guestMode, session]);

  useEffect(() => {
    const iv = setInterval(() => setTime(getTime()), 60000);
    return () => clearInterval(iv);
  }, []);

  const fetchPlaces = useCallback(async (lat: number, lng: number, transportMode: TransportMode, minutes: number) => {
    setLoading(true);
    try {
      const radius = calcRadius(transportMode, minutes);
      const places = await fetchNearbyPlaces({ lat, lng, radius, locale });

      const placesWithTimes = places.map((place) => {
        const dist = haversineDistance(lat, lng, place.lat, place.lng);
        return {
          ...place,
          walkMin: estimateTravelMin("walk", dist),
          bikeMin: estimateTravelMin("bike", dist),
          carMin: estimateTravelMin("car", dist),
        };
      });

      setShops(placesWithTimes);
    } catch (err) {
      console.error("Failed to fetch places:", err);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    if (location) {
      fetchPlaces(location.lat, location.lng, mode, maxTime);
    }
  }, [location, mode, maxTime, fetchPlaces]);

  const handleLocate = useCallback(async (lat: number, lng: number) => {
    let address: string | undefined;
    try {
      const res = await fetch(`/api/geocode?lat=${lat}&lng=${lng}&locale=${locale}`);
      if (res.ok) {
        const data = await res.json();
        address = data.address;
      }
    } catch {
      // Address is optional
    }
    setLocation({ lat, lng, address });
  }, [locale]);

  const handleProfileComplete = useCallback(async (profile: { nickname: string; gender: string; ageGroup: string }) => {
    try {
      const body: Record<string, unknown> = {
        nickname: profile.nickname,
        gender: profile.gender,
        ageGroup: profile.ageGroup,
      };

      if (guestMode) {
        body.isGuest = true;
        body.guestId = getGuestId();
        body.provider = "guest";
      } else if (session?.user) {
        const user = session.user as unknown as Record<string, unknown>;
        body.provider = user.provider;
        body.providerAccountId = session.user.email;
        body.email = session.user.email;
      }

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setNickname(data.nickname || profile.nickname);
      }
    } catch {
      // Save failed, but let user continue
    }
    setProfileCompleted(true);
    setNickname(profile.nickname);
  }, [guestMode, session]);

  const tk = getTimeKey(mode);

  const filteredShops = useMemo(() => {
    let list = shops.filter((s) => (s[tk] ?? 0) <= maxTime);
    if (genres.length) list = list.filter((s) => genres.includes(s.genre));
    if (onlyOpen) list = list.filter((s) => !isClosedToday(s.close_day, locale) && isOpenNow(s.opening_hours_text));

    return [...list].sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      return (a[tk] ?? 0) - (b[tk] ?? 0);
    });
  }, [shops, maxTime, genres, onlyOpen, sortBy, tk, locale]);

  const openCount = useMemo(() => {
    return shops.filter(
      (s) => (s[tk] ?? 0) <= maxTime && !isClosedToday(s.close_day, locale) && isOpenNow(s.opening_hours_text)
    ).length;
  }, [shops, maxTime, tk, locale]);

  const availableGenres = useMemo(() => {
    const genresInRange = new Set(
      shops.filter((s) => (s[tk] ?? 0) <= maxTime).map((s) => s.genre)
    );
    return ALL_GENRE_KEYS.filter((g) => genresInRange.has(g));
  }, [shops, maxTime, tk]);

  // Loading auth state
  if (status === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
        />
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <LoginScreen onGuestLogin={() => {
      setGuestMode(true);
      fetch("/api/analytics/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "guest", isGuest: true, locale }),
      }).catch(() => {});
    }} />;
  }

  // Profile check loading
  if (!profileChecked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
        />
      </div>
    );
  }

  // Profile not completed - show setup
  if (!profileCompleted) {
    return (
      <ProfileSetup
        defaultName={session?.user?.name || ""}
        onComplete={handleProfileComplete}
      />
    );
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
        <AppHeader
          nickname={nickname}
          onLogout={() => {
            if (guestMode) {
              setGuestMode(false);
            } else {
              signOut();
            }
          }}
        />

        <div className="max-w-[460px] mx-auto px-4 pb-[110px]">
          <LocationBar
            located={!!location}
            onLocate={handleLocate}
            onReset={() => {
              setLocation(null);
              setGenres([]);
              setShops([]);
            }}
            address={location?.address}
          />

          {location && (
            <>
              <MapSection
                center={{ lat: location.lat, lng: location.lng }}
                places={filteredShops}
                radius={calcRadius(mode, maxTime)}
              />
              <TransportSelector mode={mode} onChange={setMode} />
              <TimeSelector maxTime={maxTime} onChange={setMaxTime} />
              <NowOpenToggle
                onlyOpen={onlyOpen}
                onChange={setOnlyOpen}
                time={time}
                openCount={openCount}
              />
              <GenreFilter
                allGenres={availableGenres as unknown as string[]}
                selected={genres}
                onChange={setGenres}
              />

              {loading ? (
                <div className="text-center py-8">
                  <div
                    className="inline-block w-6 h-6 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "var(--border)",
                      borderTopColor: "var(--accent)",
                    }}
                  />
                  <p className="text-xs mt-2" style={{ color: "var(--ink4)" }}>
                    {tLoc("searching")}
                  </p>
                </div>
              ) : (
                <ShopList
                  shops={filteredShops}
                  mode={mode}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onlyOpen={onlyOpen}
                  locale={locale}
                />
              )}

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

              {filteredShops.length > 0 && !loading && (
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

// Haversine distance in meters
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

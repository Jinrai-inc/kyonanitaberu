"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import type { Place, TransportMode, SortBy } from "@/types/place";
import { ALL_GENRE_KEYS, IZAKAYA_GENRES } from "@/lib/genreMap";
import { getTimeKey, calcRadius, estimateTravelMin } from "@/lib/radiusCalc";
import { isClosedToday, getTime } from "@/lib/timeUtils";
import { fetchNearbyPlaces } from "@/lib/places";

import AppHeader from "@/components/AppHeader";
import LocationBar from "@/components/LocationBar";
import TransportSelector from "@/components/TransportSelector";
import TimeSelector from "@/components/TimeSelector";
import NowOpenToggle from "@/components/NowOpenToggle";
import GenreFilter from "@/components/GenreFilter";
import ShopList from "@/components/ShopList";
import AppFooter from "@/components/AppFooter";
import AdMax from "@/components/AdMax";
import Roulette from "@/components/Roulette";
import Fab from "@/components/Fab";
import SceneSelector from "@/components/SceneSelector";
import type { SceneMode } from "@/components/SceneSelector";
import MapSection from "@/components/map/MapSection";
import LoginModal from "@/components/LoginModal";
import ColumnBanner from "@/components/ColumnBanner";
import { MapPin } from "@/components/icons/UiIcons";

interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

interface MainAppProps {
  initialPlaces: Place[];
  defaultLocationName: string;
  defaultLat: number;
  defaultLng: number;
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

export default function MainApp({ initialPlaces, defaultLocationName, defaultLat, defaultLng }: MainAppProps) {
  const { data: session, status } = useSession();
  const locale = useLocale();
  const tLoc = useTranslations("location");
  const t = useTranslations();

  // Auto-activate guest mode so app is usable immediately
  const [guestMode, setGuestMode] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileChecked, setProfileChecked] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [scene, setScene] = useState<SceneMode>("all");
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
  const [isUsingGPS, setIsUsingGPS] = useState(false);

  // SSR default data: compute travel times for initial places
  const defaultShops = useMemo(() => {
    return initialPlaces.map((place) => {
      const dist = haversineDistance(defaultLat, defaultLng, place.lat, place.lng);
      return {
        ...place,
        walkMin: estimateTravelMin("walk", dist),
        bikeMin: estimateTravelMin("bike", dist),
        carMin: estimateTravelMin("car", dist),
      };
    });
  }, [initialPlaces, defaultLat, defaultLng]);

  const isAuthenticated = status === "authenticated" || guestMode;

  // When OAuth login completes, disable guest mode
  useEffect(() => {
    if (status === "authenticated") {
      setGuestMode(false);
    }
  }, [status]);

  // Check profile completion on auth change (only for OAuth users)
  useEffect(() => {
    if (status !== "authenticated") {
      setProfileChecked(true);
      setProfileCompleted(true);
      return;
    }

    const checkProfile = async () => {
      try {
        const params = new URLSearchParams();
        if (session?.user) {
          const user = session.user as unknown as Record<string, unknown>;
          params.set("provider", (user.provider as string) || "");
          params.set("providerAccountId", (session.user.email as string) || "");
        }

        const res = await fetch(`/api/profile?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProfileCompleted(data.profileCompleted);
          if (data.nickname) setNickname(data.nickname);
        }
      } catch {
        // If check fails, let user continue
      }
      setProfileChecked(true);
    };

    checkProfile();
  }, [status, session]);

  useEffect(() => {
    const iv = setInterval(() => setTime(getTime()), 60000);
    return () => clearInterval(iv);
  }, []);

  const fetchPlaces = useCallback(async (lat: number, lng: number, transportMode: TransportMode, minutes: number) => {
    setLoading(true);
    try {
      const radius = Math.round(calcRadius(transportMode, minutes) * 1.3);
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
    setIsUsingGPS(true);
  }, [locale]);

  const handleGuestLogin = () => {
    setGuestMode(true);
    fetch("/api/analytics/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "guest", isGuest: true, locale }),
    }).catch(() => {});
  };

  const tk = getTimeKey(mode);

  // Use GPS-based shops if available, otherwise use SSR default shops
  const activeShops = isUsingGPS ? shops : defaultShops;

  const filteredShops = useMemo(() => {
    let list = activeShops.filter((s) => (s[tk] ?? 0) <= maxTime);
    if (scene === "izakaya") {
      list = list.filter((s) => IZAKAYA_GENRES.includes(s.genre));
    }
    if (genres.length) list = list.filter((s) => genres.includes(s.genre));
    if (onlyOpen) list = list.filter((s) => !isClosedToday(s.close_day, locale) && s.is_open_now === true);

    return [...list].sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      return (a[tk] ?? 0) - (b[tk] ?? 0);
    });
  }, [activeShops, maxTime, genres, onlyOpen, sortBy, tk, locale, scene]);

  const openCount = useMemo(() => {
    return activeShops.filter(
      (s) => (s[tk] ?? 0) <= maxTime && !isClosedToday(s.close_day, locale) && s.is_open_now === true
    ).length;
  }, [activeShops, maxTime, tk, locale]);

  const availableGenres = useMemo(() => {
    const genresInRange = new Set(
      activeShops.filter((s) => (s[tk] ?? 0) <= maxTime).map((s) => s.genre)
    );
    const keys = scene === "izakaya"
      ? ALL_GENRE_KEYS.filter((g) => IZAKAYA_GENRES.includes(g))
      : ALL_GENRE_KEYS;
    return keys.filter((g) => genresInRange.has(g));
  }, [activeShops, maxTime, tk, scene]);

  // Determine center for map
  const mapCenter = isUsingGPS && location
    ? { lat: location.lat, lng: location.lng }
    : { lat: defaultLat, lng: defaultLng };

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
          isLoggedIn={status === "authenticated"}
          onLogout={() => {
            if (status === "authenticated") {
              signOut();
            }
          }}
          onLoginRequest={() => setShowLoginModal(true)}
        />

        <div className="max-w-[460px] mx-auto px-4 pb-[110px] overflow-hidden">
          {/* Default location banner (before GPS) */}
          {!isUsingGPS && (
            <div className="my-4 animate-fadeUp">
              <div
                className="flex items-center gap-2 mb-3"
                style={{
                  background: "var(--accent-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "10px 14px",
                }}
              >
                <MapPin size={15} color="var(--accent)" />
                <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                  {defaultLocationName}
                </span>
              </div>

              {/* おすすめコラム（WordPress REST API連携） */}
              <ColumnBanner locale={locale} />

              <button
                onClick={() => {
                  // Trigger GPS
                  if (!navigator.geolocation) return;
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      handleLocate(position.coords.latitude, position.coords.longitude);
                    },
                    () => {
                      // GPS failed, stay on default data
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
                  );
                }}
                className="w-full py-4 px-5 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  background: "var(--accent)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  fontFamily: "var(--font-body)",
                  color: "#fff",
                }}
              >
                <MapPin size={18} color="#fff" />
                {tLoc("getLocation")}
              </button>
            </div>
          )}

          {/* GPS-based location bar (after GPS) */}
          {isUsingGPS && (
            <LocationBar
              located={!!location}
              onLocate={handleLocate}
              onReset={() => {
                setLocation(null);
                setIsUsingGPS(false);
                setGenres([]);
                setShops([]);
              }}
              address={location?.address}
            />
          )}

          {/* Filters + shop list (always shown) */}
          {(isUsingGPS && location) || !isUsingGPS ? (
            <>
              <MapSection
                center={mapCenter}
                places={filteredShops}
                radius={calcRadius(mode, maxTime)}
              />
              <SceneSelector scene={scene} onChange={(s) => { setScene(s); setGenres([]); }} />
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

              <AdMax />
              <AppFooter />

              {filteredShops.length > 0 && !loading && (
                <Fab onClick={() => setShowRoulette(true)} />
              )}
            </>
          ) : (
            <>
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
              <AppFooter />
            </>
          )}
        </div>
      </div>

      {showRoulette && (
        <Roulette items={filteredShops} onClose={() => setShowRoulette(false)} />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onGuestLogin={handleGuestLogin}
        />
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

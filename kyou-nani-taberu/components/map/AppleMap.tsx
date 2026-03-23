"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Place } from "@/types/place";

// Genre key to glyph character for markers
const GENRE_GLYPH: Record<string, string> = {
  ramen: "ラ",
  sushi: "寿",
  japanese: "和",
  italian: "伊",
  chinese: "中",
  korean: "韓",
  thai: "タ",
  curry: "カ",
  french: "仏",
  mexican: "墨",
  western: "洋",
  yakiniku: "焼",
  cafe: "珈",
  bar: "酒",
  izakaya: "居",
  okonomiyaki: "鉄",
  creative: "創",
  restaurant: "食",
};

interface AppleMapProps {
  center: { lat: number; lng: number };
  places: Place[];
  radius: number;
  selectedPlaceId?: string | null;
  onMarkerClick?: (place: Place) => void;
}

export default function AppleMap({ center, places, radius, selectedPlaceId, onMarkerClick }: AppleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapkit.Map | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  // Wait for MapKit JS to load
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if mapkit is already available
    if (window.mapkit) {
      setReady(true);
      return;
    }

    // Listen for the init callback
    const origCallback = window.initMapKit;
    window.initMapKit = () => {
      origCallback?.();
      setReady(true);
    };

    // Check periodically in case it was loaded before our listener
    const check = setInterval(() => {
      if (window.mapkit) {
        setReady(true);
        clearInterval(check);
      }
    }, 500);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(check);
      if (!window.mapkit) {
        setError(true);
      }
    }, 10000);

    return () => {
      clearInterval(check);
      clearTimeout(timeout);
    };
  }, []);

  // Initialize/update map
  useEffect(() => {
    if (!ready || !containerRef.current || error) return;

    const mk = window.mapkit;
    if (!mk) return;

    // Create map if not exists
    if (!mapRef.current) {
      try {
        // Calculate appropriate span from radius
        const latDelta = (radius / 111320) * 2.5;
        const lngDelta = latDelta / Math.cos(center.lat * (Math.PI / 180));

        mapRef.current = new mk.Map(containerRef.current, {
          center: new mk.Coordinate(center.lat, center.lng),
          region: new mk.CoordinateRegion(
            new mk.Coordinate(center.lat, center.lng),
            new mk.CoordinateSpan(latDelta, lngDelta)
          ),
          showsCompass: "hidden",
          showsZoomControl: false,
          showsMapTypeControl: false,
          padding: new mk.Padding(10, 10, 10, 10),
        });
      } catch {
        setError(true);
        return;
      }
    }

    const map = mapRef.current;
    if (!map) return;

    // Clear existing annotations
    if (map.annotations.length > 0) {
      map.removeAnnotations(map.annotations);
    }

    // Add current location marker (terracotta pulsing dot is done via CSS)
    const centerAnnotation = new mk.MarkerAnnotation(
      new mk.Coordinate(center.lat, center.lng),
      {
        color: "#C9553E",
        glyphText: "●",
        title: "",
        data: { type: "center" },
      }
    );
    map.addAnnotation(centerAnnotation);

    // Add place markers
    const annotations = places.map((place) => {
      const glyph = GENRE_GLYPH[place.genre] || "食";
      const isSelected = place.place_id === selectedPlaceId;

      const annotation = new mk.MarkerAnnotation(
        new mk.Coordinate(place.lat, place.lng),
        {
          color: isSelected ? "#A0432E" : "#C9553E",
          glyphText: glyph,
          title: place.name,
          data: { placeId: place.place_id },
          clusteringIdentifier: "restaurants",
        }
      );

      if (onMarkerClick) {
        annotation.addEventListener("select", () => {
          onMarkerClick(place);
        });
      }

      return annotation;
    });

    map.addAnnotations(annotations);

    // Update region
    const latDelta = (radius / 111320) * 2.5;
    const lngDelta = latDelta / Math.cos(center.lat * (Math.PI / 180));
    map.region = new mk.CoordinateRegion(
      new mk.Coordinate(center.lat, center.lng),
      new mk.CoordinateSpan(latDelta, lngDelta)
    );
  }, [ready, center, places, radius, selectedPlaceId, onMarkerClick, error]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  if (error) {
    return null; // Fail silently - list view still works
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: 200,
        borderRadius: "var(--radius)",
        overflow: "hidden",
        background: "var(--bg2)",
      }}
    />
  );
}

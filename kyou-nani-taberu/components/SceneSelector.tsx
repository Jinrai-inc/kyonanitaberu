"use client";

import React from "react";
import { useTranslations } from "next-intl";

export type SceneMode = "all" | "izakaya";

interface SceneSelectorProps {
  scene: SceneMode;
  onChange: (scene: SceneMode) => void;
}

export default function SceneSelector({ scene, onChange }: SceneSelectorProps) {
  const t = useTranslations("scene");

  const scenes: { id: SceneMode; key: string; emoji: string }[] = [
    { id: "all", key: "all", emoji: "🍽" },
    { id: "izakaya", key: "izakaya", emoji: "🍻" },
  ];

  return (
    <section className="mb-5 animate-fadeUp">
      <div className="flex gap-[10px]">
        {scenes.map(({ id, key, emoji }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex-1 flex items-center justify-center gap-[6px] cursor-pointer transition-all duration-300"
            style={{
              padding: "12px 8px",
              borderRadius: "var(--radius)",
              border: `2px solid ${scene === id ? "var(--accent)" : "var(--border)"}`,
              background: scene === id ? "var(--accent-light)" : "var(--card-solid)",
              transform: scene === id ? "scale(1.03)" : "scale(1)",
              boxShadow: scene === id ? "0 4px 14px var(--accent-glow)" : "none",
            }}
          >
            <span className="text-[18px]">{emoji}</span>
            <span
              className="text-[12px] font-extrabold"
              style={{
                fontFamily: "var(--font-body)",
                color: scene === id ? "var(--accent)" : "var(--ink4)",
              }}
            >
              {t(key)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

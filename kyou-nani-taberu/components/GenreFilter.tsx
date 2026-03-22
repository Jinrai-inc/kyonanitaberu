"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { GenreIcon } from "./icons/GenreIcons";
import type { GenreKey } from "@/lib/genreMap";

interface GenreFilterProps {
  allGenres: string[];
  selected: string[];
  onChange: (genres: string[]) => void;
}

export default function GenreFilter({ allGenres, selected, onChange }: GenreFilterProps) {
  const t = useTranslations("genre");

  const toggle = (genre: string) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre));
    } else {
      onChange([...selected, genre]);
    }
  };

  return (
    <section className="mb-5 animate-fadeUp" style={{ animationDelay: "160ms" }}>
      <div className="flex justify-between items-center mb-[10px]">
        <span
          className="text-[10.5px] font-extrabold uppercase"
          style={{ color: "var(--ink4)", letterSpacing: "1.6px" }}
        >
          {t("label")}
        </span>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="border-none cursor-pointer"
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              background: "#FDE8E8",
              color: "#C0392B",
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "var(--font-body)",
            }}
          >
            {t("reset")}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-[7px]">
        {allGenres.map((genreKey) => (
          <button
            key={genreKey}
            onClick={() => toggle(genreKey)}
            className="flex items-center gap-[5px] cursor-pointer transition-all duration-200"
            style={{
              padding: "6px 12px",
              borderRadius: 22,
              border: `1.5px solid ${selected.includes(genreKey) ? "var(--accent)" : "var(--border)"}`,
              background: selected.includes(genreKey) ? "var(--accent-light)" : "var(--card-solid)",
              color: selected.includes(genreKey) ? "var(--accent)" : "var(--ink3)",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "var(--font-body)",
            }}
          >
            <GenreIcon genre={genreKey} size={15} />
            {t(genreKey as GenreKey)}
          </button>
        ))}
      </div>
    </section>
  );
}

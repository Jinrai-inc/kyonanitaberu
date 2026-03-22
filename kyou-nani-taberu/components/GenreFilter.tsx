"use client";

import React from "react";
import { GenreIcon } from "./icons/GenreIcons";

interface GenreFilterProps {
  allGenres: string[];
  selected: string[];
  onChange: (genres: string[]) => void;
}

export default function GenreFilter({ allGenres, selected, onChange }: GenreFilterProps) {
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
          ジャンル
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
            リセット
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-[7px]">
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggle(genre)}
            className="flex items-center gap-[5px] cursor-pointer transition-all duration-200"
            style={{
              padding: "6px 12px",
              borderRadius: 22,
              border: `1.5px solid ${selected.includes(genre) ? "var(--accent)" : "var(--border)"}`,
              background: selected.includes(genre) ? "var(--accent-light)" : "var(--card-solid)",
              color: selected.includes(genre) ? "var(--accent)" : "var(--ink3)",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "var(--font-body)",
            }}
          >
            <GenreIcon genre={genre} size={15} />
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
}

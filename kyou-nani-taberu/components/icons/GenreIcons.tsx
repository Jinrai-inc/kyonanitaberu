import React from "react";

interface GenreIconProps {
  size?: number;
  className?: string;
}

export function RestaurantIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="14" rx="9" ry="5" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M6 8c0-2 2.7-4 6-4s6 2 6 4" stroke="var(--accent)" strokeWidth="1.8" />
    </svg>
  );
}

export function IzakayaIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="8" y="3" width="8" height="14" rx="2" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M10 17v4M14 17v4M8 21h8" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 7h2M11 10h2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RamenIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 11h16c0 6-3.6 9-8 9s-8-3-8-9z" stroke="var(--accent)" strokeWidth="1.8" />
      <path
        d="M7 7c.5-1.5 1-2.5 1-2.5M12 6c.5-1.5 1-2.5 1-2.5M17 7c.5-1.5 1-2.5 1-2.5"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function CafeIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 11h14v2c0 4-3.1 7-7 7s-7-3-7-7v-2z" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M17 11h2a3 3 0 0 1 0 6h-2" stroke="var(--accent)" strokeWidth="1.8" />
    </svg>
  );
}

export function ItalianIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="var(--accent)" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1.5" fill="var(--accent)" opacity="0.5" />
      <circle cx="14" cy="9" r="1" fill="var(--accent)" opacity="0.5" />
      <circle cx="11" cy="14" r="1.2" fill="var(--accent)" opacity="0.5" />
    </svg>
  );
}

export function YakinikuIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="12" width="18" height="3" rx="1.5" stroke="var(--accent)" strokeWidth="1.8" />
      <path
        d="M8 9c0-2 1-3 1-3M12 8c0-2 1-3 1-3M16 9c0-2 1-3 1-3"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <line x1="3" y1="19" x2="21" y2="19" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ChineseIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12c0-4 3.1-7 7-7s7 3 7 7" stroke="var(--accent)" strokeWidth="1.8" />
      <ellipse cx="12" cy="14" rx="8" ry="4" stroke="var(--accent)" strokeWidth="1.8" />
    </svg>
  );
}

export function BarIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 2l8 0-4 8v6" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 20h8" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="16" x2="12" y2="20" stroke="var(--accent)" strokeWidth="1.8" />
    </svg>
  );
}

export function SushiIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="15" rx="9" ry="4" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M5 13c1-3 3.5-5 7-5s6 2 7 5" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M9 12c1-1 2-1.5 3-1.5s2 .5 3 1.5" stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

export function CurryIcon({ size = 22, className }: GenreIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 16c0-5 3-10 7-10s7 5 7 10" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M3 16h18M8 19h8" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export type GenreIconComponent = React.FC<GenreIconProps>;

export const GENRE_ICON_MAP: Record<string, GenreIconComponent> = {
  "和食": RestaurantIcon,
  "居酒屋": IzakayaIcon,
  "ラーメン": RamenIcon,
  "カフェ": CafeIcon,
  "イタリアン": ItalianIcon,
  "焼肉": YakinikuIcon,
  "中華": ChineseIcon,
  "バー": BarIcon,
  "寿司": SushiIcon,
  "カレー": CurryIcon,
  "洋食": RestaurantIcon,
  "韓国料理": ChineseIcon,
  "フレンチ": ItalianIcon,
  "タイ料理": CurryIcon,
  "メキシカン": RestaurantIcon,
  "お好み焼き": YakinikuIcon,
  "創作料理": RestaurantIcon,
  "レストラン": RestaurantIcon,
};

export function GenreIcon({ genre, size = 22, className }: { genre: string } & GenreIconProps) {
  const Icon = GENRE_ICON_MAP[genre] || RestaurantIcon;
  return <Icon size={size} className={className} />;
}

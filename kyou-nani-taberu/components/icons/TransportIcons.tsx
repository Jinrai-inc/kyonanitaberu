import React from "react";

interface TransportIconProps {
  size?: number;
  className?: string;
}

export function Walk({ size = 32, className }: TransportIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="8" r="4" fill="var(--accent)" />
      <path
        d="M16 16h8l2 8-4 2-2 10h-2l1-10-3-2 1-4-1 4-3 2-2 10h-2l3-12 3-2z"
        fill="var(--accent)"
        opacity="0.85"
      />
    </svg>
  );
}

export function Bike({ size = 32, className }: TransportIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="11" cy="27" r="6" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx="29" cy="27" r="6" stroke="var(--accent)" strokeWidth="2.5" />
      <path
        d="M11 27l7-12h6l3 6h2"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 15l5 12" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="11" r="2.5" fill="var(--accent)" />
    </svg>
  );
}

export function Car({ size = 32, className }: TransportIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="4" y="16" width="32" height="12" rx="3" fill="var(--accent)" opacity="0.85" />
      <path d="M9 16l3-7h16l3 7" fill="var(--accent)" opacity="0.6" />
      <circle cx="11" cy="28" r="3" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="29" cy="28" r="3" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

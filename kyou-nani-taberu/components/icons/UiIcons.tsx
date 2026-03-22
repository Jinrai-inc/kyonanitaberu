import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

function Ic({
  children,
  size = 24,
  style,
  className,
}: {
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      {children}
    </svg>
  );
}

export function MapPin({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Ic>
  );
}

export function Clock({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Ic>
  );
}

export function Calendar({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Ic>
  );
}

export function Navigation({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </Ic>
  );
}

export function XIcon({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Ic>
  );
}

export function Refresh({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </Ic>
  );
}

export function Star({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Ic>
  );
}

export function ExternalLink({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Ic>
  );
}

export function User({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Ic>
  );
}

export function LogOut({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Ic>
  );
}

export function Zap({ size = 24, color, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      style={{ color }}
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function Phone({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </Ic>
  );
}

export function Dice({ size = 20, className }: IconProps) {
  return (
    <Ic size={size} style={{ color: "#fff" }} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </Ic>
  );
}

export function ChevronDown({ size = 24, color, className }: IconProps) {
  return (
    <Ic size={size} style={{ color }} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Ic>
  );
}

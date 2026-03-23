"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_ID = "1000546dcb2959f8da72340ba2929fde";
const PC_ID = "afd535ffc5036257f0cdec025f0f3e4c";

export default function AdMax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adId, setAdId] = useState<string | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setAdId(isMobile ? MOBILE_ID : PC_ID);
  }, []);

  useEffect(() => {
    if (!adId || !containerRef.current) return;

    const script = document.createElement("script");
    script.src = `https://adm.shinobi.jp/s/${adId}`;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [adId]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center my-4 overflow-hidden max-w-full"
    />
  );
}

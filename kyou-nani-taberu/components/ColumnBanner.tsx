"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "./icons/UiIcons";

interface WPPost {
  id: number;
  title: { rendered: string };
  link: string;
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

interface ColumnBannerProps {
  locale: string;
}

export default function ColumnBanner({ locale }: ColumnBannerProps) {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const t = useTranslations("column");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch latest 3 posts from WordPress REST API
        // Tag or category can be used to filter by area/locale
        const res = await fetch(
          `/media/wp-json/wp/v2/posts?per_page=3&_embed=wp:featuredmedia&lang=${locale}`,
          { next: { revalidate: 3600 } } as RequestInit
        );
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch {
        // WordPress not available yet — silently fail
      }
    };

    fetchPosts();
  }, [locale]);

  // Don't render anything if no posts available
  if (posts.length === 0) return null;

  return (
    <div className="mb-4 animate-fadeUp" style={{ animationDelay: "100ms" }}>
      <h2
        className="text-[13px] font-bold mb-2 flex items-center gap-1"
        style={{ color: "var(--ink2)" }}
      >
        {t("title")}
      </h2>

      <div className="grid gap-[8px]">
        {posts.map((post) => {
          const thumbnail = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          // Strip HTML tags from excerpt
          const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim().slice(0, 60);

          return (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-center no-underline transition-all duration-200 hover:-translate-y-[1px]"
              style={{
                background: "var(--card-solid)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 12px",
              }}
            >
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt=""
                  className="flex-shrink-0 object-cover"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 8,
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[12.5px] font-bold line-clamp-2"
                  style={{ color: "var(--ink)" }}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                {excerpt && (
                  <p
                    className="text-[10.5px] mt-[2px] line-clamp-1"
                    style={{ color: "var(--ink3)" }}
                  >
                    {excerpt}
                  </p>
                )}
              </div>
              <ExternalLink size={14} color="var(--ink4)" />
            </a>
          );
        })}
      </div>

      <a
        href="/media"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-[11px] font-bold mt-2 no-underline"
        style={{ color: "var(--accent)" }}
      >
        {t("more")} &rarr;
      </a>
    </div>
  );
}

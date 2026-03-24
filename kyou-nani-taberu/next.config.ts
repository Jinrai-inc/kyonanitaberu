import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async rewrites() {
    // WordPress on お名前.com server — update WORDPRESS_URL in .env
    const wpUrl = process.env.WORDPRESS_URL || "https://wp.kyou-nani-taberu.app";
    return [
      {
        source: "/media",
        destination: `${wpUrl}/media`,
      },
      {
        source: "/media/:path*",
        destination: `${wpUrl}/media/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

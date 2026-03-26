import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/media/wp-json/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://media.kyou-nani-taberu.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-WP-Nonce",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/media",
        destination: "https://media.kyou-nani-taberu.app/",
      },
      {
        source: "/media/:path*",
        destination: "https://media.kyou-nani-taberu.app/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "case.etrenzik.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://case-api.etrenzik.com",
    NEXT_PUBLIC_SITE_URL: "https://case.etrenzik.com",
  },
};

export default nextConfig;

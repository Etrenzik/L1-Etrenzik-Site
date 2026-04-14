import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "l1.etrenzik.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://l1-api.etrenzik.com",
    NEXT_PUBLIC_SITE_URL: "https://l1.etrenzik.com",
  },
};

export default nextConfig;

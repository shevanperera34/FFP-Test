import type { NextConfig } from "next";

/** Hostnames allowed to load `/_next/*` when the Studio runs on another origin. Comma-separated, no protocol (e.g. 192.168.0.196). */
const allowedDevOrigins =
  process.env.NEXT_DEV_ALLOWED_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  ...(allowedDevOrigins.length > 0 ? {allowedDevOrigins} : {}),
  async redirects() {
    return [
      { source: "/birthdays", destination: "/small-events", permanent: true },
      { source: "/corporate", destination: "/large-events", permanent: true },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(ttf|otf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;

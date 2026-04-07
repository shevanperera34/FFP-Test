import type { NextConfig } from "next";

/** Hostnames allowed to load `/_next/*` when the Studio runs on another origin. Comma-separated, no protocol (e.g. 192.168.0.196). */
const allowedDevOrigins =
  process.env.NEXT_DEV_ALLOWED_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

/**
 * Sanity Presentation loads this site in an iframe from *.sanity.studio / www.sanity.io.
 * Browsers block that if the response only has X-Frame-Options: SAMEORIGIN. A CSP
 * `frame-ancestors` that includes those parents takes precedence in Chromium and allows the iframe.
 */
function sanityPresentationFrameAncestors(): string {
  const origins = new Set<string>([
    "'self'",
    "http://localhost:3333",
    "http://127.0.0.1:3333",
    "https://*.sanity.studio",
    "https://www.sanity.io",
    "https://sanity.io",
    "https://*.sanity.io",
  ]);
  const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim();
  if (studio) {
    try {
      const withScheme = studio.includes("://") ? studio : `https://${studio}`;
      origins.add(new URL(withScheme).origin);
    } catch {
      /* ignore */
    }
  }
  for (const raw of process.env.SANITY_FRAME_ANCESTORS?.split(",") ?? []) {
    const s = raw.trim();
    if (s) origins.add(s);
  }
  return `frame-ancestors ${[...origins].join(" ")}`;
}

const nextConfig: NextConfig = {
  ...(allowedDevOrigins.length > 0 ? {allowedDevOrigins} : {}),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: sanityPresentationFrameAncestors(),
          },
        ],
      },
    ];
  },
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

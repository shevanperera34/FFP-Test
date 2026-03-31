import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

export const dynamic = "force-static";

const paths = [
  "/",
  "/small-events",
  "/large-events",
  "/services",
  "/gallery",
  "/about",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}

import {stegaClean} from "@sanity/client/stega";
import type {BundledImageSrc} from "@/utils/encodePublicAssetPath";

/** Prefer CMS string (keeps stega) when non-empty after clean; else fallback. */
export function pickCms(value: string | null | undefined, fallback: string): string {
  if (typeof value !== "string") return fallback;
  return stegaClean(value).trim().length > 0 ? value : fallback;
}

/** Use a Sanity CDN image URL when present; otherwise a bundled static import. */
export function pickCmsImageUrl(cdnUrl: string | null | undefined, fallback: BundledImageSrc): BundledImageSrc {
  if (typeof cdnUrl === "string" && cdnUrl.trim().length > 0) return cdnUrl;
  return fallback;
}

/** Clean URL for href/src (stega-free); use when the value is not rendered as visible text. */
export function pickCmsUrl(value: string | null | undefined, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const cleaned = stegaClean(value).trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

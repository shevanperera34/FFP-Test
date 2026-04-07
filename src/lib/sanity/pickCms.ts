import {stegaClean} from "@sanity/client/stega";

/** Prefer CMS string (keeps stega) when non-empty after clean; else fallback. */
export function pickCms(value: string | null | undefined, fallback: string): string {
  if (typeof value !== "string") return fallback;
  return stegaClean(value).trim().length > 0 ? value : fallback;
}

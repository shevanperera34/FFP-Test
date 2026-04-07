/** Public URL prefix without trailing slash, e.g. "" or "/Fable-Face-Paint". */
export function getBasePath(): string {
  const fromEnv =
    typeof process !== "undefined"
      ? (process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH ?? "")
      : "";
  return fromEnv.replace(/\/$/, "");
}

export function getSiteUrl(): string {
  if (typeof process !== "undefined") {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL.replace(/\/$/, "");
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
    }
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  /** Fallback when building without VERCEL_URL (e.g. local `next build`). */
  return "https://fable-face-paint.vercel.app";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith("/")) path = `/${path}`;
  if (!base) return path;
  return `${base}${path === "/" ? "" : path}`;
}

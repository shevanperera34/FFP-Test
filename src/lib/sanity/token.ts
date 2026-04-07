import { getSanityReadToken } from "./readToken";

/**
 * Viewer token for draft content / Presentation. Reads `SANITY_API_READ_TOKEN`,
 * or `SANITY_READ_TOKEN` / `SANITY_API_TOKEN` as fallbacks (same as readToken).
 *
 * Use {@link getSanityReadToken} when missing token should be allowed (public builds).
 */
export function requireSanityReadToken(): string {
  const token = getSanityReadToken();
  if (!token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN (or SANITY_READ_TOKEN / SANITY_API_TOKEN). Add a Viewer token from sanity.io/manage → API → Tokens to fable-face-paint-frontend/.env.local and restart Next.js.",
    );
  }
  return token;
}

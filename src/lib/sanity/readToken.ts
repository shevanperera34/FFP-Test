/**
 * Viewer token used by draft-mode enable + defineLive. Tries common env names so
 * local setup works even if the variable name differs slightly between docs/tools.
 */
export function getSanityReadToken(): string {
  const candidates = [
    process.env.SANITY_API_READ_TOKEN,
    process.env.SANITY_READ_TOKEN,
    process.env.SANITY_API_TOKEN,
  ];
  for (const raw of candidates) {
    const t = raw?.trim();
    if (t) return t;
  }
  return "";
}

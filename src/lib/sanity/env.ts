/** Matches [fable-face-paint/sanity.config.ts](fable-face-paint/sanity.config.ts) defaults for local dev. */
export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "g7jqwqtw";

export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

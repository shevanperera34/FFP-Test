import {createClient} from "next-sanity";
import {sanityDataset, sanityProjectId} from "./env";

const apiVersion = "2024-01-01";

/**
 * Client for Presentation / Visual Editing: stega encoding links rendered strings to Studio fields.
 * Set NEXT_PUBLIC_SANITY_STUDIO_URL to your deployed Studio (default below matches LAN dev).
 */
export const previewClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion,
  /** Draft/preview + `validatePreviewUrl` must hit api.sanity.io; CDN + auth is unreliable and can break Presentation. */
  useCdn: false,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://192.168.0.196:3333",
  },
});

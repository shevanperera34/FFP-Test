import {createClient, type SanityClient} from "@sanity/client";
import {sanityDataset, sanityProjectId} from "./env";
import {getSanityReadToken} from "./readToken";

let client: SanityClient | null = null;

/**
 * Published content only unless a read token is set (then draft + published overlay for editors).
 */
export function getSanityClient(): SanityClient {
  if (client) return client;
  const token = getSanityReadToken();
  client = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: "2024-01-01",
    useCdn: !token,
    ...(token
      ? {token, perspective: "previewDrafts" as const}
      : {}),
  });
  return client;
}

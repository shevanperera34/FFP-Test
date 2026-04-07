import "server-only";

import {createDataAttribute} from "@sanity/visual-editing/create-data-attribute";
import {sanityDataset, sanityProjectId} from "./env";

type DocRef = {
  _id?: string | null;
  _type?: string | null;
} | null;

/**
 * `data-sanity` string for a field on a document (images + non-stega targets).
 */
export function fieldDataSanity(doc: DocRef, path: string): string | undefined {
  const id = doc?._id?.trim();
  const type = doc?._type?.trim();
  if (!id || !type) return undefined;
  const baseUrl = (process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://192.168.0.196:3333").replace(
    /\/$/,
    "",
  );
  return createDataAttribute({
    id,
    type,
    projectId: sanityProjectId,
    dataset: sanityDataset,
    baseUrl,
  })(path);
}

import "server-only";

import {fieldDataSanity} from "./fieldDataSanity";
import type {SanityHomepageDoc} from "./homepageQuery";

export type HomepageVisualAttrs = {
  heroBackgroundIllustration?: string;
  heroLogo?: string;
  artistPhoto?: string;
  featuredGalleryImages?: string;
  featuredServices?: string;
};

export function buildHomepageVisualAttrs(doc: SanityHomepageDoc | null): HomepageVisualAttrs {
  if (!doc) return {};
  return {
    heroBackgroundIllustration: fieldDataSanity(doc, "heroBackgroundIllustration"),
    heroLogo: fieldDataSanity(doc, "heroLogo"),
    artistPhoto: fieldDataSanity(doc, "artistPhoto"),
    featuredGalleryImages: fieldDataSanity(doc, "featuredGalleryImages"),
    featuredServices: fieldDataSanity(doc, "featuredServices"),
  };
}

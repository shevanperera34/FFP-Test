import "server-only";

import {fieldDataSanity} from "./fieldDataSanity";
import type {SanitySmallEventsPageDoc} from "./siteQueries";

export type SmallEventsVisualAttrs = {
  eyebrow?: string;
  pageTitle?: string;
  intro?: string;
  pricingCards?: string;
};

export function buildSmallEventsVisualAttrs(doc: SanitySmallEventsPageDoc | null): SmallEventsVisualAttrs {
  if (!doc) return {};
  return {
    eyebrow: fieldDataSanity(doc, "eyebrow"),
    pageTitle: fieldDataSanity(doc, "pageTitle"),
    intro: fieldDataSanity(doc, "intro"),
    pricingCards: fieldDataSanity(doc, "pricingCards"),
  };
}

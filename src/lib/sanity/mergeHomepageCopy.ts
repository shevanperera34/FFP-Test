import "server-only";

import {stegaClean} from "@sanity/client/stega";
import type {SanityHomepageDoc} from "./homepageQuery";

const homeCopy = {
  locationLabel: "from Vaughan, ON",
  heroHeadline: "Premium & Enchanted Event face art experience",
  heroCtaLabel: "Book Now",
  introHeadline: "Face painting, but make it event art.",
  introParagraph:
    "Fable Face Paint is a fully mobile face painting & event art service serving the GTA. Led by Milena, with a trusted team available for larger bookings, we can handle everything from private celebrations to corporate and public events.",
  artistEyebrow: "Meet your artist",
  artistName: "Milena",
  smallEventsEyebrow: "Birthdays · Private parties",
  smallEventsTitle: "Small Events",
  smallEventsDescription:
    "Perfect for smaller guest lists and high-quality designs. Book a single artist for a clean, magical setup.",
  smallEventsCtaLabel: "Explore Small Events",
  largeEventsEyebrow: "Corporate · Festivals · Public events",
  largeEventsBadge: "Most Popular",
  largeEventsTitle: "Large Events",
  largeEventsDescription:
    "Need higher throughput or multiple artists? This path is built for scale, structure, and crowd flow.",
  largeEventsCtaLabel: "Explore Large Events",
  helperNote:
    "Not sure which one fits? Start with the closest match, and the booking form will sort the details.",
  trustSectionTitle: "What clients rely on",
  gallerySectionTitle: "Real work from real events.",
  gallerySectionDescription: "A quick look at the detailed work and atmosphere of Fable Face Paint events.",
};

export type HomepageDisplayCopy = ReturnType<typeof mergeHomepageCopy>;

export function mergeHomepageCopy(cms: SanityHomepageDoc | null | undefined) {
  const pick = (v: string | null | undefined, fallback: string) => {
    if (typeof v !== "string") return fallback;
    return stegaClean(v).trim().length > 0 ? v : fallback;
  };
  return {
    locationLabel: pick(cms?.locationLabel, homeCopy.locationLabel),
    heroHeadline: pick(cms?.heroHeadline, homeCopy.heroHeadline),
    heroCtaLabel: pick(cms?.heroCallToActionLabel, homeCopy.heroCtaLabel),
    introHeadline: pick(cms?.introductionHeadline, homeCopy.introHeadline),
    introParagraph: pick(cms?.introductionBody, homeCopy.introParagraph),
    artistEyebrow: pick(cms?.artistEyebrow, homeCopy.artistEyebrow),
    artistName: pick(cms?.artistName, homeCopy.artistName),
    smallEventsEyebrow: pick(cms?.smallEventsEyebrow, homeCopy.smallEventsEyebrow),
    smallEventsTitle: pick(cms?.smallEventsTitle, homeCopy.smallEventsTitle),
    smallEventsDescription: pick(cms?.smallEventsDescription, homeCopy.smallEventsDescription),
    smallEventsCtaLabel: pick(cms?.smallEventsButtonLabel, homeCopy.smallEventsCtaLabel),
    largeEventsEyebrow: pick(cms?.largeEventsEyebrow, homeCopy.largeEventsEyebrow),
    largeEventsBadge: pick(cms?.largeEventsBadge, homeCopy.largeEventsBadge),
    largeEventsTitle: pick(cms?.largeEventsTitle, homeCopy.largeEventsTitle),
    largeEventsDescription: pick(cms?.largeEventsDescription, homeCopy.largeEventsDescription),
    largeEventsCtaLabel: pick(cms?.largeEventsButtonLabel, homeCopy.largeEventsCtaLabel),
    helperNote: pick(cms?.eventPathHelperNote, homeCopy.helperNote),
    trustSectionTitle: pick(cms?.trustSectionTitle, homeCopy.trustSectionTitle),
    gallerySectionTitle: pick(cms?.galleryTeaserTitle, homeCopy.gallerySectionTitle),
    gallerySectionDescription: pick(cms?.galleryTeaserDescription, homeCopy.gallerySectionDescription),
  };
}

export function resolveHeroLogoAlt(cms: SanityHomepageDoc | null | undefined): string {
  if (cms?.heroLogo?.asset?.url) {
    const raw = cms.heroLogo.alt;
    if (typeof raw === "string" && stegaClean(raw).trim().length > 0) return raw;
    return "Fable Face Paint logo";
  }
  return "Fable Face Paint logo";
}

export function resolveArtistPhotoAlt(cms: SanityHomepageDoc | null | undefined): string {
  if (cms?.artistPhoto?.asset?.url) {
    const raw = cms.artistPhoto.alt;
    if (typeof raw === "string" && stegaClean(raw).trim().length > 0) return raw;
    return "Milena, lead artist";
  }
  return "Milena, lead artist";
}

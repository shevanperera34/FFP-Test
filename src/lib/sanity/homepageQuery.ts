import {defineQuery} from "next-sanity";
import type {ClientReturn} from "@sanity/client";

export type SanityImageWithAlt = {
  alt?: string | null;
  asset?: {url?: string | null} | null;
} | null;

export type SanityFeaturedGalleryItem = {
  image?: SanityImageWithAlt;
} | null;

export const homepageQuery = defineQuery(`*[_type == "homepage"][0]{
  _id,
  _type,
  locationLabel,
  heroHeadline,
  heroCallToActionLabel,
  introductionHeadline,
  introductionBody,
  artistEyebrow,
  artistName,
  smallEventsEyebrow,
  smallEventsTitle,
  smallEventsDescription,
  smallEventsButtonLabel,
  largeEventsEyebrow,
  largeEventsBadge,
  largeEventsTitle,
  largeEventsDescription,
  largeEventsButtonLabel,
  eventPathHelperNote,
  trustSectionTitle,
  galleryTeaserTitle,
  galleryTeaserDescription,
  heroLogo {
    alt,
    asset->{url}
  },
  heroBackgroundIllustration {
    alt,
    asset->{url}
  },
  artistPhoto {
    alt,
    asset->{url}
  },
  featuredGalleryImages[]->{
    image {
      alt,
      asset->{url}
    }
  },
  featuredServices[]->{
    _id,
    _type,
    title,
    slug{current},
    sortOrder,
    cardHeading,
    cardDescription,
    leadImage {
      alt,
      asset->{url}
    }
  }
}`);

export type SanityHomepageDoc = ClientReturn<typeof homepageQuery> | null;
export type SanityFeaturedServiceRef = NonNullable<
  NonNullable<ClientReturn<typeof homepageQuery>>["featuredServices"]
>[number];

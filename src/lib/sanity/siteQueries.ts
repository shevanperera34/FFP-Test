import {defineQuery} from "next-sanity";
import type {ClientReturn} from "@sanity/client";

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  _id,
  _type,
  trustHighlights[]{title, subtitle, icon}
}`);

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]{
  _id,
  _type,
  eyebrow,
  pageTitle,
  intro,
  values[]{title, text},
  processSteps[]{title, description},
  testimonials[]{quote, author, time}
}`);

export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]{
  _id,
  _type,
  eyebrow,
  pageTitle,
  intro,
  smallCardTitle,
  smallCardBody,
  largeCardTitle,
  largeCardBody,
  unsureHelper
}`);

export const smallEventsPageQuery = defineQuery(`*[_type == "smallEventsPage"][0]{
  _id,
  _type,
  eyebrow,
  pageTitle,
  intro,
  pricingCards[]{
    packageName,
    price,
    subprice,
    badge,
    bestFor[],
    includes[],
    footnote
  }
}`);

export const largeEventsPageQuery = defineQuery(`*[_type == "largeEventsPage"][0]{
  _id,
  _type,
  eyebrow,
  pageTitle,
  intro,
  pricingCards[]{
    packageName,
    price,
    subprice,
    badge,
    bestFor[],
    includes[],
    footnote
  },
  clientLogos[]{
    alt,
    asset->{url}
  }
}`);

export const faqItemsQuery = defineQuery(`*[_type == "faqItem"] | order(category asc, sortOrder asc, _createdAt asc) {
  _id,
  _type,
  category,
  question,
  answer,
  sortOrder
}`);

export const galleryImagesQuery = defineQuery(`*[_type == "galleryImage"] | order(sortOrder asc, _createdAt asc) {
  _id,
  _type,
  internalTitle,
  category,
  sortOrder,
  image {
    alt,
    asset->{url}
  }
}`);

export const servicesListQuery = defineQuery(`*[_type == "service"] | order(sortOrder asc, title asc) {
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
  },
  detailSections[]{heading, body},
  importantInfo[],
  serviceFaqs[]{question, answer},
  extraPhotos[]{
    alt,
    asset->{url}
  }
}`);

export type SanitySiteSettingsDoc = ClientReturn<typeof siteSettingsQuery>;
export type SanityTrustHighlightRow = NonNullable<NonNullable<SanitySiteSettingsDoc>["trustHighlights"]>[number];
export type SanityAboutPageDoc = ClientReturn<typeof aboutPageQuery>;
export type SanityContactPageDoc = ClientReturn<typeof contactPageQuery>;
export type SanitySmallEventsPageDoc = ClientReturn<typeof smallEventsPageQuery>;
export type SanityLargeEventsPageDoc = ClientReturn<typeof largeEventsPageQuery>;
export type SanityLargeEventsClientLogo = NonNullable<NonNullable<SanityLargeEventsPageDoc>["clientLogos"]>[number];
export type SanityFaqItemDoc = NonNullable<ClientReturn<typeof faqItemsQuery>>[number];
export type SanityGalleryImageDoc = NonNullable<ClientReturn<typeof galleryImagesQuery>>[number];
export type SanityServiceDoc = NonNullable<ClientReturn<typeof servicesListQuery>>[number];

export type SanityAboutValueRow = NonNullable<NonNullable<SanityAboutPageDoc>["values"]>[number];
export type SanityAboutProcessRow = NonNullable<NonNullable<SanityAboutPageDoc>["processSteps"]>[number];
export type SanityAboutTestimonialRow = NonNullable<NonNullable<SanityAboutPageDoc>["testimonials"]>[number];
export type SanitySmallEventsPricingCard = NonNullable<NonNullable<SanitySmallEventsPageDoc>["pricingCards"]>[number];
export type SanityLargeEventsPricingCard = NonNullable<NonNullable<SanityLargeEventsPageDoc>["pricingCards"]>[number];
export type SanityServiceDetailSection = NonNullable<NonNullable<SanityServiceDoc["detailSections"]>[number]>;
export type SanityServiceFaqRow = NonNullable<NonNullable<SanityServiceDoc["serviceFaqs"]>[number]>;

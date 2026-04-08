import {sanityFetch} from "./live";
import {
  aboutPageQuery,
  contactPageQuery,
  faqItemsQuery,
  faqListingPageQuery,
  galleryImagesQuery,
  galleryListingPageQuery,
  largeEventsPageQuery,
  servicesListQuery,
  servicesListingPageQuery,
  siteSettingsQuery,
  smallEventsPageQuery,
  type SanityAboutPageDoc,
  type SanityContactPageDoc,
  type SanityFaqItemDoc,
  type SanityFaqListingPageDoc,
  type SanityGalleryImageDoc,
  type SanityGalleryListingPageDoc,
  type SanityLargeEventsPageDoc,
  type SanityServiceDoc,
  type SanityServicesListingPageDoc,
  type SanitySiteSettingsDoc,
  type SanitySmallEventsPageDoc,
} from "./siteQueries";

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function fetchSiteSettings(): Promise<SanitySiteSettingsDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: siteSettingsQuery});
    return data;
  }, null);
}

export async function fetchAboutPage(): Promise<SanityAboutPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: aboutPageQuery});
    return data;
  }, null);
}

export async function fetchContactPage(): Promise<SanityContactPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: contactPageQuery});
    return data;
  }, null);
}

export async function fetchSmallEventsPage(): Promise<SanitySmallEventsPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: smallEventsPageQuery});
    return data;
  }, null);
}

export async function fetchLargeEventsPage(): Promise<SanityLargeEventsPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: largeEventsPageQuery});
    return data;
  }, null);
}

export async function fetchFaqItems(): Promise<SanityFaqItemDoc[]> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: faqItemsQuery});
    return data ?? [];
  }, []);
}

export async function fetchFaqListingPage(): Promise<SanityFaqListingPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: faqListingPageQuery});
    return data;
  }, null);
}

export async function fetchServicesListingPage(): Promise<SanityServicesListingPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: servicesListingPageQuery});
    return data;
  }, null);
}

export async function fetchGalleryImages(): Promise<SanityGalleryImageDoc[]> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: galleryImagesQuery});
    return data ?? [];
  }, []);
}

export async function fetchGalleryListingPage(): Promise<SanityGalleryListingPageDoc> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: galleryListingPageQuery});
    return data;
  }, null);
}

export async function fetchServicesList(): Promise<SanityServiceDoc[]> {
  return safeFetch(async () => {
    const {data} = await sanityFetch({query: servicesListQuery});
    return data ?? [];
  }, []);
}
